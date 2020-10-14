(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("c3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "c3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3"), require("c3")) : factory(root["d3"], root["c3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__10__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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
exports.default = copyToClipboard;
function stickTooltip(event, tooltip) {
  tooltip.style.opacity = 0;
  tooltip.style.top = event.pageY + 'px';
  tooltip.style.left = event.pageX + 10 + 'px';
}

function copyToClipboard(value, event) {
  var placeholder = document.createElement('input');
  placeholder.value = value;
  document.body.appendChild(placeholder);
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);

  if (event) {
    var notification = document.createElement('div');
    notification.style.padding = '5px 10px';
    notification.style.backgroundColor = '#ffffff';
    notification.style.fontSize = '12px';
    notification.style.position = 'absolute';
    notification.style.top = event.pageY + 'px';
    notification.style.left = event.pageX + 10 + 'px';
    notification.style.zIndex = '999';
    notification.style.opacity = 1;
    notification.style.transition = 'opacity 1s ease';
    notification.innerText = 'copied!';

    document.body.appendChild(notification);
    document.addEventListener('mousemove', function (e) {
      return stickTooltip(e, notification);
    });

    setTimeout(function () {
      notification.style.opacity = 1;
      document.body.removeChild(notification);
    }, 1000);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.textWrap = textWrap;

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function textWrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word = void 0,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            // ems
        x = text.attr("x"),
            y = text.attr("y"),
            dy = 0,
            //parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendColumn = appendColumn;
exports.appendRow = appendRow;

var _createNullList = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = undefined;

var _append = __webpack_require__(8);

var append = _interopRequireWildcard(_append);

var _delete = __webpack_require__(23);

var del = _interopRequireWildcard(_delete);

var _filter = __webpack_require__(24);

var filter = _interopRequireWildcard(_filter);

var _insert = __webpack_require__(25);

var insert = _interopRequireWildcard(_insert);

var _select = __webpack_require__(26);

var select = _interopRequireWildcard(_select);

var _sort = __webpack_require__(27);

var sort = _interopRequireWildcard(_sort);

var _update = __webpack_require__(28);

var update = _interopRequireWildcard(_update);

var _analyses = __webpack_require__(13);

var _analyses2 = _interopRequireDefault(_analyses);

var _extend = __webpack_require__(5);

var _parsers = __webpack_require__(29);

var _parsers2 = _interopRequireDefault(_parsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Modifiers
var Dataset = exports.Dataset = function Dataset() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (this instanceof Dataset === false) {
    return new Dataset(config);
  }

  this.matrix = [['Index']];
  this.meta = {
    type: undefined
  };
  this.config = config;
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = __webpack_require__(0);

var _extend = __webpack_require__(5);

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
/* 14 */
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
/* 15 */
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
  if (typeof inputString !== 'string') {
    return inputString;
  }
  return inputString.replace(/(<([^>]+)>)/ig, '');
}

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderDownloadButton;

var _downloadResults = __webpack_require__(40);

var _downloadResults2 = _interopRequireDefault(_downloadResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function renderDownloadButton() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      element = _ref.element,
      _ref$label = _ref.label,
      label = _ref$label === undefined ? 'Download' : _ref$label,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'json' : _ref$type,
      data = _ref.data;

  var btnClass = 'keen-dataviz-button';
  var isBtnRendered = [].concat(_toConsumableArray(element.parentNode.children)).find(function (child) {
    return child.className === btnClass;
  });
  if (isBtnRendered) return;

  var button = document.createElement('button');
  button.innerText = label;
  button.className = btnClass;
  button.addEventListener('click', function (event) {
    return (0, _downloadResults2.default)({ event: event, type: type, data: data });
  });
  element.parentNode.insertBefore(button, element.nextSibling);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportImage;

var _domToImage = __webpack_require__(41);

var _domToImage2 = _interopRequireDefault(_domToImage);

var _fileSaver = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exportImage(obj) {
  var node = obj.node,
      quality = obj.quality,
      bgcolor = obj.bgcolor;

  if (quality) {
    if (quality < 0 || quality > 1) throw Error('Please provide image quality between 0 and 1');
    _domToImage2.default.toBlob(node, { quality: quality, bgcolor: bgcolor }).then(function (blob) {
      (0, _fileSaver.saveAs)(blob, 'chart.jpeg');
    });
  }

  if (!quality) {
    _domToImage2.default.toBlob(node).then(function (blob) {
      (0, _fileSaver.saveAs)(blob, 'chart.png');
    });
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportData;
function generateCsvContent(data) {
  var csvContent = '';

  data.forEach(function (row, i) {
    row.forEach(function (cell, j) {
      csvContent += String(cell).replace(/,/g, '');
      if (row.length > j + 1) {
        csvContent += ',';
      }
    });
    if (data.length > i + 1) {
      csvContent += '\n';
    }
  });
  return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}

function exportData(obj) {
  var type = obj.type,
      data = obj.data;

  var supportedFormats = ['json', 'csv'];
  var format = type.toLowerCase();
  if (!supportedFormats.includes(type)) {
    throw new Error('This type is not supported');
  }

  var fileName = 'chart';
  var fileFormat = supportedFormats[0];
  var content = '';

  if (format === 'json') {
    content = 'data:text/json;charset=utf-8, ' + encodeURIComponent(JSON.stringify(data));
  }

  if (format === 'csv') {
    content = generateCsvContent(data);
    fileFormat = format;
  }

  var htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', content);
  htmlElement.setAttribute('download', fileName + '.' + fileFormat);
  document.body.appendChild(htmlElement);
  htmlElement.click();
  document.body.removeChild(htmlElement);
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 *
 * Rangeable
 * Copyright (c) 2018 Karl Saunders (mobius1(at)gmx(dot)com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 0.1.6
 *
 */
(function(i,j){ true?module.exports=j("Rangeable"):undefined})("undefined"==typeof global?this.window||this.global:global,function(){var i=function(s,t){var u=document.createElement(s);return t&&u.classList.add(t),u},j=function(s){return s&&"function"==typeof s},o=function(s,t,u){var v;return function(){if(u=u||this,!v)return s.apply(u,arguments),v=!0,setTimeout(function(){v=!1},t)}},q=function(s,t){this.plugins=["ruler"],"string"==typeof s&&(s=document.querySelector(s)),this.input=s,this.config=Object.assign({},{type:"single",tooltips:"always",updateThrottle:30,formatTooltip:function(u){return u},classes:{input:"rangeable-input",container:"rangeable-container",vertical:"rangeable-vertical",progress:"rangeable-progress",handle:"rangeable-handle",track:"rangeable-track",multiple:"rangeable-multiple",disabled:"rangeable-disabled",tooltips:"rangeable-tooltips",tooltip:"rangeable-tooltip",visible:"rangeable-tooltips--visible"}},t),this.mouseAxis={x:"clientX",y:"clientY"},this.trackSize={x:"width",y:"height"},this.trackPos={x:"left",y:"top"},this.lastPos=0,this.double="double"===this.config.type||Array.isArray(this.config.value),this.touch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,this.version="0.1.6",this.init(),this.onInit()},r=q.prototype;return r.init=function(){if(!this.input.rangeable){var t,s={min:0,max:100,step:1,value:this.input.value};for(t in s)this.input[t]||(this.input[t]=s[t]),void 0!==this.config[t]&&(this.input[t]=this.config[t]);this.axis=this.config.vertical?"y":"x",this.input.rangeable=this,this.double?(this.input.values=this.config.value?this.config.value:[this.input.min,this.input.max],this.input.defaultValues=this.input.values.slice()):this.input.defaultValue||(this.input.defaultValue=this.input.value),this.render(),this.initialised=!0}},r.render=function(){var s=this,t=this.config,u=t.classes,v=i("div",u.container),w=i("div",u.track),x=i("div",u.progress),y=i("div",u.handle),z=i("div",u.tooltip);if(this.input.tabIndex=-1,this.double){y=[i("div",u.handle),i("div",u.handle)],z=[];for(var A=0;3>A;A++)z[A]=i("div",u.tooltip);y.forEach(function(C,D){C.index=D,x.appendChild(C),C.appendChild(z[D]),C.tabIndex=1,t.controls&&t.controls[D]&&t.controls[D].locked&&!0===t.controls[D].locked&&(C.locked=!0)}),t.vertical&&x.appendChild(y[0]),x.appendChild(z[2]),v.classList.add(u.multiple)}else x.appendChild(y),y.appendChild(z),y.tabIndex=1,t.controls&&t.controls.locked&&!0===t.controls.locked&&(y.locked=!0);if(v.appendChild(w),t.vertical&&v.classList.add(u.vertical),t.size&&(v.style[this.trackSize[this.axis]]=isNaN(t.size)?t.size:t.size+"px"),t.tooltips&&(v.classList.add(u.tooltips),"string"==typeof t.tooltips&&"always"===t.tooltips&&v.classList.add(u.visible)),this.nodes={container:v,track:w,progress:x,handle:y,tooltip:z},this.double){this.nodes.buffer=[];var B=i("div","rangeable-buffers");this.input.values.forEach(function(C,D){var E=i("div","rangeable-buffer");B.appendChild(E),s.nodes.buffer.push(E),w.appendChild(B),t.controls&&(s.limits=[{},{}],void 0!==t.controls[D].min&&(s.limits[D].min=t.controls[D].min),void 0!==t.controls[D].max&&(s.limits[D].max=t.controls[D].max))})}else y=i("div","rangeable-buffer"),w.appendChild(y),this.nodes.buffer=y,w.appendChild(y),t.controls&&(this.limits={},void 0!==t.controls.min&&(this.limits.min=t.controls.min),void 0!==t.controls.max&&(this.limits.max=t.controls.max));this.setLimits(t.controls),w.appendChild(x),this.input.parentNode.insertBefore(v,this.input),v.insertBefore(this.input,w),this.input.classList.add(u.input),this.bind(),this.update()},r.reset=function(){this.double?this.input.defaultValues.forEach(this.setValue,this):this.setValue(this.input.defaultValue),this.onEnd()},r.setValueFromPosition=function(s){var t=this.getLimits(),u=parseFloat(this.input.step),v=this.touch?s.touches[0][this.mouseAxis[this.axis]]:s[this.mouseAxis[this.axis]],w=v-this.rects.container[this.trackPos[this.axis]],x=this.rects.container[this.trackSize[this.axis]];return"mousedown"===s.type&&(!this.double&&this.nodes.handle.contains(s.target)||this.double&&(this.nodes.handle[0].contains(s.target)||this.nodes.handle[1].contains(s.target)))?!1:(s=(this.config.vertical?100*((x-w)/x):100*(w/x))*(t.max-t.min)/100+t.min,s=Math.ceil(s/u)*u,v>=this.lastPos&&(s-=u),parseFloat(s)!==parseFloat(this.startValue)&&void(u=!1,this.double&&(u=this.activeHandle.index),s=this.limit(s,u),this.setValue(s,u)))},r.start=function(s){return s.preventDefault(),this.startValue=this.getValue(),this.onStart(),this.nodes.container.classList.add("dragging"),this.recalculate(),this.activeHandle=this.getHandle(s),!!this.activeHandle&&void(this.activeHandle.classList.add("active"),this.setValueFromPosition(s),this.touch?(document.addEventListener("touchmove",this.events.move,!1),document.addEventListener("touchend",this.events.stop,!1),document.addEventListener("touchcancel",this.events.stop,!1)):(document.addEventListener("mousemove",this.events.move,!1),document.addEventListener("mouseup",this.events.stop,!1)))},r.move=function(s){this.setValueFromPosition(s),this.lastPos=this.touch?s.touches[0][this.mouseAxis[this.axis]]:s[this.mouseAxis[this.axis]]},r.stop=function(){this.stopValue=this.getValue(),this.nodes.container.classList.remove("dragging"),this.onEnd(),this.activeHandle.classList.remove("active"),this.activeHandle=!1,this.touch?(document.removeEventListener("touchmove",this.events.move),document.removeEventListener("touchend",this.events.stop),document.removeEventListener("touchcancel",this.events.stop)):(document.removeEventListener("mousemove",this.events.move),document.removeEventListener("mouseup",this.events.stop)),this.startValue!==this.stopValue&&this.input.dispatchEvent(new Event("change")),this.startValue=null},r.keydown=function(s){var t=this,u=function(v){switch(s.key){case"ArrowRight":case"ArrowUp":t.stepUp(v);break;case"ArrowLeft":case"ArrowDown":t.stepDown(v);}};this.double?this.nodes.handle.forEach(function(v){v===document.activeElement&&u(v.index)}):this.nodes.handle===document.activeElement&&u()},r.stepUp=function(s){var t=parseFloat(this.input.step),u=this.getValue();this.double&&void 0!==s&&(u=u[s]),t=this.limit(parseFloat(u)+t,s),this.setValue(t,s)},r.stepDown=function(s){var t=parseFloat(this.input.step),u=this.getValue();this.double&&void 0!==s&&(u=u[s]),t=this.limit(parseFloat(u)-t,s),this.setValue(t,s)},r.limit=function(s,t){var u=this.input,v=this.getLimits();return s=parseFloat(s),this.double&&void 0!==t?(!t&&s>u.values[1]?s=u.values[1]:0<t&&s<u.values[0]&&(s=u.values[0]),this.limits)&&(t?s>this.limits[1].max?s=this.limits[1].max:s<this.limits[1].min&&(s=this.limits[1].min):s>this.limits[0].max?s=this.limits[0].max:s<this.limits[0].min&&(s=this.limits[0].min)):this.limits&&(s>this.limits.max?s=this.limits.max:s<this.limits.min&&(s=this.limits.min)),s>v.max?s=v.max:s<v.min&&(s=v.min),s=parseFloat(s),s=s.toFixed(this.accuracy)},r.recalculate=function(){var s=[];this.double?this.nodes.handle.forEach(function(t,u){s[u]=t.getBoundingClientRect()}):s=this.nodes.handle.getBoundingClientRect(),this.rects={handle:s,container:this.nodes.container.getBoundingClientRect()}},r.update=function(){var s=this;this.recalculate(),this.accuracy=0,this.input.step.includes(".")&&(this.accuracy=(this.input.step.split(".")[1]||[]).length);var t=this.getValue(),u=this.getLimits(),v=this.rects.container[this.trackSize[this.axis]],w=function(x,y,z){x.style[s.config.vertical?"bottom":"left"]=y+"px",x.style[s.trackSize[s.axis]]=z/u.max*v-y+"px"};this.double?(this.limits&&this.limits.forEach(function(x,y){w(s.nodes.buffer[y],x.min/u.max*v,x.max)}),this.input.values.forEach(function(x,y){s.setValue(s.limit(x,y),y)})):(this.limits&&w(this.nodes.buffer,this.limits.min/u.max*v,this.limits.max),this.setValue(this.limit(t)))},r.getValue=function(){return this.double?this.input.values:this.input.value},r.setValue=function(s,t){var u=this.nodes;if(this.double&&void 0===t)return!1;void 0===s&&(s=this.input.value),s=this.limit(s,t);var v=this.initialised&&(s!==this.input.value||this.nativeEvent),w=this.config.formatTooltip;if(this.double){var x=this.input.values;if(x[t]=s,this.config.tooltips){u.tooltip[t].textContent=w.call(this,s);var y=u.tooltip[0].getBoundingClientRect(),z=u.tooltip[1].getBoundingClientRect();y=!(y.right<z.left||y.left>z.right||y.bottom<z.top||y.top>z.bottom),u.container.classList.toggle("combined-tooltip",y),y&&(u.tooltip[2].textContent=x[0]===x[1]?w.call(this,x[0]):w.call(this,x[0])+" - "+w.call(this,x[1]))}}else this.input.value=s,u.tooltip.textContent=w.call(this,s);this.setPosition(s,t),v&&(this.onChange(),this.nativeEvent||this.input.dispatchEvent(new Event("input")),this.nativeEvent=!1)},r.native=function(){this.nativeEvent=!0,this.setValue()},r.getLimits=function(){return{min:parseFloat(this.input.min),max:parseFloat(this.input.max)}},r.setLimits=function(s){var t=this;if(void 0===s)return!1;this.limits||(this.limits=s);var u=function(v,w){void 0!==w.min&&(v.min=w.min),void 0!==w.max&&(v.max=w.max)};this.double?s.forEach(function(v,w){u(t.limits[w],v)}):u(this.limits,s),this.update()},r.setPosition=function(s){if(this.double){s=this.getPosition(this.input.values[0]);var t=this.getPosition(this.input.values[1]);this.nodes.progress.style[this.config.vertical?"bottom":"left"]=s+"px",s=t-s}else s=this.getPosition();this.nodes.progress.style[this.trackSize[this.axis]]=s+"px"},r.getPosition=function(s){void 0===s&&(s=this.input.value);var t=this.getLimits();return(s-t.min)/(t.max-t.min)*this.rects.container[this.trackSize[this.axis]]},r.getHandle=function(s){if(!this.double)return!this.nodes.handle.locked&&this.nodes.handle;var t=this.rects,u=Math.abs(s[this.mouseAxis[this.axis]]-t.handle[0][this.trackPos[this.axis]]);return t=Math.abs(s[this.mouseAxis[this.axis]]-t.handle[1][this.trackPos[this.axis]]),(s=s.target.closest("."+this.config.classes.handle))||(s=u>t?this.nodes.handle[1]:this.nodes.handle[0]),!s.locked&&s},r.enable=function(){this.input.disabled&&(this.nodes.container.addEventListener(this.touch?"touchstart":"mousedown",this.events.start,!1),this.double?this.nodes.handle.forEach(function(s){return s.tabIndex=1}):this.nodes.handle.tabIndex=1,this.nodes.container.classList.remove(this.config.classes.disabled),this.input.disabled=!1)},r.disable=function(){this.input.disabled||(this.nodes.container.removeEventListener(this.touch?"touchstart":"mousedown",this.events.start),this.double?this.nodes.handle.forEach(function(s){return s.removeAttribute("tabindex")}):this.nodes.handle.removeAttribute("tabindex"),this.nodes.container.classList.add(this.config.classes.disabled),this.input.disabled=!0)},r.bind=function(){var s=this;this.events={},"start move stop update reset native keydown".split(" ").forEach(function(t){s.events[t]=s[t].bind(s)}),this.events.scroll=o(this.events.update,this.config.updateThrottle),this.events.resize=o(this.events.update,this.config.updateThrottle),document.addEventListener("scroll",this.events.scroll,!1),window.addEventListener("resize",this.events.resize,!1),document.addEventListener("keydown",this.events.keydown,!1),this.nodes.container.addEventListener(this.touch?"touchstart":"mousedown",this.events.start,!1),this.input.addEventListener("input",this.events.native,!1),this.input.form&&this.input.form.addEventListener("reset",this.events.reset,!1)},r.unbind=function(){document.removeEventListener("scroll",this.events.scroll),window.removeEventListener("resize",this.events.resize),document.removeEventListener("keydown",this.events.keydown),this.nodes.container.removeEventListener(this.touch?"touchstart":"mousedown",this.events.start),this.input.removeEventListener("input",this.events.native),this.input.form&&this.input.form.removeEventListener("reset",this.events.reset),this.events=null},r.destroy=function(){this.input.rangeable&&(this.unbind(),this.input.classList.remove(this.config.classes.input),this.nodes.container.parentNode.replaceChild(this.input,this.nodes.container),delete this.input.rangeable,this.initialised=!1)},r.onInit=function(){j(this.config.onInit)&&this.config.onInit.call(this,this.getValue())},r.onStart=function(){j(this.config.onStart)&&this.config.onStart.call(this,this.getValue())},r.onChange=function(){j(this.config.onChange)&&this.config.onChange.call(this,this.getValue())},r.onEnd=function(){j(this.config.onEnd)&&this.config.onEnd.call(this,this.getValue())},q});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = exports.Dataviz = exports.keenGlobals = exports.extendKeenGlobalObject = undefined;

var _index = __webpack_require__(22);

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
  env.KeenDataviz = _index.Dataviz;
  env.KeenDataset = _index.Dataset;

  // just for backward compatibility
  env.Keen = env.Keen || {};
  env.Keen.Dataset = _index.Dataset;
  env.Keen.Dataviz = _index.Dataviz;
};

if (false) {}

var keenGlobals = exports.keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  exports.keenGlobals = keenGlobals = webpackKeenGlobals;
}

exports.default = _index.Dataviz;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dataset = exports.Dataviz = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env browser */


// Utils


var _dataset = __webpack_require__(12);

Object.defineProperty(exports, 'Dataset', {
  enumerable: true,
  get: function get() {
    return _dataset.Dataset;
  }
});

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _c = __webpack_require__(10);

var _c2 = _interopRequireDefault(_c);

var _package = __webpack_require__(32);

var _package2 = _interopRequireDefault(_package);

var _data = __webpack_require__(33);

var _data2 = _interopRequireDefault(_data);

var _each = __webpack_require__(0);

var _assertDateString = __webpack_require__(11);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

var _stripHtmlTags = __webpack_require__(15);

var _escapeHtml = __webpack_require__(4);

var _libraries = __webpack_require__(34);

var _libraries2 = _interopRequireDefault(_libraries);

var _extendDeep = __webpack_require__(16);

var _exportSvg = __webpack_require__(18);

var _exportSvg2 = _interopRequireDefault(_exportSvg);

var _exportData = __webpack_require__(19);

var _exportData2 = _interopRequireDefault(_exportData);

var _renderDownloadBtn = __webpack_require__(17);

var _renderDownloadBtn2 = _interopRequireDefault(_renderDownloadBtn);

var _renderExecutionMetadata = __webpack_require__(53);

var _renderExecutionMetadata2 = _interopRequireDefault(_renderExecutionMetadata);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

var _index = __webpack_require__(54);

var _index2 = _interopRequireDefault(_index);

var _tooltipContents = __webpack_require__(58);

var _tooltipContents2 = _interopRequireDefault(_tooltipContents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Constructor
var Dataviz = exports.Dataviz = function Dataviz() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (this instanceof Dataviz === false) {
    return new Dataviz(options);
  }

  this.c3 = _c2.default; // expose for use outside
  this.d3 = d3;

  var datavizInstance = this;
  var defaultOptions = {
    showDeprecationWarnings: true,
    showLoadingSpinner: false,

    container: undefined, // querySelector of container, for example '#someDiv'
    containerElement: undefined, // HTML parent element for the chart

    // width: undefined, *deprecated* - use CSS
    // height: undefined, *deprecated* - use CSS

    title: undefined,
    showTitle: true,

    subtitle: undefined,

    notes: undefined,
    theme: 'keen-dataviz',

    colors: ['#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb', '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e', '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'],

    colorMapping: {},
    ui: {
      executionMetadata: true
    },
    utils: {
      clickToCopyToClipboard: true
    },

    indexBy: 'timeframe.start',
    labels: [],
    labelMapping: {},
    labelMappingRegExp: undefined,
    errorMapping: {},
    showErrorMessages: true,
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
      alignment: 'top',
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
      },
      sort: undefined
    },

    axis: {},
    color: {},
    size: {
      // control it with CSS of .c3-chart
    },
    padding: {
      top: 15
    },
    point: {
      focus: {
        expand: {
          enabled: false
        }
      },
      r: 2,
      show: true,
      sensitivity: 300
    },
    tooltip: {
      horizontal: true,
      contents: _tooltipContents2.default,
      format: {
        // https://c3js.org/samples/tooltip_format.html
      }
    },
    transition: {
      // duration: 0
    },
    data: {
      order: null,
      selection: {
        enabled: true,
        draggable: true,
        multiple: true
      },
      onselected: function onselected(d, element) {
        var selectedItems = _this.view._artifacts.c3.selected();
        var sum = selectedItems.reduce(function (prev, curr) {
          return prev + curr.value;
        }, 0);
        (0, _copyToClipboard2.default)(sum);
      }
    },
    grid: {
      y: {
        show: true
      }
    },
    partialIntervalIndicator: {
      show: undefined,
      className: 'partial-interval-indicator'
    },
    timezone: 'UTC',
    table: {
      schema: 'static'
    },
    renderOnVisible: false,
    funnel: {
      lines: true,
      resultValues: true,
      percents: {
        show: false,
        countingMethod: 'absolute',
        decimals: 0
      },
      marginBetweenElements: false,
      hover: true,
      effect3d: 'both-sides',
      minimalSize: false
    },
    react: false,
    range: false,
    sparkline: false,
    choropleth: {
      map: 'world',
      borders: {
        show: true,
        size: 0.5,
        color: '#000'
      },
      showSlider: false
    },
    heatmap: {}
  };

  this.config = _extends({}, (0, _extendDeep.extendDeep)(defaultOptions, options));

  if (options.palette) {
    if (!_index2.default[options.palette]) {
      console.log('Colors pallete not found', options.palette);
    }
    this.config.colors = _index2.default[options.palette].colors;
  }

  if (this.config.type) {
    // backward compatibility with v2016... areachart -> area
    this.config.type = convertChartTypes(this.config.type);
  }

  // overwriting options for range chart
  if (this.config.type && this.config.type.includes('-range')) {
    this.config.range = true;
    this.config.type = this.config.type.replace('-range', '');
    this.config.legend.show = false;
    this.config.stacking = 'normal';
    this.config.labels = ['Max', 'Min'];
    this.config.colors = [this.config.colors[0], this.config.colors[0]];
  }

  // overwriting stacked when stacking added
  if (this.config.stacking) {
    this.config.stacked = true;
  }

  // overwriting options for sparkline chart
  if (this.config.sparkline) {
    this.config.legend.show = false;
    this.config.axis = {
      x: {
        show: false
      },
      y: {
        show: false
      }
    };
    this.config.grid = {
      x: {
        show: false
      },
      y: {
        show: false
      }
    };
  }

  // get DOM node by query
  if (this.config.container) {
    this.el(this.config.container);
  }

  if (options.legend !== undefined && !options.legend) {
    this.config.legend = _extends({}, options, {
      show: false
    });
  }

  if (options.color && options.color.pattern) {
    // to match c3 options
    this.config.colors = options.color.pattern;
  }

  if (this.config.legend && this.config.legend.tooltip && this.config.legend.tooltip.show === false && this.config.tooltip.show === undefined) {
    this.config.tooltip = { show: false };
  }

  this.dataset = new _dataset.Dataset(this.config);
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
  this.config.firstVisibilityState = document.visibilityState;

  if (!this.config.utils.clickToCopyToClipboard) {
    this.config.data.onselected = function () {};
  }

  if (options.data && options.data.onselected) {
    this.config.data.onselected = function (d, element) {
      var callback = options.data.onselected.bind(null, d, element);
      callback();

      if (_this.config.utils.clickToCopyToClipboard) {
        var selectedItems = _this.view._artifacts.c3.selected();
        var sum = selectedItems.reduce(function (prev, curr) {
          return prev + curr.value;
        }, 0);
        (0, _copyToClipboard2.default)(sum);
      }
    };
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

function mapLabelsExec(_ref) {
  var datavizInstance = _ref.datavizInstance,
      value = _ref.value;

  if (datavizInstance.config.labelMappingRegExp) {
    var valueAfterMatching = value;
    datavizInstance.config.labelMappingRegExp.forEach(function (regExpAndLabel) {
      if (regExpAndLabel.length > 1) {
        var regExpObj = regExpAndLabel[0];
        if (regExpObj.test(value)) {
          valueAfterMatching = regExpAndLabel[1];
        }
      }
    });
    return (0, _stripHtmlTags.stripHtmlTags)(valueAfterMatching);
  }
  if (datavizInstance.config.labelMapping[value]) {
    return (0, _stripHtmlTags.stripHtmlTags)(String(datavizInstance.config.labelMapping[value]));
  }
  return (0, _stripHtmlTags.stripHtmlTags)(value);
}

function mapLabels(datavizInstance) {
  // Write labels
  if (!datavizInstance.config.labelMappingDimension) {
    // if not defined use deprecated auto-detecting
    if (datavizInstance.data()[0].length === 2 && !(0, _assertDateString2.default)(datavizInstance.data()[1][0])) {
      datavizInstance.config.labelMappingDimension = 'row';
    } else {
      datavizInstance.config.labelMappingDimension = 'column';
    }
  }

  if (datavizInstance.config.labelMappingDimension === 'row' || datavizInstance.config.labelMappingDimension === 'both') {
    datavizInstance.dataset.updateColumn(0, function (value) {
      return mapLabelsExec({ datavizInstance: datavizInstance, value: value });
    }.bind(datavizInstance));
  }

  if (datavizInstance.config.labelMappingDimension === 'column' || datavizInstance.config.labelMappingDimension === 'both') {
    datavizInstance.dataset.updateRow(0, function (value) {
      return mapLabelsExec({ datavizInstance: datavizInstance, value: value });
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
  var _this2 = this;

  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  var datavizInstance = this;

  if (!!results) {
    var firstResult = results[0] || results;
    if (firstResult.query && firstResult.query.interval && firstResult.query.timeframe && typeof firstResult.query.timeframe === 'string' && firstResult.query.timeframe.includes('this_') && this.config.partialIntervalIndicator && this.config.partialIntervalIndicator.show === undefined) {
      this.config.partialIntervalIndicator.show = true;
    }

    if (Array.isArray(results)) {
      var timeframes = results.map(function (resultItem) {
        return resultItem.query.timeframe;
      });
      timeframes.forEach(function (resultTimeframe) {
        var foundDifferent = timeframes.find(function (timeframeItem) {
          return JSON.stringify(timeframeItem) !== JSON.stringify(resultTimeframe);
        });
        if (foundDifferent) {
          var msg = 'Timeframes of the queries should be the same';
          console.error(msg);
          throw msg;
        }
      });
      // first result is important to prepare X on the chart
      return datavizInstance.data(results[0]).call(function () {
        var input = results[0];
        _this2.dataset.deleteColumn(1);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var result = _step.value;

            var label = input.query.event_collection + ' ' + input.query.analysis_type;
            var ds2 = _dataset.Dataset.parser('interval')(result);
            datavizInstance.dataset.appendColumn(label, ds2.selectColumn(1).slice(1));
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
      }).render();
    }

    return datavizInstance.data(results).render();
  }
  if (!!this.config.labelMapping && Object.keys(this.config.labelMapping).length > 0 || !!this.config.labelMappingRegExp && this.config.labelMappingRegExp.length > 0) {
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

  var returnValue = datavizInstance;

  if (datavizInstance.config.renderAsPromise) {
    returnValue = new Promise(function (resolve, reject) {
      var customCallback = _this2.config.onrendered;
      datavizInstance.config.onrendered = function () {
        if (customCallback) {
          customCallback();
        }
        resolve(datavizInstance);
      };
    });
  }

  domReady(function () {
    var shouldRenderExecutionMetadata = datavizInstance.execution_metadata && datavizInstance.config.ui && datavizInstance.config.ui.executionMetadata;
    var shouldRenderDownloadBtn = datavizInstance.config.ui && datavizInstance.config.ui.buttons && datavizInstance.config.ui.buttons.download && datavizInstance.config.ui.buttons.download.type;
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
        var mappedMsg = this.config.errorMapping[_msg2] || _msg2;
        datavizInstance.message(mappedMsg);
        throw _msg2;
        return;
      } else {
        buildDomWrapper(containerElement, datavizInstance.config);
        if (shouldRenderDownloadBtn) {
          (0, _renderDownloadBtn2.default)({
            element: containerElement,
            data: datavizInstance.dataset.matrix,
            type: datavizInstance.config.ui.buttons.download.type,
            label: datavizInstance.config.ui.buttons.download.label
          });
        }
        if (shouldRenderExecutionMetadata) {
          (0, _renderExecutionMetadata2.default)({
            element: containerElement,
            data: datavizInstance.execution_metadata
          });
        }
        var renderOnVisible = datavizInstance.config.renderOnVisible;

        if (renderOnVisible) {
          if (typeof IntersectionObserver !== 'undefined') {
            var chartVisibleCallback = function chartVisibleCallback(events, observer) {
              events.forEach(function (el) {
                if (el.isIntersecting) {
                  if (!datavizInstance.view._rendered) {
                    Dataviz.libraries[library][type].render.call(datavizInstance);
                    datavizInstance.view._rendered = true;
                  }
                }
              });
            };
            var observer = new IntersectionObserver(chartVisibleCallback);
            observer.observe(containerElement);
            return;
          }
        }
        if (datavizInstance.config.firstVisibilityState === 'hidden') {
          if (typeof document !== 'undefined') {
            var hidden = void 0,
                visibilityChange = void 0;
            if (typeof document.hidden !== "undefined") {
              hidden = "hidden";
              visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
              hidden = "msHidden";
              visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
              hidden = "webkitHidden";
              visibilityChange = "webkitvisibilitychange";
            }
            var handleVisibilityChange = function handleVisibilityChange() {
              if (!document[hidden] && datavizInstance.view._artifacts.c3) {
                datavizInstance.view._artifacts.c3.load(datavizInstance.dataset.matrix);
              }
            };
            if (typeof document.addEventListener !== "undefined" || hidden !== undefined) {
              document.addEventListener(visibilityChange, handleVisibilityChange, {
                once: true
              });
            }
          }
        }
        Dataviz.libraries[library][type].render.call(datavizInstance);
        datavizInstance.view._rendered = true;
      }
    }
  });

  return returnValue;
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

Dataviz.prototype.exportImage = function () {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$quality = _ref2.quality,
      quality = _ref2$quality === undefined ? 0 : _ref2$quality,
      _ref2$bgcolor = _ref2.bgcolor,
      bgcolor = _ref2$bgcolor === undefined ? '#fff' : _ref2$bgcolor;

  (0, _exportSvg2.default)({
    node: this.config.containerElement,
    quality: quality,
    bgcolor: bgcolor
  });
};

Dataviz.prototype.exportData = function () {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';

  (0, _exportData2.default)({
    data: this.dataset.matrix,
    type: type
  });
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

Dataviz.version = _package2.default.version;

// Private

function buildDomWrapper(el, options) {
  var html = '';
  var chart100percentWide = '';
  var rangeChart = '';
  if (options.legend.position === 'top' || options.legend.position === 'bottom') {
    chart100percentWide = 'c3-chart-100-percent';
  }
  if (options.range) {
    rangeChart = 'keen-dataviz-range';
  }
  var container = '<div class="c3-chart ' + chart100percentWide + ' ' + rangeChart + '"></div>';
  var verticalAlignment = ['top', 'middle', 'bottom'];
  var horizontalAlignment = ['left', 'center', 'right'];
  var align = 'horizontal';
  var legendItemsAlign = 'center';
  if (horizontalAlignment.includes(options.legend.alignment)) {
    legendItemsAlign = options.legend.alignment;
  }
  if (options.legend.position === 'left' || options.legend.position === 'right') {
    align = 'vertical';
    if (verticalAlignment.includes(options.legend.alignment)) {
      legendItemsAlign = options.legend.alignment;
    }
  }
  if (options.legend && options.legend.show) {
    if (options.legend.position === 'top' || options.legend.position === 'left') {
      container = '<div class="keen-c3-legend keen-c3-legend-' + align + ' keen-c3-legend-' + options.legend.position + ' keen-c3-legend-align-' + legendItemsAlign + '"></div>' + container;
    } else {
      container = container + '<div class="keen-c3-legend keen-c3-legend-' + align + ' keen-c3-legend-' + options.legend.position + ' keen-c3-legend-align-' + legendItemsAlign + '"></div>';
    }
  }
  if (!options.react) {
    html += '<div class="' + options.theme + '">';
  }
  if (options.title && options.showTitle) {
    html += '<div class="keen-dataviz-title ' + options.theme + '-title">' + options.title + '</div>';
  }
  if (options.subtitle) {
    html += '<div class="keen-dataviz-subtitle ' + options.theme + '-subtitle">' + options.subtitle + '</div>';
  }
  html += '<div class="keen-dataviz-rendering keen-dataviz-rendering-' + align + ' ' + options.theme + '-rendering ' + options.theme + '-rendering-' + align + '">' + container + '</div>';
  if (options.notes) {
    html += '<div class="keen-dataviz-notes ' + options.theme + '-notes">' + options.notes + '</div>';
  }
  if (!options.react) {
    html += '</div>';
  }

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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertColumn = insertColumn;
exports.insertRow = insertRow;

var _each = __webpack_require__(0);

var _createNullList = __webpack_require__(9);

var _createNullList2 = _interopRequireDefault(_createNullList);

var _append = __webpack_require__(8);

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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortColumns = sortColumns;
exports.sortRows = sortRows;

var _each = __webpack_require__(0);

var _analyses = __webpack_require__(13);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateColumn = updateColumn;
exports.updateRow = updateRow;

var _each = __webpack_require__(0);

var _createNullList = __webpack_require__(9);

var _createNullList2 = _interopRequireDefault(_createNullList);

var _append = __webpack_require__(8);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initialize;

var _each = __webpack_require__(0);

var _flatten = __webpack_require__(14);

var _object = __webpack_require__(30);

var _createExtractionKeys = __webpack_require__(31);

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
  var config = this.config;
  return function (res) {
    var datasetExtraction = new Dataset().type('extraction');

    var datasetKeys = (0, _createExtractionKeys.createExtractionKeys)(res.result);
    var names = Array.from(datasetKeys);

    var tableConfig = config && config.table;
    if (tableConfig && tableConfig.schema === 'dynamic') {
      var results = res.result;
      var keys = {};
      results.forEach(function (resultItem) {
        var resultKeys = Object.keys((0, _flatten.flatten)(resultItem));
        if (resultKeys && resultKeys.length) {
          resultKeys.forEach(function (keyName) {
            if (!keys[keyName]) {
              keys[keyName] = true;
            }
          });
        }
      });
      names = Object.keys(keys);
    }

    var nameI = 0;
    names.forEach(function (value) {
      datasetExtraction.set([value, '0'], value);
      nameI++;
    });

    if (Dataset) {
      if (config && config.table && config.table.columns) {
        names = config.table.columns;
      }
    }

    for (var i = 0; i < res.result.length; i++) {
      var record = [i + 1];
      for (var iNames = 0; iNames < names.length; iNames++) {
        record.push((0, _object.valueAtDeepKey)(res.result[i], names[iNames]));
      }
      datasetExtraction.matrix[String(i + 1)] = record;
    }

    datasetExtraction.deleteColumn(0);

    return datasetExtraction;
  };
}

function parseHeatmapAxis() {
  return function (res) {
    var heatmapDataset = new Dataset().type('heatmap');

    (0, _each.each)(res.result, function (value, i) {
      var objKeys = Object.keys(value);
      var x = value[objKeys[0]];
      var y = value[objKeys[1]];
      heatmapDataset.appendRow([String(x), String(y), value.result]);
    });
    return heatmapDataset;
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
  extraction: parseExtraction,
  'heatmap-axis': parseHeatmapAxis
};

/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExtractionKeys = createExtractionKeys;

var _flatten = __webpack_require__(14);

function createExtractionKeys(results) {
  var keys = new Set();
  results.forEach(function (result) {
    Object.keys((0, _flatten.flatten)(result)).map(function (key) {
      keys.add(key);
    });
  });

  return keys;
}

/***/ }),
/* 32 */
/***/ (function(module) {

module.exports = {"name":"keen-dataviz","description":"Data Visualization SDK for Keen IO","license":"MIT","version":"3.15.0","main":"dist/external_d3_c3/node/keen-dataviz.js","browser":"dist/external_d3_c3/keen-dataviz.js","style":"dist/keen-dataviz.css","scripts":{"start":"concurrently --kill-others \"NODE_ENV=development webpack-dev-server\" \"npm run postcss-watch\"","postcss-watch":"node_modules/postcss-cli/bin/postcss lib/style/keen-dataviz-c3.css -o test/demo/keen-dataviz.css --watch --config postcss.config.js","build":"NODE_ENV=production webpack -p && npm run build:css && NODE_ENV=production OPTIMIZE_MINIMIZE=1 webpack -p && npm run build:css && npm run build:css:min && npm run build:external_d3_c3 && npm run build:external_d3_c3:css && npm run build:external_d3_c3:css:min && npm run build:node","build:css":"node_modules/postcss-cli/bin/postcss lib/style/keen-dataviz-c3.css -o dist/keen-dataviz.css --config postcss.config.js","build:css:min":"OPTIMIZE_MINIMIZE=1 node_modules/postcss-cli/bin/postcss lib/style/keen-dataviz-c3.css -o dist/keen-dataviz.min.css --config postcss.config.js","build:external_d3_c3:css":"node_modules/postcss-cli/bin/postcss lib/style/keen-dataviz.css -o dist/external_d3_c3/keen-dataviz.css --config postcss.config.js","build:external_d3_c3:css:min":"OPTIMIZE_MINIMIZE=1 node_modules/postcss-cli/bin/postcss lib/style/keen-dataviz.css -o dist/external_d3_c3/keen-dataviz.min.css --config postcss.config.js","build:external_d3_c3":"NODE_ENV=production EXTERNAL_D3_C3=1 webpack -p && NODE_ENV=production EXTERNAL_D3_C3=1 OPTIMIZE_MINIMIZE=1 webpack -p","build:node":"TARGET=node NODE_ENV=production EXTERNAL_D3_C3=1 webpack -p","profile":"webpack --profile --json > stats.json","analyze":"webpack-bundle-analyzer stats.json /dist","version":"npm run build && git add .","postversion":"git push && git push --tags && npm publish","test":"NODE_ENV=test jest","test:watch":"NODE_ENV=test jest --watch"},"repository":{"type":"git","url":"https://github.com/keen/keen-dataviz.js.git"},"bugs":"https://github.com/keen/keen-dataviz.js/issues","author":"Keen.IO <team@keen.io> (https://keen.io/)","contributors":["Dustin Larimer <dustin@keen.io> (https://github.com/dustinlarimer)","Joanne Cheng <joanne@keen.io> (https://github.com/joannecheng)","Eric Anderson <eric@keen.io> (https://github.com/aroc)","Joe Wegner <joe@keen.io> (https://github.com/josephwegner)","Sara Falkoff <sara@keen.io (https://github.com/sfalkoff)","Adam Kasprowicz <adam.kasprowicz@keen.io> (https://github.com/adamkasprowicz)","Dariusz Łacheta <dariusz.lacheta@keen.io> (https://github.com/dariuszlacheta)"],"homepage":"https://keen.io","keywords":["d3","c3","Analytics","Stats","Statistics","Visualization","Visualizations","Data Visualization","Chart","Charts","Charting","Svg","Dataviz","Plots","Graphs","Funnels"],"dependencies":{"c3":"^0.7.2","d3":"^5.11.0","dom-to-image":"^2.6.0","file-saver":"^2.0.1","promise-polyfill":"^8.0.0","rangeable":"^0.1.6"},"devDependencies":{"autoprefixer":"^8.2.0","babel-loader":"^7.1.4","babel-plugin-transform-es2015-modules-commonjs":"^6.26.2","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-preset-env":"^1.7.0","concurrently":"^3.5.1","cssnano":"^3.10.0","eslint":"^4.19.1","eslint-config-airbnb":"^16.1.0","eslint-loader":"^2.0.0","eslint-plugin-import":"^2.11.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-react":"^7.7.0","html-loader":"^0.5.5","html-webpack-plugin":"^3.2.0","jest":"^22.4.3","jest-environment-jsdom-c3":"^2.0.0","nock":"^9.2.6","postcss":"^6.0.21","postcss-cli":"^5.0.0","postcss-color-function":"^4.0.1","postcss-css-variables":"^0.8.1","postcss-cssnext":"^2.4.0","postcss-import":"^8.0.2","postcss-loader":"^2.1.3","precss":"^3.1.2","regenerator-runtime":"^0.11.1","replace-in-file":"^3.4.0","style-loader":"^0.20.3","webpack":"^4.29.0","webpack-bundle-analyzer":"^3.3.2","webpack-cli":"^3.2.1","webpack-dev-server":"^3.3.1","xhr-mock":"^2.3.2"}};

/***/ }),
/* 33 */
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
  }
  return parseResponse.call(this, data);
};

var _dataset = __webpack_require__(12);

var _dataset2 = _interopRequireDefault(_dataset);

var _extend = __webpack_require__(5);

var _stripHtmlTags = __webpack_require__(15);

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

      // x, y, value for heatmap
      if (this.config.type === 'heatmap' && Object.keys(response.result[0] === 3 && typeof response.result[0].result === 'number')) {
        parser = 'heatmap-axis';
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

    if (!parser) {
      parser = 'extraction';
    }
  }

  // Set title from saved query body, or create a default title
  if (this.config.title === undefined) {
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

  if (response.execution_metadata) {
    this.execution_metadata = response.execution_metadata;
  }

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
/* 34 */
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
        var c3Chart = chart.view._artifacts.c3;
        if (c3Chart) {
          var parentWidth = c3Chart.element.parentNode.parentNode.offsetWidth;
          var width = parentWidth;
          if (chart.config.legend && chart.config.legend.show && (chart.config.legend.position === 'left' || chart.config.legend.position === 'right')) {
            var nextSiblingWidth = c3Chart.element.nextSibling ? c3Chart.element.nextSibling.offsetWidth : 0;
            var prevSiblingWidth = c3Chart.element.previousSibling ? c3Chart.element.previousSibling.offsetWidth : 0;
            width = parentWidth - prevSiblingWidth - nextSiblingWidth;
          }

          c3Chart.resize({
            width: width
          });
        }
      });
    }, delay);
  });

  return defineC3();
};

var _c = __webpack_require__(10);

var _c2 = _interopRequireDefault(_c);

var _each = __webpack_require__(0);

var _extend = __webpack_require__(5);

var _extendDeep = __webpack_require__(16);

var _assertDateString = __webpack_require__(11);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

var _defaultDateFormat = __webpack_require__(35);

var _defaultDateFormat2 = _interopRequireDefault(_defaultDateFormat);

var _paginatingLegend = __webpack_require__(36);

var _paginatingLegend2 = _interopRequireDefault(_paginatingLegend);

var _calculateRange = __webpack_require__(37);

var _calculateRange2 = _interopRequireDefault(_calculateRange);

var _calculatePercents = __webpack_require__(38);

var _message = __webpack_require__(39);

var _message2 = _interopRequireDefault(_message);

var _metric = __webpack_require__(43);

var _metric2 = _interopRequireDefault(_metric);

var _table = __webpack_require__(44);

var _table2 = _interopRequireDefault(_table);

var _spinner = __webpack_require__(45);

var _spinner2 = _interopRequireDefault(_spinner);

var _funnel = __webpack_require__(46);

var _funnel2 = _interopRequireDefault(_funnel);

var _funnel3d = __webpack_require__(47);

var _funnel3d2 = _interopRequireDefault(_funnel3d);

var _horizontalFunnel = __webpack_require__(48);

var _horizontalFunnel2 = _interopRequireDefault(_horizontalFunnel);

var _horizontalFunnel3d = __webpack_require__(49);

var _horizontalFunnel3d2 = _interopRequireDefault(_horizontalFunnel3d);

var _metricCombo = __webpack_require__(50);

var _metricCombo2 = _interopRequireDefault(_metricCombo);

var _heatmap = __webpack_require__(51);

var _heatmap2 = _interopRequireDefault(_heatmap);

var _choropleth = __webpack_require__(52);

var _choropleth2 = _interopRequireDefault(_choropleth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;

function defineC3() {
  var types = {
    message: _message2.default,
    metric: _metric2.default,
    table: _table2.default,
    spinner: _spinner2.default,
    'funnel': new _funnel2.default(),
    'funnel-3d': new _funnel3d2.default(),
    'horizontal-funnel': new _horizontalFunnel2.default(),
    'horizontal-funnel-3d': new _horizontalFunnel3d2.default(),
    'metric-combo': new _metricCombo2.default(),
    'heatmap': new _heatmap2.default(),
    'choropleth': new _choropleth2.default()
  };

  var c3Types = [
  // Standard types
  'area', 'area-spline', 'area-step', 'bar', 'donut', 'gauge', 'line', 'pie', 'step', 'spline',

  // Horizontal variant types
  'horizontal-area', 'horizontal-area-spline', 'horizontal-area-step', 'horizontal-bar', 'horizontal-line', 'horizontal-step', 'horizontal-spline'];

  var getPaddings = function getPaddings(element, paddingName) {
    return parseInt(window.getComputedStyle(element)['padding' + paddingName].replace('px', ''));
  };

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
      }
    };

    var renderingElement = this.el();

    var height = renderingElement.offsetHeight;

    height -= getPaddings(renderingElement, 'Top') + getPaddings(renderingElement, 'Bottom');

    if (this.config.showTitle) {
      var titleElement = this.el().querySelector('.keen-dataviz-title');
      if (titleElement) {
        height -= titleElement.offsetHeight;
      } else {
        height -= parseInt(window.getComputedStyle(this.el(), null)['font-size'].replace('px', ''));
      }
    }

    if (this.config.subtitle) {
      var subtitleElement = this.el().querySelector('.keen-dataviz-subtitle');
      if (subtitleElement) {
        height -= subtitleElement.offsetHeight;
      } else {
        height -= parseInt(window.getComputedStyle(this.el(), null)['font-size'].replace('px', ''));
      }
    }

    if (this.config.notes) {
      var notesElement = this.el().querySelector('.keen-dataviz-notes');
      if (notesElement) {
        height -= notesElement.offsetHeight;
      } else {
        height -= parseInt(window.getComputedStyle(this.el(), null)['font-size'].replace('px', ''));
      }
    }

    var width = this.el().querySelector('.c3-chart').offsetWidth - (getPaddings(renderingElement, 'Left') + getPaddings(renderingElement, 'Right'));
    if (width < 0) {
      width = 0;
    }

    var DEFAULT_OPTIONS = {
      size: {
        width: width,
        height: height > 0 ? height : undefined
      }
    };

    var extendedConfig = (0, _extendDeep.extendDeep)({}, DEFAULT_OPTIONS, this.config, ENFORCED_OPTIONS);

    return extendedConfig;
  }

  (0, _each.each)(c3Types, function (type, index) {
    types[type] = {
      render: function render() {
        var _this = this;

        var options = getDefaultOptions.call(this);

        // 100% for charts
        var sumArray = (0, _calculatePercents.calculateSumForPercents)(this.dataset.matrix);
        var oldMatrix = [];
        if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' || type === 'area-step' || type === 'area-spline')) {
          oldMatrix = this.dataset.matrix;
          this.dataset.matrix = [this.dataset.matrix[0]].concat(_toConsumableArray((0, _calculatePercents.calculatePercents)(this.dataset.matrix, sumArray)));
          if (!options.sparkline) {
            options.axis = {
              y: {
                padding: {
                  top: 0
                },
                tick: {
                  format: function format(d) {
                    return d + '%';
                  }
                }
              }
            };
          }
        }

        // range charts
        if (options.range) {
          this.dataset.matrix = [this.dataset.matrix[0]].concat(_toConsumableArray((0, _calculateRange2.default)(this.dataset.matrix)));
        }

        if (!!this.config.clearOnRender && options.data.columns.length && this.dataset && this.dataset.meta) {
          var datasetMeta = this.dataset.meta || {};

          var _datasetMeta$type = datasetMeta.type,
              _type = _datasetMeta$type === undefined ? '' : _datasetMeta$type;

          var spliceFrom = 0;
          var intervalTypes = ['interval'];
          if (intervalTypes.includes(_type)) {
            spliceFrom = 1;
          }
          options.data.columns.splice(spliceFrom);
        }

        if (this.data()[0].length === 1 || this.data().length === 1) {
          var msg = 'No data to display';
          var mappedMsg = this.config.errorMapping[msg] || msg;
          if (this.config.showErrorMessages) {
            this.message(mappedMsg);
          }
          return;
        }

        var removeLegend = false;

        if (type === 'gauge') {
          // Accommodate a neat bug:
          options.legend.show = false;
          options.data.columns = [[this.config.title || this.data()[1][0], this.data()[1][1]]];
          removeLegend = true;
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
            removeLegend = true;
          }

          (0, _each.each)(this.data()[0], function (cell, i) {
            if (i > 0) {
              options.data.columns.push(this.dataset.selectColumn(i));
            }
          }.bind(this));
        }

        if (removeLegend) {
          var legendElement = this.el().querySelector('.keen-c3-legend');
          if (legendElement) {
            legendElement.remove();
            options.size.width = this.el().querySelector('.c3-chart').offsetWidth;
          }
          options.legend.show = false;
        }

        var chartTypesWithPartialIntervalIndicator = ['area', 'area-spline', 'area-step', 'line', 'spline', 'step'];

        if (options.partialIntervalIndicator && options.partialIntervalIndicator.show && chartTypesWithPartialIntervalIndicator.indexOf(options.type) > -1) {
          var results = options.data.columns && options.data.columns[0];
          if (results && results.length > 1) {
            var partialResultsRegion = {
              axis: 'x',
              start: new Date(results[results.length - 2]),
              class: options.partialIntervalIndicator.className
            };
            options.regions = [].concat(_toConsumableArray(options.regions || []), [partialResultsRegion]);
          }
        }

        if (!(options.tooltip && options.tooltip.show === false) && (options.legend.show === true || options.legend && options.legend.tooltip && options.legend.tooltip.show)) {

          // Apply custom tooltip
          options.tooltip = {
            contents: options.tooltip.contents,
            format: {
              title: this.config.tooltip.format.title,
              value: function value(_value, ratio, id, index) {
                var valueFormatted = c3CustomTooltipFiltering.call(_this, _value, ratio, id, index);
                if (_this.config.tooltip && _this.config.tooltip.format && _this.config.tooltip.format.value) {
                  valueFormatted = _this.config.tooltip.format.value.call(_this, valueFormatted, ratio, id, index);
                  // Restore value from percents calculation for stacking 100% charts
                  if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' || type === 'area-step' || type === 'area-spline')) {
                    valueFormatted = parseFloat((valueFormatted / 100 * sumArray[index]).toFixed(2));
                  }
                  // Restore value from range calculation for range charts
                  if (options.range) {
                    if (id === 'Max') {
                      valueFormatted += _this.dataset.matrix[index + 1][2];
                    }
                  }
                  return valueFormatted;
                }
                // Restore value from percents calculation for stacking 100% charts
                if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' || type === 'area-step' || type === 'area-spline')) {
                  valueFormatted = (valueFormatted / 100 * sumArray[index]).toFixed(2);
                  return parseFloat(valueFormatted);
                }
                // Restore value from range calculation for range charts
                if (options.range) {
                  if (id === 'Max') {
                    valueFormatted += _this.dataset.matrix[index + 1][2];
                  }
                }
                return valueFormatted;
              }
            }
          };
        }

        if (options.legend.show === true) {
          var c3options = _extends({}, options);
          // Apply custom color handling
          c3options.data.color = c3CustomDataMapping.bind(this);

          c3options.legend.hide = true; // hide default c3 legend

          // Render artifacts
          this.view._artifacts['c3'] = _c2.default.generate(c3options);

          _paginatingLegend2.default.call(this, _extends({}, options, { onLegendRendered: function onLegendRendered() {
              var legendElement = _this.el().querySelector('.keen-c3-legend');
              if (legendElement) {
                if (options.legend.position === 'top' || options.legend.position === 'bottom') {
                  c3options.size.height -= legendElement.offsetHeight;
                  _this.view._artifacts['c3'].resize({ height: c3options.size.height });
                } else {
                  if (c3options.size.width === 0) {
                    c3options.size.width = _this.el().offsetWidth - getPaddings(_this.el(), 'Left') - getPaddings(_this.el(), 'Right');
                  }
                  c3options.size.width -= legendElement.offsetWidth;
                  _this.view._artifacts['c3'].resize({ width: c3options.size.width });
                }
              }
            },
            onPaginated: function onPaginated() {
              _this.view._artifacts['c3'].flush();
            }
          }));
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
  if (typeof window === 'undefined') return;
  window.onresize = window.resize = function () {};
  if (window.addEventListener) {
    window.addEventListener('resize', fn, true);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', fn);
  }
}

