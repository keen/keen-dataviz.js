import * as d3 from 'd3';

import isDateString from '../../../utils/assert-date-string';
/* eslint-disable */
export default function (options) {
  const cols = options.data.columns;
  const datavizInstance = this;
  const chart = this.view._artifacts.c3;
  const columns = [];
  const domNode = this.el().querySelector('.' + datavizInstance.config.theme + '-rendering');
  const legendConfig = datavizInstance.config.legend;

  const pagination = this.view._artifacts.pagination = {
    hidden: [],
    labels: [],
    position: 0,
    range: Math.round((domNode.offsetHeight - 78) / 20),
    total: 0
  };

  // Reduce threshold for donut/pie charts
  if (datavizInstance.config.type === 'donut' || datavizInstance.config.type === 'pie') {
    pagination.range = pagination.range >= 5 ? 5 : pagination.range;
  }

  for (let i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !isDateString(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  const legendEl = d3.select(domNode)
    .append('svg');
    legendEl.attr('class', 'keen-c3-legend');
    legendEl.attr('height', legendConfig.height || domNode.offsetHeight - 10);
    legendEl.attr('width', legendConfig.width);
    legendEl.style(legendConfig.position, '-' + legendConfig.width);
    legendEl.style('top', '10px');

  const legendItems = legendEl
    .append('g');
    legendItems.attr('class', 'keen-c3-legend-items');

  const paginateElOffset = 20 * pagination.range;
  const paginateEl = legendEl
    .append('g');
  paginateEl.attr('class', 'keen-c3-legend-pagination');
  paginateEl.attr('transform', function(){
    return 'translate(2, ' + paginateElOffset + ')'
  });

  paginateData();

  function paginateData(){
    pagination.labels = columns.slice(pagination.position, pagination.position + pagination.range);
    pagination.total = columns.length;
    renderLegendComponent.call(datavizInstance, pagination.labels);
    if (pagination.total > pagination.range) {
      renderPaginationComponent.call(datavizInstance);
    }
    chart.resize();
  }

  function renderLegendComponent(){
    legendItems
      .selectAll('g')
      .remove();

    const legendItemList = legendItems
      .selectAll('g')
      .data(pagination.labels);

    legendItemList.enter()
        .append('g')
        .attr('transform', function(id, i){
          return 'translate(0, ' + (20 * i) + ')'
        })
      .attr('data-id', function (id) { return id; })
      .style('opacity', function(id){
        const isHidden = pagination.hidden.indexOf(id);
        return isHidden < 0 ? 1 : .35;
      })
      .each(function (id) {
        const elementText = d3.select(this)
          .append('text');

          elementText.attr('font-size', 12);
          elementText.attr('pointer-events', 'none');
          elementText.attr('x', 15);
          elementText.attr('y', 9);
          elementText.text(id);
          elementText.text(function(text){
            if(datavizInstance.config.type==='donut'){
              console.log(d3.select(this).node().getBBox().width, legendEl.node().getBBox().width);
            }

            if (d3.select(this).node().getBBox().width > legendEl.node().getBBox().width) {
              return text.length <= options.legend.label.textMaxLength ? text : text.substring(0, options.legend.label.textMaxLength) + '...';
            }
            else {
              return text;
            }
          });
        const legendItemBox = d3.select(this)
          .append('rect');
          legendItemBox.attr('height', 14);
          legendItemBox.attr('width', 110);
          legendItemBox.attr('x', 0);
          legendItemBox.attr('y', 0);
          legendItemBox.style('cursor', 'pointer');
          legendItemBox.style('fill-opacity', 0);
        const legendItemCircle = d3.select(this)
          .append('rect');
          legendItemCircle.attr('fill', chart.color(id));
          legendItemCircle.attr('height', 10);
          legendItemCircle.attr('pointer-events', 'none');
          legendItemCircle.attr('rx', 5);
          legendItemCircle.attr('ry', 5);
          legendItemCircle.attr('width', 10);
          legendItemCircle.attr('x', 0);
          legendItemCircle.attr('y', 0 );
      })
      .on('mouseover', function (id, i) {
          chart.focus(id);
          // show a tooltip overlay w/ full value
          if (id.length > 15) {
            const tooltipElement = d3.select(domNode).append('div');
            tooltipElement.attr('class', 'keen-c3-legend-label-overlay');
            tooltipElement.style('max-width', '75%');
            tooltipElement.style('right', -legendWidth + 'px');
            tooltipElement.style('top', (15 + (i+1) * 20) + 'px');
            tooltipElement.html(id);
            const tooltipElementOverlay = tooltipElement.append('div');
            tooltipElementOverlay.attr('class', 'keen-c3-legend-label-overlay-pointer');
          }
      })
      .on('mouseout', function (id) {
        chart.revert();
        // clear out the tooltip overlay
        d3.selectAll('.' + datavizInstance.config.theme + '-rendering .keen-c3-legend-label-overlay')
          .remove();
      })
      .on('click', function (id) {
        d3.select(this).style('opacity', function(){
          const isHidden = pagination.hidden.indexOf(id);
          if (isHidden < 0) {
            pagination.hidden.push(id);
            return .35;
          }
          else {
            pagination.hidden.splice(isHidden, 1);
            return 1;
          }
        });
        chart.toggle(id);
      });

    legendItemList.exit().remove();
  }

  function renderPaginationComponent(){
    paginateEl
      .selectAll('g')
      .remove();

    paginateEl
        .selectAll('g')
        .data([
          { direction: 'reverse', path_d: 'M0 10 L10 0 L20 10 Z' },
          { direction: 'forward', path_d: 'M0 0 L10 10 L20 0 Z' }
        ])
        .enter()
        .append('g')
        .attr('transform', function(id, i){
          return 'translate(' + (i * 20) + ', 0)'
        })
        .each(function(id){
          const element = d3.select(this)
            .append('path');

            element.attr('d', function(d){
              return d.path_d;
            });
            element.style('cursor', 'pointer');
            element.style('fill', '#D7D7D7');
            element.style('stroke', 'none');
            element.on('mouseover', function (id) {
              d3.select(this).style('fill', '#4D4D4D');
            });
            element.on('mouseout', function (id) {
              d3.select(this).style('fill', '#D7D7D7');
            });
            element.on('click', function (d) {
              if (d.direction === 'forward') {
                if (pagination.position + pagination.range < pagination.total) {
                  pagination.position = pagination.position + pagination.range;
                }
              }
              else {
                if (pagination.position - pagination.range >= 0) {
                  pagination.position = pagination.position - pagination.range;
                }
              }
              paginateData();
              clearSelectedText();
            });
        });
  }

  function clearSelectedText() {
    let selection;
    if (document.selection && document.selection.empty) {
      selection = document.selection;
      selection.empty();
    }
    else if (window.getSelection) {
      selection = window.getSelection();
      selection.removeAllRanges();
    }
  }
}
