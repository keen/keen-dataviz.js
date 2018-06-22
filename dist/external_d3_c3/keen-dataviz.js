(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("c3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "c3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3"), require("c3")) : factory(root["d3"], root["c3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__19__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeHtml = escapeHtml;
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
function extend(target) {
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.testObject = testObject;
exports.testString = testString;

exports.default = function (input) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    return testObject(input);
  } else if (typeof input === 'string') {
    return testString(input);
  }
  return false;
};

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (len) {
  var list = [];
  for (var i = 0; i < len; i++) {
    list.push(null);
  }
  return list;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendColumn = appendColumn;
exports.appendRow = appendRow;

var _createNullList = __webpack_require__(4);

var _createNullList2 = _interopRequireDefault(_createNullList);

var _each = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendColumn(str, input) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 2);
  var label = str !== undefined ? str : null;

  if (typeof input === 'function') {
    self.matrix[0].push(label);
    (0, _each.each)(self.matrix, function (row, i) {
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
      input = input.concat((0, _createNullList2.default)(self.matrix.length - 1 - input.length));
    } else {
      // If this new column is longer than existing columns,
      // we need to update the rest to match ...
      (0, _each.each)(input, function (value, i) {
        if (self.matrix.length - 1 < input.length) {
          appendRow.call(self, String(self.matrix.length));
        }
      });
    }

    self.matrix[0].push(label);
    (0, _each.each)(input, function (value, i) {
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
    (0, _each.each)(self.matrix[0], function (label, i) {
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
      input = input.concat((0, _createNullList2.default)(self.matrix[0].length - 1 - input.length));
    } else {
      (0, _each.each)(input, function (value, i) {
        if (self.matrix[0].length - 1 < input.length) {
          appendColumn.call(self, String(self.matrix[0].length));
        }
      });
    }

    self.matrix.push(newRow.concat(input));
  }

  return self;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripHtmlTags = stripHtmlTags;
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = __webpack_require__(0);

var _extend = __webpack_require__(2);

function average(arr, start, end) {
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      sum = 0,
      avg = null;

  // Add numeric values
  (0, _each.each)(set, function (val, i) {
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
  (0, _each.each)(set, function (val, i) {
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
  (0, _each.each)(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
}

function sum(arr, start, end) {
  // Copy set with given range
  var set = arr.slice(start || 0, end ? end + 1 : arr.length),
      sum = 0;

  // Add numeric values
  (0, _each.each)(set, function (val, i) {
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
}

var getColumnAverage = function getColumnAverage(arr) {
  return average(arr, 1);
};
var getRowAverage = getColumnAverage;

var getColumnSum = function getColumnSum(arr) {
  return sum(arr, 1);
};
var getRowSum = getColumnSum;

var getColumnMaximum = function getColumnMaximum(arr) {
  return maximum(arr, 1);
};
var getRowMaximum = getColumnMaximum;

var getColumnMinimum = function getColumnMinimum(arr) {
  return minimum(arr, 1);
};
var getRowMinimum = getColumnMinimum;

var getColumnLabel = function getColumnLabel(arr) {
  return arr[0];
};
var getRowIndex = getColumnLabel;

exports.default = {
  average: average,
  maximum: maximum,
  minimum: minimum,
  sum: sum,
  getColumnAverage: getColumnAverage,
  getRowAverage: getRowAverage,
  getColumnSum: getColumnSum,
  getRowSum: getRowSum,
  getColumnMaximum: getColumnMaximum,
  getRowMaximum: getRowMaximum,
  getColumnMinimum: getColumnMinimum,
  getRowMinimum: getRowMinimum,
  getColumnLabel: getColumnLabel,
  getRowIndex: getRowIndex
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = undefined;

var _append = __webpack_require__(5);

var append = _interopRequireWildcard(_append);

var _delete = __webpack_require__(30);

var del = _interopRequireWildcard(_delete);

var _filter = __webpack_require__(29);

var filter = _interopRequireWildcard(_filter);

var _insert = __webpack_require__(28);

var insert = _interopRequireWildcard(_insert);

var _select = __webpack_require__(27);

var select = _interopRequireWildcard(_select);

var _sort = __webpack_require__(26);

var sort = _interopRequireWildcard(_sort);

var _update = __webpack_require__(25);

var update = _interopRequireWildcard(_update);

var _analyses = __webpack_require__(8);

var _analyses2 = _interopRequireDefault(_analyses);

var _extend = __webpack_require__(2);

var _parsers = __webpack_require__(24);

var _parsers2 = _interopRequireDefault(_parsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Modifiers
var Dataset = exports.Dataset = function Dataset() {
  if (this instanceof Dataset === false) {
    return new Dataset();
  }

  this.matrix = [['Index']];
  this.meta = {
    type: undefined
  };
};

// Utils


Dataset.prototype.data = function (arr) {
  if (!arguments.length) return this.matrix;
  this.matrix = arr instanceof Array ? arr : null;
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
  this.matrix[rowIndex][colIndex] = value;
  return this;
};

Dataset.prototype.type = function (str) {
  if (!arguments.length) return this.meta['type'];
  this.meta['type'] = str ? String(str) : undefined;
  return this;
};

(0, _extend.extend)(Dataset.prototype, append);
(0, _extend.extend)(Dataset.prototype, del);
(0, _extend.extend)(Dataset.prototype, filter);
(0, _extend.extend)(Dataset.prototype, insert);
(0, _extend.extend)(Dataset.prototype, select);
(0, _extend.extend)(Dataset.prototype, sort);
(0, _extend.extend)(Dataset.prototype, update);
(0, _extend.extend)(Dataset.prototype, _analyses2.default);
Dataset.parser = (0, _parsers2.default)(Dataset);

exports.default = Dataset;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
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
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = __webpack_require__(0);

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

exports.default = {
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
    (0, _each.each)(dataset, function (row) {
      (0, _each.each)(row, function (cell, i) {
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
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyNumber = prettyNumber;
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prettyNumber = __webpack_require__(12);

var _escapeHtml = __webpack_require__(1);

exports.default = {
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
      formattedNum = (0, _prettyNumber.prettyNumber)(value);
    }

    if (opts['prefix']) {
      prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
    }
    if (opts['suffix']) {
      suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
    }

    html += '<div class="' + theme + '">';
    html += '<div class="' + theme + '-metric" style="background-color: ' + color + '; width: ' + (width ? width + 'px' : 'auto') + ';" title="' + (0, _escapeHtml.escapeHtml)(value) + '">';
    html += '<span class="' + theme + '-metric-value">' + prefix + (0, _escapeHtml.escapeHtml)(formattedNum) + suffix + '</span>';
    if (title) {
      html += '<span class="' + theme + '-metric-title">' + (0, _escapeHtml.escapeHtml)(title) + '</span>';
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
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _escapeHtml = __webpack_require__(1);

exports.default = {
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
    titleContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.title() || '');
    notesContainer.className = this.theme() + '-notes';
    notesContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.notes() || '');

    msg.innerHTML = (0, _escapeHtml.escapeHtml)(text) || '';
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
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (d, defaultTitleFormat, defaultValueFormat, color) {
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
      text = "<table class='" + this.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + (0, _escapeHtml.escapeHtml)(title) + "</th></tr>" : "");
    }
    name = nameFormat(d[i].name);
    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
    bgcolor = this.levelColor ? this.levelColor(d[i].value) : color(d[i].id);
    if (value) {
      text += "<tr class='" + this.CLASS.tooltipName + "-" + d[i].id + "'>";
      text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + (0, _escapeHtml.escapeHtml)(name) + "</td>";
      text += "<td class='value'>" + (0, _escapeHtml.escapeHtml)(value) + "</td>";
      text += "</tr>";
    }
  }
  return text + "</table>";
};

var _escapeHtml = __webpack_require__(1);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cols) {
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
    if (cols[i][0] !== 'x' && !(0, _assertDateString2.default)(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  var legendEl = d3.select(domNode).append('svg');
  legendEl.attr('class', 'keen-c3-legend');
  legendEl.attr('height', domNode.offsetHeight - 10);
  legendEl.attr('width', legendWidth);
  legendEl.style('right', -legendWidth + 'px');
  legendEl.style('top', '10px');

  var legendItems = legendEl.append('g');
  legendItems.attr('class', 'keen-c3-legend-items');

  var paginateElOffset = 20 * pagination.range;
  var paginateEl = legendEl.append('g');
  paginateEl.attr('class', 'keen-c3-legend-pagination');
  paginateEl.attr('transform', function () {
    return 'translate(2, ' + paginateElOffset + ')';
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
      var elementText = d3.select(this).append('text');

      elementText.attr('font-size', 12);
      elementText.attr('pointer-events', 'none');
      elementText.attr('x', 15);
      elementText.attr('y', 9);
      elementText.text(id);
      elementText.text(function (id) {
        if (d3.select(this).node().getBBox().width > 105) {
          return id.length <= 15 ? id : id.substring(0, 12) + '...';
        } else {
          return id;
        }
      });
      var legendItemBox = d3.select(this).append('rect');
      legendItemBox.attr('height', 14);
      legendItemBox.attr('width', 110);
      legendItemBox.attr('x', 0);
      legendItemBox.attr('y', 0);
      legendItemBox.style('cursor', 'pointer');
      legendItemBox.style('fill-opacity', 0);
      var legendItemCircle = d3.select(this).append('rect');
      legendItemCircle.attr('fill', chart.color(id));
      legendItemCircle.attr('height', 10);
      legendItemCircle.attr('pointer-events', 'none');
      legendItemCircle.attr('rx', 5);
      legendItemCircle.attr('ry', 5);
      legendItemCircle.attr('width', 10);
      legendItemCircle.attr('x', 0);
      legendItemCircle.attr('y', 0);
    }).on('mouseover', function (id, i) {
      chart.focus(id);
      // show a tooltip overlay w/ full value
      if (id.length > 15) {
        var tooltipElement = d3.select(domNode).append('div');
        tooltipElement.attr('class', 'keen-c3-legend-label-overlay');
        tooltipElement.style('max-width', '75%');
        tooltipElement.style('right', -legendWidth + 'px');
        tooltipElement.style('top', 15 + (i + 1) * 20 + 'px');
        tooltipElement.html(id);
        tooltipElement.append('div').attr('class', 'keen-c3-legend-label-overlay-pointer');
      }
    }).on('mouseout', function (id) {
      chart.revert();
      // clear out the tooltip overlay
      d3.select(self.el().querySelector('.' + self.theme() + '-rendering .keen-c3-legend-label-overlay')).remove();
    }).on('click', function (id) {
      d3.select(this).style('opacity', function () {
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
      var element = d3.select(this).append('path');

      element.attr('d', function (d) {
        return d.path_d;
      });
      element.style('cursor', 'pointer');
      element.style('fill', '#D7D7D7');
      element.style('stroke', 'none');
      element.on('mouseover', function (id) {
        d3.select(this).style('fill', '#4D4D4D');
      });
      element.on('mouseout', function (id) {
        d3.select(this).style('fill', '#D7D7D7');
      });
      element.on('click', function (d) {
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
};

var _d = __webpack_require__(6);

var d3 = _interopRequireWildcard(_d);

var _assertDateString = __webpack_require__(3);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (startDate, endDate) {
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
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.extendDeep = extendDeep;

var _each = __webpack_require__(0);

function extendDeep(target) {
  for (var i = 1; i < arguments.length; i++) {
    (0, _each.each)(arguments[i], function (prop, key) {
      if (typeof target[key] !== 'undefined' && typeof prop !== 'undefined' && _typeof(target[key]) === 'object' && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && target[key] !== null && prop !== null) {
        extendDeep(target[key], prop);
      } else {
        target[key] = prop;
      }
    });
  }
  return target;
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (lib) {
  var timer, delay;
  bindResizeListener(function () {
    if (timer) {
      clearTimeout(timer);
    }
    delay = lib.visuals.length > 12 ? 1000 : 250;
    timer = setTimeout(function () {
      (0, _each.each)(lib.visuals, function (chart) {
        if (chart.view._artifacts.c3) {
          chart.view._artifacts.c3.resize();
        }
      });
    }, delay);
  });

  defineC3();
  return types;
};

var _c = __webpack_require__(19);

var _c2 = _interopRequireDefault(_c);

var _d = __webpack_require__(6);

var _d2 = _interopRequireDefault(_d);

var _each = __webpack_require__(0);

var _extend = __webpack_require__(2);

var _extendDeep = __webpack_require__(18);

var _assertDateString = __webpack_require__(3);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

var _defaultDateFormat = __webpack_require__(17);

var _defaultDateFormat2 = _interopRequireDefault(_defaultDateFormat);

var _paginatingLegend = __webpack_require__(16);

var _paginatingLegend2 = _interopRequireDefault(_paginatingLegend);

var _tooltipContents = __webpack_require__(15);

var _tooltipContents2 = _interopRequireDefault(_tooltipContents);

var _message = __webpack_require__(14);

var _message2 = _interopRequireDefault(_message);

var _metric = __webpack_require__(13);

var _metric2 = _interopRequireDefault(_metric);

var _table = __webpack_require__(11);

var _table2 = _interopRequireDefault(_table);

var _spinner = __webpack_require__(10);

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = {
  message: _message2.default,
  metric: _metric2.default,
  table: _table2.default,
  spinner: _spinner2.default
};

;

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
        colors: (0, _extend.extend)({}, this.colorMapping()),
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
    options = (0, _extendDeep.extendDeep)({}, DEFAULT_OPTIONS, this.chartOptions());

    // Apply enforced options
    options = (0, _extendDeep.extendDeep)(options, ENFORCED_OPTIONS);
    options.color.pattern = ENFORCED_OPTIONS.color.pattern;
    options.data.colors = ENFORCED_OPTIONS.data.colors;
    options.data.columns = ENFORCED_OPTIONS.data.columns;

    return options;
  }

  (0, _each.each)(c3Types, function (type, index) {
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

          if ((0, _assertDateString2.default)(this.data()[1][0])) {
            // TIMESERIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'timeseries';
            options.axis.x.tick = options.axis.x.tick || {
              format: this.dateFormat() || (0, _defaultDateFormat2.default)(this.data()[1][0], this.data()[2] ? this.data()[2][0] : this.data()[1][0]),
              culling: { max: 5 }
            };

            options.data.columns[0] = [];
            (0, _each.each)(this.dataset.selectColumn(0), function (cell, i) {
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

          (0, _each.each)(this.data()[0], function (cell, i) {
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
            contents: _tooltipContents2.default,
            format: {
              value: c3CustomTooltipFiltering.bind(this)
            }
          };

          options.legend.show = false;
          var paddedWidth = this.el().querySelector('.' + this.theme() + '-rendering').offsetWidth - 100;
          options.size.width = options.size.width || paddedWidth;
          this.el().querySelector('.' + this.theme() + '-rendering').setAttribute('style', 'margin-right: 120px;');

          // Render artifacts
          this.view._artifacts['c3'] = _c2.default.generate(options);
          _paginatingLegend2.default.call(this, options.data.columns);
        } else {
          options.legend.show = false;
          this.view._artifacts['c3'] = _c2.default.generate(options);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  if (!arguments.length) return this.dataset.data();
  if (data instanceof _dataset2.default) {
    this.dataset = data;
    return this;
  } else {
    return parseResponse.call(this, data);
  }
};

var _dataset = __webpack_require__(9);

var _dataset2 = _interopRequireDefault(_dataset);

var _extend = __webpack_require__(2);

var _stripHtmlTags = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

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
  query = (0, _extend.extend)({
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
  selectedParser = _dataset2.default.parser.apply(this, [parser].concat(parserArgs));

  // Parse the response with augmented query body
  dataset = selectedParser((0, _extend.extend)(response, { 'query': query }));

  // Set true dates for 'interval' data
  if (parser.indexOf('interval') > -1) {
    dataset.updateColumn(0, function (value, i) {
      return new Date(value);
    });
  }

  dataset.updateRow(0, function (value, i) {
    return (0, _stripHtmlTags.stripHtmlTags)(value);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueAtDeepKey = valueAtDeepKey;
function valueAtDeepKey(obj, is, value) {
  if (typeof is == 'string') return valueAtDeepKey(obj, is.split('.'), value);else if (is.length == 1 && value !== undefined && obj !== null && typeof obj[is[0]] !== 'undefined') return obj[is[0]] = value;else if (is.length == 0) return obj;else if (typeof is === 'undefined' || typeof obj === 'undefined' || is === null || obj === null || typeof obj[is[0]] === 'undefined') return null;else return valueAtDeepKey(obj[is[0]], is.slice(1), value);
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.flatten = flatten;
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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initialize;

var _each = __webpack_require__(0);

var _flatten = __webpack_require__(23);

var _object = __webpack_require__(22);

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
    (0, _each.each)(res.result, function (record, i) {
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    return dataset;
  };
}

function parseGroupedMetric() {
  return function (res) {
    var dataset = new Dataset().type('grouped-metric');
    (0, _each.each)(res.result, function (record, i) {
      var label;
      (0, _each.each)(record, function (value, key) {
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
    (0, _each.each)(res.result, function (record, i) {
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      if (record.value.length) {
        (0, _each.each)(record.value, function (group, j) {
          var label;
          (0, _each.each)(group, function (value, key) {
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
    (0, _each.each)(res.result, function (record, i) {
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
    (0, _each.each)(res.result, function (record, i) {
      var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      (0, _each.each)(record['value'], function (value, j) {
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
    (0, _each.each)(result, function (value, i) {
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
    (0, _each.each)(res.result, function (value, i) {
      dataset.set(['Result', String(i + 1)], value);
    });
    return dataset;
  };
}

function parseExtraction() {
  return function (res) {
    var dataset = new Dataset().type('extraction');
    // create header

    var _loop = function _loop(i) {
      var record = res.result[i];
      (0, _each.each)((0, _flatten.flatten)(record), function (value, key) {
        dataset.set([key, String(i + 1)], value);
      });
    };

    for (var i = 0; i < 1; i++) {
      _loop(i);
    }

    // get keys of the Object
    var names = Object.keys((0, _flatten.flatten)(res.result[0]));

    for (var i = 1; i < res.result.length; i++) {
      var record = [i + 1];
      for (var iNames = 0; iNames < names.length; iNames++) {
        record.push((0, _object.valueAtDeepKey)(res.result[i], names[iNames]));
      }
      dataset.matrix[String(i + 1)] = record;
    }

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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateColumn = updateColumn;
exports.updateRow = updateRow;

var _each = __webpack_require__(0);

var _createNullList = __webpack_require__(4);

var _createNullList2 = _interopRequireDefault(_createNullList);

var _append = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateColumn(q, input) {
  var self = this,
      index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1) {

    if (typeof input === 'function') {

      (0, _each.each)(self.data(), function (row, i) {
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
        input = input.concat((0, _createNullList2.default)(self.data().length - 1 - input.length));
      } else {
        // If this new column is longer than existing columns,
        // we need to update the rest to match ...
        (0, _each.each)(input, function (value, i) {
          if (self.matrix.length - 1 < input.length) {
            _append.appendRow.call(self, String(self.matrix.length));
          }
        });
      }

      (0, _each.each)(input, function (value, i) {
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

      (0, _each.each)(self.data()[index], function (value, i) {
        var col = self.selectColumn(i),
            cell = input.call(self, value, i, col);
        if (typeof cell !== 'undefined') {
          self.matrix[index][i] = cell;
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];

      if (input.length <= self.matrix[0].length - 1) {
        input = input.concat((0, _createNullList2.default)(self.matrix[0].length - 1 - input.length));
      } else {
        (0, _each.each)(input, function (value, i) {
          if (self.matrix[0].length - 1 < input.length) {
            _append.appendColumn.call(self, String(self.matrix[0].length));
          }
        });
      }

      (0, _each.each)(input, function (value, i) {
        self.matrix[index][i + 1] = value;
      });
    }
  }
  return self;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortColumns = sortColumns;
exports.sortRows = sortRows;

var _each = __webpack_require__(0);

var _analyses = __webpack_require__(8);

var _analyses2 = _interopRequireDefault(_analyses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortColumns(str, comp) {
  var self = this,
      head = this.matrix[0].slice(1),
      // minus index
  cols = [],
      clone = [],
      fn = comp || _analyses2.default.getColumnLabel;

  // Isolate each column (except the index)
  (0, _each.each)(head, function (cell, i) {
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
  (0, _each.each)(cols, function (col, i) {
    self.deleteColumn(i + 1).insertColumn(i + 1, col[0], col.slice(1));
  });
  return self;
}

function sortRows(str, comp) {
  var self = this,
      head = this.matrix.slice(0, 1),
      body = this.matrix.slice(1),
      fn = comp || _analyses2.default.getRowIndex;
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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectColumn = selectColumn;
exports.selectRow = selectRow;

var _each = __webpack_require__(0);

function selectColumn(q) {
  var result = [];
  var index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1 && typeof this.matrix[0][index] !== 'undefined') {
    (0, _each.each)(this.matrix, function (row, i) {
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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertColumn = insertColumn;
exports.insertRow = insertRow;

var _each = __webpack_require__(0);

var _createNullList = __webpack_require__(4);

var _createNullList2 = _interopRequireDefault(_createNullList);

var _append = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertColumn(index, str, input) {
  var self = this;
  var label = str !== undefined ? str : null;

  if (typeof input === 'function') {

    self.matrix[0].splice(index, 0, label);
    (0, _each.each)(self.matrix, function (row, i) {
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
      input = input.concat((0, _createNullList2.default)(self.matrix.length - 1 - input.length));
    } else {
      // If this new column is longer than existing columns,
      // we need to update the rest to match ...
      (0, _each.each)(input, function (value, i) {
        if (self.matrix.length - 1 < input.length) {
          _append.appendRow.call(self, String(self.matrix.length));
        }
      });
    }

    self.matrix[0].splice(index, 0, label);
    (0, _each.each)(input, function (value, i) {
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
    (0, _each.each)(self.matrix[0], function (label, i) {
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
      input = input.concat((0, _createNullList2.default)(self.matrix[0].length - 1 - input.length));
    } else {
      (0, _each.each)(input, function (value, i) {
        if (self.matrix[0].length - 1 < input.length) {
          _append.appendColumn.call(self, String(self.matrix[0].length));
        }
      });
    }

    self.matrix.splice(index, 0, newRow.concat(input));
  }

  return self;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterColumns = filterColumns;
exports.filterRows = filterRows;

var _each = __webpack_require__(0);

function filterColumns(fn) {
  var self = this;
  var clone = [];

  (0, _each.each)(self.matrix, function (row, i) {
    clone.push([]);
  });

  (0, _each.each)(self.matrix[0], function (col, i) {
    var selectedColumn = self.selectColumn(i);
    if (i == 0 || fn.call(self, selectedColumn, i)) {
      (0, _each.each)(selectedColumn, function (cell, ri) {
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

  (0, _each.each)(self.matrix, function (row, i) {
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });

  self.data(clone);
  return self;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteColumn = deleteColumn;
exports.deleteRow = deleteRow;

var _each = __webpack_require__(0);

function deleteColumn(q) {
  var self = this;
  var index = typeof q === 'number' ? q : this.matrix[0].indexOf(q);

  if (index > -1) {
    (0, _each.each)(self.matrix, function (row, i) {
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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = exports.Dataviz = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
// Utils


var _dataset = __webpack_require__(9);

Object.defineProperty(exports, 'Dataset', {
  enumerable: true,
  get: function get() {
    return _dataset.Dataset;
  }
});

var _data = __webpack_require__(21);

var _data2 = _interopRequireDefault(_data);

var _each = __webpack_require__(0);

var _assertDateString = __webpack_require__(3);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

var _stripHtmlTags = __webpack_require__(7);

var _escapeHtml = __webpack_require__(1);

var _libraries = __webpack_require__(20);

var _libraries2 = _interopRequireDefault(_libraries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constructor
var Dataviz = exports.Dataviz = function Dataviz() {
  if (this instanceof Dataviz === false) {
    return new Dataviz();
  }

  this.dataset = new _dataset.Dataset();
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
  Dataviz.libraries.default = (0, _libraries2.default)(Dataviz);
}
Dataviz.visuals = [];

Dataviz.register = function (name, actions) {
  Dataviz.libraries[name] = Dataviz.libraries[name] || {};
  (0, _each.each)(actions, function (method, key) {
    Dataviz.libraries[name][key] = method;
  });
};

Dataviz.find = function (target) {
  if (!arguments.length) return Dataviz.visuals;
  var el = target.nodeName ? target : document.querySelector(target),
      match = null;
  (0, _each.each)(Dataviz.visuals, function (visual) {
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
  (0, _each.each)(obj, function (prop, key) {
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
    (0, _each.each)(obj, function (value, key) {
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
    (0, _each.each)(obj, function (value, key) {
      self.view.colorMapping[key] = value ? value : null;
    });
  }
  return this;
};

Dataviz.prototype.data = _data2.default;

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
  if (this.data()[0].length === 2 && !(0, _assertDateString2.default)(this.data()[1][0])) {
    this.dataset.updateColumn(0, function (value, index) {
      if (this.view.labels[index - 1]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(this.view.labels[index - 1]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(this));
  } else {
    this.dataset.updateRow(0, function (value, index) {
      if (index > 0 && this.view.labels[index - 1]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(this.view.labels[index - 1]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(this));
  }
  return this;
};

Dataviz.prototype.labelMapping = function (obj) {
  if (!arguments.length) return this.view.labelMapping;
  if (obj === null) {
    this.view.labelMapping = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    (0, _each.each)(obj, function (value, key) {
      this.view.labelMapping[key] = value ? value : null;
    }.bind(this));
  }

  // Write labels
  if (this.data()[0].length === 2 && !(0, _assertDateString2.default)(this.data()[1][0])) {
    this.dataset.updateColumn(0, function (value) {
      if (this.view.labelMapping[value]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(this.view.labelMapping[value]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(this));
  } else {
    this.dataset.updateRow(0, function (value) {
      if (this.view.labelMapping[value]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(this.view.labelMapping[value]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
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
    if ((0, _assertDateString2.default)(this.data()[1][0])) {
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
    html += '<div class="' + options.theme + '-title">' + (0, _escapeHtml.escapeHtml)(options['title']) + '</div>';
  }
  html += '<div class="' + options.theme + '-stage"><div class="' + options.theme + '-rendering"></div></div>';
  if (options.notes) {
    html += '<div class="' + options.theme + '-notes">' + (0, _escapeHtml.escapeHtml)(options.notes) + '</div>';
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

exports.default = Dataviz;

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = exports.Dataviz = exports.extendKeenGlobalObject = undefined;

var _index = __webpack_require__(31);

Object.defineProperty(exports, 'Dataviz', {
  enumerable: true,
  get: function get() {
    return _index.Dataviz;
  }
});
Object.defineProperty(exports, 'Dataset', {
  enumerable: true,
  get: function get() {
    return _index.Dataset;
  }
});


var env = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};

var extendKeenGlobalObject = exports.extendKeenGlobalObject = function extendKeenGlobalObject(env) {
  env.Keen = env.Keen || {};
  env.Keen.Dataset = _index.Dataset;
  env.Keen.Dataviz = _index.Dataviz;
};

if ("boolean" !== 'undefined' && false || typeof KEEN_EXPOSE_AS_GLOBAL_OBJECT !== 'undefined') {
  extendKeenGlobalObject(env);
}

exports.default = _index.Dataviz;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(32)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-dataviz.js.map