/***/ }),
/* 35 */
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
/* 36 */
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

  if (options.legend.sort) {
    columns = options.legend.sort(cols);

    // update column order in the data, so tooltip will be the same order
    var columnsSorted = [];
    var dataColumnsSorted = [];
    if (cols[0][0] === 'x') {
      dataColumnsSorted.push(cols[0]);
    }
    columns.forEach(function (column) {
      var columnData = options.data.columns.find(function (item) {
        return item[0] === column;
      });
      dataColumnsSorted.push(columnData);
    });
    options.data.columns = dataColumnsSorted;
  } else {
    for (var i = 0; i < cols.length; i++) {
      if (cols[i][0] !== 'x' && !(0, _assertDateString2.default)(cols[i][1])) {
        columns.push(cols[i][0]);
      }
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
    if (options.onPaginated) {
      options.onPaginated();
    }
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

    if (options.onLegendRendered) {
      options.onLegendRendered();
      options.onLegendRendered = null;
    }
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

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _assertDateString = __webpack_require__(11);

var _assertDateString2 = _interopRequireDefault(_assertDateString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateRange;
function calculateRange(matrix) {
  var newValues = matrix.slice(1).map(function (d) {
    return d.map(function (e, i) {
      if (typeof e === 'number') {
        if (i === 1) {
          return e - d[i + 1];
        }
      }
      return e;
    });
  });
  return newValues;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSumForPercents = calculateSumForPercents;
exports.calculatePercents = calculatePercents;
function calculateSumForPercents(matrix) {
  var sumArray = [];
  matrix.slice(1).forEach(function (d, i) {
    d.forEach(function (e) {
      if (typeof e === 'number') {
        if (!sumArray[i]) {
          sumArray[i] = e;
          return sumArray[i];
        }
        sumArray[i] += e;
      }
      return sumArray[i];
    });
  });
  return sumArray;
}

function calculatePercents(matrix, sumArray) {
  var newValues = matrix.slice(1).map(function (d, i) {
    return d.map(function (e) {
      if (typeof e === 'number') {
        return e / sumArray[i] * 100;
      }
      return e;
    });
  });
  return newValues;
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _escapeHtml = __webpack_require__(4);

var _renderDownloadBtn = __webpack_require__(17);

var _renderDownloadBtn2 = _interopRequireDefault(_renderDownloadBtn);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render(text) {
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var msg = document.createElement('span');

    var titleContainer = document.createElement('div');
    var subtitleContainer = document.createElement('div');
    var notesContainer = document.createElement('div');

    outer.className = this.config.theme + ' keen-dataviz-box';
    inner.className = this.config.theme + '-message';

    // Create title and notes for message
    titleContainer.className = this.config.theme + '-title';
    titleContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.config.title || '');
    subtitleContainer.className = this.config.theme + '-subtitle';
    subtitleContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.config.subtitle || '');
    notesContainer.className = this.config.theme + '-notes';
    notesContainer.innerHTML = (0, _escapeHtml.escapeHtml)(this.config.notes || '');

    msg.innerHTML = (0, _escapeHtml.escapeHtml)(text) || '';
    inner.appendChild(msg);

    if (this.config.title && this.config.showTitle) {
      outer.appendChild(titleContainer);
    }

    if (this.config.subtitle) {
      outer.appendChild(subtitleContainer);
    }

    outer.appendChild(inner);

    if (this.config.notes) {
      outer.appendChild(notesContainer);
    }

    if (this.config.ui && this.config.ui.buttons && this.config.ui.buttons.download && this.config.ui.buttons.download.type) {
      (0, _renderDownloadBtn2.default)({
        element: this.el(),
        data: (0, _escapeHtml.escapeHtml)(text) || '',
        type: this.config.ui.buttons.download.type,
        label: this.config.ui.buttons.download.label
      });
    }

    if (this.config.utils && this.config.utils.clickToCopyToClipboard) {
      titleContainer.addEventListener('click', function (e) {
        return (0, _copyToClipboard2.default)(e.target.innerText, e);
      });
      notesContainer.addEventListener('click', function (e) {
        return (0, _copyToClipboard2.default)(e.target.innerText, e);
      });
      msg.addEventListener('click', function (e) {
        return (0, _copyToClipboard2.default)(e.target.innerText, e);
      });
    }

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = downloadResults;

var _exportSvg = __webpack_require__(18);

var _exportSvg2 = _interopRequireDefault(_exportSvg);

var _exportData = __webpack_require__(19);

var _exportData2 = _interopRequireDefault(_exportData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function downloadResults(obj) {
  var event = obj.event,
      type = obj.type,
      data = obj.data;

  event.preventDefault();
  var supportedFormats = ['json', 'csv', 'jpg', 'jpeg', 'png'];
  var format = type.toLowerCase();
  if (!supportedFormats.includes(type)) {
    throw new Error('This type is not supported');
  }

  var fileName = 'chart';
  var fileFormat = '';
  var content = '';

  if (format === 'png') {
    (0, _exportSvg2.default)({
      node: event.currentTarget.previousElementSibling
    });
    return;
  }

  if (format === 'jpg' || format === 'jpeg') {
    (0, _exportSvg2.default)({
      node: event.currentTarget.previousElementSibling,
      quality: 1,
      bgcolor: '#fff'
    });
    return;
  }

  if (format === 'json') {
    (0, _exportData2.default)({ type: format, data: data });
  }

  if (format === 'csv') {
    (0, _exportData2.default)({ type: format, data: data });
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    // Default impl options
    var defaultOptions = {
        // Default is to fail on error, no placeholder
        imagePlaceholder: undefined,
        // Default cache bust is false, it will use the cache
        cacheBust: false
    };

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner,
            options: {}
        }
    };

    if (true)
        module.exports = domtoimage;
    else
        {}


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
                defaults to 1.0.
     * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        copyOptions(options);
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function copyOptions(options) {
        // Copy options to impl options for use in impl
        if(typeof(options.imagePlaceholder) === 'undefined') {
            domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
        } else {
            domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
        }

        if(typeof(options.cacheBust) === 'undefined') {
            domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
        } else {
            domtoimage.impl.options.cacheBust = options.cacheBust;
        }
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || util.width(domNode);
            canvas.height = options.height || util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    if (source.cssText) target.cssText = source.cssText;
                    else copyProperties(source, target);

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;
            if(domtoimage.impl.options.cacheBust) {
                // Cache bypass so we dont have CORS issues with cached images
                // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                var placeholder;
                if(domtoimage.impl.options.imagePlaceholder) {
                    var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                    if(split && split[1]) {
                        placeholder = split[1];
                    }
                }

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        if(placeholder) {
                            resolve(placeholder);
                        } else {
                            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        }

                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    if(placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                    }
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline()) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
                    try {
                        util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                    } catch (e) {
                        console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                    }
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prettyNumber = __webpack_require__(3);

var _escapeHtml = __webpack_require__(4);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatExtractionData(res, prop) {
  var query = res.query,
      result = res.result;

  var formattedResult = [];
  if (query.analysis_type !== 'extraction') throw new Error('Analysis type is not an extraction!');
  if (Array.isArray(result)) {
    result.forEach(function (item) {
      var itemProp = prop.split('.').reduce(function (acc, val) {
        return acc && acc[val] || null;
      }, item);
      var obj = {
        query: query,
        result: itemProp
      };
      formattedResult.push(obj);
    });
  }
  return formattedResult;
}

exports.default = {
  render: function render() {
    var color = this.config.colors[0];
    var theme = this.config.theme;
    var title = this.config.title;
    var subtitle = this.config.subtitle;
    var opts = this.config;
    var value = '-';
    var prevValue = '';
    var html = '';
    var prefix = '';
    var suffix = '';
    var formattedNum = void 0;
    var flexDifferenceStyle = '';
    var resultDifference = '';
    var differenceStyle = '';
    var smallerValue = '';
    var _config = this.config,
        results = _config.results,
        previousResults = _config.previousResults,
        isExtraction = _config.isExtraction,
        comparedProp = _config.comparedProp;

    if (results && previousResults) {
      flexDifferenceStyle = previousResults ? ' metric-comparison' : '';
      smallerValue = previousResults && title ? '-smaller' : '';
      resultDifference = results.result - previousResults.result;
      differenceStyle = resultDifference > 0 ? '-green' : '-red';
      resultDifference = Math.abs(resultDifference);
      color = '';
    }

    if (this.data() && this.data()[1] && this.data()[1][1] && typeof this.data()[1][1] === 'number') {
      value = this.data()[1][1];
    }

    if (isExtraction && comparedProp) {
      var formattedResult = formatExtractionData(results, comparedProp);

      value = formattedResult[0].result;
      prevValue = formattedResult[1].result;

      flexDifferenceStyle = prevValue ? ' metric-comparison' : '';
      smallerValue = prevValue && title ? '-smaller' : '';
      resultDifference = value - prevValue;
      differenceStyle = resultDifference > 0 ? '-green' : '-red';
      resultDifference = Math.abs(resultDifference);
      color = '';
    }

    formattedNum = value;
    if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(value))) {
      formattedNum = (0, _prettyNumber.prettyNumber)(value);
      if (results && previousResults) {
        resultDifference = (0, _prettyNumber.prettyNumber)(resultDifference);
      }
    }

    if (opts['prefix']) {
      prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
    }
    if (opts['suffix']) {
      suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
    }
    html += '<div class="' + theme + '">';
    html += '<div class="' + theme + '-metric keen-dataviz-box' + flexDifferenceStyle + '" title="' + (0, _escapeHtml.escapeHtml)(value) + '" style="background-color:' + color + '">';
    if (results && previousResults) {
      html += '<div class="' + theme + '-metric' + differenceStyle + '"><div class="arrow' + differenceStyle + '"> </div>' + (0, _escapeHtml.escapeHtml)(resultDifference) + '</div>';
    }
    if (isExtraction && comparedProp) {
      if (value && prevValue) {
        html += '<div class="' + theme + '-metric' + differenceStyle + '"><div class="arrow' + differenceStyle + '"> </div>' + (0, _escapeHtml.escapeHtml)(resultDifference) + '</div>';
        html += '<small>' + prevValue + '</small>';
      } else {
        html += '<p>No data to display</p>';
      }
    }
    html += '<div class="' + theme + '-metric-value' + smallerValue + '">' + prefix + (0, _escapeHtml.escapeHtml)(formattedNum) + suffix + '</div>';
    if (title) {
      html += '<div class="' + theme + '-metric-title">' + (0, _escapeHtml.escapeHtml)(title) + '</div>';
    }
    if (subtitle) {
      html += '<div class="' + theme + '-metric-subtitle">' + (0, _escapeHtml.escapeHtml)(subtitle) + '</div>';
    }
    html += '</div>';
    html += '</div>';

    this.el().innerHTML = html;

    if (this.config.onrendered) {
      this.config.onrendered();
    }

    if (this.config.utils && this.config.utils.clickToCopyToClipboard) {
      var resultClassName = '.' + theme + '-metric-value' + smallerValue;
      document.querySelector(resultClassName).addEventListener('click', function (e) {
        return (0, _copyToClipboard2.default)(e.target.innerText, e);
      });

      if (results && previousResults) {
        var previousResultsClassName = '.' + theme + '-metric' + differenceStyle;
        document.querySelector(previousResultsClassName).addEventListener('click', function (e) {
          return (0, _copyToClipboard2.default)(e.target.innerText, e);
        });
      }
    }
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _escapeHtml = __webpack_require__(4);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentPage = void 0;
function _generateTableRows(datavizInstance, dataset) {
  var html = '';
  var defaultConfig = {
    page: 1,
    limit: 0,
    arrows: true
  };
  var customConfig = {};
  if (datavizInstance.config.table && datavizInstance.config.table.pagination) {
    customConfig = datavizInstance.config.table.pagination;
  }
  var config = _extends({}, defaultConfig, customConfig);

  if (!currentPage) {
    currentPage = config.page;
  }

  var datasetPaginated = void 0;
  var pages = 0;
  if (config.limit === 0) {
    datasetPaginated = dataset.slice(1); // remove header
  } else {
    var start = config.limit * (currentPage - 1) + 1;
    var end = start + config.limit;
    datasetPaginated = dataset.slice(start, end);
    pages = Math.ceil((dataset.length - 1) / config.limit);
  }

  var columnsArray = datavizInstance.config.table.columns ? datavizInstance.config.table.columns : datavizInstance.dataset.matrix[0];

  var colNamesToMap = {};
  var _datavizInstance$conf = datavizInstance.config.table,
      mapValues = _datavizInstance$conf.mapValues,
      mapDates = _datavizInstance$conf.mapDates;

  for (var key in mapValues) {
    colNamesToMap[columnsArray.indexOf(key)] = key;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = datasetPaginated[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var row = _step.value;

      html += '<tr class="table-data-row">';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = row.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref = _step2.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var index = _ref2[0];
          var rowColValue = _ref2[1];

          if (mapDates && rowColValue instanceof Date) {
            rowColValue = mapDates(rowColValue);
          }

          var rowColValueEscaped = (0, _escapeHtml.escapeHtml)(rowColValue);
          if (colNamesToMap[index]) {
            html += '<td>' + mapValues[colNamesToMap[index]](rowColValueEscaped) + '</td>';
            continue;
          }
          html += '<td>' + rowColValueEscaped + '</td>';
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

  if (pages > 1) {
    html += '<tr class="table-pagination"><td colspan="999">';
    var pageNumber = 1;
    var prevPage = currentPage === 1 ? 1 : currentPage - 1;
    var nextPage = currentPage === pages ? pages : currentPage + 1;
    if (config.arrows) {
      html += '<a class="arrow btn" data-page="' + prevPage + '">&laquo;</a>';
    }
    while (pageNumber <= pages) {
      html += '<a class="btn ' + (pageNumber === currentPage ? 'active' : '') + '" data-page="' + pageNumber + '">' + pageNumber + '</a>';
      pageNumber++;
    }
    if (config.arrows) {
      html += '<a class="arrow btn" data-page="' + nextPage + '">&raquo;</a>';
    }
    html += '</td></tr>';
  }

  return html;
}

function _generateTableHeader(datavizInstance, dataset) {
  var html = '';
  var fieldNumber = -1;
  var tableConfig = datavizInstance.config.table;
  var columnNames = tableConfig && tableConfig.columns || dataset[0];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = columnNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var colName = _step3.value;

      var colNameEscaped = (0, _escapeHtml.escapeHtml)(colName);
      fieldNumber += 1;
      html += '<th fieldNumber="' + fieldNumber + '">' + colNameEscaped + '</th>';
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

  return html;
}

var render = function render() {
  var _this = this;

  var dataset = this.dataset.matrix;

  var el = this.el();
  var theme = this.config.theme;
  var datavizInstance = this;

  var html = '';

  var isEmpty = dataset.length === 1 && dataset[0].length === 0;
  if (isEmpty) {
    var msg = 'No data to display';
    var mappedMsg = this.config.errorMapping[msg] || msg;
    if (this.config.showErrorMessages) {
      this.message(mappedMsg);
    }
    return;
  }

  // Open wrapper
  html += '<div class="' + theme + '-table">';

  // Static, scrollable table
  html += '<table class="' + theme + '-table-dataset">';
  html += '<thead>';
  html += '<tr>';
  html += _generateTableHeader(datavizInstance, dataset);
  html += '</tr>';
  html += '</thead>';
  // Table data
  html += '<tbody>';
  html += _generateTableRows(datavizInstance, dataset);
  html += '</tbody>';
  html += '</table>';
  /* */
  // Close wrapper
  html += '</div>';

  // Inject HTML string
  el.querySelector('.' + theme + '-rendering').innerHTML = html;

  el.querySelectorAll('.' + theme + '-rendering th').forEach(function (item) {
    item.addEventListener('click', function (event) {
      var sortOrder = event.target.getAttribute('order') || 'asc';
      var fieldNumber = event.target.getAttribute('fieldNumber');
      var checker = function checker(a, b) {
        var sortOrderNumber = sortOrder === 'asc' ? 1 : -1;

        if (typeof a[fieldNumber] === 'string') {
          var nameA = a[fieldNumber].toUpperCase(); // ignore upper and lowercase
          var nameB = b[fieldNumber].toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1 * sortOrderNumber;
          }
          if (nameA > nameB) {
            return 1 * sortOrderNumber;
          }

          // names must be equal
          return 0;
        }
        return (a[fieldNumber] - b[fieldNumber]) * sortOrderNumber;
      };

      if (sortOrder === 'asc') {
        sortOrder = 'desc';
      } else {
        sortOrder = 'asc';
      }
      event.target.setAttribute('order', sortOrder);

      var first = _this.dataset.matrix.shift();
      _this.dataset.matrix.sort(checker);
      _this.dataset.matrix.unshift(first);

      el.querySelector('.' + theme + '-rendering tbody').innerHTML = _generateTableRows(datavizInstance, dataset);
      attachBtnEventListeners();
    });
  });

  var attachBtnEventListeners = function attachBtnEventListeners() {
    el.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        currentPage = parseInt(event.target.getAttribute('data-page'));
        el.querySelector('.' + theme + '-rendering tbody').innerHTML = _generateTableRows(datavizInstance, dataset);
        attachBtnEventListeners();
      }, true);
    });
  };

  attachBtnEventListeners(datavizInstance, el, theme);

  if (this.config.onrendered) {
    this.config.onrendered();
  }

  if (this.config.utils && this.config.utils.clickToCopyToClipboard) {
    var tableClass = '.' + theme + '-table-dataset';
    document.querySelector(tableClass).addEventListener('click', function (e) {
      var _e$target = e.target,
          nodeName = _e$target.nodeName,
          innerText = _e$target.innerText;

      if (nodeName === 'TD') {
        (0, _copyToClipboard2.default)(innerText, e);
      }
    });
  }
};

var update = function update() {
  // no special update handling
  this.render();
};

var destroy = function destroy() {};

exports.default = { render: render, update: update, destroy: destroy };

/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _svgTextWrap = __webpack_require__(6);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Funnel = function () {
  function Funnel() {
    _classCallCheck(this, Funnel);
  }

  _createClass(Funnel, [{
    key: 'render',
    value: function render() {
      var matrix = this.dataset.matrix;
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          labelMapping = _config.labelMapping,
          colorMapping = _config.colorMapping,
          utils = _config.utils;

      var opts = this.config;
      var _config$funnel = this.config.funnel,
          _config$funnel$percen = _config$funnel.percents,
          show = _config$funnel$percen.show,
          countingMethod = _config$funnel$percen.countingMethod,
          decimals = _config$funnel$percen.decimals,
          lines = _config$funnel.lines,
          marginBetweenSteps = _config$funnel.marginBetweenSteps,
          resultValues = _config$funnel.resultValues,
          hover = _config$funnel.hover,
          minimalSize = _config$funnel.minimalSize;

      var margin = { top: 20, right: 30, bottom: 30, left: 200 };
      var yMarginElement = 0;
      if (marginBetweenSteps) {
        yMarginElement = 5;
      }
      var funnelContainer = d3.select(container);
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      var chart = chartContainer.append('svg');
      var svgWidth = funnelContainer.style('width').slice(0, -2) - margin.right - margin.left;
      var svgHeight = funnelContainer.style('height').slice(0, -2) - margin.top - margin.bottom - 30;
      var elemHeight = svgHeight / (matrix.length - 1);
      var prevElemWidth = svgWidth;
      var percent = 100 .toFixed(decimals);

      // prepare normal funnel polygons
      var minimalSizeStep = 0;
      if (minimalSize) {
        minimalSizeStep = (svgWidth - minimalSize) / (matrix.length - 2);
      }
      var polygons = matrix.slice(1).map(function (d, i) {
        var newPoints = [{
          x: (svgWidth - prevElemWidth) / 2,
          y: elemHeight * i + yMarginElement
        }, {
          x: (svgWidth - prevElemWidth) / 2 + prevElemWidth,
          y: elemHeight * i + yMarginElement
        }];
        if (i !== 0) {
          if (countingMethod === "relative") {
            minimalSize ? prevElemWidth = prevElemWidth - minimalSizeStep : prevElemWidth = prevElemWidth * d[1] / matrix[i][1];
            percent = (d[1] / matrix[i][1] * 100).toFixed(decimals);
          }
          if (countingMethod === "absolute") {
            minimalSize ? prevElemWidth = prevElemWidth - minimalSizeStep : prevElemWidth = svgWidth * d[1] / matrix[1][1];
            percent = (d[1] / matrix[1][1] * 100).toFixed(decimals);
          }
        }
        var label = d[0];
        if (Object.keys(labelMapping).length) {
          for (var key in labelMapping) {
            if (labelMapping[key] === d[0]) {
              label = key;
            }
          }
        }
        var result = d[1];
        if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(d[1]))) {
          result = (0, _prettyNumber.prettyNumber)(d[1]);
        }
        return {
          name: d[0],
          label: label,
          percent: percent + '%',
          result: result,
          points: [].concat(newPoints, [{
            x: (svgWidth - prevElemWidth) / 2 + prevElemWidth,
            y: elemHeight * (i + 1)
          }, {
            x: (svgWidth - prevElemWidth) / 2,
            y: elemHeight * (i + 1)
          }])
        };
      });

      //chart rendering with polygons
      chart.attr('preserveAspectRatio', 'xMidYMid slice').attr('viewBox', '0 0 ' + (svgWidth + margin.left + margin.right) + ' ' + (svgHeight + margin.top + margin.bottom - 30)).attr('height', '100%').attr('width', '100%').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').selectAll('polygon').data(polygons).enter().append('polygon').attr('points', function (d) {
        return d.points.map(function (p) {
          return [p.x, p.y].join(',');
        }).join(' ');
      }).style('fill', function (d, i) {
        if (colorMapping[d.label]) {
          return colorMapping[d.label];
        }
        return colors[i];
      }).attr('class', function (d) {
        return d.label;
      }).attr('cursor', 'pointer');

      if (lines) {
        //rendering lines
        chart.selectAll('line').data(polygons).enter().append('line').attr('x1', 10).attr('y1', function (d) {
          return d.points[0].y + margin.top - yMarginElement / 2;
        }).attr('x2', function (d) {
          return d.points[1].x + margin.left;
        }).attr('y2', function (d) {
          return d.points[0].y + margin.top - yMarginElement / 2;
        }).attr('class', 'chart-lines');

        //rendering last line
        chart.append('line').attr('x1', 10).attr('y1', polygons[polygons.length - 1].points[2].y + margin.top + yMarginElement / 2).attr('x2', polygons[polygons.length - 1].points[2].x + margin.left).attr('y2', polygons[polygons.length - 1].points[2].y + margin.top + yMarginElement / 2).attr('class', 'chart-lines');
      }

      //rendering labels when lines are visible
      if (lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'start').attr('x', 20).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement + 5;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, margin.left).attr('cursor', 'pointer');
      }

      //rendering labels when lines are not visible
      if (!lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'end').attr('x', function (d) {
          return d.points[0].x + (d.points[3].x - d.points[0].x) / 2 + margin.left * 0.9;
        }).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement + 5;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, margin.left).attr('cursor', 'pointer');
      }

      //rendering percents for each step
      if (show && !resultValues) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement + 8;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');
      }

      //rendering results for each step
      if (resultValues && !show) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement + 8;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }

      //rendering results and percenage together
      if (show && resultValues) {
        //rendering percents
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          if (yMarginElement === 0) {
            return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 16;
          }
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement + 12;
        }).attr('class', function (d) {
          return 'text-second ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');

        //rendering results
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          if (yMarginElement === 0) {
            return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top;
          }
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + yMarginElement - 5;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }
      //hover handling
      if (hover) {
        var handleMouseOver = function handleMouseOver(d) {
          polygonsHover.style('opacity', 0.5);
          labelHover.style('opacity', 0.5);
          var thisLabel = /[^ ]*$/.exec(d3.select(this).attr('class'))[0];
          chart.selectAll('.' + thisLabel).style('opacity', 1);
        };

        var handleMouseOut = function handleMouseOut(d) {
          polygonsHover.style('opacity', 1);
          labelHover.style('opacity', 1);
        };

        var polygonsHover = chart.selectAll('polygon');
        polygonsHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

        var labelHover = chart.selectAll('text');
        labelHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
      }

      // click to copy
      if (utils && utils.clickToCopyToClipboard) {
        var handleClickToCopy = function handleClickToCopy(data) {
          var percent = data.percent,
              result = data.result;

          if (resultValues) {
            (0, _copyToClipboard2.default)(result, d3.event);
          } else if (show) {
            (0, _copyToClipboard2.default)(percent, d3.event);
          }
        };

        var label = chart.selectAll('text');

        label.on('click', handleClickToCopy);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      chartContainer.remove();
    }
  }]);

  return Funnel;
}();

