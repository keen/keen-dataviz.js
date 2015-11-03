var each = require('../../utils/each');

module.exports = {
  'selectColumn': selectColumn,
  'selectRow': selectRow
};

function selectColumn(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);

  if (index > -1 && 'undefined' !== typeof this.matrix[0][index]) {
    each(this.matrix, function(row, i){
      result.push(row[index]);
    });
  }
  return result;
}

function selectRow(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);

  if (index > -1 && 'undefined' !== typeof this.matrix[index]) {
    result = this.matrix[index];
  }
  return  result;
}
