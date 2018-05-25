// Modifiers
import * as append from './modifiers/append';
import * as del from './modifiers/delete';
import * as filter from './modifiers/filter';
import * as insert from './modifiers/insert';
import * as select from './modifiers/select';
import * as sort from './modifiers/sort';
import * as update from './modifiers/update';

// Utils
import analyses from './utils/analyses';
import { extend } from '../utils/extend';
import parsers from './utils/parsers';

export const Dataset = function () {
  if (this instanceof Dataset === false) {
    return new Dataset();
  }

  this.matrix = [
    ['Index']
  ];
  this.meta = {
    type: undefined
  };
}

Dataset.prototype.data = function (arr) {
  if (!arguments.length) return this.matrix;
  this.matrix = (arr instanceof Array ? arr : null);
  return this;
};

Dataset.prototype.set = function (coords, value) {
  if (arguments.length < 2 || coords.length < 2) {
    throw Error('Incorrect arguments provided for #set method');
  }

  var colIndex = 'number' === typeof coords[0] ? coords[0] : this.matrix[0].indexOf(coords[0]),
      rowIndex = 'number' === typeof coords[1] ? coords[1] : select.selectColumn.call(this, 0).indexOf(coords[1]);

  var colResult = select.selectColumn.call(this, coords[0]),
      rowResult = select.selectRow.call(this, coords[1]);

  // Column doesn't exist, create and reset colIndex
  if (colResult.length < 1) {
    append.appendColumn.call(this, String(coords[0]));
    colIndex = this.matrix[0].length - 1;
  }

  // Row doesn't exist, create and reset rowIndex
  if (rowResult.length < 1) {
    append.appendRow.call(this, String(coords[1]));
    rowIndex = this.matrix.length - 1;
  }

  // Set provided value
  this.matrix[ rowIndex ][ colIndex ] = value;
  return this;
};

Dataset.prototype.type = function(str){
  if (!arguments.length) return this.meta['type'];
  this.meta['type'] = (str ? String(str) : undefined);
  return this;
};

extend(Dataset.prototype, append);
extend(Dataset.prototype, del);
extend(Dataset.prototype, filter);
extend(Dataset.prototype, insert);
extend(Dataset.prototype, select);
extend(Dataset.prototype, sort);
extend(Dataset.prototype, update);
extend(Dataset.prototype, analyses);
Dataset.parser = parsers(Dataset);

export default Dataset;