exports.default = Funnel;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _svgTextWrap = __webpack_require__(6);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Funnel3d = function () {
  function Funnel3d() {
    _classCallCheck(this, Funnel3d);
  }

  _createClass(Funnel3d, [{
    key: 'render',
    value: function render() {
      var matrix = this.dataset.matrix;
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          labelMapping = _config.labelMapping,
          colorMapping = _config.colorMapping,
          utils = _config.utils;

      var opts = this.config;
      var _config$funnel = this.config.funnel,
          _config$funnel$percen = _config$funnel.percents,
          show = _config$funnel$percen.show,
          countingMethod = _config$funnel$percen.countingMethod,
          decimals = _config$funnel$percen.decimals,
          lines = _config$funnel.lines,
          resultValues = _config$funnel.resultValues,
          effect3d = _config$funnel.effect3d,
          hover = _config$funnel.hover,
          minimalSize = _config$funnel.minimalSize;

      var margin = { top: 20, right: 30, bottom: 60, left: 200 };
      var funnelContainer = d3.select(container);
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      var chart = chartContainer.append('svg');
      var svgWidth = funnelContainer.style('width').slice(0, -2) - margin.right - margin.left;
      var svgHeight = funnelContainer.style('height').slice(0, -2) - margin.top - margin.bottom - 30;
      var elemHeight = svgHeight / (matrix.length - 1);
      var yMarginElement = elemHeight * 0.3;
      var shadowCut = yMarginElement * 2.5;
      var prevElemWidth = svgWidth;
      var percent = 100 .toFixed(decimals);

      // prepare normal funnel polygons
      var minimalSizeStep = 0;
      if (minimalSize) {
        minimalSizeStep = (svgWidth - minimalSize) / (matrix.length - 2);
      }
      var polygons = matrix.slice(1).map(function (d, i) {
        var newPoints = [{
          x: (svgWidth - prevElemWidth) / 2,
          y: elemHeight * i + yMarginElement
        }, {
          x: (svgWidth - prevElemWidth) / 2 + prevElemWidth,
          y: elemHeight * i + yMarginElement
        }];
        if (i !== 0) {
          if (countingMethod === 'relative') {
            minimalSize ? prevElemWidth = prevElemWidth - minimalSizeStep : prevElemWidth = prevElemWidth * d[1] / matrix[i][1];
            percent = (d[1] / matrix[i][1] * 100).toFixed(decimals);
          }
          if (countingMethod === 'absolute') {
            minimalSize ? prevElemWidth = prevElemWidth - minimalSizeStep : prevElemWidth = svgWidth * d[1] / matrix[1][1];
            percent = (d[1] / matrix[1][1] * 100).toFixed(decimals);
          }
        }
        var label = d[0];
        if (Object.keys(labelMapping).length) {
          for (var key in labelMapping) {
            if (labelMapping[key] === d[0]) {
              label = key;
            }
          }
        }
        var result = d[1];
        if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(d[1]))) {
          result = (0, _prettyNumber.prettyNumber)(d[1]);
        }
        return {
          name: d[0],
          label: label,
          percent: percent + '%',
          result: result,
          points: [].concat(newPoints, [{
            x: (svgWidth - prevElemWidth) / 2 + prevElemWidth,
            y: elemHeight * (i + 1)
          }, {
            x: (svgWidth - prevElemWidth) / 2,
            y: elemHeight * (i + 1)
          }])
        };
      });

      //funnel shadows preparing
      var polygonsShadows = polygons.map(function (d, i) {
        return {
          label: d.label,
          points: [{
            x: d.points[3].x,
            y: d.points[3].y
          }, {
            x: d.points[2].x,
            y: d.points[2].y
          }, {
            x: effect3d === 'left' ? d.points[2].x : d.points[2].x - shadowCut < svgWidth / 2 ? svgWidth / 2 + 5 : d.points[2].x - shadowCut,
            y: effect3d === 'left' ? d.points[2].y : d.points[2].y + yMarginElement / 1.5
          }, {
            x: effect3d === 'right' ? d.points[3].x : d.points[3].x + shadowCut > svgWidth / 2 ? svgWidth / 2 - 5 : d.points[3].x + shadowCut,
            y: effect3d === 'right' ? d.points[3].y : d.points[3].y + yMarginElement / 1.5
          }]
        };
      });

      //connecting funnels with shadows for rendering
      var polygons3d = polygons.concat(polygonsShadows);

      //chart rendering with polygons
      chart.attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 ' + (svgWidth + margin.left + margin.right) + ' ' + (svgHeight + margin.top + margin.bottom - 30)).attr('height', '100%').attr('width', '100%').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').selectAll('polygon').data(polygons3d).enter().append('polygon').attr('points', function (d) {
        return d.points.map(function (p) {
          return [p.x, p.y].join(',');
        }).join(' ');
      }).style('fill', function (d, i) {
        if (i > polygons.length - 1) {
          if (colorMapping[d.label]) {
            return d3.rgb(colorMapping[d.label]).darker(1.5);
          }
          return d3.rgb(colors[i - polygons.length]).darker(1.5);
        }
        if (colorMapping[d.label]) {
          return colorMapping[d.label];
        }
        return colors[i];
      }).attr('class', function (d) {
        return d.label;
      }).attr('cursor', 'pointer');

      if (lines) {
        //rendering lines
        chart.selectAll('line').data(polygons).enter().append('line').attr('x1', 10).attr('y1', function (d) {
          return d.points[0].y + margin.top - yMarginElement / 5;
        }).attr('x2', function (d, i) {
          if (i === 0) {
            return d.points[1].x + margin.left;
          }
          return d.points[1].x + margin.left - shadowCut;
        }).attr('y2', function (d) {
          return d.points[0].y + margin.top - yMarginElement / 5;
        }).attr('class', 'chart-lines');

        //rendering last line
        chart.append('line').attr('x1', 10).attr('y1', polygons[polygons.length - 1].points[2].y + margin.top + yMarginElement - yMarginElement / 5).attr('x2', polygons[polygons.length - 1].points[2].x + margin.left - shadowCut).attr('y2', polygons[polygons.length - 1].points[2].y + margin.top + yMarginElement - yMarginElement / 5).attr('class', 'chart-lines');
      }

      //rendering labels when lines are visible
      if (lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'start').attr('x', 20).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 5 + yMarginElement / 4;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, margin.left).attr('cursor', 'pointer');
      }

      //rendering labels when lines are not visible
      if (!lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'end').attr('x', function (d) {
          return d.points[0].x + (d.points[3].x - d.points[0].x) / 2 + 130;
        }).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 5;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, margin.left).attr('cursor', 'pointer');
      }

      //rendering percents for each step
      if (show && !resultValues) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 8;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');
      }

      //rendering results for each step
      if (resultValues && !show) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 8;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }

      //rendering results and percenage together
      if (show && resultValues) {
        //rendering percents
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 18;
        }).attr('class', function (d) {
          return 'text-second ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');

        //rendering results
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', svgWidth / 2 + margin.left).attr('y', function (d) {
          return (d.points[2].y - d.points[1].y) / 2 + d.points[1].y + margin.top + 3;
        }).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }
      //hover handling
      if (hover) {
        var handleMouseOver = function handleMouseOver(d) {
          polygonsHover.style('opacity', 0.5);
          labelHover.style('opacity', 0.5);
          var thisLabel = /[^ ]*$/.exec(d3.select(this).attr('class'))[0];
          chart.selectAll('.' + thisLabel).style('opacity', 1);
        };

        var handleMouseOut = function handleMouseOut(d) {
          polygonsHover.style('opacity', 1);
          labelHover.style('opacity', 1);
        };

        var polygonsHover = chart.selectAll('polygon');
        polygonsHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

        var labelHover = chart.selectAll('text');
        labelHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
      }

      // click to copy
      if (utils && utils.clickToCopyToClipboard) {
        var handleClickToCopy = function handleClickToCopy(data) {
          var percent = data.percent,
              result = data.result;

          if (resultValues) {
            (0, _copyToClipboard2.default)(result, d3.event);
          } else if (show) {
            (0, _copyToClipboard2.default)(percent, d3.event);
          }
        };

        var label = chart.selectAll('text');

        label.on('click', handleClickToCopy);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      chartContainer.remove();
    }
  }]);

  return Funnel3d;
}();

