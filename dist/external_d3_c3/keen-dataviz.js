(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("c3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "c3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3"), require("c3")) : factory(root["d3"], root["c3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return each; });
function each(o, cb, s) {
  var n;
  if (!o) {
    return 0;
  }
  s = !s ? o : s;
  if (o instanceof Array) {
    // Indexed arrays, needed for Safari
    for (n = 0; n < o.length; n++) {
      if (cb.call(s, o[n], n, o) === false) {
        return 0;
      }
    }
  } else {
    // Hashtables
    for (n in o) {
      if (o.hasOwnProperty(n)) {
        if (cb.call(s, o[n], n, o) === false) {
          return 0;
        }
      }
    }
  }
  return 1;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extend; });
function extend(target) {
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return escapeHtml; });
var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#39;';
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stripHtmlTags; });
/**
 * Strip html tags from string
 *
 * @param  {string} string The string to strip
 * @return {string}
 * @public
 */

function stripHtmlTags(inputString) {
  return inputString.replace(/(<([^>]+)>)/ig, '');
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var append_namespaceObject = {};
__webpack_require__.d(append_namespaceObject, "appendColumn", function() { return appendColumn; });
__webpack_require__.d(append_namespaceObject, "appendRow", function() { return appendRow; });
var delete_namespaceObject = {};
__webpack_require__.d(delete_namespaceObject, "deleteColumn", function() { return deleteColumn; });
__webpack_require__.d(delete_namespaceObject, "deleteRow", function() { return deleteRow; });
var filter_namespaceObject = {};
__webpack_require__.d(filter_namespaceObject, "filterColumns", function() { return filterColumns; });
__webpack_require__.d(filter_namespaceObject, "filterRows", function() { return filterRows; });
var insert_namespaceObject = {};
__webpack_require__.d(insert_namespaceObject, "insertColumn", function() { return insertColumn; });
__webpack_require__.d(insert_namespaceObject, "insertRow", function() { return insertRow; });
var select_namespaceObject = {};
__webpack_require__.d(select_namespaceObject, "selectColumn", function() { return selectColumn; });
__webpack_require__.d(select_namespaceObject, "selectRow", function() { return selectRow; });
var analyses_namespaceObject = {};
__webpack_require__.d(analyses_namespaceObject, "methods", function() { return methods; });
__webpack_require__.d(analyses_namespaceObject, "default", function() { return analyses; });
var sort_namespaceObject = {};
__webpack_require__.d(sort_namespaceObject, "sortColumns", function() { return sortColumns; });
__webpack_require__.d(sort_namespaceObject, "sortRows", function() { return sortRows; });
var update_namespaceObject = {};
__webpack_require__.d(update_namespaceObject, "updateColumn", function() { return updateColumn; });
__webpack_require__.d(update_namespaceObject, "updateRow", function() { return updateRow; });

// CONCATENATED MODULE: ./lib/dataset/utils/create-null-list.js
/* harmony default export */ var create_null_list = (function (len) {
  var list = [];
  for (var i = 0; i < len; i++) {
    list.push(null);
  }
  return list;
});
// EXTERNAL MODULE: ./lib/utils/each.js
var each = __webpack_require__(0);

// CONCATENATED MODULE: ./lib/dataset/modifiers/append.js



function appendColumn(str, input) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 2);
  var label = str !== undefined ? str : null;

  if (typeof input === 'function') {
    self.matrix[0].push(label);
    Object(each["a" /* each */])(self.matrix, function (row, i) {
      var cell = void 0;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].push(cell);
      }
    });
  } else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix.length - 1) {
      input = input.concat(create_null_list(self.matrix.length - 1 - input.length));
    } else {
      // If this new column is longer than existing columns,
      // we need to update the rest to match ...
      Object(each["a" /* each */])(input, function (value, i) {
        if (self.matrix.length - 1 < input.length) {
          appendRow.call(self, String(self.matrix.length));
        }
      });
    }

    self.matrix[0].push(label);
    Object(each["a" /* each */])(input, function (value, i) {
      self.matrix[i + 1][self.matrix[0].length - 1] = value;
    });
  }

  return self;
}

function appendRow(str, input) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 2);
  var label = str !== undefined ? str : null;
  var newRow = [];

  newRow.push(label);

  if (typeof input === 'function') {
    Object(each["a" /* each */])(self.matrix[0], function (label, i) {
      var col = void 0;
      var cell = void 0;
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
  } else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat(create_null_list(self.matrix[0].length - 1 - input.length));
    } else {
      Object(each["a" /* each */])(input, function (value, i) {
        if (self.matrix[0].length - 1 < input.length) {
          appendColumn.call(self, String(self.matrix[0].length));
        }
      });
    }

    self.matrix.push(newRow.concat(input));
  }

  return self;
}
// CONCATENATED MODULE: ./lib/dataset/modifiers/delete.js


function deleteColumn(q) {
  var self = this;
  var index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1) {
    Object(each["a" /* each */])(self.matrix, function (row, i) {
      self.matrix[i].splice(index, 1);
    });
  }
  return self;
}

function deleteRow(q) {
  var index = typeof q === 'number' ? q : this.selectColumn(0).indexOf(q);

  if (index > -1) {
    this.matrix.splice(index, 1);
  }
  return this;
}
// CONCATENATED MODULE: ./lib/dataset/modifiers/filter.js


function filterColumns(fn) {
  var self = this;
  var clone = [];

  Object(each["a" /* each */])(self.matrix, function (row, i) {
    clone.push([]);
  });

  Object(each["a" /* each */])(self.matrix[0], function (col, i) {
    var selectedColumn = self.selectColumn(i);
    if (i == 0 || fn.call(self, selectedColumn, i)) {
      Object(each["a" /* each */])(selectedColumn, function (cell, ri) {
        clone[ri].push(cell);
      });
    }
  });

  self.data(clone);
  return self;
}

function filterRows(fn) {
  var self = this;
  var clone = [];

  Object(each["a" /* each */])(self.matrix, function (row, i) {
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });

  self.data(clone);
  return self;
}
// CONCATENATED MODULE: ./lib/dataset/modifiers/insert.js




function insertColumn(index, str, input) {
  var self = this;
  var label = str !== undefined ? str : null;

  if (typeof input === 'function') {

    self.matrix[0].splice(index, 0, label);
    Object(each["a" /* each */])(self.matrix, function (row, i) {
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].splice(index, 0, cell);
      }
    });
  } else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix.length - 1) {
      input = input.concat(create_null_list(self.matrix.length - 1 - input.length));
    } else {
      // If this new column is longer than existing columns,
      // we need to update the rest to match ...
      Object(each["a" /* each */])(input, function (value, i) {
        if (self.matrix.length - 1 < input.length) {
          appendRow.call(self, String(self.matrix.length));
        }
      });
    }

    self.matrix[0].splice(index, 0, label);
    Object(each["a" /* each */])(input, function (value, i) {
      self.matrix[i + 1].splice(index, 0, value);
    });
  }
  return self;
}

function insertRow(index, str, input) {
  var self = this;
  var newRow = [];
  var label = str !== undefined ? str : null;
  newRow.push(label);

  if (typeof input === 'function') {
    Object(each["a" /* each */])(self.matrix[0], function (label, i) {
      var col = void 0;
      var cell = void 0;
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
  } else if (!input || input instanceof Array) {
    input = input || [];

    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat(create_null_list(self.matrix[0].length - 1 - input.length));
    } else {
      Object(each["a" /* each */])(input, function (value, i) {
        if (self.matrix[0].length - 1 < input.length) {
          appendColumn.call(self, String(self.matrix[0].length));
        }
      });
    }

    self.matrix.splice(index, 0, newRow.concat(input));
  }

  return self;
}
// CONCATENATED MODULE: ./lib/dataset/modifiers/select.js


function selectColumn(q) {
  var result = [];
  var index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1 && typeof this.matrix[0][index] !== 'undefined') {
    Object(each["a" /* each */])(this.matrix, function (row, i) {
      result.push(row[index]);
    });
  }
  return result;
}

