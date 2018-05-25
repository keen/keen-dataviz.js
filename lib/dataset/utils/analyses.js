import { each } from '../../utils/each';
import { extend } from '../../utils/extend';

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

const getColumnAverage = function (arr) {
  return average(arr, 1);
};
const getRowAverage = getColumnAverage;

const getColumnSum = function (arr) {
  return sum(arr, 1);
};
const getRowSum = getColumnSum;

const getColumnMaximum = function (arr) {
  return maximum(arr, 1);
};
const getRowMaximum = getColumnMaximum;

const getColumnMinimum = function (arr) {
  return minimum(arr, 1);
};
const getRowMinimum = getColumnMinimum;

const getColumnLabel = function (arr) {
  return arr[0];
};
const getRowIndex = getColumnLabel;

export default {
  average,
  maximum,
  minimum,
  sum,
  getColumnAverage,
  getRowAverage,
  getColumnSum,
  getRowSum,
  getColumnMaximum,
  getRowMaximum,
  getColumnMinimum,
  getRowMinimum,
  getColumnLabel,
  getRowIndex,
};