exports.default = Funnel3d;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _svgTextWrap = __webpack_require__(6);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HorizontalFunnel = function () {
  function HorizontalFunnel() {
    _classCallCheck(this, HorizontalFunnel);
  }

  _createClass(HorizontalFunnel, [{
    key: 'render',
    value: function render() {
      var matrix = this.dataset.matrix;
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          labelMapping = _config.labelMapping,
          colorMapping = _config.colorMapping,
          utils = _config.utils;

      var opts = this.config;
      var _config$funnel = this.config.funnel,
          _config$funnel$percen = _config$funnel.percents,
          show = _config$funnel$percen.show,
          countingMethod = _config$funnel$percen.countingMethod,
          decimals = _config$funnel$percen.decimals,
          lines = _config$funnel.lines,
          marginBetweenSteps = _config$funnel.marginBetweenSteps,
          resultValues = _config$funnel.resultValues,
          hover = _config$funnel.hover,
          minimalSize = _config$funnel.minimalSize;

      var margin = { top: 20, right: 30, bottom: 100, left: 10 };
      var xMarginElement = 0;
      if (marginBetweenSteps) {
        xMarginElement = 5;
      }
      var funnelContainer = d3.select(container);
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      var chart = chartContainer.append('svg');
      var svgWidth = funnelContainer.style('width').slice(0, -2) - margin.right - margin.left;
      var svgHeight = funnelContainer.style('height').slice(0, -2) - margin.top - margin.bottom - 30;
      var elemWidth = svgWidth / (matrix.length - 1);
      var prevElemHeight = svgHeight;
      var percent = 100 .toFixed(decimals);

      // prepare normal funnel polygons
      var minimalSizeStep = 0;
      if (minimalSize) {
        minimalSizeStep = (svgHeight - minimalSize) / (matrix.length - 2);
      }
      var polygons = matrix.slice(1).map(function (d, i) {
        var newPoints = [{
          x: elemWidth * i + xMarginElement,
          y: (svgHeight - prevElemHeight) / 2
        }, {
          x: elemWidth * i + xMarginElement,
          y: (svgHeight - prevElemHeight) / 2 + prevElemHeight
        }];
        if (i !== 0) {
          if (countingMethod === 'relative') {
            minimalSize ? prevElemHeight = prevElemHeight - minimalSizeStep : prevElemHeight = prevElemHeight * d[1] / matrix[i][1];
            percent = (d[1] / matrix[i][1] * 100).toFixed(decimals);
          }
          if (countingMethod === 'absolute') {
            minimalSize ? prevElemHeight = prevElemHeight - minimalSizeStep : prevElemHeight = svgHeight * d[1] / matrix[1][1];
            percent = (d[1] / matrix[1][1] * 100).toFixed(decimals);
          }
        }
        var label = d[0];
        if (Object.keys(labelMapping).length) {
          for (var key in labelMapping) {
            if (labelMapping[key] === d[0]) {
              label = key;
            }
          }
        }
        var result = d[1];
        if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(d[1]))) {
          result = (0, _prettyNumber.prettyNumber)(d[1]);
        }
        return {
          name: d[0],
          label: label,
          percent: percent + '%',
          result: result,
          points: [].concat(newPoints, [{
            x: elemWidth * (i + 1),
            y: (svgHeight - prevElemHeight) / 2 + prevElemHeight
          }, {
            x: elemWidth * (i + 1),
            y: (svgHeight - prevElemHeight) / 2
          }])
        };
      });

      //chart rendering with polygons
      chart.attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 ' + (svgWidth + margin.left + margin.right) + ' ' + (svgHeight + margin.top + margin.bottom - 30)).attr('height', '100%').attr('width', '100%').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').selectAll('polygon').data(polygons).enter().append('polygon').attr('points', function (d) {
        return d.points.map(function (p) {
          return [p.x, p.y].join(',');
        }).join(' ');
      }).style('fill', function (d, i) {
        if (colorMapping[d.label]) {
          return colorMapping[d.label];
        }
        return colors[i];
      }).attr('class', function (d) {
        return d.label;
      }).attr('cursor', 'pointer');

      if (lines) {
        //rendering lines
        chart.selectAll('line').data(polygons).enter().append('line').attr('x1', function (d) {
          return d.points[0].x + margin.left - xMarginElement / 2;
        }).attr('y1', svgHeight + margin.bottom).attr('x2', function (d) {
          return d.points[0].x + margin.left - xMarginElement / 2;
        }).attr('y2', function (d) {
          return d.points[0].y + margin.top;
        }).attr('class', 'chart-lines');

        //rendering last line
        chart.append('line').attr('x1', svgWidth + margin.left - xMarginElement / 2).attr('y1', svgHeight + margin.bottom).attr('x2', polygons[polygons.length - 1].points[3].x + margin.left + xMarginElement / 2).attr('y2', polygons[polygons.length - 1].points[3].y + margin.top).attr('class', 'chart-lines');
      }

      //rendering labels when lines are visible
      if (lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', svgHeight + margin.bottom * 0.5 + margin.top).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, elemWidth).attr('cursor', 'pointer');
      }

      //rendering labels when lines are not visible
      if (!lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', function (d) {
          if (d.points[2].y + (d.points[3].y - d.points[0].y) / 2 + elemWidth / 4 > svgHeight + margin.bottom - 40 + margin.top) {
            return svgHeight + margin.bottom - 40 + margin.top;
          }
          return d.points[2].y + (d.points[3].y - d.points[0].y) / 2 + elemWidth / 4 + margin.top;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, elemWidth).attr('cursor', 'pointer');
      }

      //rendering percents for each step
      if (show && !resultValues) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 10).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');
      }

      //rendering results for each step
      if (resultValues && !show) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 10).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }

      //rendering results and percenage together
      if (show && resultValues) {
        //rendering percents
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 16).attr('class', function (d) {
          return 'text-second ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');

        //rendering results
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top - 3).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }
      //hover handling
      if (hover) {
        var handleMouseOver = function handleMouseOver(d) {
          polygonsHover.style('opacity', 0.5);
          labelHover.style('opacity', 0.5);
          var thisLabel = /[^ ]*$/.exec(d3.select(this).attr('class'))[0];
          chart.selectAll('.' + thisLabel).style('opacity', 1);
        };

        var handleMouseOut = function handleMouseOut(d) {
          polygonsHover.style('opacity', 1);
          labelHover.style('opacity', 1);
        };

        var polygonsHover = chart.selectAll('polygon');
        polygonsHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

        var labelHover = chart.selectAll('text');
        labelHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
      }

      // click to copy
      if (utils && utils.clickToCopyToClipboard) {
        var handleClickToCopy = function handleClickToCopy(data) {
          var percent = data.percent,
              result = data.result;

          if (resultValues) {
            (0, _copyToClipboard2.default)(result, d3.event);
          } else if (show) {
            (0, _copyToClipboard2.default)(percent, d3.event);
          }
        };

        var label = chart.selectAll('text');

        label.on('click', handleClickToCopy);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      chartContainer.remove();
    }
  }]);

  return HorizontalFunnel;
}();

