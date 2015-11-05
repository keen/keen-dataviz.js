;(function (f) {
  // RequireJS
  if ('undefined' !== typeof define && define.amd && typeof define === 'function') {
    define('keen-dataviz', [], function(){ return f(); });
  }
  // CommonJS
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  }
  // Global
  var g = null;
  if (typeof window !== 'undefined') {
    g = window;
  } else if (typeof global !== 'undefined') {
    g = global;
  } else if (typeof self !== 'undefined') {
    g = self;
  }
  if (g) {
    g.Dataviz = f();
  }
})(function() {
  'use strict';
  var Dataviz = require('./');
  module.exports = Dataviz;
  return Dataviz;
});
