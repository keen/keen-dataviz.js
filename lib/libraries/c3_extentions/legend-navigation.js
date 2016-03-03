function legendNavigation(chart, totalPages) {
  this.chart = chart;
  this.totalPages = totalPages;

  this.navigation = this._buildLegendNavigation();
  var navItems = this._buildNavigationItems();

  this.leftNav = navItems.leftNav;
  this.rightNav = navItems.rightNav;
  this.counter = navItems.counter;
}

legendNavigation.prototype.updateCounter = function(currentPage, totalPages) {
  this.counter.text((currentPage+1) + ' / ' + totalPages);
}

legendNavigation.prototype._buildLegendNavigation = function() {
  return d3.select(this.chart.element).select('svg')
    .append('g')
    .classed('legend-navigation', true)
    .attr('transform', 'translate(60)')
}

legendNavigation.prototype._buildNavigationItems = function() {
  var height = this.chart.element.clientHeight;
  var width = this.chart.internal.legend[0][0].getBBox().width;
  var arrowPos = 23;
  var leftNav = this.navigation
    .append('text')
    .attr({ x: width/2, y: height, 'text-anchor': 'middle', 'class': 'left arrow' })
    .attr('transform', 'translate(-'+arrowPos+')')
    .text('<<')

  var counter = this.navigation
    .append('text').classed('counter', true)
    .attr({ x: width / 2, y: height, 'text-anchor': 'middle' })
    .text('1 / ' + this.totalPages);

  var rightNav = this.navigation
    .append('text')
    .attr({ x: width / 2, y: height, 'text-anchor': 'middle', 'class': 'right arrow'})
    .attr('transform', 'translate('+arrowPos+')')
    .text('>>')

  return { leftNav: leftNav, rightNav: rightNav, counter: counter };
}

module.exports = legendNavigation;
