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

  // Add numeric values
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

  // Pull numeric values
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

  // Pull numeric values
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
}

function sum(arr, start, end){
  // Copy set with given range
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0;

  // Add numeric values
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
}


// Convenience methods

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
