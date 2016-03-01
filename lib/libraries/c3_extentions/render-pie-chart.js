function renderPieChart(chart, visibilityThreshold, data) {
  if (visibilityThreshold) {
    var total = data.reduce(function(previous, current) {
      return previous + current[1];
    }, 0);
    var overVisibilityThreshold = [];
    var underVisibilityThreshold = [];

    for (var i=0; i < data.length; i++) {
      var value = data[i][1];
      if (value/total > visibilityThreshold) {
        overVisibilityThreshold.push(data[i]);
      }
      else {
        underVisibilityThreshold.push(data[i]);
      }
    }

    var otherValue = underVisibilityThreshold.reduce(function(previous, current) {
      return previous + current[1];
    }, 0);
    var otherCategoryName = getOtherGroupName(data);

    chart.load({
      unload: chart.data().map(function(d) { return d.id; }),
      columns: overVisibilityThreshold.concat([
        [otherCategoryName, Math.round(otherValue * 100) / 100]
      ])
    })
  }
}

function getOtherGroupName(data) {
  var matchingGroupName = data.find(function(d) {
    return d[0].toLowerCase() === 'other';
  });
  if (matchingGroupName) {
    return 'Other (Generated)';
  }
  return 'Other';
}

module.exports = renderPieChart;
