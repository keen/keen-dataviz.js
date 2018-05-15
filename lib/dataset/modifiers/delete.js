import { each } from '../../utils/each';

export function deleteColumn(q) {
  const self = this;
  const index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);

  if (index > -1) {
    each(self.matrix, function(row, i){
      self.matrix[i].splice(index, 1);
    });
  }
  return self;
}

export function deleteRow(q) {
  var index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);

  if (index > -1) {
    this.matrix.splice(index, 1);
  }
  return this;
}
