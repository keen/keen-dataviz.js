var Dataset = require('./dataset');

// Visualization Libraries
var libraries = {
  'default': require('./libraries/default')()
  // TODO: add remaining
};

// Utils
var each = require('./utils/each'),
    extend = require('./utils/extend');

var applyColorMapping = require('./utils/apply-color-mapping'),
    applyLabelMapping = require('./utils/apply-label-mapping'),
    applyLabels = require('./utils/apply-labels'),
    applySortGroups = require('./utils/apply-sort-groups');
    // applySortIntervals = require('./utils/apply-sort-intervals');

// Constructor
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
    loader: {
      library: 'default',
      type: 'spinner'
    },
    message: {
      library: 'default',
      type: 'message'
    },
    width: undefined
  };

  Dataviz.visuals.push(this);
};

Dataviz.prototype.attributes = function(obj){
  if (!arguments.length) return this.view;
  var self = this;
  each(obj, function(prop, key){
    // // Handle specified options differently
    // if (key === 'library') {
    //   self.library(prop);
    // }
    // else if (key === 'chartType' || key === 'type') {
    //   self.type(prop);
    // }
    // else if (key === 'chartOptions') {
    //   self.chartOptions(prop);
    // }
    // else if (key === 'notes') {
    //   self.notes(prop);
    // }
    // else if (key === 'title') {
    //   self.title(prop);
    // }
    // else {
    self.view[key] = prop;
    // }
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
  // TODO: applyColorMapping.call(this);
  return this;
};

Dataviz.prototype.data = function(data){
  if (!arguments.length) return this.dataset.output();
  if (data instanceof Dataset) {
    this.dataset = data;
  }
  // else if (data instanceof Request) {
  //   this.parseRequest(data);
  // }
  else {
    this.parseRawData(data);
  }
  return this;
};

Dataviz.prototype.destroy = function(){
  // TODO
  // var actions = getAdapterActions.call(this);
  var library = this.library(),
      type = this.type(),
      element = this.el();

  if (library && type && Dataviz.libraries[library][type].destroy) {
    Dataviz.libraries[library][type].destroy.apply(this, arguments);
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

// Dataviz.prototype.error = function(){
//   // TODO
//   return this;
// };

Dataviz.prototype.height = function(num){
  if (!arguments.length) return this.view['height'];
  this.view['height'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
  return this;
};

// IMPORTANT: Must be run before data parsing
Dataviz.prototype.indexBy = function(str){
  if (!arguments.length) return this.view.indexBy;
  this.view.indexBy = (str ? String(str) : Dataviz.defaults.indexBy);
  return this;
};

Dataviz.prototype.labels = function(arr){
  if (!arguments.length) {
    // TODO:
    // If labels config is empty, return what's in the dataset
    // if (!this.view.labels || !this.view.labels.length) {
    //   return getLabels.call(this);
    // }
    // else {
      return this.view.labels;
    // }
  }
  else {
    this.view.labels = (arr instanceof Array ? arr : null);
    // TODO: applyLabels.call(this);
    return this;
  }
};

Dataviz.prototype.labelMapping = function(obj){
  if (!arguments.length) return this.view.labelMapping;
  this.view.labelMapping = (obj ? obj : null);
  // TODO: applyLabelMapping.call(this);
  return this;
};

Dataviz.prototype.library = function(str){
  if (!arguments.length) return this.view['library'];
  this.view['library'] = (str ? String(str) : null);
  return this;
};

Dataviz.prototype.message = function(){
  // TODO
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
    loader = Dataviz.libraries[this.view.loader.library][this.view.loader['type']];
    if (loader.render) {
      loader.render.apply(this, arguments);
    }
    this.view._prepared = true;
  }
  return this;
};

Dataviz.prototype.render = function(){
  var loader = Dataviz.libraries[this.view.loader.library][this.view.loader['type']],
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
  // TODO: applySortGroups.call(this);
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

// Deprecations:
// -------------
Dataviz.prototype.chartType = Dataviz.prototype.type;
Dataviz.prototype.error = Dataviz.prototype.message;
// Dataviz.prototype.initialize = function(){
//   return this;
// };

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
