(function(root){

  var Dataset = require('./dataset'),
      data = require('./data');

  // Visualization Libraries
  var libraries = {
    'default': require('./libraries/default')()
    // TODO: add remaining
  };

  // Utils
  /* var applyColorMapping = require('./utils/apply-color-mapping'),
      applyLabelMapping = require('./utils/apply-label-mapping'),
      applyLabels = require('./utils/apply-labels'),
      applySortGroups = require('./utils/apply-sort-groups');, */

  var each = require('./utils/each'),
      extend = require('./utils/extend');

  // Constructor
  function Dataviz(){
    if (this instanceof Dataviz === false) {
      return new Dataviz();
    }

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
      colorMapping: {},
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

  Dataviz.prototype.attributes = function(obj){
    if (!arguments.length) return this.view;
    var view = this.view;
    each(obj, function(prop, key){
      // Handle deprecated property names
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
    var self = this;
    if (!arguments.length) return this.view.chartOptions;
    if (obj === null) {
      this.view.chartOptions = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.chartOptions[key] = (value ? value : null);
      });
    }
    return this;
  };

  Dataviz.prototype.colors = function(arr){
    if (!arguments.length) return this.view.colors;
    this.view.colors = (arr instanceof Array ? arr : []);
    return this;
  };

  Dataviz.prototype.colorMapping = function(obj){
    var self = this;
    if (!arguments.length) return this.view.colorMapping;
    if (obj === null) {
      this.view.colorMapping = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.colorMapping[key] = (value ? value : null);
      });
    }
    // TODO: applyColorMapping.call(this);
    return this;
  };

  Dataviz.prototype.data = data;

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
    var self = this;
    if (!arguments.length) return this.view.el;
    domReady(function(){
      if (target && target !== null) {
        if (target.nodeName) {
          self.view.el = target;
        }
        else if (document.querySelector) {
          self.view.el = document.querySelector(target);
        }
      }
      else {
        self.view.el = undefined;
      }
    });
    return this;
  };

  Dataviz.prototype.height = function(num){
    if (!arguments.length) return this.view['height'];
    this.view['height'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
    return this;
  };

  // IMPORTANT: Must be run before data parsing
  Dataviz.prototype.indexBy = function(str){
    if (!arguments.length) return this.view.indexBy;
    this.view.indexBy = (str ? String(str) : 'timeframe.start');
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
      this.view.labels = (arr instanceof Array ? arr : []);
      // TODO: applyLabels.call(this);
      return this;
    }
  };

  Dataviz.prototype.labelMapping = function(obj){
    var self = this;
    if (!arguments.length) return this.view.labelMapping;
    if (obj === null) {
      this.view.labelMapping = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.labelMapping[key] = (value ? value : null);
      });
    }
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
    var loader;
    if (this.view._rendered) {
      this.destroy();
    }
    if (this.el()) {
      this.el().innerHTML = '';
      message = Dataviz.libraries['default'].message;
      if (message.render) {
        message.render.apply(this, arguments);
      }
    }
    return this;
  };

  Dataviz.prototype.notes = function(str){
    if (!arguments.length) return this.view['notes'];
    this.view['notes'] = (str ? String(str) : null);
    return this;
  };

  Dataviz.prototype.prepare = function(){
    var self = this, loader;

    if (!this.el()) {
      throw 'A DOM element is required. Check out the .el() method.';
      return;
    }

    domReady(function(){
      if (self.view._rendered) {
        self.destroy();
      }
      if (self.el()) {
        self.el().innerHTML = '';
        loader = Dataviz.libraries['default'].spinner;
        if (loader.render) {
          loader.render.apply(self, arguments);
        }
        self.view._prepared = true;
      }
    });
    return this;
  };

  Dataviz.prototype.render = function(){
    var self = this,
        loader = Dataviz.libraries['default'].spinner,
        library = this.library(),
        type = this.type(),
        element = this.el();

    if (!this.el()) {
      throw 'A DOM element is required. Check out the .el() method.';
      return;
    }

    domReady(function(){
      if (self.view._prepared && loader.destroy) {
        loader.destroy.apply(self, arguments);
      }
      self.el().innerHTML = '';

      if (library && type && element && Dataviz.libraries[library][type].render) {
        buildDomWrapper(self.el(), {
          notes: self.notes(),
          theme: self.theme(),
          title: self['title']()
        });
        Dataviz.libraries[library][type].render.apply(self, arguments);
        self.view._rendered = true;
      }
    });
    return this;
  };

  function buildDomWrapper(el, options){
    var html = '';
    html += '<div class="' + options.theme + '">';
    if (options['title']) {
      html += '<div class="' + options.theme + '-title">' + options['title'] + '</div>';
    }
    html += '<div class="' + options.theme + '-stage"><div class="' + options.theme + '-rendering"></div></div>';
    if (options.notes) {
      html += '<div class="' + options.theme + '-notes">' + options.notes + '</div>';
    }
    html += '</div>';
    el.innerHTML = html;
  }

  Dataviz.prototype.sortGroups = function(str){
    if (!arguments.length) return this.view.sortGroups;
    this.view.sortGroups = (str ? String(str) : null);
    // TODO: applySortGroups.call(this);
    return this;
  };

  Dataviz.prototype.sortIntervals = function(str){
    if (!arguments.length) return this.view.sortInterval;
    this.view.sortIntervals = (str ? String(str) : null);
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

  // Deprecations
  Dataviz.prototype.chartType = Dataviz.prototype.type;
  Dataviz.prototype.error = Dataviz.prototype.message;
  Dataviz.prototype.parseRawData = Dataviz.prototype.data;
  Dataviz.prototype.parseRequest = function(){
    // this.emit('error', 'This method is no longer supported. Use .data() instead: https://github.com/keen/keen-dataviz.js#data');
    return this;
  };
  Dataviz.prototype.initialize = function(){
    // this.emit('error', 'This method is no longer supported, and can be omitted as it has no impact');
    return this;
  };
  // --------------------

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

  function domReady(fn){
    if ('undefined' !== typeof document
      || 'undefined' === typeof window) {
        fn();
        return;
    }
    // Firefox 3.5 shim
    if(document.readyState == null && document.addEventListener){
      document.addEventListener('DOMContentLoaded', function DOMContentLoaded(){
        document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        document.readyState = 'complete';
      }, false);
      document.readyState = 'loading';
    }
    testDom(fn);
  }

  function testDom(fn){
    if (/in/.test(document.readyState)) {
      setTimeout(function(){
        testDom(fn);
      }, 9);
    }
    else {
      fn();
    }
  }

  // Exports
  // --------------------

  // CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dataviz;
  }

  // AMD
  if (typeof define !== 'undefined' && define.amd) {
    define('keen-dataviz', [], function(){
      return Dataviz;
    });
  }

  // Global
  if (root.Keen) {
    root.Keen.Dataviz = Dataviz;
  }
  root.Dataviz = Dataviz;
  if (typeof global !== 'undefined') {
    if (global.Keen) {
      global.Keen.Dataviz = Dataviz;
    }
    global.Dataviz = Dataviz;
  }

}(this));

// module.exports = Dataviz;
