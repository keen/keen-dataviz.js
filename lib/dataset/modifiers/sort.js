import { each } from '../../utils/each';
import analysesUtilMethods from '../utils/analyses';

export function sortColumns(str, comp) {
  var self = this,
      head = this.matrix[0].slice(1), // minus index
      cols = [],
      clone = [],
      fn = comp || analysesUtilMethods.getColumnLabel;

  // Isolate each column (except the index)
  each(head, function(cell, i) {
    cols.push(self.selectColumn(i+1).slice(0));
  });
  cols.sort(function(a,b){
    // If fn(a) > fn(b)
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === 'asc' ? 1 : -1);
    } else if (!op) {
      return (str === 'asc' ? -1 : 1);
    } else {
      return 0;
    }
  });
  each(cols, function(col, i) {
    self
      .deleteColumn(i+1)
      .insertColumn(i+1, col[0], col.slice(1));
  });
  return self;
}

export function sortRows(str, comp) {
  var self = this,
      head = this.matrix.slice(0,1),
      body = this.matrix.slice(1),
      fn = comp || analysesUtilMethods.getRowIndex;
  body.sort(function(a, b){
    // If fn(a) > fn(b)
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === 'asc' ? 1 : -1);
    } else if (!op) {
      return (str === 'asc' ? -1 : 1);
    } else {
      return 0;
    }
  });
  self.data(head.concat(body));
  return self;
}