exports.default = HorizontalFunnel;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d);

var _svgTextWrap = __webpack_require__(6);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HorizontalFunnel3d = function () {
  function HorizontalFunnel3d() {
    _classCallCheck(this, HorizontalFunnel3d);
  }

  _createClass(HorizontalFunnel3d, [{
    key: 'render',
    value: function render() {
      var matrix = this.dataset.matrix;
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          labelMapping = _config.labelMapping,
          colorMapping = _config.colorMapping,
          utils = _config.utils;

      var opts = this.config;
      var _config$funnel = this.config.funnel,
          _config$funnel$percen = _config$funnel.percents,
          show = _config$funnel$percen.show,
          countingMethod = _config$funnel$percen.countingMethod,
          decimals = _config$funnel$percen.decimals,
          lines = _config$funnel.lines,
          resultValues = _config$funnel.resultValues,
          effect3d = _config$funnel.effect3d,
          hover = _config$funnel.hover,
          minimalSize = _config$funnel.minimalSize;

      var margin = { top: 20, right: 30, bottom: 100, left: 10 };
      var funnelContainer = d3.select(container);
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      var chart = chartContainer.append('svg');
      var svgWidth = funnelContainer.style('width').slice(0, -2) - margin.right - margin.left;
      var svgHeight = funnelContainer.style('height').slice(0, -2) - margin.top - margin.bottom - 30;
      var elemWidth = svgWidth / (matrix.length - 1);
      var xMarginElement = elemWidth * 0.3;
      var shadowCut = xMarginElement / 1.5;
      var prevElemHeight = svgHeight;
      var percent = 100 .toFixed(decimals);

      // prepare normal funnel polygons
      var minimalSizeStep = 0;
      if (minimalSize) {
        minimalSizeStep = (svgHeight - minimalSize) / (matrix.length - 2);
      }
      var polygons = matrix.slice(1).map(function (d, i) {
        var newPoints = [{
          x: elemWidth * i + xMarginElement,
          y: (svgHeight - prevElemHeight) / 2
        }, {
          x: elemWidth * i + xMarginElement,
          y: (svgHeight - prevElemHeight) / 2 + prevElemHeight
        }];
        if (i !== 0) {
          if (countingMethod === 'relative') {
            minimalSize ? prevElemHeight = prevElemHeight - minimalSizeStep : prevElemHeight = prevElemHeight * d[1] / matrix[i][1];
            percent = (d[1] / matrix[i][1] * 100).toFixed(decimals);
          }
          if (countingMethod === 'absolute') {
            minimalSize ? prevElemHeight = prevElemHeight - minimalSizeStep : prevElemHeight = svgHeight * d[1] / matrix[1][1];
            percent = (d[1] / matrix[1][1] * 100).toFixed(decimals);
          }
        }
        var label = d[0];
        if (Object.keys(labelMapping).length) {
          for (var key in labelMapping) {
            if (labelMapping[key] === d[0]) {
              label = key;
            }
          }
        }
        var result = d[1];
        if ((typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true) && !isNaN(parseInt(d[1]))) {
          result = (0, _prettyNumber.prettyNumber)(d[1]);
        }
        return {
          name: d[0],
          label: label,
          percent: percent + '%',
          result: result,
          points: [].concat(newPoints, [{
            x: elemWidth * (i + 1),
            y: (svgHeight - prevElemHeight) / 2 + prevElemHeight
          }, {
            x: elemWidth * (i + 1),
            y: (svgHeight - prevElemHeight) / 2
          }])
        };
      });

      //funnel shadows preparing
      var polygonsShadows = polygons.map(function (d, i) {
        return {
          label: d.label,
          points: [{
            x: d.points[0].x,
            y: d.points[0].y
          }, {
            x: d.points[1].x,
            y: d.points[1].y
          }, {
            x: effect3d === 'top' ? d.points[1].x : d.points[1].x - shadowCut,
            y: effect3d === 'top' ? d.points[1].y : d.points[1].y - xMarginElement < svgHeight / 2 ? svgHeight / 2 + 5 : d.points[1].y - xMarginElement
          }, {
            x: effect3d === 'bottom' ? d.points[0].x : d.points[0].x - shadowCut,
            y: effect3d === 'bottom' ? d.points[0].y : d.points[0].y + xMarginElement > svgHeight / 2 ? svgHeight / 2 - 5 : d.points[0].y + xMarginElement
          }]
        };
      });

      //connecting funnels with shadows for rendering
      var polygons3d = polygons.concat(polygonsShadows);

      //chart rendering with polygons
      chart.attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 ' + (svgWidth + margin.left + margin.right) + ' ' + (svgHeight + margin.top + margin.bottom - 30)).attr('height', '100%').attr('width', '100%').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').selectAll('polygon').data(polygons3d).enter().append('polygon').attr('points', function (d) {
        return d.points.map(function (p) {
          return [p.x, p.y].join(',');
        }).join(' ');
      }).style('fill', function (d, i) {
        if (i > polygons.length - 1) {
          if (colorMapping[d.label]) {
            return d3.rgb(colorMapping[d.label]).darker(1.5);
          }
          return d3.rgb(colors[i - polygons.length]).darker(1.5);
        }
        if (colorMapping[d.label]) {
          return colorMapping[d.label];
        }
        return colors[i];
      }).attr('class', function (d) {
        return d.label;
      }).attr('cursor', 'pointer');

      if (lines) {
        //rendering lines
        chart.selectAll('line').data(polygons).enter().append('line').attr('x1', function (d) {
          return d.points[0].x + margin.left - xMarginElement * 0.8;
        }).attr('y1', svgHeight + margin.bottom).attr('x2', function (d) {
          return d.points[0].x + margin.left - xMarginElement * 0.8;
        }).attr('y2', function (d) {
          return d.points[0].y + margin.top;
        }).attr('class', 'chart-lines');

        //rendering last line
        chart.append('line').attr('x1', svgWidth + margin.left + xMarginElement / 4).attr('y1', svgHeight + margin.bottom).attr('x2', polygons[polygons.length - 1].points[3].x + margin.left + xMarginElement / 4).attr('y2', polygons[polygons.length - 1].points[3].y + margin.top).attr('class', 'chart-lines');
      }

      //rendering labels when lines are visible
      if (lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[0].x + margin.left + elemWidth * 0.25;
        }).attr('y', svgHeight + margin.bottom * 0.4 + margin.top).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, elemWidth).attr('cursor', 'pointer');
      }

      //rendering labels when lines are not visible
      if (!lines) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[0].x + margin.left + elemWidth * 0.25;
        }).attr('y', function (d) {
          if (d.points[2].y + elemWidth / 4 > svgHeight + margin.bottom - 40) {
            return svgHeight + margin.bottom - 40 + margin.top;
          }
          if (d.points[2].y + elemWidth / 4 < d.points[1].y) {
            return d.points[1].y + 20 + margin.top;
          }
          return d.points[2].y + elemWidth / 4 + 10 + margin.top;
        }).attr('class', function (d) {
          return 'text-label ' + d.label;
        }).text(function (d) {
          return d.name;
        }).call(_svgTextWrap.textWrap, elemWidth).attr('cursor', 'pointer');
      }

      //rendering percents for each step
      if (show && !resultValues) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2.8 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 10).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');
      }

      //rendering results for each step
      if (resultValues && !show) {
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2.8 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 10).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }

      //rendering results and percenage together
      if (show && resultValues) {
        //rendering percents
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2.8 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top + 16).attr('class', function (d) {
          return 'text-second ' + d.label;
        }).text(function (d) {
          return d.percent;
        }).attr('cursor', 'pointer');

        //rendering results
        chart.selectAll('text.label').data(polygons).enter().append('text').style('text-anchor', 'middle').attr('x', function (d) {
          return d.points[1].x + elemWidth / 2.8 + margin.left;
        }).attr('y', svgHeight / 2 + margin.top - 3).attr('class', function (d) {
          return 'text-main ' + d.label;
        }).text(function (d) {
          return d.result;
        }).attr('cursor', 'pointer');
      }

      //hover handling
      if (hover) {
        var handleMouseOver = function handleMouseOver(d) {
          polygonsHover.style('opacity', 0.5);
          labelHover.style('opacity', 0.5);
          var thisLabel = /[^ ]*$/.exec(d3.select(this).attr('class'))[0];
          chart.selectAll('.' + thisLabel).style('opacity', 1);
        };

        var handleMouseOut = function handleMouseOut(d) {
          polygonsHover.style('opacity', 1);
          labelHover.style('opacity', 1);
        };

        var polygonsHover = chart.selectAll('polygon');
        polygonsHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

        var labelHover = chart.selectAll('text');
        labelHover.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
      }

      // click to copy
      if (utils && utils.clickToCopyToClipboard) {
        var handleClickToCopy = function handleClickToCopy(data) {
          var percent = data.percent,
              result = data.result;

          if (resultValues) {
            (0, _copyToClipboard2.default)(result, d3.event);
          } else if (show) {
            (0, _copyToClipboard2.default)(percent, d3.event);
          }
        };

        var label = chart.selectAll('text');

        label.on('click', handleClickToCopy);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var chartContainer = d3.select(this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'));
      chartContainer.remove();
    }
  }]);

  return HorizontalFunnel3d;
}();

