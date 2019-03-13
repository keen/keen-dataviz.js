import * as d3 from 'd3';
import { textWrap } from '../../utils/svg-text-wrap';
import { prettyNumber } from '../../utils/pretty-number';

export default class Funnel3d {
  render() {
    const { matrix } = this.dataset;
    const {
      colors,
      container,
      labelMapping,
      colorMapping
    } = this.config;
    const opts = this.config;
    const {
      percents: {
        show,
        countingMethod,
        decimals,
      },
      lines,
      resultValues,
      effect3d,
      hover,
    } = this.config.funnel;
    const margin = { top: 10, right: 30, bottom: 60, left: 200 };
    const funnelContainer = d3.select(container);
    const chartContainer = d3.select(container + ' .c3-chart');
    const chart = chartContainer.append('svg');
    const svgWidth = funnelContainer.style('width').slice(0, -2)
          - margin.right - margin.left;
    const svgHeight = funnelContainer.style('height').slice(0, -2)
          - margin.top - margin.bottom - 30;
    const elemHeight = svgHeight/(matrix.length - 1);
    const yMarginElement = elemHeight * 0.3;
    const shadowCut = (yMarginElement * 2.5);
    let prevElemWidth = svgWidth;
    let percent = (100).toFixed(decimals);

    // prepare normal funnel polygons
    const polygons = matrix.slice(1).map((d, i) => {
        const newPoints = [
          {
            x: ((svgWidth - prevElemWidth)/2),
            y: elemHeight * i + yMarginElement
          },
          {
            x: ((svgWidth - prevElemWidth)/2 + prevElemWidth),
            y: elemHeight * i + yMarginElement
          },
        ]
        if(i !== 0){
          if(countingMethod === 'relative'){
            prevElemWidth = prevElemWidth * d[1]/matrix[i][1];
            percent = ((d[1]/matrix[i][1])*100).toFixed(decimals);
          }
          if(countingMethod === 'absolute'){
            prevElemWidth = svgWidth * d[1]/matrix[1][1];
            percent = ((d[1]/matrix[1][1])*100).toFixed(decimals);
          }
        }
        let label = d[0];
        if(Object.keys(labelMapping).length){
          for (let key in labelMapping) {
            if(labelMapping[key] === d[0]) {
              label = key;
            }
          }
        }
        let result = d[1];
        if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
          && !isNaN(parseInt(d[1])) ) {
            result = prettyNumber(d[1]);
        }
        return {
          name: d[0],
          label,
          percent: percent + '%',
          result,
          points: [
            ...newPoints,
            {
              x: ((svgWidth - prevElemWidth)/2 + prevElemWidth),
              y: elemHeight * (i + 1)
            },
            {
              x: ((svgWidth - prevElemWidth)/2),
              y: elemHeight * (i + 1)
            }
          ]
        }
    });

    //funnel shadows preparing
    const polygonsShadows = polygons.map((d, i) => {
        return {
          label: d.label,
          points: [
            {
              x: d.points[3].x,
              y: d.points[3].y
            },
            {
              x: d.points[2].x,
              y: d.points[2].y
            },
            {
              x: effect3d === 'left'
              ? d.points[2].x
              : d.points[2].x - shadowCut < svgWidth/2
                ? svgWidth/2 + 5
                : d.points[2].x - shadowCut,
              y: effect3d === 'left'
              ? d.points[2].y
              : d.points[2].y + (yMarginElement/1.5)
            },
            {
              x: effect3d === 'right'
              ? d.points[3].x
              : d.points[3].x + shadowCut > svgWidth/2
                ? svgWidth/2 - 5
                : d.points[3].x + shadowCut,
              y: effect3d === 'right'
              ? d.points[3].y
              : d.points[3].y + (yMarginElement/1.5)
            },
          ]
        }
    })

    //connecting funnels with shadows for rendering
    const polygons3d = polygons.concat(polygonsShadows);

    //chart rendering with polygons
    chart
      .attr('height', svgHeight + margin.top + margin.bottom - 30)
      .attr('width', svgWidth + margin.left + margin.right)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .selectAll('polygon')
      .data(polygons3d)
      .enter()
      .append('polygon')
        .attr('points', (d) => {
            return d.points.map((p) => {
              return [p.x,p.y].join(',');
            })
            .join(' ');
        })
        .style('fill', (d, i) => {
          if(i > (polygons.length - 1)){
            if(colorMapping[d.label]){
              return d3.rgb(colorMapping[d.label]).darker(1.5);
            }
            return d3.rgb(colors[i - (polygons.length)]).darker(1.5);
          }
          if(colorMapping[d.label]){
            return colorMapping[d.label];
          }
          return colors[i];
        })
        .attr('class', (d) => { return d.label; })
        .attr('cursor', 'pointer');

