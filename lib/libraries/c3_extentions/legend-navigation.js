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
  return d3.select(this.chart.element)
    .append('div').classed('paginated-legend', true)
    .append('div').classed('legend-navigation', true);
}

legendNavigation.prototype._buildNavigationItems = function() {
  var leftNav = this.navigation
    .append('span').classed('left', true)
    .text('<-');

  var counter = this.navigation
    .append('span').classed('counter', true)
    .text('1 / ' + this.totalPages);

  var rightNav = this.navigation
    .append('span').classed('right', true)
    .text('->');

  return { leftNav: leftNav, rightNav: rightNav, counter: counter };
}

module.exports = legendNavigation;
