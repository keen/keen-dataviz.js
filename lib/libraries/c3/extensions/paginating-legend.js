var isDateString = require('../../../utils/assert-date-string');

module.exports = function(cols){
  var self = this, chart, columns, domNode, pagination, range;

  chart = this.view._artifacts.c3;
  columns = [];
  domNode = this.el().querySelector('.' + this.theme() + '-rendering');
  range = Math.round((domNode.offsetHeight - 68) / 20);
  pagination = this.view._artifacts.pagination = {
    hidden: [],
    labels: [],
    position: 0,
    range: range,
    total: 0
  };

  // Build a reversed column list
  for (var i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !isDateString(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  var legendEl = d3.select(domNode)
    .append('svg')
    .attr('class', 'keen-c3-legend')
    .attr('width', 120)
    .attr('height', domNode.offsetHeight)
    .style('right', '-120px');

  var legendItems = legendEl
    .append('g')
    .attr('class', 'keen-c3-legend-items');

  var paginateElOffset = 20 * pagination.range;
  var paginateEl = legendEl
    .append('g')
    .attr('class', 'keen-c3-legend-pagination')
    .attr('transform', function(){
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
        d3.select(this)
          .append('text')
          .attr('font-size', 12)
          .attr('pointer-events', 'none')
          .attr('x', 15)
          .attr('y', 9)
          .text(id)
          .text(function(id){
            if (d3.select(this).node().getBBox().width > 105) {
              return id.length <= 15 ? id : id.substring(0, 12) + '...';
            }
            else {
              return id;
            }
          });
        d3.select(this)
          .append('rect')
          .attr('height', 14)
          .attr('width', 110)
          .attr('x', 0)
          .attr('y', 0)
          .style('fill-opacity', 0)
          .style('cursor', 'pointer');
        d3.select(this)
          .append('rect')
          .attr('fill', chart.color(id))
          .attr('pointer-events', 'none')
          .attr('height', 10)
          .attr('width', 10)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('x', 0)
          .attr('y', 0);
      })
      .on('mouseover', function (id, i) {
          chart.focus(id);
          // show a tooltip overlay w/ full value
          if (id.length > 15) {
            d3.select(domNode)
              .append('div')
              .attr('class', 'keen-c3-legend-label-overlay')
              .style('right', '-130px')
              .style('top', (5 + (i+1) * 20) + 'px')
              .style('max-width', '75%')
              .html(id)
              .append('div')
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
          d3.select(this)
            .append('path')
            .attr('d', function(d){
              return d.path_d;
            })
            .style('cursor', 'pointer')
            .style('fill', '#D7D7D7')
            .style('stroke', 'none')
            .on('mouseover', function (id) {
              d3.select(this).style('fill', '#4D4D4D');
            })
            .on('mouseout', function (id) {
              d3.select(this).style('fill', '#D7D7D7');
            })
            .on('click', function (d) {
              if (d.direction === 'forward') {
                if (pagination.position + pagination.range < pagination.total) {
                  pagination.position = pagination.position + pagination.range;
                  paginateData();
                }
              }
              else {
                if (pagination.position - pagination.range >= 0) {
                  pagination.position = pagination.position - pagination.range;
                  paginateData();
                }
              }
            });
        });
  }

};
