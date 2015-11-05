(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
  Dataset SDK
*/
var append = require('./modifiers/append'),
    del = require('./modifiers/delete'),
    filter = require('./modifiers/filter'),
    insert = require('./modifiers/insert'),
    select = require('./modifiers/select'),
    sort   = require('./modifiers/sort'),
    update = require('./modifiers/update');
var analyses = require('./utils/analyses'),
    extend = require('../utils/extend'),
    parsers = require('./utils/parsers');
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
  if (colResult.length < 1) {
    append.appendColumn.call(this, coords[0]);
    colIndex = this.matrix[0].length - 1;
  }
  if (rowResult.length < 1) {
    append.appendRow.call(this, coords[1]);
    rowIndex = this.matrix.length - 1;
  }
  this.matrix[ rowIndex ][ colIndex ] = value;
  return this;
}
extend(Dataset.prototype, append);
extend(Dataset.prototype, del);
extend(Dataset.prototype, filter);
extend(Dataset.prototype, insert);
extend(Dataset.prototype, select);
extend(Dataset.prototype, sort);
extend(Dataset.prototype, update);
extend(Dataset.prototype, analyses);
Dataset.parser = parsers(Dataset);
module.exports = Dataset;
},{"../utils/extend":20,"./modifiers/append":2,"./modifiers/delete":3,"./modifiers/filter":4,"./modifiers/insert":5,"./modifiers/select":6,"./modifiers/sort":7,"./modifiers/update":8,"./utils/analyses":9,"./utils/parsers":12}],2:[function(require,module,exports){
var createNullList = require('../utils/create-null-list'),
    each = require('../../utils/each');
module.exports = {
  'appendColumn': appendColumn,
  'appendRow': appendRow
};
function appendColumn(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null;
  if (typeof input === 'function') {
    self.matrix[0].push(label);
    each(self.matrix, function(row, i){
      var cell;
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
      input = input.concat( createNullList(self.matrix.length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix.length -1 < input.length) {
          appendRow.call(self, String( self.matrix.length ));
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
function appendRow(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null,
      newRow = [];
  newRow.push(label);
  if (typeof input === 'function') {
    each(self.matrix[0], function(label, i){
      var col, cell;
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
          appendColumn.call(self, String( self.matrix[0].length ));
        }
      });
    }
    self.matrix.push( newRow.concat(input) );
  }
  return self;
}
},{"../../utils/each":19,"../utils/create-null-list":10}],3:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'deleteColumn': deleteColumn,
  'deleteRow': deleteRow
};
function deleteColumn(q){
  var self = this,
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);
  if (index > -1) {
    each(self.matrix, function(row, i){
      self.matrix[i].splice(index, 1);
    });
  }
  return self;
}
function deleteRow(q){
  var index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    this.matrix.splice(index, 1);
  }
  return this;
}
},{"../../utils/each":19}],4:[function(require,module,exports){
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
},{"../../utils/each":19}],5:[function(require,module,exports){
var each = require('../../utils/each');
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  'insertColumn': insertColumn,
  'insertRow': insertRow
};
function insertColumn(index, str, input){
  var self = this, label;
  label = (str !== undefined) ? str : null;
  if (typeof input === 'function') {
    self.matrix[0].splice(index, 0, label);
    each(self.matrix, function(row, i){
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].splice(index, 0, cell);
      }
    });
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix.length - 1) {
      input = input.concat( createNullList(self.matrix.length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix.length -1 < input.length) {
          appendRow.call(self, String( self.matrix.length ));
        }
      });
    }
    self.matrix[0].splice(index, 0, label);
    each(input, function(value, i){
      self.matrix[i+1].splice(index, 0, value);
    });
  }
  return self;
}
function insertRow(index, str, input){
  var self = this, label, newRow = [];
  label = (str !== undefined) ? str : null;
  newRow.push(label);
  if (typeof input === 'function') {
    each(self.matrix[0], function(label, i){
      var col, cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.matrix.splice(index, 0, newRow);
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix[0].length -1 < input.length) {
          appendColumn.call(self, String( self.matrix[0].length ));
        }
      });
    }
    self.matrix.splice(index, 0, newRow.concat(input) );
  }
  return self;
}
},{"../../utils/each":19,"../utils/create-null-list":10,"./append":2}],6:[function(require,module,exports){
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
},{"../../utils/each":19}],7:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'sortColumns': sortColumns,
  'sortRows': sortRows
};
function sortColumns(str, comp){
  var self = this,
      head = this.matrix[0].slice(1),
      cols = [],
      clone = [],
      fn = comp || this.getColumnLabel;
  each(head, function(cell, i){
    cols.push(self.selectColumn(i+1).slice(0));
  });
  cols.sort(function(a,b){
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === 'asc' ? 1 : -1);
    } else if (!op) {
      return (str === 'asc' ? -1 : 1);
    } else {
      return 0;
    }
  });
  each(cols, function(col, i){
    self
      .deleteColumn(i+1)
      .insertColumn(i+1, col[0], col.slice(1));
  });
  return self;
}
function sortRows(str, comp){
  var self = this,
      head = this.matrix.slice(0,1),
      body = this.matrix.slice(1),
      fn = comp || this.getRowIndex;
  body.sort(function(a, b){
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
},{"../../utils/each":19}],8:[function(require,module,exports){
var each = require('../../utils/each');
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  'updateColumn': updateColumn,
  'updateRow': updateRow
};
function updateColumn(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);
  if (index > -1) {
    if (typeof input === 'function') {
      each(self.data(), function(row, i){
        var cell;
        if (i > 0) {
          cell = input.call(self, row[index], i, row);
          if (typeof cell !== 'undefined') {
            self.matrix[i][index] = cell;
          }
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.data().length - 1) {
        input = input.concat( createNullList(self.data().length - 1 - input.length) );
      }
      else {
        each(input, function(value, i){
          if (self.matrix.length -1 < input.length) {
            appendRow.call(self, String( self.matrix.length ));
          }
        });
      }
      each(input, function(value, i){
        self.matrix[i+1][index] = value;
      });
    }
  }
  return self;
}
function updateRow(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    if (typeof input === 'function') {
      each(self.data()[index], function(value, i){
        var col = self.selectColumn(i),
        cell = input.call(self, value, i, col);
        if (typeof cell !== 'undefined') {
          self.matrix[index][i] = cell;
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.matrix[0].length - 1) {
        input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
      }
      else {
        each(input, function(value, i){
          if (self.matrix[0].length -1 < input.length) {
            appendColumn.call(self, String( self.matrix[0].length ));
          }
        });
      }
      each(input, function(value, i){
        self.matrix[index][i+1] = value;
      });
    }
  }
  return self;
}
},{"../../utils/each":19,"../utils/create-null-list":10,"./append":2}],9:[function(require,module,exports){
var each = require('../../utils/each'),
    extend = require('../../utils/extend');
var helpers = {};
var methods = {
  'average': average,
  'maximum': maximum,
  'minimum': minimum,
  'sum': sum
};
function average(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0,
      avg = null;
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum / set.length;
}
function maximum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.max.apply(Math, nums);
}
function minimum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
}
function sum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0;
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
}
each(methods, function(method, name){
  var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  helpers['getColumn' + capitalized] = helpers['getRow' + capitalized] = function(arr){
    return this[name](arr, 1);
  };
});
helpers['getColumnLabel'] = helpers['getRowIndex'] = function(arr){
  return arr[0];
};
extend(methods, helpers);
module.exports = methods;
},{"../../utils/each":19,"../../utils/extend":20}],10:[function(require,module,exports){
module.exports = function(len){
  var list = new Array();
  for (i = 0; i < len; i++) {
    list.push(null);
  }
  return list;
};
},{}],11:[function(require,module,exports){
module.exports = flatten;
function flatten(ob){
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flatten(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
},{}],12:[function(require,module,exports){
var Dataset; /* injected */
var each = require('../../utils/each'),
    flatten = require('../utils/flatten');
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
    var dataset = new Dataset();
    return dataset.set(['Value', 'Result'], res.result);
  }
}
function parseInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    return dataset;
  }
}
function parseGroupedMetric(){
  return function(res){
    var dataset = new Dataset();
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
function parseGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset();
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
function parseDoubleGroupedMetric(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      dataset.set([ record[options[0][0]], record[options[0][1]] ], record.result);
    });
    return dataset;
  }
}
function parseDoubleGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset();
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
    var dataset = new Dataset();
    each(res.result, function(value, i){
      dataset.set( [ 'Step Value', res.steps[i].event_collection ], value );
    });
    return dataset;
  }
}
function parseList(){
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(value, i){
      dataset.set( [ 'Value', i+1 ], value );
    });
    return dataset;
  }
}
function parseExtraction(){
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      each(flatten(record), function(value, key){
        dataset.set([key, i+1], value);
      });
    });
    dataset.deleteColumn(0);
    return dataset;
  }
}
},{"../../utils/each":19,"../utils/flatten":11}],13:[function(require,module,exports){
var Dataset = require('./dataset');
var libraries = {
  'default': require('./libraries/default')()
};
var applyColorMapping = require('./utils/apply-color-mapping'),
    applyLabelMapping = require('./utils/apply-label-mapping'),
    applyLabels = require('./utils/apply-labels'),
    applySortGroups = require('./utils/apply-sort-groups'),
    each = require('./utils/each'),
    extend = require('./utils/extend');
function Dataviz(){
  this.dataset = new Dataset();
  this.view = {
    _prepared: false,
    _rendered: false,
    _artifacts: { /* state bin */ },
    chartOptions: {},
    colors: [ /*
      teal       red        yellow     purple     orange     mint       blue       green      lavender  */
      '#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb',
      '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e',
      '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'
    ],
    el: undefined,
    height: 400,
    indexBy: 'timeframe.start',
    library: 'default',
    notes: undefined,
    stacked: false,
    theme: 'keen-dataviz',
    title: undefined,
    type: undefined,
    width: undefined
  };
  Dataviz.visuals.push(this);
};
Dataviz.prototype.attributes = function(obj){
  if (!arguments.length) return this.view;
  var view = this.view;
  each(obj, function(prop, key){
    if (key === 'chartType') {
      key = 'type';
    }
    view[key] = prop;
  });
  return this;
};
Dataviz.prototype.call = function(fn){
  fn.call(this);
  return this;
};
Dataviz.prototype.chartOptions = function(obj){
  if (!arguments.length) return this.view.chartOptions;
  this.view.chartOptions = (obj ? obj : null);
  return this;
};
Dataviz.prototype.colors = function(arr){
  if (!arguments.length) return this.view.colors;
  this.view.colors = (arr instanceof Array ? arr : null);
  return this;
};
Dataviz.prototype.colorMapping = function(obj){
  if (!arguments.length) return this.view.colorMapping;
  this.view.colorMapping = (obj ? obj : null);
  return this;
};
Dataviz.prototype.data = function(data){
  if (!arguments.length) return this.dataset.output();
  if (data instanceof Dataset) {
    this.dataset = data;
  }
  else {
    this.parseRawData(data);
  }
  return this;
};
Dataviz.prototype.destroy = function(){
  var library = this.library(),
      type = this.type(),
      element = this.el();
  if (library && type && Dataviz.libraries[library][type].destroy) {
    Dataviz.libraries[library][type].destroy.apply(this, arguments);
  }
  if (element) {
    element.innerHTML = '';
  }
  this.view._prepared = false;
  this.view._rendered = false;
  this.view._artifacts = {};
  return this;
};
Dataviz.prototype.el = function(target){
  if (!arguments.length) return this.view.el;
  if (target) {
    if (target.nodeName) {
      this.view.el = target;
    }
    else if (document.querySelector) {
      this.view.el = document.querySelector(target);
    }
  }
  return this;
};
Dataviz.prototype.height = function(num){
  if (!arguments.length) return this.view['height'];
  this.view['height'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
  return this;
};
Dataviz.prototype.indexBy = function(str){
  if (!arguments.length) return this.view.indexBy;
  this.view.indexBy = (str ? String(str) : Dataviz.defaults.indexBy);
  return this;
};
Dataviz.prototype.labels = function(arr){
  if (!arguments.length) {
      return this.view.labels;
  }
  else {
    this.view.labels = (arr instanceof Array ? arr : null);
    return this;
  }
};
Dataviz.prototype.labelMapping = function(obj){
  if (!arguments.length) return this.view.labelMapping;
  this.view.labelMapping = (obj ? obj : null);
  return this;
};
Dataviz.prototype.library = function(str){
  if (!arguments.length) return this.view['library'];
  this.view['library'] = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.message = function(){
  return this;
};
Dataviz.prototype.notes = function(str){
  if (!arguments.length) return this.view['notes'];
  this.view['notes'] = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.parseRawData = function(obj){
  return this;
};
Dataviz.prototype.parseRequest = function(request){
  return this;
};
Dataviz.prototype.prepare = function(){
  var loader;
  if (this.view._rendered) {
    this.destroy();
  }
  if (this.el()) {
    this.el().innerHTML = '';
    loader = Dataviz.libraries['default'].spinner;
    if (loader.render) {
      loader.render.apply(this, arguments);
    }
    this.view._prepared = true;
  }
  return this;
};
Dataviz.prototype.render = function(){
  var loader = Dataviz.libraries['default'].spinner,
      library = this.library(),
      type = this.type(),
      element = this.el();
  if (this.view._prepared && loader.destroy) {
    loader.destroy.apply(this, arguments);
  }
  else if (this.el()) {
    this.el().innerHTML = '';
  }
  if (library && type && element && Dataviz.libraries[library][type].render) {
    Dataviz.libraries[library][type].render.apply(this, arguments);
    this.view._rendered = true;
  }
  return this;
};
Dataviz.prototype.sortGroups = function(str){
  if (!arguments.length) return this.view.sortGroups;
  this.view.sortGroups = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.sortInterval = function(str){
  if (!arguments.length) return this.view.sortInterval;
  this.view.sortInterval = (str ? String(str) : null);
  if (this.view.sortIntervals) {
    this.dataset.sortRows(this.view.sortIntervals);
  }
  return this;
};
Dataviz.prototype.stacked = function(bool){
  if (!arguments.length) return this.view['stacked'];
  this.view['stacked'] = bool ? true : false;
  return this;
};
Dataviz.prototype.theme = function(str){
  if (!arguments.length) return this.view.theme;
  this.view.theme = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.title = function(str){
  if (!arguments.length) return this.view['title'];
  this.view['title'] = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.type = function(str){
  if (!arguments.length) return this.view['type'];
  this.view['type'] = (str ? String(str) : null);
  return this;
};
Dataviz.prototype.update = function(){
  var library = this.library(),
      type = this.type(),
      element = this.el();
  if (library && type && element && Dataviz.libraries[library][type].update) {
    Dataviz.libraries[library][type].update.apply(this, arguments);
  }
  return;
};
Dataviz.prototype.width = function(num){
  if (!arguments.length) return this.view['width'];
  this.view['width'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
  return this;
};
Dataviz.prototype.chartType = Dataviz.prototype.type;
Dataviz.prototype.error = Dataviz.prototype.message;
extend(Dataviz, {
  libraries: libraries,
  visuals: []
});
Dataviz.register = function(name, actions){
  Dataviz.libraries[name] = Dataviz.libraries[name] || {};
  each(actions, function(method, key){
    Dataviz.libraries[name][key] = method;
  });
};
Dataviz.find = function(target){
  if (!arguments.length) return Dataviz.visuals;
  var el = target.nodeName ? target : document.querySelector(target),
      match = null;
  each(Dataviz.visuals, function(visual){
    if (el == visual.el()){
      match = visual;
      return false;
    }
  });
  return match;
};
module.exports = Dataviz;
},{"./dataset":1,"./libraries/default":14,"./utils/apply-color-mapping":15,"./utils/apply-label-mapping":16,"./utils/apply-labels":17,"./utils/apply-sort-groups":18,"./utils/each":19,"./utils/extend":20}],14:[function(require,module,exports){
var each = require('../utils/each'),
    extend = require('../utils/extend');
var types = {};
var c3Types = [
  'gauge',
  'donut',
  'pie',
  'bar',
  'area',
  'area-spline',
  'spline',
  'line',
  'step',
  'area-step'
];
function initialize(){
  defineC3();
  defineCustom();
  return types;
}
function defineC3(){
  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        var setup = getC3SetupTemplate.call(this, type);
        var options = extend(setup, this.chartOptions());
        this.view._artifacts['c3'] = c3.generate(options);
        this.update();
      },
      update: function(){
        var self = this, cols = [];
      },
      destroy: function(){
        if (this.view._artifacts['c3']) {
          this.view._artifacts['c3'].destroy();
          this.view._artifacts['c3'] = null;
        }
      }
    };
  });
}
function getC3SetupTemplate(type){
  var setup = {
    axis: {},
    bindto: this.el(),
    data: {
      columns: []
    },
    color: {
      pattern: this.colors()
    },
    size: {
      height: this.height(),
      width: this.width()
    }
  };
  setup['data']['type'] = type;
  return setup;
}
function defineCustom(){
}
module.exports = initialize;
},{"../utils/each":19,"../utils/extend":20}],15:[function(require,module,exports){
module.exports = applyColorMapping;
function applyColorMapping(){
}
},{}],16:[function(require,module,exports){
module.exports = applyLabelMapping;
function applyLabelMapping(){
}
},{}],17:[function(require,module,exports){
module.exports = applyLabels;
function applyLabels(){
}
},{}],18:[function(require,module,exports){
module.exports = applySortGroups;
function applySortGroups(){
  return;
}
},{}],19:[function(require,module,exports){
module.exports = each;
function each(o, cb, s){
  var n;
  if (!o){
    return 0;
  }
  s = !s ? o : s;
  if (o instanceof Array){
    for (n=0; n<o.length; n++) {
      if (cb.call(s, o[n], n, o) === false){
        return 0;
      }
    }
  } else {
    for (n in o){
      if (o.hasOwnProperty(n)) {
        if (cb.call(s, o[n], n, o) === false){
          return 0;
        }
      }
    }
  }
  return 1;
}
},{}],20:[function(require,module,exports){
module.exports = extend;
function extend(target){
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]){
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}
},{}]},{},[13]);
