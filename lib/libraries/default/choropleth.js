import * as d3 from "d3";
import Rangeable from "rangeable";
import { prettyNumber } from "../../utils/pretty-number";
import copyToClipboard from "../../utils/copy-to-clipboard";

export default class Choropleth {
  render() {
    const { matrix } = this.dataset;
    const {
      colors,
      container,
      utils,
      title,
      choropleth: {
        map,
        borders: { show, size, color },
        showSlider
      }
    } = this.config;
    const opts = this.config;
    const choroplethContainer = d3.select(container);
    const chartContainer = d3.select(
      this.el().querySelector(`.${this.config.theme}-rendering .c3-chart`)
    );
    const width = Number(choroplethContainer.style("width").slice(0, -2));
    const height = Number(choroplethContainer.style("height").slice(0, -2));
    let heightChanges = 0;
    if (title) heightChanges += 31;
    if (showSlider) heightChanges += 20;
    const chart = chartContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height - heightChanges);

    const onlyValues = matrix.slice(1).map(el => el[1]);
    const minVal = d3.min(onlyValues);
    const maxVal = d3.max(onlyValues);
    const lightColor = d3.hsl(colors[0]).brighter(1);
    lightColor.l = 0.95;
    const darkColor = colors[0];
    const ramp = d3
      .scaleLinear()
      .domain([minVal === undefined ? 0 : minVal, maxVal === undefined ? 0 : maxVal])
      .range([lightColor, darkColor]);

    d3.json(
      `https://cdn.jsdelivr.net/npm/keen-dataviz-maps@1.0.0/maps/${map}.json`
    ).then(data => {
      const zoom = d3
        .zoom()
        .scaleExtent([1, 5])
        .translateExtent([[0, 0], [width, height - 50]])
        .on("zoom", zoomed);

      let projection;
      switch (map) {
        case "world":
          projection = d3.geoMercator().fitSize([width, height - 50], data);
          break;
        case "us":
          projection = d3
            .geoAlbersUsa()
            .scale(width)
            .fitSize([width, height - 50], data);
          break;

        default:
          projection = d3
            .geoMercator()
            .scale(width)
            .fitSize([width, height - 50], data);
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

      if (showSlider) {
        const handleSliderChange = data => {
          const el = chart.selectAll(`.${elementName}`);
          const [min, max] = data;

          el.each((d, i, nodes) => {
            d3.select(nodes[i]).style("visibility", () =>
              d.properties.result > max || d.properties.result < min
                ? "hidden"
                : "visible"
            );
          });
        };

        chartContainer
          .style("display", "flex")
          .style("flex-direction", "column")
          .style("justify-content", "center");

        const rangeContainer = chartContainer
          .append("div")
          .style("width", "95%")
          .style("margin", "auto");
        rangeContainer.append("input").attr("type", "range");

        const rangeable = new Rangeable("input", {
          type: "double",
          tooltips: true,
          min: 0,
          max: maxVal,
          onChange: data => handleSliderChange(data)
        });

        const customStyle = `
        ${container} .rangeable-progress,
        ${container} .rangeable-tooltip,
        ${container} .active {
          background-color: ${colors[0]};
        }
        ${container} .rangeable-tooltip::before {
          border-color: ${colors[0]} transparent transparent;
        }
        ${container} .rangeable-handle {
          border-color: ${colors[0]};
        }
      `;

        // eslint-disable-next-line no-undef
        const style = document.createElement("style");
        style.innerHTML = customStyle;

        // eslint-disable-next-line no-undef
        const scriptRef = document.querySelector("script");
        scriptRef.parentNode.insertBefore(style, scriptRef);
      }

      const elementName = map === "world" ? "country" : "state";

      chart
        .selectAll("path")
        .data(usData)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", elementName)
        .attr(
          "id",
          d =>
            `${d.properties.name
              .split(" ")
              .join("-")
              .split(".")
              .join("")}`
        )
        .style("fill", d => ramp(d.properties.result))
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
        chart
          .select(
            `#${d.properties.name
              .split(" ")
              .join("-")
              .split(".")
              .join("")}`
          )
          .style("fill", d => ramp(1.2 * maxVal))
          .style("stroke-width", 1.5 * size);

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
          .style("fill", d => ramp(d.properties.result))
          .style("stroke-width", size);

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
      function zoomed() {
        chart
          .selectAll(`.${elementName}`)
          .attr("transform", d3.event.transform);
      }
      chart.call(zoom);
      chart.call(zoom).on("mousedown.zoom", null);
    });
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