exports.default = HorizontalFunnel3d;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _c = __webpack_require__(10);

var _c2 = _interopRequireDefault(_c);

var _each = __webpack_require__(0);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetricCombo = function () {
  function MetricCombo() {
    _classCallCheck(this, MetricCombo);
  }

  _createClass(MetricCombo, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var _config = this.config,
          container = _config.container,
          metricResults = _config.metricResults,
          title = _config.title,
          showTitle = _config.showTitle,
          subtitle = _config.subtitle,
          tooltip = _config.tooltip,
          utils = _config.utils;


      var colors = ['#c3c4cc'];
      var columns = [];
      columns[0] = [];
      (0, _each.each)(this.dataset.selectColumn(0), function (c, i) {
        var cell = void 0;
        if (i > 0) {
          cell = new Date(c);
        }
        columns[0][i] = cell;
      });
      columns[0][0] = 'x';

      (0, _each.each)(this.data()[0], function (c, i) {
        if (i > 0) {
          columns.push(_this.dataset.selectColumn(i));
        }
      });

      var prevResult = metricResults && metricResults.previous && metricResults.previous.result || 0;
      var currResult = metricResults && metricResults.current && metricResults.current.result || 0;
      var count = currResult - prevResult;
      var percentDifference = prevResult === 0 ? '-' : (0, _prettyNumber.prettyNumber)(Math.round(count / prevResult * 100));
      var labelClass = 'keen-dataviz-metric-green';
      var iconClass = 'arrow-green';

      if (percentDifference < 0) {
        labelClass = 'keen-dataviz-metric-red';
        iconClass = 'arrow-red';
      }

      var containerTitle = showTitle && title ? '<div class="keen-dataviz-title">' + title + '</div>' : '';
      var containerSubtitle = subtitle ? '<div class="keen-dataviz-subtitle">' + subtitle + '</div>' : '';
      var containerElement = document.querySelector(container);
      containerElement.innerHTML = '\n      <div class="keen-dataviz">\n        <div class="keen-dataviz-metric-combo">\n          <div class="metric-combo-data">\n            ' + containerTitle + '\n            ' + containerSubtitle + '\n            <div class="percent-difference ' + labelClass + '"><div class="' + iconClass + '"></div> ' + percentDifference + ' %</div>\n            <div class="current-count ' + labelClass + '"> ' + (0, _prettyNumber.prettyNumber)(count) + ' </div>\n          </div>\n          <div class="keen-dataviz-rendering">\n            <div class="c3-chart"></div>\n          </div>\n        </div>\n      </div>';
      var chartRoot = containerElement.querySelector('.c3-chart');
      var chart = _c2.default.generate({
        bindto: chartRoot,
        color: {
          pattern: colors
        },
        title: title,
        legend: {
          show: false
        },
        data: {
          x: 'x',
          columns: columns,
          type: 'area-spline',
          selection: {
            draggable: false,
            enabled: true,
            multiple: true
          }
        },
        point: {
          r: 0,
          focus: {
            expand: {
              r: 5,
              enabled: true
            }
          },
          select: {
            r: 5,
            enabled: true
          }
        },
        axis: {
          y: {
            show: false
          },
          x: {
            show: false
          }
        },
        grid: {
          x: {
            show: false
          },
          y: {
            show: false
          }
        },
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: -4
        },
        tooltip: tooltip
      });

      if (utils && utils.clickToCopyToClipboard) {
        var currentCount = document.querySelector('.current-count').innerText;
        document.querySelector('.keen-dataviz-metric-combo').addEventListener('click', function (e) {
          return (0, _copyToClipboard2.default)(currentCount, e);
        });
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var container = this.config.container;

      var containerElement = document.querySelector(container);
      var chartContainer = containerElement.querySelector('.c3-chart');
      chartContainer.remove();
    }
  }]);

  return MetricCombo;
}();

