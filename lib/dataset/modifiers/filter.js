import { each } from '../../utils/each';

export function filterColumns(fn) {
  const self = this;
  const clone = [];

  each(self.matrix, function(row, i) {
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

export function filterRows(fn) {
  const self = this;
  const clone = [];

  each(self.matrix, function(row, i){
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });

  self.data(clone);
  return self;
}
