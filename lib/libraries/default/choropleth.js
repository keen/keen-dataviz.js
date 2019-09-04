import * as d3 from "d3";
import { prettyNumber } from "../../utils/pretty-number";
import copyToClipboard from "../../utils/copy-to-clipboard";
import Rangeable from "rangeable";

export default class Choropleth {
  render() {
    const { matrix } = this.dataset;
    const {
      colors,
      container,
      utils,
      choropleth: {
        map,
        borders: { show, size, color }
      }
    } = this.config;
    const opts = this.config;
    const funnelContainer = d3.select(container);
    const chartContainer = d3.select(
      this.el().querySelector(`.${this.config.theme}-rendering .c3-chart`)
    );
    const width = Number(funnelContainer.style("width").slice(0, -2));
    const height = Number(funnelContainer.style("height").slice(0, -2));
    const chart = chartContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const onlyValues = matrix.slice(1).map(el => {
      return el[1];
    });
    const minVal = d3.min(onlyValues);
    const maxVal = d3.max(onlyValues);
    const lightColor = d3.hsl(colors[0]).brighter(1);
    lightColor.l = 0.95;
    const darkColor = colors[0];
    const ramp = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([lightColor, darkColor]);

      const zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [width + 90, height + 100]])
    .on("zoom", zoomed);

    d3.json(`https://cdn.jsdelivr.net/npm/keen-dataviz-maps@1.0.0/maps/${map}.json`).then(data => {
      let projection;
      switch (map) {
        case "world":
          projection = d3.geoMercator().fitSize([width, height - 40], data);
          break;
        case "us":
          projection = d3.geoAlbersUsa().fitSize([width, height - 40], data);
          break;
  
        default:
          projection = d3.geoMercator().fitSize([width, height - 40], data);
          break;
      }
  
      const path = d3.geoPath().projection(projection);

    const usData = data.features.map(el => {
      const theOne = matrix.filter(d => d[0] === el.properties.name);
      if (theOne[0])
        return {
          ...el,
          properties: { ...el.properties, result: theOne[0][1] }
        };
        return {
          ...el,
          properties: { ...el.properties, result: 0 }
        };
    });

    //   chartContainer.append('input').attr('type', 'range');

    //   const rangeable = new Rangeable('input', {
    //     type: "multi",
    //     tooltips: "always",
    //     min: 0,
    //     max: 100,
    //     step: 1,
    //     value: 50,
    // });

    const elementName = map === "world" ? "country" : "state";

    chart
      .selectAll("path")
      .data(usData)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", elementName)
      .attr("id", d => {
        return `${d.properties.name
          .split(" ")
          .join("-")
          .split(".")
          .join("")}`;
      })
      .style("fill", d => {
        return ramp(d.properties.result);
      })
      .attr("cursor", "pointer")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut);
      
    //borders
    if (show) {
      chart
        .selectAll(`.${elementName}`)
        .style("stroke", color)
        .style("stroke-width", size);
    }

    //tooltip
    const tooltip = d3
      .select(".c3-chart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "c3-tooltip-container")
      .style("display", "none")
      .style("position", "fixed");

    //hover handling
    function handleMouseOver(d) {
      //hover
      chart
        .select(
          `#${d.properties.name
            .split(" ")
            .join("-")
            .split(".")
            .join("")}`
        )
        .style("opacity", 0.1);

      tooltip.style("opacity", 1).style("display", "block");
    }

    function handleMouseMove(d) {
      let result = d.properties.result;
      if (
        (typeof opts["prettyNumber"] === "undefined" ||
          opts["prettyNumber"] === true) &&
        !isNaN(parseInt(d.properties.result))
      ) {
        result = prettyNumber(d.properties.result);
      }
      tooltip
        .html(
          `
          <table class="c3-tooltip">
            <tr>
              <th colspan="2">${d.properties.name}</th>
            </tr>
            <tr class="c3-tooltip-name-1">
              <td class="value">${result}</td>
            </tr>
          </table>
        `
        )
        .style("left", `${d3.event.clientX + 10}px`)
        .style("top", `${d3.event.clientY + 10}px`);
    }
    function handleMouseOut(d) {
      chart
        .select(
          `#${d.properties.name
            .split(" ")
            .join("-")
            .split(".")
            .join("")}`
        )
        .style("opacity", 1);

      tooltip.style("opacity", 0).style("display", "none");
    }

    // click to copy
    if (utils && utils.clickToCopyToClipboard) {
      const label = chart.selectAll(`.${elementName}`);

      label.on("click", handleClickToCopy);

      function handleClickToCopy(data) {
        const {
          properties: { result }
        } = data;
        copyToClipboard(result, d3.event);
      }
    }
  })
  chart.call(zoom);
  function zoomed() {
    chartContainer.attr("transform", d3.event.transform);
  }
  }
  update() {
    this.destroy();
    this.render();
  }
  destroy() {
    const chartContainer = d3.select(
      this.el().querySelector(`.${this.config.theme}-rendering .c3-chart`)
    );
    chartContainer.remove();
  }
}
