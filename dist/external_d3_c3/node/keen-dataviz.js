(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("c3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "c3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3"), require("c3")) : factory(root["d3"], root["c3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__19__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
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
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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

var _analyses = __webpack_require__(9);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  render: function render() {
    var html = '';
    var artifacts = this.view._artifacts.spinner = {};

    // Build DOM element
    html += '<div class="' + this.config.theme + '">';
    html += '<div class="keen-spinner-container keen-dataviz-box">';
    html += '<div class="keen-spinner-indicator"></div>';
    html += '</div>';
    html += '</div>';
    this.el().innerHTML = html;
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = __webpack_require__(0);

var defaults = {
  height: undefined,
  width: undefined,
  stickyHeader: false,
  stickyFooter: false
};

function _generateTableRows(dataset) {
  var html = '';
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = dataset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var row = _step.value;

      if (i > 0) {
        html += '<tr>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var rowCol = _step2.value;

            html += '<td>' + rowCol + '</td>';
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        html += '</tr>';
      }
      i = 1;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return html;
}

exports.default = {
  render: function render() {
    var dataset = this.data();
    var el = this.el();
    var theme = this.theme();

    var html = '';
    var fixedHeader = void 0;

    var isEmpty = dataset.length === 1 && dataset[0].length === 0;
    if (isEmpty) {
      this.message('No data to display');
      return;
    }

    // Open wrapper
    html += '<div class="' + theme + '-table">';

    // Static, scrollable table
    html += '<table class="' + theme + '-table-dataset">';
    html += '<thead>';
    html += '<tr>';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = dataset[0][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var colName = _step3.value;

        html += '<th>' + colName + '</th>';
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    html += '</tr>';
    html += '</thead>';
    // Table data
    html += '<tbody>';
    html += _generateTableRows.call(this, dataset);
    html += '</tbody>';
    html += '</table>';
    /*
        // Fixed table (header)
        html +=   `<table class="${theme}-table-fixed-header">`;
        html +=     '<thead>';
        html +=       '<tr>';
        for (let colName of dataset[0]) {
          html +=       `<th>${colName}</th>`;
        }
        html +=       '</tr>';
        html +=     '</thead>';
        html +=   '</table>';
    */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prettyNumber = __webpack_require__(13);

var _escapeHtml = __webpack_require__(1);

exports.default = {
  render: function render() {
    var color = this.config.colors[0];
    var theme = this.config.theme;
    var title = this.config.title;
    var opts = this.config;
    var value = '-';
    var html = '';
    var prefix = '';
    var suffix = '';
    var formattedNum = void 0;
    var valueEl = void 0;

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
    html += '<div class="' + theme + '-metric keen-dataviz-box" title="' + (0, _escapeHtml.escapeHtml)(value) + '">';
    html += '<div class="' + theme + '-metric-value">' + prefix + (0, _escapeHtml.escapeHtml)(formattedNum) + suffix + '</div>';
    if (title) {
      html += '<div class="' + theme + '-metric-title">' + (0, _escapeHtml.escapeHtml)(title) + '</div>';
    }
    html += '</div>';
    html += '</div>';

    this.el().innerHTML = html;
    // valueEl = this.el().querySelector('.' + theme + '-metric-value');
    // valueEl.style.paddingTop = ((height - this.el().offsetHeight) / 2) + 'px';
    // this.el().querySelector('.' + theme + '-metric').style.height = height + 'px';
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

var _escapeHtml = __webpack_require__(1);

exports.default = {
  render: function render(text) {
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var msg = document.createElement('span');

    var titleContainer = document.createElement('div');
    var notesContainer = document.createElement('div');

    outer.className = this.config.theme + ' keen-dataviz-box';
    inner.className = this.config.theme + '-message';

    // Create title and notes for message
    titleContainer.className = this.config.theme + '-title';
    titleContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.config.title || '');
    notesContainer.className = this.config.theme + '-notes';
    notesContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.config.notes || '');

    msg.innerHTML = (0, _escapeHtml.escapeHtml)(text) || '';
    inner.appendChild(msg);
    outer.appendChild(titleContainer);
    outer.appendChild(inner);
    outer.appendChild(notesContainer);

    this.el().innerHTML = '';
    this.el().appendChild(outer);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (d, defaultTitleFormat, defaultValueFormat, color) {
  var text = void 0;
  var title = void 0;
  // Set config options or defaults
  var nameFormat = this.config.tooltip_format_name || function (name) {
    return name;
  };
  var titleFormat = this.config.tooltip_format_title || defaultTitleFormat;
  var valueFormat = this.config.tooltip_format_value || defaultValueFormat;

  // Reverse list to match legend
  for (var i = 0; i < d.length; i++) {
    if (!(d[i] && (d[i].value || d[i].value === 0))) {
      continue;
    }
    if (!text) {
      title = titleFormat ? titleFormat(d[i].x) : d[i].x;
      text = "<table class='" + this.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + (0, _escapeHtml.escapeHtml)(title) + "</th></tr>" : "");
    }
    var name = nameFormat(d[i].name);
    var value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
    var bgcolor = this.levelColor ? this.levelColor(d[i].value) : color(d[i].id);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (options) {
  var cols = options.data.columns;
  var datavizInstance = this;
  var chart = this.view._artifacts.c3;
  var columns = [];
  var domNode = this.el().querySelector('.' + datavizInstance.config.theme + '-rendering');
  var legendConfig = datavizInstance.config.legend;

  var pagination = this.view._artifacts.pagination = _extends({
    hidden: [],
    labels: [],
    offset: 0,
    limit: Math.round((domNode.offsetHeight - 78) / 20),
    total: 0
  }, legendConfig.pagination);

  for (var i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !(0, _assertDateString2.default)(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  var legendElement = this.el().querySelector('.keen-c3-legend');

  var align = 'vertical';
  if (legendConfig.position === 'top' || legendConfig.position === 'bottom') {
    align = 'horizontal';
  }

  var paginateHorizontalLeftElement = document.createElement('div');
  paginateHorizontalLeftElement.setAttribute('class', 'keen-c3-legend-pagination-icons keen-c3-legend-horizontal-pagination-left');
  if (align === 'horizontal') {
    legendElement.append(paginateHorizontalLeftElement);
  }

  var legendItemsElement = document.createElement('div');
  legendItemsElement.setAttribute('class', 'keen-c3-legend-items keen-c3-legend-' + align + '-items');
  legendElement.append(legendItemsElement);

  var paginateVerticalElement = document.createElement('div');
  paginateVerticalElement.setAttribute('class', 'keen-c3-legend-pagination keen-c3-legend-pagination-icons');
  if (align === 'vertical') {
    legendElement.append(paginateVerticalElement);
  }

  var paginateHorizontalRightElement = document.createElement('div');
  paginateHorizontalRightElement.setAttribute('class', 'keen-c3-legend-pagination-icons keen-c3-legend-horizontal-pagination-right');
  if (align === 'horizontal') {
    legendElement.append(paginateHorizontalRightElement);
  }

  paginateData();

  function paginateData() {
    pagination.labels = columns.slice(pagination.offset, pagination.offset + pagination.limit);
    pagination.total = columns.length;
    renderLegendComponent.call(datavizInstance, pagination.labels);
    if (pagination.total > pagination.limit) {
      renderPaginationComponent.call(datavizInstance);
    }
    chart.resize();
  }

  function renderLegendComponent() {
    legendItemsElement.innerHTML = '';

    pagination.labels.forEach(function (label) {
      var labelShortened = legendConfig.label.textMaxLength ? label.slice(0, legendConfig.label.textMaxLength - 1) : label;
      var legendItem = document.createElement("div");
      legendItem.innerHTML = '<span class=\'legend-item-text\'>' + labelShortened + '</span>';
      legendItem.chartPartId = label;
      legendItem.setAttribute('class', 'legend-item');
      legendItemsElement.append(legendItem);

      var legendItemColorSample = document.createElement("span");
      legendItemColorSample.setAttribute('class', 'legend-item-color-sample');
      legendItemColorSample.style.backgroundColor = chart.color(legendItem.chartPartId);
      legendItem.prepend(legendItemColorSample);

      var tooltipElement = document.createElement("div");
      legendItem.addEventListener('mouseover', function (event) {
        chart.focus(legendItem.chartPartId);
        if (legendConfig.tooltip.show && legendItem.chartPartId.length > legendConfig.label.textMaxLength) {
          tooltipElement.setAttribute('class', 'keen-c3-legend-label-overlay keen-c3-legend-position-' + legendConfig.position);
          tooltipElement.innerHTML = '' + (options.legend.tooltip.pointer ? '<div class=\'overlay-pointer\'></div>' : '') + legendItem.chartPartId;
          legendItem.append(tooltipElement);
        }
      });
      legendItem.addEventListener('mouseout', function (event) {
        chart.revert();
        tooltipElement.remove();
      });
      legendItem.addEventListener('click', function (event) {
        var opacity = 1;
        var isHidden = pagination.hidden.indexOf(legendItem.chartPartId);
        if (isHidden < 0) {
          pagination.hidden.push(legendItem.chartPartId);
          opacity = .35;
        } else {
          pagination.hidden.splice(isHidden, 1);
          opacity = 1;
        }
        legendItem.style.opacity = opacity;
        chart.toggle(legendItem.chartPartId);
      });
    });
  }

  function renderPaginationComponent() {
    paginateVerticalElement.innerHTML = '';
    paginateHorizontalLeftElement.innerHTML = '';
    paginateHorizontalRightElement.innerHTML = '';

    var arrowUp = document.createElement('i');
    var arrowDown = document.createElement('i');

    var paginate = function paginate(direction) {
      if (direction === 'forward') {
        var _diff = pagination.offset + pagination.limit;
        if (_diff < pagination.total) {
          pagination.offset = _diff;
          return;
        }
        pagination.offset = 0;
        return;
      }

      var diff = pagination.offset - pagination.limit;
      if (diff >= 0) {
        pagination.offset = diff;
        return;
      }

      pagination.offset = Math.floor(pagination.total / pagination.limit) * pagination.limit;
    };

    arrowDown.addEventListener('click', function () {
      paginate('forward');
      paginateData();
      clearSelectedText();
    });

    arrowUp.addEventListener('click', function () {
      paginate('backward');
      paginateData();
      clearSelectedText();
    });

    if (legendConfig.position === 'left' || legendConfig.position === 'right') {
      arrowUp.setAttribute('class', 'up');
      arrowDown.setAttribute('class', 'down');
      paginateVerticalElement.append(arrowDown);
      paginateVerticalElement.append(arrowUp);
    } else {
      // bottom top
      arrowUp.setAttribute('class', 'left');
      arrowDown.setAttribute('class', 'right');
      paginateHorizontalLeftElement.append(arrowUp);
      paginateHorizontalRightElement.append(arrowDown);
    }
  }

  function clearSelectedText() {
    var selection = void 0;
    if (document.selection && document.selection.empty) {
      selection = document.selection;
      selection.empty();
    } else if (window.getSelection) {
      selection = window.getSelection();
      selection.removeAllRanges();
    }
  }
};

var _d = __webpack_require__(7);

var d3 = _interopRequireWildcard(_d);

var _assertDateString = __webpack_require__(3);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 18 */
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (lib) {
  var timer = void 0;
  bindResizeListener(function () {
    if (timer) {
      clearTimeout(timer);
    }
    var delay = lib.visuals.length > 12 ? 1000 : 250;
    timer = setTimeout(function () {
      (0, _each.each)(lib.visuals, function (chart) {
        if (chart.view._artifacts.c3) {
          chart.view._artifacts.c3.resize();
        }
      });
    }, delay);
  });

  return defineC3();
};

var _c = __webpack_require__(19);

var _c2 = _interopRequireDefault(_c);

var _d = __webpack_require__(7);

var _d2 = _interopRequireDefault(_d);

var _each = __webpack_require__(0);

var _extend = __webpack_require__(2);

var _extendDeep = __webpack_require__(6);

var _assertDateString = __webpack_require__(3);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

var _defaultDateFormat = __webpack_require__(18);

var _defaultDateFormat2 = _interopRequireDefault(_defaultDateFormat);

var _paginatingLegend = __webpack_require__(17);

var _paginatingLegend2 = _interopRequireDefault(_paginatingLegend);

var _tooltipContents = __webpack_require__(16);

var _tooltipContents2 = _interopRequireDefault(_tooltipContents);

var _message = __webpack_require__(15);

var _message2 = _interopRequireDefault(_message);

var _metric = __webpack_require__(14);

var _metric2 = _interopRequireDefault(_metric);

var _table = __webpack_require__(12);

var _table2 = _interopRequireDefault(_table);

var _spinner = __webpack_require__(11);

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

function defineC3() {
  var types = {
    message: _message2.default,
    metric: _metric2.default,
    table: _table2.default,
    spinner: _spinner2.default
  };

  var c3Types = [
  // Standard types
  'area', 'area-spline', 'area-step', 'bar', 'donut', 'gauge', 'line', 'pie', 'step', 'spline',

  // Horizontal variant types
  'horizontal-area', 'horizontal-area-spline', 'horizontal-area-step', 'horizontal-bar', 'horizontal-line', 'horizontal-step', 'horizontal-spline'];

  function getDefaultOptions() {
    var ENFORCED_OPTIONS = {
      bindto: this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'),
      color: {
        pattern: this.config.colors
      },
      data: {
        colors: _extends({}, this.config.colorMapping),
        columns: [],
        type: this.config.type.replace('horizontal-', '')
      },
      size: {
        width: this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart').offsetWidth,
        height: this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart').offsetHeight > 0 ? this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart').offsetHeight : undefined
      }
    };

    return (0, _extendDeep.extendDeep)({}, this.config, ENFORCED_OPTIONS);
  }

  (0, _each.each)(c3Types, function (type, index) {
    types[type] = {
      render: function render() {
        var _this = this;

        var options = getDefaultOptions.call(this);

        if (this.data()[0].length === 1 || this.data().length === 1) {
          this.message('No data to display');
          return;
        }

        if (type === 'gauge') {
          // Accommodate a neat bug:
          options.legend.show = false;
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
              format: this.config.dateFormat || (0, _defaultDateFormat2.default)(this.data()[1][0], this.data()[2] ? this.data()[2][0] : this.data()[1][0]),
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
            if (this.config.stacked && this.data()[0].length > 2) {
              options.data.groups = [this.dataset.selectRow(0).slice(1)];
            }
          } else {
            // CATEGORIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'category';
            options.axis.x.categories = this.dataset.selectColumn(0).slice(1);
            if (this.config.stacked && this.data()[0].length > 2) {
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

        if (options.legend.show === true) {
          var c3options = _extends({}, options);
          // Apply custom color handling
          c3options.data.color = c3CustomDataMapping.bind(this);

          // Apply custom tooltip
          c3options.tooltip = {
            contents: _tooltipContents2.default,
            format: {
              title: this.config.tooltip.format.title,
              value: function value(_value, ratio, id, index) {
                var valueFormatted = c3CustomTooltipFiltering.call(_this, _value, ratio, id, index);
                if (_this.config.tooltip && _this.config.tooltip.format && _this.config.tooltip.format.value) {
                  valueFormatted = _this.config.tooltip.format.value.call(_this, valueFormatted, ratio, id, index);
                }
                return valueFormatted;
              }
            }
          };

          c3options.legend.show = false; // hide default c3 legend

          // Render artifacts
          this.view._artifacts['c3'] = _c2.default.generate(c3options);
          _paginatingLegend2.default.call(this, options);
        } else {
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

  return types;
}

function c3CustomDataMapping(color, d) {
  var type = this.config.type;
  if (this.view._artifacts.pagination && type !== 'gauge'
  /*&& this.type() !== 'pie'
    && this.type() !== 'donut'*/) {
      var scope = this.view._artifacts.pagination.labels;
      if (d.id && scope.indexOf(d.id) > -1 || d && !d.id && scope.indexOf(d) > -1) {
        return color;
      } else {
        if (type === 'donut' || type === 'pie') {
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
  var type = this.config.type;

  if (this.view._artifacts.pagination && type !== 'gauge'
  /*&& this.type() !== 'pie'
    && this.type() !== 'donut'*/) {
      var scope = this.view._artifacts.pagination.labels;
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

var _dataset = __webpack_require__(10);

var _dataset2 = _interopRequireDefault(_dataset);

var _extend = __webpack_require__(2);

var _stripHtmlTags = __webpack_require__(8);

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

  indexBy = this.config.indexBy;
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
  if (!this.config.title) {
    if (meta.display_name) {
      title = meta.display_name;
    } else {
      title = getDefaultTitle(query);
    }
    this.config.title = title;
  }

  // Set type from saved query body, or use a default type
  if (!this.config.type) {
    if (meta.visualization && meta.visualization.chart_type) {
      type = meta.visualization.chart_type;
    } else {
      type = getDefaultType(parser);
    }
    this.config.type = type;
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

var _analyses = __webpack_require__(9);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Utils


var _dataset = __webpack_require__(10);

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

var _stripHtmlTags = __webpack_require__(8);

var _escapeHtml = __webpack_require__(1);

var _libraries = __webpack_require__(20);

var _libraries2 = _interopRequireDefault(_libraries);

var _extendDeep = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constructor
var Dataviz = exports.Dataviz = function Dataviz() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (this instanceof Dataviz === false) {
    return new Dataviz(options);
  }

  var datavizInstance = this;

  var defaultOptions = {
    showDeprecationWarnings: true,
    showLoadingSpinner: false,

    container: undefined, // querySelector of container, for example '#someDiv'
    containerElement: undefined, // HTML parent element for the chart

    // width: undefined, *deprecated* - use CSS
    // height: undefined, *deprecated* - use CSS

    title: undefined,
    notes: undefined,
    theme: 'keen-dataviz',

    colors: ['#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb', '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e', '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'],

    colorMapping: {},

    indexBy: 'timeframe.start',
    labels: [],
    labelMapping: {},
    library: 'default',
    sortGroups: undefined,
    sortIntervals: undefined,

    results: undefined, // raw data

    // C3 chartOptions
    type: undefined,
    stacked: false,
    dateFormat: undefined,
    legend: {
      show: true,
      position: 'right',
      label: {
        textMaxLength: 12
      },
      pagination: {
        offset: 0, // start from
        limit: 5 // items per page
      },
      tooltip: {
        show: true,
        pointer: true
      }
    },

    axis: {},
    color: {},
    data: {
      order: null
    },
    size: {
      // control it with CSS of .c3-chart
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
    tooltip: {
      format: {
        // https://c3js.org/samples/tooltip_format.html
      }
    },
    transition: {
      // duration: 0
    }
  };

  this.config = _extends({}, (0, _extendDeep.extendDeep)(defaultOptions, options));

  // get DOM node by query
  if (this.config.container) {
    this.el(this.config.container);
  }

  this.dataset = new _dataset.Dataset();
  this.view = {
    _prepared: false,
    _rendered: false,
    _artifacts: {/* state bin */}
  };

  Dataviz.visuals.push(this);

  if (this.config.showLoadingSpinner) {
    this.prepare();
  }

  if (!!this.config.results) {
    this.render(this.config.results);
  }
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
  var el = target.nodeName ? target : document.querySelector(target);
  var match = null;
  (0, _each.each)(Dataviz.visuals, function (visual) {
    if (el == visual.config.container) {
      match = visual;
      return false;
    }
  });
  return match;
};

// Prototype
// ------------

Dataviz.prototype.attributes = function (obj) {
  if (this.config.showDeprecationWarnings) {
    console.log('.attributes() is deprecated. Use: new KeenDataviz({ _your_value_here_ })');
  }
  if (!arguments.length) return this.config;
  var view = this.config;
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
  if (this.config.showDeprecationWarnings) {
    console.log('.chartOptions() is deprecated. Use: new KeenDataviz({ _your_value_here_ })');
  }
  if (!arguments.length) return this.config;
  this.config = (0, _extendDeep.extendDeep)(this.config, obj);
  return this;
};

Dataviz.prototype.colors = function (arr) {
  if (this.config.showDeprecationWarnings) {
    console.log('.colors() is deprecated. Use: new KeenDataviz({ colors: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.colors;
  this.config.colors = arr instanceof Array ? arr : [];
  return this;
};

Dataviz.prototype.colorMapping = function (obj) {
  if (this.config.showDeprecationWarnings) {
    console.log('.colorMapping() is deprecated. Use: new KeenDataviz({ colorMapping: _your_value_here_ })');
  }
  var datavizInstance = this;
  if (!arguments.length) return this.config.colorMapping;
  if (obj === null) {
    this.config.colorMapping = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    (0, _each.each)(obj, function (value, key) {
      datavizInstance.config.colorMapping[key] = value ? value : null;
    });
  }
  return this;
};

Dataviz.prototype.data = _data2.default;

Dataviz.prototype.dateFormat = function (val) {
  if (this.config.showDeprecationWarnings) {
    console.log('.dateFormat() is deprecated. Use: new KeenDataviz({ dateFormat: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.dateFormat;
  if (typeof val === 'string' || typeof val === 'function') {
    this.config.dateFormat = val;
  } else {
    this.config.dateFormat = undefined;
  }
  return this;
};

Dataviz.prototype.destroy = function () {
  var library = this.library();
  var type = this.config.type;
  var element = this.el();

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
  var datavizInstance = this;
  if (!arguments.length) return this.config.containerElement;
  domReady(function () {
    if (target && target !== null) {
      if (target.nodeName) {
        datavizInstance.config.containerElement = target;
      } else if (document.querySelector) {
        datavizInstance.config.containerElement = document.querySelector(target);
      }
    } else {
      datavizInstance.config.containerElement = undefined;
    }
  });
  return this;
};

Dataviz.prototype.height = function (num) {
  if (this.config.showDeprecationWarnings) {
    console.log('.height() is deprecated - use CSS classes');
  }
  return this;
};

// IMPORTANT: Must be run before data parsing
Dataviz.prototype.indexBy = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.indexBy() is deprecated. Use: new KeenDataviz({ indexBy: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.indexBy;
  this.config.indexBy = str ? String(str) : 'timeframe.start';
  return this;
};

Dataviz.prototype.labels = function (arr) {
  if (this.config.showDeprecationWarnings) {
    console.log('.labels() is deprecated. Use: new KeenDataviz({ labels: _your_value_here_ })');
  }

  if (!arguments.length) return this.config.labels;
  this.config.labels = arr instanceof Array ? arr : [];

  setLabels(this);

  return this;
};

function setLabels(datavizInstance) {
  // Write labels
  if (datavizInstance.data()[0].length === 2 && !(0, _assertDateString2.default)(datavizInstance.data()[1][0])) {
    datavizInstance.dataset.updateColumn(0, function (value, index) {
      if (datavizInstance.config.labels[index - 1]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(datavizInstance.config.labels[index - 1]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(datavizInstance));
  } else {
    datavizInstance.dataset.updateRow(0, function (value, index) {
      if (index > 0 && datavizInstance.config.labels[index - 1]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(datavizInstance.config.labels[index - 1]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(datavizInstance));
  }
}

Dataviz.prototype.labelMapping = function (obj) {
  if (this.config.showDeprecationWarnings) {
    console.log('.labelMapping() is deprecated. Use: new KeenDataviz({ labelMapping: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.labelMapping;
  if (obj === null) {
    this.config.labelMapping = {};
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    (0, _each.each)(obj, function (value, key) {
      this.config.labelMapping[key] = value ? value : null;
    }.bind(this));
  }

  mapLabels(this);

  return this;
};

function mapLabels(datavizInstance) {
  // Write labels
  if (datavizInstance.data()[0].length === 2 && !(0, _assertDateString2.default)(datavizInstance.data()[1][0])) {
    datavizInstance.dataset.updateColumn(0, function (value) {
      if (datavizInstance.config.labelMapping[value]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(datavizInstance.config.labelMapping[value]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(datavizInstance));
  } else {
    datavizInstance.dataset.updateRow(0, function (value) {
      if (datavizInstance.config.labelMapping[value]) {
        return (0, _stripHtmlTags.stripHtmlTags)(String(datavizInstance.config.labelMapping[value]));
      }
      return (0, _stripHtmlTags.stripHtmlTags)(value);
    }.bind(datavizInstance));
  }
}

Dataviz.prototype.library = function (str) {
  if (!arguments.length) return this.config['library'];
  this.config['library'] = str ? String(str) : null;
  return this;
};

Dataviz.prototype.message = function () {
  if (this.view._rendered) {
    this.destroy();
  }
  if (this.el()) {
    this.el().innerHTML = '';
    var message = Dataviz.libraries.default.message;
    if (message.render) {
      message.render.apply(this, arguments);
    }
  }
  return this;
};

Dataviz.prototype.notes = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.notes() is deprecated. Use: new KeenDataviz({ notes: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.notes;
  this.config.notes = str ? String(str) : null;
  return this;
};

Dataviz.prototype.prepare = function () {
  var datavizInstance = this;

  if (!this.el()) {
    throw this.config.container + ' not found. A DOM parent element is required to mount the chart.';
    return;
  }

  domReady(function () {
    if (datavizInstance.view._rendered) {
      datavizInstance.destroy();
    }
    if (datavizInstance.el()) {
      datavizInstance.el().innerHTML = '';
      var loader = Dataviz.libraries.default.spinner;
      if (loader.render) {
        loader.render.call(datavizInstance);
      }
      datavizInstance.view._prepared = true;
    }
  });

  return this;
};

Dataviz.prototype.render = function () {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  var datavizInstance = this;
  if (!!results) {
    return datavizInstance.data(results).render();
  }
  if (!!this.config.labelMapping && Object.keys(this.config.labelMapping).length > 0) {
    mapLabels(datavizInstance);
  }
  if (!!this.config.labels && Object.keys(this.config.labels).length > 0) {
    setLabels(datavizInstance);
  }
  if (!!this.config.sortGroups) {
    sortGroups(datavizInstance);
  }
  if (!!this.config.sortIntervals) {
    sortIntervals(datavizInstance);
  }

  var loader = Dataviz.libraries.default.spinner;
  var library = this.config.library;
  var type = this.config.type;
  var containerElement = this.el();

  if (!containerElement || containerElement === undefined) {
    var msg = this.config.container + ' not found. A DOM parent element is required to mount the chart.';
    console.error(msg);
    throw msg;
    return;
  }

  domReady(function () {
    if (datavizInstance.view._prepared && loader.destroy) {
      loader.destroy.apply(datavizInstance, arguments);
    }
    containerElement.innerHTML = '';

    if (Dataviz.libraries[library] === 'undefined') {
      // Error: Unregistered library
      var _msg = 'Incorrect library';
      datavizInstance.message(_msg);
      throw _msg;
      return;
    } else {
      if (typeof Dataviz.libraries[library][type] === 'undefined') {
        var _msg2 = 'Incorrect chart type';
        datavizInstance.message(_msg2);
        throw _msg2;
        return;
      } else {
        buildDomWrapper(containerElement, datavizInstance.config);
        Dataviz.libraries[library][type].render.call(datavizInstance);
        datavizInstance.view._rendered = true;
      }
    }
  });
  return this;
};

Dataviz.prototype.sortGroups = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.sortGroups() is deprecated. Use: new KeenDataviz({ sortGroups: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.sortGroups;
  this.config.sortGroups = str ? String(str) : null;

  sortGroups(this, str);

  return this;
};

function sortGroups(datavizInstance) {
  // Sort groups
  if (datavizInstance.config.sortGroups && datavizInstance.data().length > 1) {
    if ((0, _assertDateString2.default)(datavizInstance.data()[1][0])) {
      datavizInstance.dataset.sortColumns(datavizInstance.config.sortGroups, datavizInstance.dataset.getColumnSum);
    } else {
      datavizInstance.dataset.sortRows(datavizInstance.config.sortGroups, datavizInstance.dataset.getRowSum);
    }
  }
}

Dataviz.prototype.sortIntervals = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.sortIntervals() is deprecated. Use: new KeenDataviz({ sortIntervals: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.sortIntervals;
  this.config.sortIntervals = str ? String(str) : null;

  sortIntervals(this);

  return this;
};

function sortIntervals(datavizInstance) {
  if (datavizInstance.config.sortIntervals) {
    datavizInstance.dataset.sortRows(datavizInstance.config.sortIntervals);
  }
}

Dataviz.prototype.stacked = function (bool) {
  if (this.config.showDeprecationWarnings) {
    console.log('.stacked() is deprecated. Use: new KeenDataviz({ stacked: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.stacked;
  this.config.stacked = bool ? true : false;
  return this;
};

Dataviz.prototype.theme = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.theme() is deprecated. Use: new KeenDataviz({ theme: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.theme;
  this.config.theme = str ? String(str) : null;
  return this;
};

Dataviz.prototype.title = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.title() is deprecated. Use: new KeenDataviz({ title: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.title;
  this.config.title = str ? String(str) : null;
  return this;
};

Dataviz.prototype.type = function (str) {
  if (this.config.showDeprecationWarnings) {
    console.log('.type() is deprecated. Use: new KeenDataviz({ type: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.type;
  this.config.type = str ? convertChartTypes(str) : null;
  return this;
};

Dataviz.prototype.update = function () {
  var library = this.config.library;
  var type = this.config.type;
  var element = this.el();
  if (library && type && element && Dataviz.libraries[library][type].update) {
    Dataviz.libraries[library][type].update.apply(this, arguments);
  }
  return this;
};

Dataviz.prototype.width = function (num) {
  if (this.config.showDeprecationWarnings) {
    console.log('.width() is deprecated - use CSS classes');
  }
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
  var chart100percentWide = '';
  if (options.legend.position === 'top' || options.legend.position === 'bottom') {
    chart100percentWide = 'c3-chart-100-percent';
  }

  var container = '<div class="c3-chart ' + chart100percentWide + '"></div>';
  var align = 'horizontal';
  if (options.legend.position === 'left' || options.legend.position === 'right') {
    align = 'vertical';
  }
  if (options.legend.position === 'top' || options.legend.position === 'left') {
    container = '<div class="keen-c3-legend keen-c3-legend-' + align + ' keen-c3-legend-' + options.legend.position + '"></div>' + container;
  } else {
    container = container + '<div class="keen-c3-legend keen-c3-legend-' + align + ' keen-c3-legend-' + options.legend.position + '"></div>';
  }
  html += '<div class="' + options.theme + '">';
  if (options.title) {
    html += '<div class="' + options.theme + '-title">' + options.title + '</div>';
  }
  html += '<div class="' + options.theme + '-rendering ' + options.theme + '-rendering-' + align + '">' + container + '</div>';
  if (options.notes) {
    html += '<div class="' + options.theme + '-notes">' + options.notes + '</div>';
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(31);

module.exports = {
  default: _index.Dataviz,
  Dataviz: _index.Dataviz,
  Dataset: _index.Dataset
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-dataviz.js.map