import * as d3 from 'd3';

import isDateString from '../../../utils/assert-date-string';
/* eslint-disable */
export default function (cols) {
  var self = this,
      chart = this.view._artifacts.c3,
      columns = [],
      domNode = this.el().querySelector('.' + this.theme() + '-rendering'),
      legendWidth = 120;

  var pagination = this.view._artifacts.pagination = {
    hidden: [],
    labels: [],
    position: 0,
    range: Math.round((domNode.offsetHeight - 78) / 20),
    total: 0
  };

  // Reduce threshold for donut/pie charts
  if (this.type() === 'donut' || this.type() === 'pie') {
    pagination.range = pagination.range >= 5 ? 5 : pagination.range;
  }

  for (var i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !isDateString(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  var legendEl = d3.select(domNode)
    .append('svg');
    legendEl.attr('class', 'keen-c3-legend');
    legendEl.attr('height', domNode.offsetHeight - 10);
    legendEl.attr('width', legendWidth);
    legendEl.style('right', -legendWidth + 'px');
    legendEl.style('top', '10px');

  var legendItems = legendEl
    .append('g');
    legendItems.attr('class', 'keen-c3-legend-items');

  var paginateElOffset = 20 * pagination.range;
  var paginateEl = legendEl
    .append('g');
  paginateEl.attr('class', 'keen-c3-legend-pagination');
  paginateEl.attr('transform', function(){
    return 'translate(2, ' + paginateElOffset + ')'
  });

  paginateData();

  function paginateData(){
    pagination.labels = columns.slice(pagination.position, pagination.position + pagination.range);
    pagination.total = columns.length;
    renderLegendComponent.call(self, pagination.labels);
    if (pagination.total > pagination.range) {
      renderPaginationComponent.call(self);
    }
    chart.resize();
  }

  function renderLegendComponent(){
    legendItems
      .selectAll('g')
      .remove();

    var legendItemList = legendItems
      .selectAll('g')
      .data(pagination.labels);

    legendItemList.enter()
        .append('g')
        .attr('transform', function(id, i){
          return 'translate(0, ' + (20 * i) + ')'
        })
      .attr('data-id', function (id) { return id; })
      .style('opacity', function(id){
        var isHidden = pagination.hidden.indexOf(id);
        return isHidden < 0 ? 1 : .35;
      })
      .each(function (id) {
        var elementText = d3.select(this)
          .append('text');

          elementText.attr('font-size', 12);
          elementText.attr('pointer-events', 'none');
          elementText.attr('x', 15);
          elementText.attr('y', 9);
          elementText.text(id);
          elementText.text(function(id){
            if (d3.select(this).node().getBBox().width > 105) {
              return id.length <= 15 ? id : id.substring(0, 12) + '...';
            }
            else {
              return id;
            }
          });
        var legendItemBox = d3.select(this)
          .append('rect');
          legendItemBox.attr('height', 14);
          legendItemBox.attr('width', 110);
          legendItemBox.attr('x', 0);
          legendItemBox.attr('y', 0);
          legendItemBox.style('cursor', 'pointer');
          legendItemBox.style('fill-opacity', 0);
        var legendItemCircle = d3.select(this)
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
            var tooltipElement = d3.select(domNode)
              .append('div');
              tooltipElement.attr('class', 'keen-c3-legend-label-overlay');
              tooltipElement.style('max-width', '75%');
              tooltipElement.style('right', -legendWidth + 'px');
              tooltipElement.style('top', (15 + (i+1) * 20) + 'px');
              tooltipElement.html(id);
              tooltipElement.append('div')
                .attr('class', 'keen-c3-legend-label-overlay-pointer');
          }
      })
      .on('mouseout', function (id) {
        chart.revert();
        // clear out the tooltip overlay
        d3.select(self.el().querySelector('.' + self.theme() + '-rendering .keen-c3-legend-label-overlay'))
          .remove();
      })
      .on('click', function (id) {
        d3.select(this).style('opacity', function(){
          var isHidden = pagination.hidden.indexOf(id);
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
          var element = d3.select(this)
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
    var selection;
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
