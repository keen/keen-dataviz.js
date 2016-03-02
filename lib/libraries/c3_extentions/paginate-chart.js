var each = require('../../utils/each');
var LegendNavigation = require('./legend-navigation');

function paginateChart(chart, dataset) {
  var columns = chart.internal.config.data_columns;
  var height = chart.internal.height;
  var allData = [];
  each(dataset.matrix[0], function(item, i) {
    if(i > 0) {
      allData.push(dataset.selectColumn(i));
    }
  });

  var currentPage = 0;
  var countPerPage = Math.ceil(height/20);
  var totalPages = Math.ceil(allData.length / countPerPage);
  var currentData = allData.slice(0, countPerPage);

  chart.load({ columns: columns.concat(currentData) });

  if (totalPages > 1) {
    var legendNavigation = new LegendNavigation(chart, totalPages);

    legendNavigation.leftNav.on('click', function() {
      if (currentPage ===  0) {
        return;
      }
      currentPage = currentPage - 1;
      currentData = allData.slice(currentPage*countPerPage, (currentPage+1)*countPerPage);

      legendNavigation.updateCounter(currentPage, totalPages);
      chart.load({
        unload: chart.data().map(function(d) { return d.id; }),
        columns: columns.concat(currentData)
      });
    });

    legendNavigation.rightNav.on('click', function() {
      if (currentPage === totalPages-1) {
        return;
      }
      currentPage = currentPage + 1;
      currentData = allData.slice(currentPage*countPerPage, (currentPage+1)*countPerPage);

      legendNavigation.updateCounter(currentPage, totalPages);
      chart.load({
        unload: chart.data().map(function(d) { return d.id; }),
        columns: columns.concat(currentData)
      });
    });
  }
}

module.exports = paginateChart;
