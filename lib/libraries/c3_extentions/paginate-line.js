var each = require('../../utils/each');
var isDateString = require('../../utils/assert-date-string');

function paginateLine(chart, dataset) {
  var columns = chart.internal.config.data_columns;
  var allData = [];
  each(dataset.matrix[0], function(item, i) {
    if(i > 0) {
      allData.push(dataset.selectColumn(i));
    }
  });

  var currentPage = 0;
  var countPerPage = 15;
  var totalPages = Math.ceil(allData.length / countPerPage);
  var currentData = allData.slice(0, countPerPage);

  var navigation = _buildLegendNavigation(chart);
  var navItems = _buildNavigationItems(navigation, currentPage, totalPages);

  chart.load({ columns: columns.concat(currentData), x: 'x'});

  navItems.leftNav.on('click', function() {
    if (currentPage ===  0) {
      return;
    }
    currentPage = currentPage - 1;
    currentData = allData.slice(currentPage*countPerPage, (currentPage+1)*countPerPage);

    _updateCounter(navItems.counter, currentPage, totalPages);
    chart.load({
      unload: chart.data().map(function(d) { return d.id; }),
      columns: columns.concat(currentData)
    });
  });

  navItems.rightNav.on('click', function() {
    if (currentPage === totalPages-1) {
      return;
    }
    currentPage = currentPage + 1;
    currentData = allData.slice(currentPage*countPerPage, (currentPage+1)*countPerPage);

    _updateCounter(navItems.counter, currentPage, totalPages);
    chart.load({
      unload: chart.data().map(function(d) { return d.id; }),
      columns: columns.concat(currentData)
    });
  });
}

function _buildLegendNavigation(chart) {
  return d3.select(chart.element)
    .append('div').classed('paginated-legend', true)
    .append('div').classed('legend-navigation', true);
}

function _buildNavigationItems(navigation, currentPage, totalPages) {
  var leftNav = navigation
    .append('span').classed('left', true)
    .text('<-');

  var counter = navigation
    .append('span').classed('counter', true)
    .text((currentPage+1) + ' / ' + totalPages);

  var rightNav = navigation
    .append('span').classed('right', true)
    .text('->');

  return { leftNav: leftNav, rightNav: rightNav, counter: counter };
}

function _updateCounter(counter, currentPage, totalPages) {
  counter.text((currentPage+1) + ' / ' + totalPages);
}

module.exports = paginateLine;
