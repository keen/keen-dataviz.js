import * as d3 from 'd3';
import { textWrap } from '../../utils/svg-text-wrap';
import { prettyNumber } from '../../utils/pretty-number';
import copyToClipboard from '../../utils/copy-to-clipboard';

export default class Heatmap {
  render() {
    // const itemSize = 18;
    // const cellSize = itemSize - 1;
    // const width = 800;
    // const height = 800;
    // const margin = {
    //   top: 10,
    //   right: 10,
    //   bottom: 10,
    //   left: 10,
    // };

    // const hourFormat = d3.timeFormat('%H');
    // const dayFormat = d3.timeFormat('%j');
    // const timeFormat = d3.timeFormat('%Y-%m-%dT%X');

    // let dateExtent;
    // let data;
    // const dayOffset = 0;
    // const colorCalibration = ['#f6faaa', '#FEE08B', '#FDAE61', '#F46D43', '#D53E4F', '#9E0142'];
    // const dailyValueExtent = {};

    // const axisWidth = 0;
    // const axisHeight = itemSize * 24;
    // const xAxisScale = d3.scaleTime();
    // const xAxis = d3.axisRight(xAxisScale);
    // const yAxisScale = d3.scaleLinear().range([0, axisHeight]).domain([0, 24]);
    // const yAxis = d3.axisTop(yAxisScale);
    const {
      colors,
      container,
    } = this.config;
    const { matrix } = this.dataset;
    const margin = {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    };
    // const width = 600 - margin.left - margin.right;
    // const height = 600 - margin.top - margin.bottom;
    const baseWidth = 600;
    const baseHeight = 600;
    const heatmapContainer = d3.select(container);
    console.log(heatmapContainer);
    const containerWidth = parseInt(heatmapContainer.style('width'), 10) || baseWidth;
    const containerHeight = parseInt(heatmapContainer.style('height'), 10) || baseHeight;
    // console.log(containerWidth, ' x ', containerHeight);
    // console.log(parseInt(heatmapContainer.style('width'), 10), parseInt(heatmapContainer.style('height'), 10));
    const chartContainer = this.el().querySelector('.c3-chart');
    // const chartContainer = d3.select(this.el().querySelector('.c3-chart'));
    // const chartContainer = d3.select(container).select('.c3-chart');
    // const chart = chartContainer.append('svg');
    const svgWidth = containerWidth - margin.right - margin.left;
    const svgHeight = containerHeight - margin.top - margin.bottom;
    // console.log(container, chartContainer, heatmapContainer, chart);
    const svg = d3.select(chartContainer)
      .append('svg')
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('height', '100%')
      .attr('width', '100%')
      // .attr('width', containerWidth)
      // .attr('height', containerHeight)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${margin.top})`,
      );
    // const svg = d3.select(container)
    //   .append('svg')
    //   .attr('width', width + margin.left + margin.right + 100)
    //   .attr('height', height + margin.top + margin.bottom + 100)
    //   .append('g')
    //   .attr(
    //     'transform',
    //     `translate(${margin.left},${margin.top})`,
    //   );

    const xLabel = new Set();
    const yLabel = new Set();

    // matrix.map((data) => {
    //   const dateFormat = d3.timeFormat('%B %d');
    //   const timeFormat = d3.timeFormat('%H:%M');
    //   const timestamp = Date.parse(data[0]);

    //   if (!isNaN(timestamp)) {
    //     xLabel.add(dateFormat(new Date(data[0])));
    //     yLabel.add(timeFormat(new Date(data[0])));
    //   }
    // });



    const formatData = () => {
      const dateFormat = d3.timeFormat('%B %d');
      const timeFormat = d3.timeFormat('%H:%M');

      const arr = [];
      matrix.forEach((element) => {
        const timestamp = Date.parse(element[0]);
        if (!isNaN(timestamp)) {
          const obj = {
            x: dateFormat(new Date(element[0])),
            y: timeFormat(new Date(element[0])),
            value: element[1],
          };
          arr.push(obj);
        }
      });
      return arr;
    };

    const formattedData = formatData();

    formattedData.forEach((item) => {
      xLabel.add(item.x);
      yLabel.add(item.y);
    });

    // console.log(formatData());
    // console.log(xLabel, yLabel);

    const xAxis = d3.scaleBand()
      .range([0, svgWidth])
      .domain([...xLabel])
      .padding(0.02);

    svg.append('g')
      .style('font-size', 12)
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(xAxis).tickSize(0));

    const yAxis = d3.scaleBand()
      .range([svgHeight, 0])
      .domain([...yLabel].sort())
      .padding(0.02);

    svg.append('g')
      .style('font-size', 12)
      .call(d3.axisLeft(yAxis).tickSize(0));

    const tooltip = d3.select(container)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'keen-dataviz-tooltip')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('font-size', '14px')
      .style('padding', '2px 6px')
      // .style('border', 'solid')
      // .style('border-width', '2px')
      // .style('border-radius', '5px')
      // .style('padding', '5px')
      .style('display', 'none')
      .style('position', 'fixed');

    const mouseover = () => {
      tooltip
        .style('opacity', 1)
        .style('display', 'block');
      // d3.select(this)
      //   .style('stroke', 'black')
      //   .style('opacity', 1);
    };

    const mousemove = (d) => {
      tooltip
        .html(`<div><small>x:</small> ${d.x}</div><div><small>y:</small> ${d.y}</div><div><small>value:</small> <b>${d.value}</b></div>`)
        .style('left', `${d3.event.clientX + 10}px`)
        .style('top', `${d3.event.clientY + 10}px`);
        // .style('left', `${d3.mouse(this)[0] + 70}px`)
        // .style('top', `${d3.mouse(this)[1]}px`);
    };

    const mouseleave = () => {
      tooltip
        .style('opacity', 0)
        .style('display', 'none');
      // d3.select(this)
      //   .style('stroke', 'none')
      //   .style('opacity', 0.8);
    };

    console.log(this.config);

    // const colorScale = (data) => {
    //   console.log(data);
    //   console.log(d3.max(data, d => d.value));
    //   d3.scaleQuantile().domain([0, d3.max(data, d => d.value)]).range(colors);
    // };

    // const colorScale = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([1, 100]);

    const getColorAlpha = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.value)])
      .range([0, 1]);

    const getColor = (value) => {
      const alpha = getColorAlpha(value);
      // const baseColor = colors[0] || '#00BBDE';
      const baseColor = 'green';
      const rgb = d3.rgb(baseColor);
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      return rgba;
    };

    

    svg.selectAll()
      .data(formattedData, d => `${d.x}:${d.y}`)
      .enter()
      .append('rect')
        .attr('x', d => xAxis(d.x))
        .attr('y', d => yAxis(d.y))
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('width', xAxis.bandwidth())
        .attr('height', yAxis.bandwidth())
        .style('fill', d => getColor(d.value))
        // .style('stroke-width', 1)
        // .style('stroke', 'none')
        // .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    // console.log(this.config);
    // console.log(matrix);
    // return 'heatmap';
  }
  update() {
    this.destroy();
    this.render();
  }
  destroy() {
    const chartContainer = d3.select(this.el().querySelector(`.${this.config.theme}-rendering .c3-chart`));
    chartContainer.remove();
  }
}
