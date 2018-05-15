import createNullList from '../utils/create-null-list';
import { each } from '../../utils/each';

export function appendColumn(str, input) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 2);
  const label = (str !== undefined) ? str : null;

  if (typeof input === 'function') {
    self.matrix[0].push(label);
    each(self.matrix, function(row, i) {
      let cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].push(cell);
      }
    });
  }

  else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix.length - 1) {
      input = input.concat(createNullList(self.matrix.length - 1 - input.length));
    }
    else {
      // If this new column is longer than existing columns,
      // we need to update the rest to match ...
      each(input, function(value, i){
        if (self.matrix.length -1 < input.length) {
          appendRow.call(self, String(self.matrix.length));
        }
      });
    }

    self.matrix[0].push(label);
    each(input, function(value, i){
      self.matrix[i+1][self.matrix[0].length-1] = value;
    });

  }

  return self;
}

export function appendRow(str, input) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 2);
  const label = (str !== undefined) ? str : null;
  const newRow = [];

  newRow.push(label);

  if (typeof input === 'function') {
    each(self.matrix[0], function(label, i){
      let col;
      let cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.matrix.push(newRow);
  }

  else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix[0].length -1 < input.length) {
          appendColumn.call(self, String( self.matrix[0].length));
        }
      });
    }

    self.matrix.push(newRow.concat(input));
  }

  return self;
}
