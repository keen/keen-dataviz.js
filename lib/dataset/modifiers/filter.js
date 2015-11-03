var each = require('../../utils/each');

module.exports = {
  'filterColumns': filterColumns,
  'filterRows': filterRows
};

function filterColumns(fn){
  var self = this,
      clone = new Array();

  each(self.matrix, function(row, i){
    clone.push([]);
  });

  each(self.matrix[0], function(col, i){
    var selectedColumn = self.selectColumn(i);
    if (i == 0 || fn.call(self, selectedColumn, i)) {
      each(selectedColumn, function(cell, ri){
        clone[ri].push(cell);
      });
    }
  });

  self.data(clone);
  return self;
}

function filterRows(fn){
  var self = this,
      clone = [];

  each(self.matrix, function(row, i){
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });

  self.data(clone);
  return self;
}