    if(lines){
      //rendering lines
      chart
        .selectAll('line')
        .data(polygons)
        .enter()
        .append('line')
        .attr('x1', 10)
        .attr('y1', (d) => {
           return d.points[0].y + margin.top - (yMarginElement/5);
         })
        .attr('x2', (d, i) => {
          if(i === 0){
            return d.points[1].x + margin.left;
          }
          return d.points[1].x + margin.left - shadowCut;
        })
        .attr('y2', (d) => {
          return d.points[0].y + margin.top - (yMarginElement/5);
        })
        .attr('class', 'chart-lines');

      //rendering last line
      chart
        .append('line')
        .attr('x1', 10)
        .attr('y1', polygons[polygons.length-1].points[2].y + margin.top
                    + yMarginElement - (yMarginElement/5))
        .attr('x2', polygons[polygons.length-1].points[2].x
                    + margin.left - shadowCut )
        .attr('y2', polygons[polygons.length-1].points[2].y + margin.top
                    + yMarginElement - (yMarginElement/5))
        .attr('class', 'chart-lines');
    }

    //rendering labels when lines are visible
    if(lines){
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'start')
        .attr('x', 20)
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 5 + (yMarginElement/4)
        })
        .attr('class', (d) => { return 'text-label ' + d.label; })
        .text((d) => { return d.name; })
        .call(textWrap, margin.left)
        .attr('cursor', 'pointer');
    }

    //rendering labels when lines are not visible
    if(!lines){
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'end')
        .attr('x', (d) => {
          return d.points[0].x + ((d.points[3].x - d.points[0].x)/2) + 130;
        })
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 5;
        })
        .attr('class', (d) => { return 'text-label ' + d.label; })
        .text((d) => { return d.name; })
        .call(textWrap, margin.left)
        .attr('cursor', 'pointer');
    }

      //rendering percents for each step
    if(show && !resultValues){
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .attr('x', svgWidth/2 + margin.left)
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 8
        })
        .attr('class', (d) => { return 'text-main ' + d.label; })
        .text((d) => { return d.percent; })
        .attr('cursor', 'pointer');
    }

    //rendering results for each step
    if(resultValues && !show){
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .attr('x', svgWidth/2 + margin.left)
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 8
        })
        .attr('class', (d) => { return 'text-main ' + d.label; })
        .text((d) => { return d.result; })
        .attr('cursor', 'pointer');
    }

    //rendering results and percenage together
    if(show && resultValues){
      //rendering percents
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .attr('x', svgWidth/2 + margin.left)
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 18
        })
        .attr('class', (d) => { return 'text-second ' + d.label; })
        .text((d) => { return d.percent; })
        .attr('cursor', 'pointer');

      //rendering results
      chart
        .selectAll('text.label')
        .data(polygons)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .attr('x', svgWidth/2 + margin.left)
        .attr('y', (d) => {
          return ((d.points[2].y - d.points[1].y)/2) + d.points[1].y
                  + margin.top + 3
        })
        .attr('class', (d) => { return 'text-main ' + d.label; })
        .text((d) => { return d.result; })
        .attr('cursor', 'pointer');
    }
    //hover handling
    if(hover){
      const polygonsHover = chart.selectAll('polygon');
      polygonsHover
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      const labelHover = chart.selectAll('text');
      labelHover
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      function handleMouseOver(d) {
        polygonsHover
          .style('opacity', 0.5);
        labelHover
          .style('opacity', 0.5);
        const thisLabel = /[^ ]*$/.exec(d3.select(this).attr('class'))[0];
        chart
          .selectAll(`.${thisLabel}`)
          .style('opacity', 1);
      }
      function handleMouseOut(d) {
        polygonsHover
          .style('opacity', 1);
        labelHover
          .style('opacity', 1);
      }
    }
  }
  update() {
    this.destroy();
    this.render();
  }
  destroy() {
    const { container } = this.config;
    const chartContainer = d3.select(container + ' .c3-chart > *');
    chartContainer.remove();
  }
}
