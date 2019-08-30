import * as d3 from 'd3';
import Rangeable from 'rangeable';
import copyToClipboard from '../../utils/copy-to-clipboard';

export default class Heatmap {
  render() {
    const {
      colors,
      container,
      showSlider,
      tooltip,
    } = this.config;
    const {
      matrix,
      meta,
    } = this.dataset;
    const margin = {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    };
    const baseWidth = 600;
    const baseHeight = 600;
    const heatmapContainer = d3.select(container);
    const containerWidth = parseInt(heatmapContainer.style('width'), 10) || baseWidth;
    const containerHeight = parseInt(heatmapContainer.style('height'), 10) || baseHeight;
    const chartContainer = this.el().querySelector('.c3-chart');
    const svgWidth = containerWidth - margin.right - margin.left;
    const svgHeight = containerHeight - margin.top - margin.bottom;
    const svg = d3.select(chartContainer)
      .append('svg')
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('height', '100%')
      .attr('width', '100%')
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${margin.top})`,
      );

    const xLabel = new Set();
    const yLabel = new Set();

    const formatData = () => {
      const dateFormat = d3.timeFormat('%B %d');
      const timeFormat = d3.timeFormat('%H:%M');
      const arr = [];
      matrix.forEach((element) => {
        if (meta.type === 'heatmap') {
          if (typeof element[0][2] === 'number') {
            const obj = {
              x: element[0][0],
              y: element[0][1],
              value: element[0][2],
            };
            arr.push(obj);
          }
        } else {
          const timestamp = Date.parse(element[0]);
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(timestamp)) {
            const obj = {
              x: dateFormat(new Date(element[0])),
              y: timeFormat(new Date(element[0])),
              value: element[1],
            };
            arr.push(obj);
          }
        }
      });
      return arr;
    };

    const formattedData = formatData();

    formattedData.forEach((item) => {
      xLabel.add(item.x);
      yLabel.add(item.y);
    });

    const getColor = () => {
      const defaultColor = '#00BBDE';
      const baseColor = colors[0];
      let rgb = d3.rgb(defaultColor);
      if (d3.color(baseColor)) {
        rgb = d3.rgb(baseColor);
      }
      return rgb;
    };

    const getColorAlpha = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.value)])
      .range([0, 1]);

    const convertRGBAtoRGB = (color, bg = [255, 255, 255]) => {
      const opacity = color[3];

      return [Math.floor(((1 - opacity) * bg[0]) + (opacity * color[0]) + 0.5),
        Math.floor(((1 - opacity) * bg[1]) + (opacity * color[1]) + 0.5),
        Math.floor(((1 - opacity) * bg[2]) + (opacity * color[2]) + 0.5)];
    };

    const getTileColor = (value) => {
      const alpha = getColorAlpha(value);
      const rgb = getColor();
      const solidColor = convertRGBAtoRGB([rgb.r, rgb.g, rgb.b, alpha]);
      const color = `rgb(${solidColor[0]}, ${solidColor[1]}, ${solidColor[2]})`;
      return color;
    };

    const xLabelBase = 5;
    const yLabelBase = 10;

    const getAxisLabelRatio = (base, labelSize) => Math.floor(labelSize / base) + 1;
    const xAxis = d3.scaleBand()
      .range([0, svgWidth])
      .domain([...xLabel])
      .padding(0.02);

    svg.append('g')
      .style('font-size', 12)
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(xAxis).tickSize(0))
      .selectAll('text')
      .attr('dy', '1em')
      .filter((d, i) => i % getAxisLabelRatio(xLabelBase, xLabel.size))
      .style('display', 'none');

    const yAxis = d3.scaleBand()
      .range([svgHeight, 0])
      .domain([...yLabel].sort())
      .padding(0.02);

    svg.append('g')
      .style('font-size', 12)
      .call(d3.axisLeft(yAxis).tickSize(0))
      .selectAll('text')
      .filter((d, i) => i % getAxisLabelRatio(yLabelBase, yLabel.size))
      .style('display', 'none');

    const chartTooltip = d3.select(container)
      .append('div')
      .attr('class', 'keen-dataviz-tooltip')
      .style('opacity', 0)
      .style('background-color', 'white')
      .style('border', `2px solid ${getColor().toString()}`)
      .style('font-size', '14px')
      .style('padding', '2px 8px')
      .style('box-shadow', '2px 2px 4px rgba(0,0,0,0.25')
      .style('display', 'none')
      .style('position', 'fixed');

    const handleMouseOver = () => {
      d3.select(d3.event.target)
        .raise()
        .style('transition', 'transform 150ms ease-out')
        .style('outline', `1px solid ${getColor()}`)
        .style('transform', 'translate(0px, -4px)');

      chartTooltip
        .style('opacity', 1)
        .style('display', 'block');
    };

    const handleMouseMove = (d) => {
      let tooltipContent = `
      <tr>
        <th style="text-align: right">value:</th>
        <td><b style="font-size:14px;">${d.value}</b></td>
      </tr>`;
      if (!tooltip.showValueOnly) {
        tooltipContent = `
        <tr>
            <th style="text-align: right">xAxis:</th>
            <td>${d.x}</td>
        </tr>
        <tr>
            <th style="text-align: right">yAxis:</th>
            <td>${d.y}</td>
        </tr>
        ${tooltipContent}
        `;
      }
      chartTooltip
        .html(`
          <table style="font-size:12px;">
            ${tooltipContent}
          </table>
        `)
        .style('left', `${d3.event.clientX + 10}px`)
        .style('top', `${d3.event.clientY + 10}px`);
    };

    const handleMouseLeave = () => {
      d3.select(d3.event.target)
        .style('outline', 'none')
        .style('transform', 'none');

      chartTooltip
        .style('opacity', 0)
        .style('display', 'none');
    };

    const handleClick = d => copyToClipboard(d.value);

    const refValue = formattedData[0].value;
    const minRange = formattedData
      .reduce((min, curr) => (curr.value < min ? curr.value : min), refValue);
    const maxRange = formattedData
      .reduce((max, curr) => (curr.value > max ? curr.value : max), refValue);

    if (showSlider) {
      const rangeableInput = d3.select(container)
        .append('input')
        .attr('type', 'range')
        .attr('class', 'keen-dataviz-slider');

      const handleSliderChange = (data) => {
        const rects = svg.selectAll('rect');
        const [min, max] = data;

        rects.each((d, i, nodes) => {
          d3.select(nodes[i])
            .style('visibility', () => ((d.value > max || d.value < min) ? 'hidden' : 'visible'));
        });
      };

      const rangeable = new Rangeable('.keen-dataviz-slider', {
        multiple: true,
        min: minRange,
        max: maxRange,
        value: [minRange, maxRange],
        onChange: data => handleSliderChange(data),
      });

      const customStyle = `
        ${container} .rangeable-progress,
        ${container} .rangeable-tooltip {
          background-color: ${getColor()};
        }
        ${container} .rangeable-tooltip::before {
          border-color: ${getColor()} transparent transparent;
        }
        ${container} .rangeable-handle {
          border-color: ${getColor()};
        }
      `;

      // eslint-disable-next-line no-undef
      const style = document.createElement('style');
      style.innerHTML = customStyle;

      // eslint-disable-next-line no-undef
      const scriptRef = document.querySelector('script');
      scriptRef.parentNode.insertBefore(style, scriptRef);
    }

    svg.selectAll()
      .data(formattedData, d => `${d.x}:${d.y}`)
      .enter()
      .append('rect')
      .attr('x', d => xAxis(d.x))
      .attr('y', d => yAxis(d.y))
      .attr('width', xAxis.bandwidth())
      .attr('height', yAxis.bandwidth())
      .style('fill', d => getTileColor(d.value))
      .style('cursor', 'pointer')
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseleave', handleMouseLeave)
      .on('click', handleClick);
  }
  update() {
    this.destroy();
    this.render();
  }
  destroy() {
    const chartContainer = this.el().querySelector('.c3-chart');
    chartContainer.remove();
  }
}
