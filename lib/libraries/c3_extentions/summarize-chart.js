var each = require('../../utils/each');
var LegendNavigation = require('./legend-navigation');

function summarizeChart(chart, dataset, otherColumnName) {
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

  chart.load({
    unload: chart.data().map(function(d) { return d.id; }),
    columns: columns.concat(
      _createCurrentColumns(allData, currentPage, countPerPage, otherColumnName)
    )
  });

  var legendNavigation = new LegendNavigation(chart, totalPages);

  legendNavigation.leftNav.on('click', function() {
    if (currentPage ===  0) {
      return;
    }
    currentPage = currentPage - 1;

    legendNavigation.updateCounter(currentPage, totalPages);
    chart.load({
      unload: chart.data().map(function(d) { return d.id; }),
      columns: columns.concat(
        _createCurrentColumns(allData, currentPage, countPerPage, otherColumnName)
      )
    });
  });

  legendNavigation.rightNav.on('click', function() {
    if (currentPage === totalPages-1) {
      return;
    }
    currentPage = currentPage + 1;

    legendNavigation.updateCounter(currentPage, totalPages);
    chart.load({
      unload: chart.data().map(function(d) { return d.id; }),
      columns: columns.concat(_createCurrentColumns(allData, currentPage, countPerPage, otherColumnName))
    });
  });
}

function _createCurrentColumns(allData, currentPage, countPerPage, otherColumnName) {
  var startIndex = currentPage * countPerPage;
  var endIndex = startIndex + countPerPage;
  return _createOtherColumn(allData, startIndex, endIndex, otherColumnName).concat(
    allData.slice(startIndex, endIndex)
  );
}

function _createOtherColumn(allData, startIndex, endIndex, otherColumnName) {
  // take all data NOT drawn on page
  var otherDatasets = allData.slice(0, startIndex).concat(allData.slice(endIndex, allData.length));
  var otherColumn = [ otherColumnName ];

  // summarize it all
  for(var i=1; i<otherDatasets[0].length; i++) {
    var sumAtIndex = otherDatasets.reduce(function(previousValue, currentValue, currentIndex) {
      return previousValue + otherDatasets[currentIndex][i];
    }, 0);

    otherColumn.push(Math.round(sumAtIndex * 100) / 100);
  }

  return [otherColumn];
}

module.exports = summarizeChart;