exports.default = MetricCombo;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d2 = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d2);

var _rangeable = __webpack_require__(20);

var _rangeable2 = _interopRequireDefault(_rangeable);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heatmap = function () {
  function Heatmap() {
    _classCallCheck(this, Heatmap);
  }

  _createClass(Heatmap, [{
    key: 'render',
    value: function render() {
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          _config$heatmap = _config.heatmap,
          showSlider = _config$heatmap.showSlider,
          simpleTooltip = _config$heatmap.simpleTooltip;
      var _dataset = this.dataset,
          matrix = _dataset.matrix,
          meta = _dataset.meta;

      var margin = {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50
      };
      var baseWidth = 600;
      var baseHeight = 600;
      var heatmapContainer = d3.select(container);
      var containerWidth = parseInt(heatmapContainer.style('width'), 10) || baseWidth;
      var containerHeight = parseInt(heatmapContainer.style('height'), 10) || baseHeight;
      var chartContainer = this.el().querySelector('.c3-chart');
      var svgWidth = containerWidth - margin.right - margin.left;
      var svgHeight = containerHeight - margin.top - margin.bottom;

      var xLabel = new Set();
      var yLabel = new Set();

      var formatData = function formatData() {
        var dateFormat = d3.timeFormat('%B %d');
        var timeFormat = d3.timeFormat('%H:%M');
        var arr = [];
        matrix.forEach(function (element) {
          if (meta.type === 'heatmap') {
            if (typeof element[0][2] === 'number') {
              var obj = {
                x: element[0][0],
                y: element[0][1],
                value: element[0][2]
              };
              arr.push(obj);
            }
          } else {
            var timestamp = Date.parse(element[0]);
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(timestamp)) {
              var _obj = {
                x: dateFormat(new Date(element[0])),
                y: timeFormat(new Date(element[0])),
                value: element[1]
              };
              arr.push(_obj);
            }
          }
        });
        return arr;
      };

      var formattedData = formatData();

      formattedData.forEach(function (item) {
        xLabel.add(item.x);
        yLabel.add(item.y);
      });

      var refValue = formattedData[0].value;
      var minRange = formattedData.reduce(function (min, curr) {
        return curr.value < min ? curr.value : min;
      }, refValue);
      var maxRange = formattedData.reduce(function (max, curr) {
        return curr.value > max ? curr.value : max;
      }, refValue);

      var getColor = function getColor() {
        var defaultColor = '#00BBDE';
        var baseColor = colors[0];
        var rgb = d3.rgb(defaultColor);
        if (d3.color(baseColor)) {
          rgb = d3.rgb(baseColor);
        }
        return rgb;
      };

      var getColorAlpha = d3.scaleLinear().domain([0, d3.max(formattedData, function (d) {
        return d.value;
      })]).range([0, 1]);

      var convertRGBAtoRGB = function convertRGBAtoRGB(color) {
        var bg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [255, 255, 255];

        var opacity = color[3];

        return [Math.floor((1 - opacity) * bg[0] + opacity * color[0] + 0.5), Math.floor((1 - opacity) * bg[1] + opacity * color[1] + 0.5), Math.floor((1 - opacity) * bg[2] + opacity * color[2] + 0.5)];
      };

      var getTileColor = function getTileColor(value) {
        var alpha = getColorAlpha(value);
        var rgb = getColor();
        var solidColor = convertRGBAtoRGB([rgb.r, rgb.g, rgb.b, alpha]);
        var color = 'rgb(' + solidColor[0] + ', ' + solidColor[1] + ', ' + solidColor[2] + ')';
        return color;
      };

      var svg = d3.select(chartContainer).append('svg').attr('preserveAspectRatio', 'xMidYMid slice').attr('viewBox', '0 0 ' + containerWidth + ' ' + containerHeight).attr('height', '100%').attr('width', '100%').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (showSlider) {
        // eslint-disable-next-line no-unused-vars
        var rangeableInput = d3.select(container).append('input').attr('type', 'range').attr('class', 'keen-dataviz-slider');

        var handleSliderChange = function handleSliderChange(data) {
          var rects = svg.selectAll('rect');

          var _data = _slicedToArray(data, 2),
              min = _data[0],
              max = _data[1];

          rects.each(function (d, i, nodes) {
            d3.select(nodes[i]).style('visibility', function () {
              return d.value > max || d.value < min ? 'hidden' : 'visible';
            });
          });
        };

        // eslint-disable-next-line no-unused-vars
        var rangeable = new _rangeable2.default('.keen-dataviz-slider', {
          multiple: true,
          min: minRange,
          max: maxRange,
          value: [minRange, maxRange],
          onChange: function onChange(data) {
            return handleSliderChange(data);
          }
        });
        var containerToString = container.className ? '.' + container.className.replace(/\s/g, '.') : container;
        var customStyle = '\n        ' + containerToString + ' .rangeable-progress,\n        ' + containerToString + ' .rangeable-tooltip,\n        ' + containerToString + ' .active {\n          background-color: ' + getColor() + ';\n        }\n        ' + containerToString + ' .rangeable-tooltip::before {\n          border-color: ' + getColor() + ' transparent transparent;\n        }\n        ' + containerToString + ' .rangeable-handle {\n          border-color: ' + getColor() + ';\n        }\n      ';

        // eslint-disable-next-line no-undef
        var style = document.createElement('style');
        style.innerHTML = customStyle;

        // eslint-disable-next-line no-undef
        var scriptRef = document.querySelector('script');
        scriptRef.parentNode.insertBefore(style, scriptRef);
      }

      var xLabelBase = 5;
      var yLabelBase = 10;

      var getAxisLabelRatio = function getAxisLabelRatio(base, labelSize) {
        return Math.floor(labelSize / base) + 1;
      };
      var xAxis = d3.scaleBand().range([0, svgWidth]).domain([].concat(_toConsumableArray(xLabel))).padding(0.02);

      svg.append('g').style('font-size', 12).attr('transform', 'translate(0, ' + svgHeight + ')').call(d3.axisBottom(xAxis).tickSize(0)).selectAll('text').attr('dy', '1em').filter(function (d, i) {
        return i % getAxisLabelRatio(xLabelBase, xLabel.size);
      }).style('display', 'none');

      var yAxis = d3.scaleBand().range([svgHeight, 0]).domain([].concat(_toConsumableArray(yLabel)).sort()).padding(0.02);

      svg.append('g').style('font-size', 12).call(d3.axisLeft(yAxis).tickSize(0)).selectAll('text').filter(function (d, i) {
        return i % getAxisLabelRatio(yLabelBase, yLabel.size);
      }).style('display', 'none');

      var chartTooltip = d3.select(container).append('div').attr('class', 'keen-dataviz-tooltip').style('opacity', 0).style('background-color', 'white').style('border', '2px solid ' + getColor().toString()).style('font-size', '14px').style('padding', '2px 8px').style('box-shadow', '2px 2px 4px rgba(0,0,0,0.25').style('display', 'none').style('position', 'fixed');

      var handleMouseOver = function handleMouseOver() {
        d3.select(d3.event.target).raise().style('transition', 'transform 150ms ease-out').style('outline', '1px solid ' + getColor()).style('transform', 'translate(0px, -4px)');

        chartTooltip.style('opacity', 1).style('display', 'block');
      };

      var handleMouseMove = function handleMouseMove(d) {
        var tooltipContent = '\n      <tr>\n        <th style="text-align: right">value:</th>\n        <td><b style="font-size:14px;">' + d.value + '</b></td>\n      </tr>';
        if (!simpleTooltip) {
          tooltipContent = '\n        <tr>\n            <th style="text-align: right">xAxis:</th>\n            <td>' + d.x + '</td>\n        </tr>\n        <tr>\n            <th style="text-align: right">yAxis:</th>\n            <td>' + d.y + '</td>\n        </tr>\n        ' + tooltipContent + '\n        ';
        }
        chartTooltip.html('\n          <table style="font-size:12px;">\n            ' + tooltipContent + '\n          </table>\n        ').style('left', d3.event.clientX + 10 + 'px').style('top', d3.event.clientY + 10 + 'px');
      };

      var handleMouseLeave = function handleMouseLeave() {
        d3.select(d3.event.target).style('outline', 'none').style('transform', 'none');

        chartTooltip.style('opacity', 0).style('display', 'none');
      };

      var handleClick = function handleClick(d) {
        return (0, _copyToClipboard2.default)(d.value);
      };

      svg.selectAll().data(formattedData, function (d) {
        return d.x + ':' + d.y;
      }).enter().append('rect').attr('x', function (d) {
        return xAxis(d.x);
      }).attr('y', function (d) {
        return yAxis(d.y);
      }).attr('width', xAxis.bandwidth()).attr('height', yAxis.bandwidth()).style('fill', function (d) {
        return getTileColor(d.value);
      }).style('cursor', 'pointer').on('mouseover', handleMouseOver).on('mousemove', handleMouseMove).on('mouseleave', handleMouseLeave).on('click', handleClick);
    }
  }, {
    key: 'update',
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var chartContainer = this.el().querySelector('.c3-chart');
      chartContainer.remove();
    }
  }]);

  return Heatmap;
}();

