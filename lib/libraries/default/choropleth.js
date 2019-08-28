import * as d3 from "d3";
import copyToClipboard from "../../utils/copy-to-clipboard";
import us from "../../maps/us.json";

export default class Funnel {
  render() {
    const { matrix } = this.dataset;
    const { colors, container, utils } = this.config;
    const funnelContainer = d3.select(container);
    const chartContainer = d3.select(
      this.el().querySelector(`.${this.config.theme}-rendering .c3-chart`)
    );
    const width = funnelContainer.style("width").slice(0, -2);
    const height = funnelContainer.style("height").slice(0, -2);
    const chart = chartContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoAlbersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const minVal = d3.min(matrix.slice(1))[1];
    const maxVal = d3.max(matrix.slice(1))[1];
    const lightColor = d3.color(colors[0]);
    lightColor.opacity = 0.2;
    const darkColor = colors[0];

    const ramp = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([lightColor, darkColor]);

    chart
      .selectAll("path")
      .data(us.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "states")
      .attr("id", d => {
        return `${d.properties.NAME.replace(" ", "-")}`;
      })
      .style("fill", "grey")
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", d => {
        const theOne = matrix.filter(el => el[0] === d.properties.NAME);
        return ramp(theOne[0][1]);
      })
      .attr("cursor", "pointer");

    // click to copy
    if (utils && utils.clickToCopyToClipboard) {
      const label = chart.selectAll(".states");
      console.log(label);

      label.on("click", handleClickToCopy);

      function handleClickToCopy(data) {
        const {
          properties: { NAME }
        } = data;
        copyToClipboard(NAME, d3.event);
      }
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
