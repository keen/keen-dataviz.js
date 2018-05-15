import { each } from '../../utils/each';

export function selectColumn(q) {
  const result = [];
  const index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);

  if (index > -1 && typeof this.matrix[0][index] !== 'undefined') {
    each(this.matrix, function(row, i) {
      result.push(row[index]);
    });
  }
  return result;
}

export function selectRow(q) {
  let result = [];
  const index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);

  if (index > -1 && typeof this.matrix[index] !== 'undefined') {
    result = this.matrix[index];
  }
  return result;
}
