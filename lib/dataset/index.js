/*
  Dataset SDK
*/

// Analyses
var analyses = require('./analyses');

// Modifiers
var append = require('./modifiers/append'),
    del = require('./modifiers/delete'),
    filter = require('./modifiers/filter'),
    insert = require('./modifiers/insert'),
    select = require('./modifiers/select'),
    sort   = require('./modifiers/sort'),
    update = require('./modifiers/update');

// Parsers (below)
var parsers = {
  'metric':                   parseMetric,
  'interval':                 parseInterval,
  'grouped-metric':           parseGroupedMetric,
  'grouped-interval':         parseGroupedInterval,
  'double-grouped-metric':    parseDoubleGroupedMetric,
  'double-grouped-interval':  parseDoubleGroupedInterval,
  'funnel':                   parseFunnel,
  'list':                     parseList,
  'extraction':               parseExtraction
};

// Utils
var each = require('../utils/each'),
    extend = require('../utils/extend'),
    flatten = require('./utils/flatten');

// Constructor
function Dataset(){
  this.matrix = [
    ['Index']
  ];
}

Dataset.prototype.data = function(arr){
  if (!arguments.length) return this.matrix;
  this.matrix = (arr instanceof Array ? arr : null);
  return this;
};

Dataset.prototype.set = function(coords, value){
  if (arguments.length < 2 || coords.length < 2) {
    throw Error('Incorrect arguments provided for #set method');
  }

  var colIndex = 'number' === typeof coords[0] ? coords[0] : this.matrix[0].indexOf(coords[0]),
      rowIndex = 'number' === typeof coords[1] ? coords[1] : select.selectColumn.call(this, 0).indexOf(coords[1]);

  var colResult = select.selectColumn.call(this, coords[0]),
      rowResult = select.selectRow.call(this, coords[1]);

  // Column doesn't exist, create and reset colIndex
  if (colResult.length < 1) {
    append.appendColumn.call(this, coords[0]);
    colIndex = this.matrix[0].length - 1;
  }

  // Row doesn't exist, create and reset rowIndex
  if (rowResult.length < 1) {
    append.appendRow.call(this, coords[1]);
    rowIndex = this.matrix.length - 1;
  }

  // Set provided value
  this.matrix[ rowIndex ][ colIndex ] = value;
  return this;
}

extend(Dataset.prototype, analyses);

extend(Dataset.prototype, append);
extend(Dataset.prototype, del);
extend(Dataset.prototype, filter);
extend(Dataset.prototype, insert);
extend(Dataset.prototype, select);
extend(Dataset.prototype, sort);
extend(Dataset.prototype, update);

// Parser definitions
Dataset.parsers = function(name){
  if (!parsers[name]) {
    throw 'Requested parser does not exist';
  }
  else {
    return parsers[name];
  }
};

function parseMetric(res){
  var dataset = new Dataset();
  return dataset.set(['Value', 'Result'], res.result);
}

//var myParser = Dataset.parser('interval', 'timeframe.end');
function parseInterval(res){
  var dataset = new Dataset(),
      options = Array.prototype.slice.call(arguments, 1);

  each(res.result, function(record, i){
    var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
    dataset.set(['Result', index], record.value);
  });
  return dataset;
}

function parseGroupedMetric(res){
  var dataset = new Dataset();
  each(res.result, function(record, i){
    var label;
    each(record, function(key, value){
      if (key !== 'result') {
        label = key;
      }
    });
    dataset.set(['Result', record[label]], record.result);
  });
  return dataset;
}

//var myParser = Dataset.parser('grouped-interval', 'timeframe.end');
function parseGroupedInterval(res){
  var dataset = new Dataset(),
      options = Array.prototype.slice.call(arguments, 1);

  each(res.result, function(record, i){
    var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
    if (record.value.length) {
      each(record.value, function(group, j){
        var label;
        each(group, function(value, key){
          if (key !== 'result') {
            label = key;
          }
        });
        dataset.set([ group[label] || '', index ], group.result);
      });
    }
    else {
      dataset.appendRow(index);
    }
  });
  return dataset;
}

//var myParser = Dataset.parser('double-grouped-metric', ['first', 'second']);
function parseDoubleGroupedMetric(res){
  var dataset = new Dataset(),
      options = Array.prototype.slice.call(arguments, 1);

  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  each(res.result, function(record, i){
    dataset.set([ record[options[0][0]], record[options[0][1]] ], record.result);
  });
  return dataset;
}

//var myParser = Dataset.parser('double-grouped-interval', ['first', 'second'], 'timeframe.end');
function parseDoubleGroupedInterval(res){
  var dataset = new Dataset(),
      options = Array.prototype.slice.call(arguments, 1);

  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';

  each(res.result, function(record, i){
    var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
    each(record['value'], function(value, j){
      var label = String(value[options[0][0]]) + ' ' + String(value[options[0][1]]);
      dataset.set([ label, index ], value.result);
    });
  });
  return dataset;
}

function parseFunnel(res){
  var dataset = new Dataset();
  each(res.result, function(value, i){
    dataset.set( [ 'Step Value', res.steps[i].event_collection ], value );
  });
  return dataset;
}

function parseList(res){
  var dataset = new Dataset();
  each(res.result, function(value, i){
    dataset.set( [ 'Unique Value', i+1 ], value );
  });
  return dataset;
}

function parseExtraction(res){
  var dataset = new Dataset();
  each(res.result, function(record, i){
    each(flatten(record), function(value, key){
      dataset.set([key, i+1], value);
    });
  });
  dataset.deleteColumn(0);
  return dataset;
}

module.exports = Dataset;
