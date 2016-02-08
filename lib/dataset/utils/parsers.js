var Dataset; /* injected */

var each = require('../../utils/each'),
    flatten = require('../utils/flatten');

// Parser definitions
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

module.exports = initialize;

function initialize(lib){
  Dataset = lib;
  return function(name){
    var options = Array.prototype.slice.call(arguments, 1);

    if (!parsers[name]) {
      throw 'Requested parser does not exist';
    }
    else {
      return parsers[name].apply(this, options);
    }
  };
}

function parseMetric(){
  return function(res){
    return new Dataset()
      .set(['Value', 'Result'], res.result)
      .type('metric');
  }
}

//var myParser = Dataset.parser('interval', 'timeframe.end');
function parseInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset()
      .type('interval');
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    return dataset;
  }
}

function parseGroupedMetric(){
  return function(res){
    var dataset = new Dataset()
      .type('grouped-metric');
    each(res.result, function(record, i){
      var label;
      each(record, function(value, key){
        if (key !== 'result') {
          label = key;
        }
      });
      dataset.set(['Result', String(record[label])], record.result);
    });
    return dataset;
  }
}

//var myParser = Dataset.parser('grouped-interval', 'timeframe.end');
function parseGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset()
      .type('grouped-interval');
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
}

//var myParser = Dataset.parser('double-grouped-metric', ['first', 'second']);
function parseDoubleGroupedMetric(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset()
      .type('double-grouped-metric');
    each(res.result, function(record, i){
      dataset.set([ 'Result', record[options[0][0]] + ' ' + record[options[0][1]] ], record.result);
    });
    return dataset;
  }
}

//var myParser = Dataset.parser('double-grouped-interval', ['first', 'second'], 'timeframe.end');
function parseDoubleGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset()
      .type('double-grouped-interval');
    each(res.result, function(record, i){
      var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      each(record['value'], function(value, j){
        var label = String(value[options[0][0]]) + ' ' + String(value[options[0][1]]);
        dataset.set([ label, index ], value.result);
      });
    });
    return dataset;
  }
}

function parseFunnel(){
  return function(res){
    var result, steps, dataset;
    /* Important: Saved Funnels have a different response shape than ad-hoc funnels */
    if (res.result && res.result instanceof Array) {
      result = res.result;
      steps = res.steps;
    }
    else if (res.result.result) {
      result = res.result.result;
      steps = res.result.steps;
    }
    dataset = new Dataset().type('funnel');
    dataset.appendColumn('Step Value');
    each(result, function(value, i){
      dataset.appendRow(steps[i].event_collection, [value]);
    });
    return dataset;
  }
}

function parseList(){
  return function(res){
    var dataset = new Dataset()
      .type('list');
    each(res.result, function(value, i){
      dataset.set( [ 'Value', i+1 ], value );
    });
    return dataset;
  }
}

function parseExtraction(){
  return function(res){
    var dataset = new Dataset()
      .type('extraction');
    each(res.result, function(record, i){
      each(flatten(record), function(value, key){
        dataset.set([key, i+1], value);
      });
    });
    dataset.deleteColumn(0);
    return dataset;
  }
}