function selectRow(q) {
  var result = [];
  var index = typeof q === 'number' ? q : this.selectColumn(0).indexOf(q);

  if (index > -1 && typeof this.matrix[index] !== 'undefined') {
    result = this.matrix[index];
  }
  return result;
}
// EXTERNAL MODULE: ./lib/utils/extend.js
var extend = __webpack_require__(1);

// CONCATENATED MODULE: ./lib/dataset/utils/analyses.js



var helpers = {};

function average(arr, start, end) {
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      sum = 0,
      avg = null;

  // Add numeric values
  Object(each["a" /* each */])(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum / set.length;
}

function maximum(arr, start, end) {
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      nums = [];

  // Pull numeric values
  Object(each["a" /* each */])(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.max.apply(Math, nums);
}

function minimum(arr, start, end) {
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      nums = [];

  // Pull numeric values
  Object(each["a" /* each */])(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
}

function analyses_sum(arr, start, end) {
  // Copy set with given range
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      sum = 0;

  // Add numeric values
  Object(each["a" /* each */])(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
}

// Convenience methods

Object(each["a" /* each */])(methods, function (method, name) {
  var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  helpers['getColumn' + capitalized] = helpers['getRow' + capitalized] = function (arr) {
    return this[name](arr, 1);
  };
});

helpers['getColumnLabel'] = helpers['getRowIndex'] = function (arr) {
  return arr[0];
};

var methods = {
  average: average,
  maximum: maximum,
  minimum: minimum,
  sum: analyses_sum
};

Object(extend["a" /* extend */])(methods, helpers);

/* harmony default export */ var analyses = ({ methods: methods });
// CONCATENATED MODULE: ./lib/dataset/modifiers/sort.js



function sortColumns(str, comp) {
  var self = this,
      head = this.matrix[0].slice(1),
      // minus index
  cols = [],
      clone = [],
      fn = comp || methods.getColumnLabel;

  // Isolate each column (except the index)
  Object(each["a" /* each */])(head, function (cell, i) {
    cols.push(self.selectColumn(i + 1).slice(0));
  });
  cols.sort(function (a, b) {
    // If fn(a) > fn(b)
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return str === 'asc' ? 1 : -1;
    } else if (!op) {
      return str === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  });
  Object(each["a" /* each */])(cols, function (col, i) {
    self.deleteColumn(i + 1).insertColumn(i + 1, col[0], col.slice(1));
  });
  return self;
}

function sortRows(str, comp) {
  var self = this,
      head = this.matrix.slice(0, 1),
      body = this.matrix.slice(1),
      fn = comp || methods.getRowIndex;
  body.sort(function (a, b) {
    // If fn(a) > fn(b)
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return str === 'asc' ? 1 : -1;
    } else if (!op) {
      return str === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  });
  self.data(head.concat(body));
  return self;
}
// CONCATENATED MODULE: ./lib/dataset/modifiers/update.js




function updateColumn(q, input) {
  var self = this,
      index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1) {

    if (typeof input === 'function') {

      Object(each["a" /* each */])(self.data(), function (row, i) {
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
        input = input.concat(create_null_list(self.data().length - 1 - input.length));
      } else {
        // If this new column is longer than existing columns,
        // we need to update the rest to match ...
        Object(each["a" /* each */])(input, function (value, i) {
          if (self.matrix.length - 1 < input.length) {
            appendRow.call(self, String(self.matrix.length));
          }
        });
      }

      Object(each["a" /* each */])(input, function (value, i) {
        self.matrix[i + 1][index] = value;
      });
    }
  }
  return self;
}

function updateRow(q, input) {
  var self = this,
      index = typeof q === 'number' ? q : this.selectColumn(0).indexOf(q);

  if (index > -1) {

    if (typeof input === 'function') {

      Object(each["a" /* each */])(self.data()[index], function (value, i) {
        var col = self.selectColumn(i),
            cell = input.call(self, value, i, col);
        if (typeof cell !== 'undefined') {
          self.matrix[index][i] = cell;
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];

      if (input.length <= self.matrix[0].length - 1) {
        input = input.concat(create_null_list(self.matrix[0].length - 1 - input.length));
      } else {
        Object(each["a" /* each */])(input, function (value, i) {
          if (self.matrix[0].length - 1 < input.length) {
            appendColumn.call(self, String(self.matrix[0].length));
          }
        });
      }

      Object(each["a" /* each */])(input, function (value, i) {
        self.matrix[index][i + 1] = value;
      });
    }
  }
  return self;
}
// CONCATENATED MODULE: ./lib/dataset/utils/flatten.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Pure awesomeness by Will Rayner (penguinboy)
// https://gist.github.com/penguinboy/762197

function flatten(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (_typeof(ob[i]) == 'object' && ob[i] !== null) {
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
// CONCATENATED MODULE: ./lib/dataset/utils/parsers.js
var Dataset = void 0; /* injected */




function initialize(lib) {
  Dataset = lib;
  return function (name) {
    var options = Array.prototype.slice.call(arguments, 1);

    if (!parsers[name]) {
      throw 'Requested parser does not exist';
    } else {
      return parsers[name].apply(this, options);
    }
  };
}

function parseMetric() {
  return function (res) {
    return new Dataset().set(['Value', 'Result'], res.result).type('metric');
  };
}

//var myParser = Dataset.parser('interval', 'timeframe.end');
function parseInterval() {
  var options = Array.prototype.slice.call(arguments);
  return function (res) {
    var dataset = new Dataset().type('interval');
    Object(each["a" /* each */])(res.result, function (record, i) {
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    return dataset;
  };
}

function parseGroupedMetric() {
  return function (res) {
    var dataset = new Dataset().type('grouped-metric');
    Object(each["a" /* each */])(res.result, function (record, i) {
      var label;
      Object(each["a" /* each */])(record, function (value, key) {
        if (key !== 'result') {
          label = key;
        }
      });
      dataset.set(['Result', String(record[label])], record.result);
    });
    return dataset;
  };
}

//var myParser = Dataset.parser('grouped-interval', 'timeframe.end');
function parseGroupedInterval() {
  var options = Array.prototype.slice.call(arguments);
  return function (res) {
    var dataset = new Dataset().type('grouped-interval');
    Object(each["a" /* each */])(res.result, function (record, i) {
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      if (record.value.length) {
        Object(each["a" /* each */])(record.value, function (group, j) {
          var label;
          Object(each["a" /* each */])(group, function (value, key) {
            if (key !== 'result') {
              label = key;
            }
          });
          dataset.set([String(group[label]), index], group.result);
        });
      } else {
        dataset.appendRow(index);
      }
    });
    return dataset;
  };
}

//var myParser = Dataset.parser('double-grouped-metric', ['first', 'second']);
function parseDoubleGroupedMetric() {
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function (res) {
    var dataset = new Dataset().type('double-grouped-metric');
    Object(each["a" /* each */])(res.result, function (record, i) {
      var rowLabel = record[options[0][0]] + ' ' + record[options[0][1]];
      dataset.set(['Result', rowLabel], record.result);
    });
    return dataset;
  };
}

//var myParser = Dataset.parser('double-grouped-interval', ['first', 'second'], 'timeframe.end');
function parseDoubleGroupedInterval() {
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function (res) {
    var dataset = new Dataset().type('double-grouped-interval');
    Object(each["a" /* each */])(res.result, function (record, i) {
      var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      Object(each["a" /* each */])(record['value'], function (value, j) {
        var label = value[options[0][0]] + ' ' + value[options[0][1]];
        dataset.set([label, index], value.result);
      });
    });
    return dataset;
  };
}

function parseFunnel() {
  return function (res) {
    var result, steps, dataset;
    if (typeof res.steps !== 'undefined' && typeof res.result !== 'undefined' && res.result instanceof Array) {
      // Ad-hoc funnel response
      result = res.result;
      steps = res.steps;
    } else if (typeof res.result.steps !== 'undefined' && typeof res.result.result !== 'undefined' && res.result.result instanceof Array) {
      // Saved funnel response
      result = res.result.result;
      steps = res.result.steps;
    }
    dataset = new Dataset().type('funnel');
    dataset.appendColumn('Step Value');
    Object(each["a" /* each */])(result, function (value, i) {
      if (typeof steps !== 'undefined' && steps[i]) {
        dataset.appendRow(String(steps[i].event_collection), [value]);
      }
    });
    return dataset;
  };
}

function parseList() {
  return function (res) {
    var dataset = new Dataset().type('list');
    Object(each["a" /* each */])(res.result, function (value, i) {
      dataset.set(['Result', String(i + 1)], value);
    });
    return dataset;
  };
}

function parseExtraction() {
  return function (res) {
    var dataset = new Dataset().type('extraction');
    Object(each["a" /* each */])(res.result, function (record, i) {
      Object(each["a" /* each */])(flatten(record), function (value, key) {
        dataset.set([key, String(i + 1)], value);
      });
    });
    dataset.deleteColumn(0);
    return dataset;
  };
}

// Parser definitions
var parsers = {
  metric: parseMetric,
  interval: parseInterval,
  'grouped-metric': parseGroupedMetric,
  'grouped-interval': parseGroupedInterval,
  'double-grouped-metric': parseDoubleGroupedMetric,
  'double-grouped-interval': parseDoubleGroupedInterval,
  funnel: parseFunnel,
  list: parseList,
  extraction: parseExtraction
};
// CONCATENATED MODULE: ./lib/dataset/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dataset_Dataset; });
// Modifiers








// Utils




var dataset_Dataset = function Dataset() {
  if (this instanceof Dataset === false) {
    return new Dataset();
  }

  this.matrix = [['Index']];
  this.meta = {
    type: undefined
  };
};

dataset_Dataset.prototype.data = function (arr) {
  if (!arguments.length) return this.matrix;
  this.matrix = arr instanceof Array ? arr : null;
  return this;
};

dataset_Dataset.prototype.set = function (coords, value) {
  if (arguments.length < 2 || coords.length < 2) {
    throw Error('Incorrect arguments provided for #set method');
  }

  var colIndex = 'number' === typeof coords[0] ? coords[0] : this.matrix[0].indexOf(coords[0]),
      rowIndex = 'number' === typeof coords[1] ? coords[1] : selectColumn.call(this, 0).indexOf(coords[1]);

  var colResult = selectColumn.call(this, coords[0]),
      rowResult = selectRow.call(this, coords[1]);

  // Column doesn't exist, create and reset colIndex
  if (colResult.length < 1) {
    appendColumn.call(this, String(coords[0]));
    colIndex = this.matrix[0].length - 1;
  }

  // Row doesn't exist, create and reset rowIndex
  if (rowResult.length < 1) {
    appendRow.call(this, String(coords[1]));
    rowIndex = this.matrix.length - 1;
  }

  // Set provided value
  this.matrix[rowIndex][colIndex] = value;
  return this;
};

dataset_Dataset.prototype.type = function (str) {
  if (!arguments.length) return this.meta['type'];
  this.meta['type'] = str ? String(str) : undefined;
  return this;
};

Object(extend["a" /* extend */])(dataset_Dataset.prototype, append_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, delete_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, filter_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, insert_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, select_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, sort_namespaceObject);
Object(extend["a" /* extend */])(dataset_Dataset.prototype, update_namespaceObject);

Object(extend["a" /* extend */])(dataset_Dataset.prototype, analyses_namespaceObject);
dataset_Dataset.parser = initialize(dataset_Dataset);

/* harmony default export */ var lib_dataset = __webpack_exports__["b"] = (dataset_Dataset);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export testObject */
/* unused harmony export testString */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function testObject(input) {
  if (input !== null && typeof input.getTime === 'function' && !isNaN(input.getTime())) {
    return true;
  }
  return false;
}

function testString(input) {
  var ISO_8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
  return ISO_8601.test(input);
}

/* harmony default export */ __webpack_exports__["a"] = (function (input) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    return testObject(input);
  } else if (typeof input === 'string') {
    return testString(input);
  }
  return false;
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "c3"
var external_c3_ = __webpack_require__(7);
var external_c3_default = /*#__PURE__*/__webpack_require__.n(external_c3_);

// EXTERNAL MODULE: external "d3"
var external_d3_ = __webpack_require__(3);
var external_d3_default = /*#__PURE__*/__webpack_require__.n(external_d3_);

// EXTERNAL MODULE: ./lib/utils/each.js
var each = __webpack_require__(0);

// EXTERNAL MODULE: ./lib/utils/extend.js
var extend = __webpack_require__(1);

// CONCATENATED MODULE: ./lib/utils/extend-deep.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



function extendDeep(target) {
  for (var i = 1; i < arguments.length; i++) {
    Object(each["a" /* each */])(arguments[i], function (prop, key) {
      if (typeof target[key] !== 'undefined' && typeof prop !== 'undefined' && _typeof(target[key]) === 'object' && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && target[key] !== null && prop !== null) {
        extendDeep(target[key], prop);
      } else {
        target[key] = prop;
      }
    });
  }
  return target;
}
// EXTERNAL MODULE: ./lib/utils/assert-date-string.js
var assert_date_string = __webpack_require__(6);

// CONCATENATED MODULE: ./lib/libraries/c3/extensions/default-date-format.js
/* harmony default export */ var default_date_format = (function (startDate, endDate) {
  var timeDiff = Math.abs(new Date(startDate).getTime() - new Date(endDate).getTime());
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  // Yearly (31536000000) + Monthly
  if (timeDiff >= 2419200000) {
    return function (ms) {
      var date = new Date(ms);
      return months[date.getMonth()] + ' ' + date.getFullYear();
    };
  }
  // Daily
  else if (timeDiff >= 86400000) {
      return function (ms) {
        var date = new Date(ms);
        return months[date.getMonth()] + ' ' + date.getDate();
      };
    }
    // Hourly
    else if (timeDiff >= 3600000) {
        return '%I:%M %p';
      }
      // Minutely
      else {
          return '%I:%M:%S %p';
        }
});
// CONCATENATED MODULE: ./lib/libraries/c3/extensions/paginating-legend.js




/* harmony default export */ var paginating_legend = (function (cols) {
  var self = this,
      chart = this.view._artifacts.c3,
      columns = [],
      domNode = this.el().querySelector('.' + this.theme() + '-rendering'),
      legendWidth = 120;

  var pagination = this.view._artifacts.pagination = {
    hidden: [],
    labels: [],
    position: 0,
    range: Math.round((domNode.offsetHeight - 78) / 20),
    total: 0
  };

  // Reduce threshold for donut/pie charts
  if (this.type() === 'donut' || this.type() === 'pie') {
    pagination.range = pagination.range >= 5 ? 5 : pagination.range;
  }

  for (var i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !Object(assert_date_string["a" /* default */])(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  var legendEl = external_d3_default.a.select(domNode).append('svg').attr({
    'class': 'keen-c3-legend',
    'height': domNode.offsetHeight - 10,
    'width': legendWidth
  }).style({
    'right': -legendWidth + 'px',
    'top': '10px'
  });

  var legendItems = legendEl.append('g').attr('class', 'keen-c3-legend-items');

  var paginateElOffset = 20 * pagination.range;
  var paginateEl = legendEl.append('g').attr({
    'class': 'keen-c3-legend-pagination',
    'transform': function transform() {
      return 'translate(2, ' + paginateElOffset + ')';
    }
  });

  paginateData();

  function paginateData() {
    pagination.labels = columns.slice(pagination.position, pagination.position + pagination.range);
    pagination.total = columns.length;
    renderLegendComponent.call(self, pagination.labels);
    if (pagination.total > pagination.range) {
      renderPaginationComponent.call(self);
    }
    chart.resize();
  }

  function renderLegendComponent() {
    legendItems.selectAll('g').remove();

    var legendItemList = legendItems.selectAll('g').data(pagination.labels);

    legendItemList.enter().append('g').attr('transform', function (id, i) {
      return 'translate(0, ' + 20 * i + ')';
    }).attr('data-id', function (id) {
      return id;
    }).style('opacity', function (id) {
      var isHidden = pagination.hidden.indexOf(id);
      return isHidden < 0 ? 1 : .35;
    }).each(function (id) {
      external_d3_default.a.select(this).append('text').attr({
        'font-size': 12,
        'pointer-events': 'none',
        'x': 15,
        'y': 9
      }).text(id).text(function (id) {
        if (external_d3_default.a.select(this).node().getBBox().width > 105) {
          return id.length <= 15 ? id : id.substring(0, 12) + '...';
        } else {
          return id;
        }
      });
      external_d3_default.a.select(this).append('rect').attr({
        'height': 14,
        'width': 110,
        'x': 0,
        'y': 0
      }).style({
        'cursor': 'pointer',
        'fill-opacity': 0
      });
      external_d3_default.a.select(this).append('rect').attr({
        'fill': chart.color(id),
        'height': 10,
        'pointer-events': 'none',
        'rx': 5,
        'ry': 5,
        'width': 10,
        'x': 0,
        'y': 0
      });
    }).on('mouseover', function (id, i) {
      chart.focus(id);
      // show a tooltip overlay w/ full value
      if (id.length > 15) {
        external_d3_default.a.select(domNode).append('div').attr('class', 'keen-c3-legend-label-overlay').style({
          'max-width': '75%',
          'right': -legendWidth + 'px',
          'top': 5 + (i + 1) * 20 + 'px'
        }).html(id).append('div').attr('class', 'keen-c3-legend-label-overlay-pointer');
      }
    }).on('mouseout', function (id) {
      chart.revert();
      // clear out the tooltip overlay
      external_d3_default.a.select(self.el().querySelector('.' + self.theme() + '-rendering .keen-c3-legend-label-overlay')).remove();
    }).on('click', function (id) {
      external_d3_default.a.select(this).style('opacity', function () {
        var isHidden = pagination.hidden.indexOf(id);
        if (isHidden < 0) {
          pagination.hidden.push(id);
          return .35;
        } else {
          pagination.hidden.splice(isHidden, 1);
          return 1;
        }
      });
      chart.toggle(id);
    });

    legendItemList.exit().remove();
  }

  function renderPaginationComponent() {
    paginateEl.selectAll('g').remove();

    paginateEl.selectAll('g').data([{ direction: 'reverse', path_d: 'M0 10 L10 0 L20 10 Z' }, { direction: 'forward', path_d: 'M0 0 L10 10 L20 0 Z' }]).enter().append('g').attr('transform', function (id, i) {
      return 'translate(' + i * 20 + ', 0)';
    }).each(function (id) {
      external_d3_default.a.select(this).append('path').attr('d', function (d) {
        return d.path_d;
      }).style({
        'cursor': 'pointer',
        'fill': '#D7D7D7',
        'stroke': 'none'
      }).on('mouseover', function (id) {
        external_d3_default.a.select(this).style('fill', '#4D4D4D');
      }).on('mouseout', function (id) {
        external_d3_default.a.select(this).style('fill', '#D7D7D7');
      }).on('click', function (d) {
        if (d.direction === 'forward') {
          if (pagination.position + pagination.range < pagination.total) {
            pagination.position = pagination.position + pagination.range;
          }
        } else {
          if (pagination.position - pagination.range >= 0) {
            pagination.position = pagination.position - pagination.range;
          }
        }
        paginateData();
        clearSelectedText();
      });
    });
  }

  function clearSelectedText() {
    var selection;
    if (document.selection && document.selection.empty) {
      selection = document.selection;
      selection.empty();
    } else if (window.getSelection) {
      selection = window.getSelection();
      selection.removeAllRanges();
    }
  }
});
// EXTERNAL MODULE: ./lib/utils/escape-html.js
var escape_html = __webpack_require__(2);

// CONCATENATED MODULE: ./lib/libraries/c3/extensions/tooltip-contents.js


/* harmony default export */ var tooltip_contents = (function (d, defaultTitleFormat, defaultValueFormat, color) {
  var bgcolor, name, nameFormat, text, title, titleFormat, value, valueFormat;

  // Set config options or defaults
  nameFormat = this.config.tooltip_format_name || function (name) {
    return name;
  };
  titleFormat = this.config.tooltip_format_title || defaultTitleFormat;
  valueFormat = this.config.tooltip_format_value || defaultValueFormat;

  // Reverse list to match legend
  for (var i = 0; i < d.length; i++) {
    if (!(d[i] && (d[i].value || d[i].value === 0))) {
      continue;
    }
    if (!text) {
      title = titleFormat ? titleFormat(d[i].x) : d[i].x;
      text = "<table class='" + this.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + Object(escape_html["a" /* escapeHtml */])(title) + "</th></tr>" : "");
    }
    name = nameFormat(d[i].name);
    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
    bgcolor = this.levelColor ? this.levelColor(d[i].value) : color(d[i].id);
    if (value) {
      text += "<tr class='" + this.CLASS.tooltipName + "-" + d[i].id + "'>";
      text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + Object(escape_html["a" /* escapeHtml */])(name) + "</td>";
      text += "<td class='value'>" + Object(escape_html["a" /* escapeHtml */])(value) + "</td>";
      text += "</tr>";
    }
  }
  return text + "</table>";
});
// CONCATENATED MODULE: ./lib/libraries/default/message.js


/* harmony default export */ var message = ({
  render: function render(text) {
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var msg = document.createElement('span');
    var height = this.height() || 140;

    var titleContainer = document.createElement('div');
    var notesContainer = document.createElement('div');

    outer.className = this.theme();
    inner.className = this.theme() + '-message';
    inner.style.width = this.width() + 'px';

    // Create title and notes for message
    titleContainer.className = this.theme() + '-title';
    titleContainer.innerHTML = Object(escape_html["a" /* escapeHtml */])(this.title() || '');
    notesContainer.className = this.theme() + '-notes';
    notesContainer.innerHTML = Object(escape_html["a" /* escapeHtml */])(this.notes() || '');

    msg.innerHTML = Object(escape_html["a" /* escapeHtml */])(text) || '';
    inner.appendChild(msg);
    outer.appendChild(titleContainer);
    outer.appendChild(inner);
    outer.appendChild(notesContainer);

    this.el().innerHTML = '';
    this.el().appendChild(outer);

    var actualInnerHeight = height - titleContainer.offsetHeight - notesContainer.offsetHeight;
    inner.style.height = actualInnerHeight + 'px';
    inner.style.paddingTop = actualInnerHeight / 2 - 12 + 'px';
  },
  update: function update() {
    // no special update handling
    this.render();
  },
  destroy: function destroy() {
    // no special clean-up
  }
});
// CONCATENATED MODULE: ./lib/utils/pretty-number.js
function prettyNumber(input) {
  // If it has 3 or fewer sig figs already, just return the number.
  var input = Number(input),
      sciNo = input.toPrecision(3),
      prefix = '',
      suffixes = ['', 'k', 'M', 'B', 'T'];

  if (Number(sciNo) == input && String(input).length <= 4) {
    return String(input);
  }

  if (Math.abs(input) >= 1000000000000000) {
    return sciNo;
  }

  if (input >= 1 || input <= -1) {
    if (input < 0) {
      //Pull off the negative side and stash that.
      input = -input;
      prefix = '-';
    }
    return prefix + recurse(input, 0);
  } else {
    return input.toPrecision(3);
  }

  function recurse(input, iteration) {
    var input = String(input);
    var split = input.split('.');
    // If there's a dot
    if (split.length > 1) {
      // Keep the left hand side only
      input = split[0];
      var rhs = split[1];
      // If the left-hand side is too short, pad until it has 3 digits
      if (input.length == 2 && rhs.length > 0) {
        // Pad with right-hand side if possible
        if (rhs.length > 0) {
          input = input + '.' + rhs.charAt(0);
        }
        // Pad with zeroes if you must
        else {
            input += '0';
          }
      } else if (input.length == 1 && rhs.length > 0) {
        input = input + '.' + rhs.charAt(0);
        // Pad with right-hand side if possible
        if (rhs.length > 1) {
          input += rhs.charAt(1);
        }
        // Pad with zeroes if you must
        else {
            input += '0';
          }
      }
    }
    var numNumerals = input.length;
    // if it has a period, then numNumerals is 1 smaller than the string length:
    if (input.split('.').length > 1) {
      numNumerals--;
    }
    if (numNumerals <= 3) {
      return String(input) + suffixes[iteration];
    } else {
      return recurse(Number(input) / 1000, iteration + 1);
    }
  }
}
// CONCATENATED MODULE: ./lib/libraries/default/metric.js



/* harmony default export */ var metric = ({
  render: function render() {
    var color = this.colors()[0],
        theme = this.theme(),
        title = this.title(),
        value = '-',
        height = this.height() || 140,
        width = this.width(),
        opts = this.chartOptions(),
        html = '',
        prefix = '',
        suffix = '',
        formattedNum,
        valueEl;

    if (typeof this.data()[1][1] === 'number') {
      value = this.data()[1][1];
    }

    formattedNum = value;
    if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(value))) {
      formattedNum = prettyNumber(value);
    }

    if (opts['prefix']) {
      prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
    }
    if (opts['suffix']) {
      suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
    }

    html += '<div class="' + theme + '">';
    html += '<div class="' + theme + '-metric" style="background-color: ' + color + '; width: ' + (width ? width + 'px' : 'auto') + ';" title="' + Object(escape_html["a" /* escapeHtml */])(value) + '">';
    html += '<span class="' + theme + '-metric-value">' + prefix + Object(escape_html["a" /* escapeHtml */])(formattedNum) + suffix + '</span>';
    if (title) {
      html += '<span class="' + theme + '-metric-title">' + Object(escape_html["a" /* escapeHtml */])(title) + '</span>';
    }
    html += '</div>';
    html += '</div>';

    this.el().innerHTML = html;
    valueEl = this.el().querySelector('.' + theme + '-metric-value');
    valueEl.style.paddingTop = (height - this.el().offsetHeight) / 2 + 'px';
    this.el().querySelector('.' + theme + '-metric').style.height = height + 'px';
  },
  update: function update() {
    // no special update handling
    this.render();
  },
  destroy: function destroy() {
    // no special clean-up
  }
});
// CONCATENATED MODULE: ./lib/libraries/default/table.js


var defaults = {
  height: undefined,
  width: undefined,
  stickyHeader: true,
  stickyFooter: false
};

function _generateTableRows(dataset, colWidths, colAligns) {
  var html = '';
  for (var i = 0; i < dataset.length; i++) {
    if (i > 0) {
      html += '<tr>';
      for (var j = 0; j < dataset[i].length; j++) {
        html += '<td style="min-width: ' + 10 * colWidths[j] + 'px; text-align: ' + colAligns[j] + ';">' + dataset[i][j] + '</td>';
      }
      html += '</tr>';
    }
  }
  return html;
}

/* harmony default export */ var table = ({
  render: function render() {
    var dataset = this.data(),
        el = this.el(),
        height = (this.height() || defaults.height) - this.el().offsetHeight,
        theme = this.theme(),
        width = this.width() || defaults.width;

    var html = '',
        colAligns = new Array(dataset[0].length),
        colWidths = new Array(dataset[0].length),
        fixedHeader;

    var isEmpty = dataset.length === 1 && dataset[0].length === 0;
    if (isEmpty) {
      this.message('No data to display');
      return;
    }

    // Calculate max column widths
    Object(each["a" /* each */])(dataset, function (row) {
      Object(each["a" /* each */])(row, function (cell, i) {
        if (!colWidths[i]) {
          colWidths[i] = 0;
        }
        colAligns[i] = typeof cell === 'number' ? 'right' : 'left';
        colWidths[i] = String(cell).length > colWidths[i] ? String(cell).length : colWidths[i];
      });
    });

    // Open wrapper
    html += '<div class="' + theme + '-table" style="height: ' + (height ? height + 'px' : 'auto') + '; width: ' + (width ? width + 'px' : 'auto') + ';">';

    // Static, scrollable table
    html += '<table class="' + theme + '-table-dataset">';
    html += '<thead>';
    html += '<tr>';
    for (var i = 0; i < dataset[0].length; i++) {
      html += '<th style="width: ' + 10 * colWidths[i] + 'px; text-align: ' + colAligns[i] + ';">' + dataset[0][i] + '</th>';
    }
    html += '</tr>';
    html += '</thead>';
    // Table data
    html += '<tbody>';
    html += _generateTableRows.bind(this, dataset, colWidths, colAligns)();
    html += '</tbody>';
    html += '</table>';

    // Fixed table (header)
    html += '<table class="' + theme + '-table-fixed-header">';
    html += '<thead>';
    html += '<tr>';
    for (var i = 0; i < dataset[0].length; i++) {
      html += '<th style="min-width: ' + 10 * colWidths[i] + 'px; text-align: ' + colAligns[i] + ';">' + dataset[0][i] + '</th>';
    }
    html += '</tr>';
    html += '</thead>';
    html += '</table>';

    // Close wrapper
    html += '</div>';

    // Inject HTML string
    el.querySelector('.' + theme + '-rendering').innerHTML = html;

    fixedHeader = el.querySelector('.' + theme + '-table-fixed-header');
    el.querySelector('.' + theme + '-table').onscroll = function (e) {
      fixedHeader.style.top = e.target.scrollTop + 'px';
    };
  },
  update: function update() {
    // no special update handling
    this.render();
  },
  destroy: function destroy() {
    var el = this.el().querySelector('.' + this.theme() + '-table');
    if (el && el.onscroll) {
      el.onscroll = undefined;
    }
  }
});
// CONCATENATED MODULE: ./lib/libraries/default/spinner.js
/* harmony default export */ var spinner = ({
  render: function render() {
    var html = '',
        artifacts = this.view._artifacts.spinner = {},
        height = this.height() || 35,
        offsetPadding = (height - 35) / 2,
        prefixes = ['webkit', 'Moz', 'ms', 'O'],
        radius = this.view._artifacts.radius = 0,
        spinner;

    // Build DOM element
    html += '<div class="' + this.theme() + '">';
    html += '<div class="keen-spinner-container" style="height: ' + height + 'px; padding-top: ' + offsetPadding + 'px;">';
    html += '<div class="keen-spinner-indicator"></div>';
    html += '</div>';
    html += '</div>';
    this.el().innerHTML = html;

    spinner = this.el().querySelector('.keen-spinner-indicator');
    if (spinner.style.animationName === undefined) {
      radius = 0;
      artifacts.interval = setInterval(function () {
        radius = radius === 350 ? 0 : radius + 10;
        for (var i = 0; i < prefixes.length; i++) {
          spinner.style[prefixes[i]] = 'rotate(' + artifacts.radius + 'deg)';
        }
      }, 15);
    }
  },
  update: function update() {
    // no special update handling
    this.render();
  },
  destroy: function destroy() {
    if (this.view._artifacts.spinner) {
      if (this.view._artifacts.spinner.interval) {
        clearInterval(this.view._artifacts.spinner.interval);
      }
      this.view._artifacts.spinner.radius = 0;
      try {
        delete this.view._artifacts.spinner;
      } catch (e) {
        this.view._artifacts.spinner = undefined;
      }
    }
    this.el().innerHTML = '';
  }
});
// CONCATENATED MODULE: ./lib/libraries/index.js
















var types = {
  message: message,
  metric: metric,
  table: table,
  spinner: spinner
};

/* harmony default export */ var libraries = __webpack_exports__["a"] = (function (lib) {
  var timer, delay;
  bindResizeListener(function () {
    if (timer) {
      clearTimeout(timer);
    }
    delay = lib.visuals.length > 12 ? 1000 : 250;
    timer = setTimeout(function () {
      Object(each["a" /* each */])(lib.visuals, function (chart) {
        if (chart.view._artifacts.c3) {
          chart.view._artifacts.c3.resize();
        }
      });
    }, delay);
  });

  defineC3();
  return types;
});;

function defineC3() {
  var c3Types = [
  // Standard types
  'area', 'area-spline', 'area-step', 'bar', 'donut', 'gauge', 'line', 'pie', 'step', 'spline',

  // Horizontal variant types
  'horizontal-area', 'horizontal-area-spline', 'horizontal-area-step', 'horizontal-bar', 'horizontal-line', 'horizontal-step', 'horizontal-spline'];

  function getDefaultOptions() {
    var DEFAULT_OPTIONS, ENFORCED_OPTIONS, options;

    DEFAULT_OPTIONS = {
      axis: {},
      color: {},
      data: {
        order: null
      },
      legend: {
        position: 'right',
        show: true
      },
      padding: {},
      point: {
        focus: {
          expand: {
            enabled: false
          }
        },
        r: 2,
        show: true
      },
      tooltip: {},
      transition: {
        duration: 0
      }
    };

    ENFORCED_OPTIONS = {
      bindto: this.el().querySelector('.' + this.theme() + '-rendering'),
      color: {
        pattern: this.colors()
      },
      data: {
        colors: Object(extend["a" /* extend */])({}, this.colorMapping()),
        columns: [],
        type: this.type().replace('horizontal-', '')
      },
      size: {
        height: this.height() ? this.height() - this.el().offsetHeight : 400,
        width: this.width()
      },
      tooltip: {}
    };

    // Apply chartOptions
    options = extendDeep({}, DEFAULT_OPTIONS, this.chartOptions());

    // Apply enforced options
    options = extendDeep(options, ENFORCED_OPTIONS);
    options.color.pattern = ENFORCED_OPTIONS.color.pattern;
    options.data.colors = ENFORCED_OPTIONS.data.colors;
    options.data.columns = ENFORCED_OPTIONS.data.columns;

    return options;
  }

  Object(each["a" /* each */])(c3Types, function (type, index) {
    types[type] = {
      render: function render() {
        var options = getDefaultOptions.call(this);

        if (this.data()[0].length === 1 || this.data().length === 1) {
          this.message('No data to display');
          return;
        }

        if (type === 'gauge') {
          // Accommodate a neat bug:
          options.legend.position = 'bottom';
          options.data.columns = [[this.title() || this.data()[1][0], this.data()[1][1]]];
        } else if (type === 'pie' || type === 'donut') {
          options.data.columns = this.data().slice(1);
        } else {

          // Apply formatting for horizontal variant types
          if (type.indexOf('horizontal-') > -1) {
            options.axis.rotated = type.indexOf('horizontal-') > -1;
          }

          if (Object(assert_date_string["a" /* default */])(this.data()[1][0])) {
            // TIMESERIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'timeseries';
            options.axis.x.tick = options.axis.x.tick || {
              format: this.dateFormat() || default_date_format(this.data()[1][0], this.data()[2] ? this.data()[2][0] : this.data()[1][0]),
              culling: { max: 5 }
            };

            options.data.columns[0] = [];
            Object(each["a" /* each */])(this.dataset.selectColumn(0), function (cell, i) {
              if (i > 0) {
                cell = new Date(cell);
              }
              options.data.columns[0][i] = cell;
            });
            options.data.columns[0][0] = 'x';
            options.data.x = 'x';
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [this.dataset.selectRow(0).slice(1)];
            }
          } else {
            // CATEGORIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'category';
            options.axis.x.categories = this.dataset.selectColumn(0).slice(1);
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [this.dataset.selectRow(0).slice(1)];
            }
          }

          if (this.data()[0].length === 2) {
            options.legend.show = false;
          }

          Object(each["a" /* each */])(this.data()[0], function (cell, i) {
            if (i > 0) {
              options.data.columns.push(this.dataset.selectColumn(i));
            }
          }.bind(this));
        }

        if (options.legend.show === true && options.legend.position === 'right' && ['gauge'].indexOf(type.replace('horizontal-', ''))) {

          // Apply custom color handling
          options.data.color = c3CustomDataMapping.bind(this);

          // Apply custom tooltip
          options.tooltip = {
            contents: tooltip_contents,
            format: {
              value: c3CustomTooltipFiltering.bind(this)
            }
          };

          options.legend.show = false;
          var paddedWidth = this.el().querySelector('.' + this.theme() + '-rendering').offsetWidth - 100;
          options.size.width = options.size.width || paddedWidth;
          this.el().querySelector('.' + this.theme() + '-rendering').setAttribute('style', 'margin-right: 120px;');

          // Render artifacts
          this.view._artifacts['c3'] = external_c3_default.a.generate(options);
          paginating_legend.call(this, options.data.columns);
        } else {
          options.legend.show = false;
          this.view._artifacts['c3'] = external_c3_default.a.generate(options);
        }
      },
      update: function update() {
        // no special update handling
        this.render();
      },
      destroy: function destroy() {
        if (this.view._artifacts['c3']) {
          this.view._artifacts['c3'].destroy();
          this.view._artifacts['c3'] = null;
        }
      }
    };
  });
}

function c3CustomDataMapping(color, d) {
  var scope;
  if (this.view._artifacts.pagination && this.type() !== 'gauge'
  /*&& this.type() !== 'pie'
    && this.type() !== 'donut'*/) {
      scope = this.view._artifacts.pagination.labels;
      if (d.id && scope.indexOf(d.id) > -1 || d && !d.id && scope.indexOf(d) > -1) {
        return color;
      } else {
        if (this.type() === 'donut' || this.type() === 'pie') {
          return 'rgba(0,0,0,.1)';
        } else {
          return 'rgba(0,0,0,.07)';
        }
      }
    } else {
    return color;
  }
}

function c3CustomTooltipFiltering(value, ratio, id, index) {
  var scope;
  if (this.view._artifacts.pagination && this.type() !== 'gauge'
  /*&& this.type() !== 'pie'
    && this.type() !== 'donut'*/) {
      scope = this.view._artifacts.pagination.labels;
      if (scope.indexOf(id) > -1) {
        return value;
      }
    } else {
    return value;
  }
}

function bindResizeListener(fn) {
  if ('undefined' === typeof window) return;
  window.onresize = window.resize = function () {};
  if (window.addEventListener) {
    window.addEventListener('resize', fn, true);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', fn);
  }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




/* harmony default export */ __webpack_exports__["a"] = (function (data) {
  if (!arguments.length) return this.dataset.data();
  if (data instanceof _dataset__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"]) {
    this.dataset = data;
    return this;
  } else {
    return parseResponse.call(this, data);
  }
});;

function parseResponse(response) {
  var dataset,
      indexBy,
      meta,
      parser,
      parserArgs = [],
      query,
      selectedParser,
      title,
      type;

  indexBy = this.indexBy() ? this.indexBy() : 'timestamp.start';
  meta = response.metadata || {};
  query = typeof response.query !== 'undefined' ? response.query : {};

  // Ensure all required params are present
  query = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* extend */ "a"])({
    analysis_type: null,
    event_collection: null,
    filters: [],
    group_by: null,
    interval: null,
    timeframe: null,
    timezone: null
  }, query);

  if (query.analysis_type === 'funnel') {
    parser = 'funnel';
  } else if (query.analysis_type === 'extraction') {
    parser = 'extraction';
  } else if (query.analysis_type === 'select_unique') {
    if (!query.group_by && !query.interval) {
      parser = 'list';
    }
    // else { Not supported }
  } else if (query.analysis_type) {
    if (!query.group_by && !query.interval) {
      parser = 'metric';
    } else if (query.group_by && !query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-metric';
        parserArgs.push(query.group_by);
      } else {
        parser = 'grouped-metric';
      }
    } else if (query.interval && !query.group_by) {
      parser = 'interval';
      parserArgs.push(indexBy);
    } else if (query.group_by && query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-interval';
        parserArgs.push(query.group_by);
        parserArgs.push(indexBy);
      } else {
        parser = 'grouped-interval';
        parserArgs.push(indexBy);
      }
    }
  }

  if (!parser) {

    // Metric
    // -------------------------------
    if (typeof response.result === 'number') {
      parser = 'metric';
    }

    // Everything else
    // -------------------------------
    if (response.result instanceof Array && response.result.length > 0) {

      // Interval w/ single value
      // -------------------------------
      if (response.result[0].timeframe && (typeof response.result[0].value == 'number' || response.result[0].value == null)) {
        parser = 'interval';
        parserArgs.push(indexBy);
      }

      // Static GroupBy
      // -------------------------------
      if (typeof response.result[0].result == 'number') {
        parser = 'grouped-metric';
      }

      // Grouped Interval
      // -------------------------------
      if (response.result[0].value instanceof Array) {
        parser = 'grouped-interval';
        parserArgs.push(indexBy);
      }

      // Funnel
      // -------------------------------
      if (typeof response.result[0] === 'number' && typeof response.steps !== 'undefined') {
        parser = 'funnel';
        // Move steps into query object
        query.steps = response.steps;
      }

      // Select Unique
      // -------------------------------
      if ((typeof response.result[0] === 'string' || typeof response.result[0] == 'number') && typeof response.steps === 'undefined') {
        parser = 'list';
      }

      // Extraction
      // -------------------------------
      if (!parser) {
        parser = 'extraction';
      }
    }
  }

  // Set title from saved query body, or create a default title
  if (!this.title()) {
    if (meta.display_name) {
      title = meta.display_name;
    } else {
      title = getDefaultTitle(query);
    }
    this.title(title);
  }

  // Set type from saved query body, or use a default type
  if (!this.type()) {
    if (meta.visualization && meta.visualization.chart_type) {
      type = meta.visualization.chart_type;
    } else {
      type = getDefaultType(parser);
    }
    this.type(type);
  }

  // Define the appropriate parser
  selectedParser = _dataset__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"].parser.apply(this, [parser].concat(parserArgs));

  // Parse the response with augmented query body
  dataset = selectedParser(Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* extend */ "a"])(response, { 'query': query }));

  // Set true dates for 'interval' data
  if (parser.indexOf('interval') > -1) {
    dataset.updateColumn(0, function (value, i) {
      return new Date(value);
    });
  }

  dataset.updateRow(0, function (value, i) {
    return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_2__[/* stripHtmlTags */ "a"])(value);
  });

  this.dataset = dataset;

  return this;
}

function getDefaultTitle(query) {
  var analysis = query.analysis_type ? query.analysis_type.replace('_', ' ') : '',
      title;

  title = analysis.replace(/\b./g, function (a) {
    return a.toUpperCase();
  });

  if (query.event_collection) {
    title += ' - ' + query.event_collection;
  }
  return title;
}

function getDefaultType(parser) {
  var type = void 0;
  switch (parser) {
    case 'metric':
      type = 'metric';
      break;
    case 'interval':
      type = 'area';
      break;
    case 'grouped-metric':
    case 'double-grouped-metric':
      type = 'bar';
      break;
    case 'grouped-interval':
    case 'double-grouped-interval':
      type = 'line';
      break;
    case 'funnel':
      type = 'horizontal-bar';
      break;
    case 'list':
    case 'extraction':
    default:
      type = 'table';
  }
  return type;
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(13);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(11)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dataviz", function() { return Dataviz; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _utils_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _utils_assert_date_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _utils_escape_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _libraries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _style_keen_dataviz_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _style_keen_dataviz_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_keen_dataviz_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dataset", function() { return _dataset__WEBPACK_IMPORTED_MODULE_1__["a"]; });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



// Utils








// Constructor
var Dataviz = function Dataviz() {
  if (this instanceof Dataviz === false) {
    return new Dataviz();
  }

  this.dataset = new _dataset__WEBPACK_IMPORTED_MODULE_1__[/* Dataset */ "a"]();
  this.view = {
    _prepared: false,
    _rendered: false,
    _artifacts: {/* state bin */},

    chartOptions: {},
    colors: ['#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb', '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e', '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'],
    colorMapping: {},
    dateFormat: undefined,
    el: undefined,
    height: undefined,
    indexBy: 'timeframe.start',
    labels: [],
    labelMapping: {},
    library: 'default',
    notes: undefined,
    sortGroups: undefined,
    sortIntervals: undefined,
    stacked: false,
    theme: 'keen-dataviz',
    title: undefined,
    type: undefined,
    width: undefined
  };

  Dataviz.visuals.push(this);
};

Dataviz.libraries = { default: {} };
if (typeof window !== 'undefined') {
  Dataviz.libraries.default = Object(_libraries__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(Dataviz);
}
Dataviz.visuals = [];

Dataviz.register = function (name, actions) {
  Dataviz.libraries[name] = Dataviz.libraries[name] || {};
  Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(actions, function (method, key) {
    Dataviz.libraries[name][key] = method;
  });
};

Dataviz.find = function (target) {
  if (!arguments.length) return Dataviz.visuals;
  var el = target.nodeName ? target : document.querySelector(target),
      match = null;
  Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(Dataviz.visuals, function (visual) {
    if (el == visual.el()) {
      match = visual;
      return false;
    }
  });
  return match;
};

// Prototype
// ------------

Dataviz.prototype.attributes = function (obj) {
  if (!arguments.length) return this.view;
  var view = this.view;
  Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(obj, function (prop, key) {
    // Handle deprecated property names
    if (key === 'chartType') {
      key = 'type';
    }
    view[key] = prop;
  });
  return this;
};

Dataviz.prototype.call = function (fn) {
  fn.call(this);
  return this;
};

Dataviz.prototype.chartOptions = function (obj) {
  var self = this;
  if (!arguments.length) return this.view.chartOptions;
  if (obj === null) {
    this.view.chartOptions = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(obj, function (value, key) {
      self.view.chartOptions[key] = value ? value : null;
    });
  }
  return this;
};

Dataviz.prototype.colors = function (arr) {
  if (!arguments.length) return this.view.colors;
  this.view.colors = arr instanceof Array ? arr : [];
  return this;
};

Dataviz.prototype.colorMapping = function (obj) {
  var self = this;
  if (!arguments.length) return this.view.colorMapping;
  if (obj === null) {
    this.view.colorMapping = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(obj, function (value, key) {
      self.view.colorMapping[key] = value ? value : null;
    });
  }
  return this;
};

Dataviz.prototype.data = _data__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

Dataviz.prototype.dateFormat = function (val) {
  if (!arguments.length) return this.view.dateFormat;
  if (typeof val === 'string' || typeof val === 'function') {
    this.view.dateFormat = val;
  } else {
    this.view.dateFormat = undefined;
  }
  return this;
};

Dataviz.prototype.destroy = function () {
  var library = this.library(),
      type = this.type(),
      element = this.el();

  // Call destroy method if present
  if (Dataviz.libraries[library] && Dataviz.libraries[library][type]) {
    Dataviz.libraries[library][type].destroy.call(this);
  }

  // Clear rendered artifacts, state bin
  if (element) {
    element.innerHTML = '';
  }
  this.view._prepared = false;
  this.view._rendered = false;
  this.view._artifacts = {};
  return this;
};

Dataviz.prototype.el = function (target) {
  var self = this;
  if (!arguments.length) return this.view.el;
  domReady(function () {
    if (target && target !== null) {
      if (target.nodeName) {
        self.view.el = target;
      } else if (document.querySelector) {
        self.view.el = document.querySelector(target);
      }
    } else {
      self.view.el = undefined;
    }
  });
  return this;
};

Dataviz.prototype.height = function (num) {
  if (!arguments.length) return this.view['height'];
  this.view['height'] = !isNaN(parseInt(num)) ? parseInt(num) : null;
  return this;
};

// IMPORTANT: Must be run before data parsing
Dataviz.prototype.indexBy = function (str) {
  if (!arguments.length) return this.view.indexBy;
  this.view.indexBy = str ? String(str) : 'timeframe.start';
  return this;
};

Dataviz.prototype.labels = function (arr) {
  if (!arguments.length) return this.view.labels;
  this.view.labels = arr instanceof Array ? arr : [];

  // Write labels
  if (this.data()[0].length === 2 && !Object(_utils_assert_date_string__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this.data()[1][0])) {
    this.dataset.updateColumn(0, function (value, index) {
      if (this.view.labels[index - 1]) {
        return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(String(this.view.labels[index - 1]));
      }
      return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(value);
    }.bind(this));
  } else {
    this.dataset.updateRow(0, function (value, index) {
      if (index > 0 && this.view.labels[index - 1]) {
        return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(String(this.view.labels[index - 1]));
      }
      return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(value);
    }.bind(this));
  }
  return this;
};

Dataviz.prototype.labelMapping = function (obj) {
  if (!arguments.length) return this.view.labelMapping;
  if (obj === null) {
    this.view.labelMapping = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    Object(_utils_each__WEBPACK_IMPORTED_MODULE_2__[/* each */ "a"])(obj, function (value, key) {
      this.view.labelMapping[key] = value ? value : null;
    }.bind(this));
  }

  // Write labels
  if (this.data()[0].length === 2 && !Object(_utils_assert_date_string__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this.data()[1][0])) {
    this.dataset.updateColumn(0, function (value) {
      if (this.view.labelMapping[value]) {
        return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(String(this.view.labelMapping[value]));
      }
      return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(value);
    }.bind(this));
  } else {
    this.dataset.updateRow(0, function (value) {
      if (this.view.labelMapping[value]) {
        return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(String(this.view.labelMapping[value]));
      }
      return Object(_utils_strip_html_tags__WEBPACK_IMPORTED_MODULE_4__[/* stripHtmlTags */ "a"])(value);
    }.bind(this));
  }
  return this;
};

Dataviz.prototype.library = function (str) {
  if (!arguments.length) return this.view['library'];
  this.view['library'] = str ? String(str) : null;
  return this;
};

Dataviz.prototype.message = function () {
  var loader;
  if (this.view._rendered) {
    this.destroy();
  }
  if (this.el()) {
    this.el().innerHTML = '';
    var message = Dataviz.libraries['default'].message;
    if (message.render) {
      message.render.apply(this, arguments);
    }
  }
  return this;
};

Dataviz.prototype.notes = function (str) {
  if (!arguments.length) return this.view['notes'];
  this.view['notes'] = str ? String(str) : null;
  return this;
};

Dataviz.prototype.prepare = function () {
  var self = this,
      loader;

  if (!this.el()) {
    throw 'A DOM element is required. Check out the .el() method.';
    return;
  }

  domReady(function () {
    if (self.view._rendered) {
      self.destroy();
    }
    if (self.el()) {
      self.el().innerHTML = '';
      loader = Dataviz.libraries['default'].spinner;
      if (loader.render) {
        loader.render.call(self);
      }
      self.view._prepared = true;
    }
  });
  return this;
};

Dataviz.prototype.render = function () {
  var self = this,
      loader = Dataviz.libraries['default'].spinner,
      library = this.library(),
      type = this.type(),
      element = this.el();

  if (!this.el()) {
    this.message('A DOM element is required. Check out the .el() method.');
    throw 'A DOM element is required. Check out the .el() method.';
    return;
  }

  if (!this.type()) {
    this.message('A chart type is required. Check out the .type() method.');
    throw 'A chart type is required. Check out the .type() method.';
    return;
  }

  domReady(function () {
    if (self.view._prepared && loader.destroy) {
      loader.destroy.apply(self, arguments);
    }
    self.el().innerHTML = '';

    if (Dataviz.libraries[library] === 'undefined') {
      // Error: Unregistered library
      self.message('Incorrect library');
      throw 'Incorrect library';
      return;
    } else {
      if (typeof Dataviz.libraries[library][type] === 'undefined') {
        self.message('Incorrect chart type');
        throw 'Incorrect chart type';
        return;
      } else {
        buildDomWrapper(self.el(), {
          notes: self.notes(),
          theme: self.theme(),
          title: self['title']()
        });
        Dataviz.libraries[library][type].render.call(self);
        self.view._rendered = true;
      }
    }
  });
  return this;
};

Dataviz.prototype.sortGroups = function (str) {
  if (!arguments.length) return this.view.sortGroups;
  this.view.sortGroups = str ? String(str) : null;

  // Sort groups
  if (this.view.sortGroups && this.data().length > 1) {
    if (Object(_utils_assert_date_string__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this.data()[1][0])) {
      this.dataset.sortColumns(this.view.sortGroups, this.dataset.getColumnSum);
    } else {
      this.dataset.sortRows(this.view.sortGroups, this.dataset.getRowSum);
    }
  }
  return this;
};

Dataviz.prototype.sortIntervals = function (str) {
  if (!arguments.length) return this.view.sortIntervals;
  this.view.sortIntervals = str ? String(str) : null;
  if (this.view.sortIntervals) {
    this.dataset.sortRows(this.view.sortIntervals);
  }
  return this;
};

Dataviz.prototype.stacked = function (bool) {
  if (!arguments.length) return this.view['stacked'];
  this.view['stacked'] = bool ? true : false;
  return this;
};

Dataviz.prototype.theme = function (str) {
  if (!arguments.length) return this.view.theme;
  this.view.theme = str ? String(str) : null;
  return this;
};

Dataviz.prototype.title = function (str) {
  if (!arguments.length) return this.view['title'];
  this.view['title'] = str ? String(str) : null;
  return this;
};

Dataviz.prototype.type = function (str) {
  if (!arguments.length) return this.view['type'];
  this.view['type'] = str ? convertChartTypes(str) : null;
  return this;
};

Dataviz.prototype.update = function () {
  var library = this.library(),
      type = this.type(),
      element = this.el();
  if (library && type && element && Dataviz.libraries[library][type].update) {
    Dataviz.libraries[library][type].update.apply(this, arguments);
  }
  return this;
};

Dataviz.prototype.width = function (num) {
  if (!arguments.length) return this.view['width'];
  this.view['width'] = !isNaN(parseInt(num)) ? parseInt(num) : null;
  return this;
};

// Deprecations
Dataviz.prototype.chartType = Dataviz.prototype.type;
Dataviz.prototype.error = Dataviz.prototype.message;
Dataviz.prototype.parseRawData = Dataviz.prototype.data;
Dataviz.prototype.parseRequest = function () {
  // this.emit('error', 'This method is no longer supported. Use .data() instead: https://github.com/keen/keen-dataviz.js#data');
  return this;
};
Dataviz.prototype.initialize = function () {
  // this.emit('error', 'This method is no longer supported, and can be omitted as it has no impact');
  return this;
};

// Private
// ------------

function buildDomWrapper(el, options) {
  var html = '';
  html += '<div class="' + options.theme + '">';
  if (options['title']) {
    html += '<div class="' + options.theme + '-title">' + Object(_utils_escape_html__WEBPACK_IMPORTED_MODULE_5__[/* escapeHtml */ "a"])(options['title']) + '</div>';
  }
  html += '<div class="' + options.theme + '-stage"><div class="' + options.theme + '-rendering"></div></div>';
  if (options.notes) {
    html += '<div class="' + options.theme + '-notes">' + Object(_utils_escape_html__WEBPACK_IMPORTED_MODULE_5__[/* escapeHtml */ "a"])(options.notes) + '</div>';
  }
  html += '</div>';
  el.innerHTML = html;
}

function convertChartTypes(str) {
  var map = {
    areachart: 'area',
    barchart: 'horizontal-bar',
    columnchart: 'bar',
    linechart: 'line',
    piechart: 'pie'
  };
  return map[str] || str;
}

function testDom(fn) {
  if (/in/.test(document.readyState)) {
    setTimeout(function () {
      testDom(fn);
    }, 9);
  } else {
    fn();
  }
}

function domReady(fn) {
  if (typeof document !== 'undefined' || typeof window === 'undefined') {
    fn();
    return;
  }
  // Firefox 3.5 shim
  if (document.readyState == null && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function DOMContentLoaded() {
      document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
      document.readyState = 'complete';
    }, false);
    document.readyState = 'loading';
  }
  testDom(fn);
}

if (typeof __KEEN_NO_COMMON_GLOBAL_OBJECT__ === 'undefined') {
  (function (env) {
    env.Keen = env.Keen || {};
    env.Keen.Dataset = _dataset__WEBPACK_IMPORTED_MODULE_1__[/* Dataset */ "a"];
    env.Keen.Dataviz = Dataviz;
  }).call(undefined, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
}



/* harmony default export */ __webpack_exports__["default"] = (Dataviz);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-dataviz.js.map