exports.default = Heatmap;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d2 = __webpack_require__(2);

var d3 = _interopRequireWildcard(_d2);

var _rangeable = __webpack_require__(20);

var _rangeable2 = _interopRequireDefault(_rangeable);

var _prettyNumber = __webpack_require__(3);

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Choropleth = function () {
  function Choropleth() {
    _classCallCheck(this, Choropleth);
  }

  _createClass(Choropleth, [{
    key: "render",
    value: function render() {
      var matrix = this.dataset.matrix;
      var _config = this.config,
          colors = _config.colors,
          container = _config.container,
          utils = _config.utils,
          title = _config.title,
          _config$choropleth = _config.choropleth,
          map = _config$choropleth.map,
          _config$choropleth$bo = _config$choropleth.borders,
          show = _config$choropleth$bo.show,
          size = _config$choropleth$bo.size,
          color = _config$choropleth$bo.color,
          showSlider = _config$choropleth.showSlider;

      var opts = this.config;
      var choroplethContainer = d3.select(container);
      var chartContainer = d3.select(this.el().querySelector("." + this.config.theme + "-rendering .c3-chart"));
      var width = Number(choroplethContainer.style("width").slice(0, -2));
      var height = Number(choroplethContainer.style("height").slice(0, -2));
      var heightChanges = 0;
      if (title) heightChanges += 31;
      if (showSlider) heightChanges += 20;
      var chart = chartContainer.append("svg").attr("width", width).attr("height", height - heightChanges);

      var onlyValues = matrix.slice(1).map(function (el) {
        return el[1];
      });
      var minVal = d3.min(onlyValues);
      var maxVal = d3.max(onlyValues);
      if (minVal === maxVal) minVal = 0;
      var lightColor = d3.hsl(colors[0]).brighter(1);
      lightColor.l = 0.95;
      var darkColor = colors[0];
      var ramp = d3.scaleLinear().domain([minVal === undefined ? 0 : minVal, maxVal === undefined ? 0 : maxVal]).range([lightColor, darkColor]);

      d3.json("https://cdn.jsdelivr.net/npm/keen-dataviz-maps@1.0.0/maps/" + map + ".json").then(function (data) {
        var zoom = d3.zoom().scaleExtent([1, 5]).translateExtent([[0, 0], [width, height - 50]]).on("zoom", zoomed);

        var projection = void 0;
        switch (map) {
          case "world":
            projection = d3.geoMercator().fitSize([width, height - 50], data);
            break;
          case "us":
            projection = d3.geoAlbersUsa().scale(width).fitSize([width, height - 50], data);
            break;

          default:
            projection = d3.geoMercator().scale(width).fitSize([width, height - 50], data);
            break;
        }

        var path = d3.geoPath().projection(projection);

        var usData = data.features.map(function (el) {
          var theOne = matrix.filter(function (d) {
            return d[0] === el.properties.name;
          });
          if (theOne[0]) return _extends({}, el, {
            properties: _extends({}, el.properties, { result: theOne[0][1] })
          });
          return _extends({}, el, {
            properties: _extends({}, el.properties, { result: 0 })
          });
        });

        if (showSlider) {
          var handleSliderChange = function handleSliderChange(data) {
            var el = chart.selectAll("." + elementName);

            var _data = _slicedToArray(data, 2),
                min = _data[0],
                max = _data[1];

            el.each(function (d, i, nodes) {
              d3.select(nodes[i]).style("visibility", function () {
                return d.properties.result > max || d.properties.result < min ? "hidden" : "visible";
              });
            });
          };

          chartContainer.style("display", "flex").style("flex-direction", "column").style("justify-content", "center");

          var rangeContainer = chartContainer.append("div").style("width", "95%").style("margin", "auto");
          rangeContainer.append("input").attr("id", "rangeSlider");

          var rangeable = new _rangeable2.default("#rangeSlider", {
            type: "double",
            tooltips: true,
            min: 0,
            max: maxVal,
            onChange: function onChange(data) {
              return handleSliderChange(data);
            }
          });

          var containerToString = container.className ? "." + container.className.replace(/\s/g, '.') : container;
          var customStyle = "\n        " + containerToString + " .rangeable-progress,\n        " + containerToString + " .rangeable-tooltip,\n        " + containerToString + " .active {\n          background-color: " + colors[0] + ";\n        }\n        " + containerToString + " .rangeable-tooltip::before {\n          border-color: " + colors[0] + " transparent transparent;\n        }\n        " + containerToString + " .rangeable-handle {\n          border-color: " + colors[0] + ";\n        }\n      ";

          // eslint-disable-next-line no-undef
          var style = document.createElement("style");
          style.innerHTML = customStyle;

          // eslint-disable-next-line no-undef
          var scriptRef = document.querySelector("script");
          scriptRef.parentNode.insertBefore(style, scriptRef);
        }

        var elementName = map === "world" ? "country" : "state";

        chart.selectAll("path").data(usData).enter().append("path").attr("d", path).attr("class", elementName).attr("id", function (d) {
          return "" + d.properties.name.split(" ").join("-").split(".").join("");
        }).style("fill", function (d) {
          return ramp(d.properties.result);
        }).attr("cursor", "pointer").on("mouseover", handleMouseOver).on("mousemove", handleMouseMove).on("mouseout", handleMouseOut);

        //borders
        if (show) {
          chart.selectAll("." + elementName).style("stroke", color).style("stroke-width", size);
        }

        //tooltip
        var tooltip = d3.select(".c3-chart").append("div").style("opacity", 0).attr("class", "c3-tooltip-container").style("display", "none").style("position", "fixed");

        //hover handling
        function handleMouseOver(d) {
          chart.select("#" + d.properties.name.split(" ").join("-").split(".").join("")).style("fill", function (d) {
            return ramp(1.2 * maxVal);
          }).style("stroke-width", 1.5 * size);

          tooltip.style("opacity", 1).style("display", "block");
        }

        function handleMouseMove(d) {
          var result = d.properties.result;
          if ((typeof opts["prettyNumber"] === "undefined" || opts["prettyNumber"] === true) && !isNaN(parseInt(d.properties.result))) {
            result = (0, _prettyNumber.prettyNumber)(d.properties.result);
          }
          tooltip.html("\n          <table class=\"c3-tooltip\">\n            <tr>\n              <th colspan=\"2\">" + d.properties.name + "</th>\n            </tr>\n            <tr class=\"c3-tooltip-name-1\">\n              <td class=\"value\">" + result + "</td>\n            </tr>\n          </table>\n        ").style("left", d3.event.clientX + 10 + "px").style("top", d3.event.clientY + 10 + "px");
        }
        function handleMouseOut(d) {
          chart.select("#" + d.properties.name.split(" ").join("-").split(".").join("")).style("fill", function (d) {
            return ramp(d.properties.result);
          }).style("stroke-width", size);

          tooltip.style("opacity", 0).style("display", "none");
        }

        // click to copy
        if (utils && utils.clickToCopyToClipboard) {
          var handleClickToCopy = function handleClickToCopy(data) {
            var result = data.properties.result;

            (0, _copyToClipboard2.default)(result, d3.event);
          };

          var label = chart.selectAll("." + elementName);

          label.on("click", handleClickToCopy);
        }
        function zoomed() {
          chart.selectAll("." + elementName).attr("transform", d3.event.transform);
        }
        chart.call(zoom);
        chart.call(zoom).on("mousedown.zoom", null);
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.destroy();
      this.render();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var chartContainer = d3.select(this.el().querySelector("." + this.config.theme + "-rendering .c3-chart"));
      chartContainer.remove();
    }
  }]);

  return Choropleth;
}();

exports.default = Choropleth;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderExecutionMetadata;

var _copyToClipboard = __webpack_require__(1);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeClassWithTimeOut(element) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'copied';
  var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

  setTimeout(function () {
    element.classList.remove(className);
  }, ms);
}

function handleCopyToClipboard(event) {
  var target = event.target,
      nodeName = event.target.nodeName;


  var value = void 0;
  if (nodeName === 'DD') {
    value = target.innerText;
    if (!target.classList.contains('copied')) {
      target.classList.add('copied');
      removeClassWithTimeOut(target);
    }
  }
  if (nodeName === 'DT') {
    value = target.nextSibling.innerText;
    if (!target.nextSibling.classList.contains('copied')) {
      target.nextSibling.classList.add('copied');
      removeClassWithTimeOut(target.nextSibling);
    }
  }

  (0, _copyToClipboard2.default)(value);
}

function renderExecutionMetadata() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      element = _ref.element,
      data = _ref.data;

  var dataList = document.createElement('dl');
  dataList.classList = 'keen-dataviz-execution-meta';

  if (Object.keys(data).length) {
    Object.keys(data).forEach(function (item) {
      var dt = document.createElement('dt');
      dt.innerText = item.replace(/_/g, ' ');
      dt.addEventListener('click', function (e) {
        return handleCopyToClipboard(e);
      });

      var dd = document.createElement('dd');
      dd.innerText = data[item];
      dd.addEventListener('click', function (e) {
        return handleCopyToClipboard(e);
      });

      dataList.append(dt);
      dataList.append(dd);
    });
  } else {
    dataList.innerText = 'No execution metadata available';
  }

  element.append(dataList);
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autocollector = __webpack_require__(55);

var _autocollector2 = _interopRequireDefault(_autocollector);

var _modern = __webpack_require__(56);

var _modern2 = _interopRequireDefault(_modern);

var _dracula = __webpack_require__(57);

var _dracula2 = _interopRequireDefault(_dracula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  autocollector: _autocollector2.default,
  modern: _modern2.default,
  dracula: _dracula2.default
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = {
  colors: ['#5E77FF', '#9C60FE', '#F162FE', '#FD65B7', '#FD6768', '#FDB86A', '#F2FC6C', '#A5FC6E', '#71FB85', '#73FBD0', '#76DDFA', '#76f4fa', '#bb76fa', '#fa76bf']
};

exports.default = palette;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = {
  colors: ['#45B2E8', '#D9540D', '#2CAB72', '#2C4BAB', '#EDDD02', '#E84545', '#E845CE', '#5FCEC9', '#E89F45', '#28E43F', '#B765C0', '#458AE8', '#AB2C2C', '#AB2C75', '#27E5FF', '#7168F2', '#FF932B', '#855D00', '#ACE845', '#1C91B4']
};

exports.default = palette;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = {
  colors: ['#8be9fd', '#50fa7b', '#ffb86c', '#ff79c6', '#bd93f9', '#ff5555', '#f1fa8c']
};

exports.default = palette;

/***/ }),
/* 58 */
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
    if (value && !isNaN(value)) {
      text += "<tr class='" + this.CLASS.tooltipName + "-" + d[i].id + "'>";
      if (name.indexOf('__tooltip_ignore_name_field__') === -1) {
        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + (0, _escapeHtml.escapeHtml)(name) + "</td>";
      }
      text += "<td class='value'>" + (0, _escapeHtml.escapeHtml)(value) + "</td>";
      text += "</tr>";
    }
  }
  return text + "</table>";
};

var _escapeHtml = __webpack_require__(4);

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-dataviz.js.map