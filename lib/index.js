(function(env){
  var Dataset = require('./dataset'),
      data = require('./data');

  // Utils
  var each = require('./utils/each'),
      extend = require('./utils/extend'),
      isDateString = require('./utils/assert-date-string'),
      escapeHtml = require('./utils/escape-html');

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
  }

  Dataviz.libraries = { 'default': {} };
  if ('undefined' !== typeof window) {
    Dataviz.libraries['default'] = require('./libraries')(Dataviz);
  }
  Dataviz.visuals = [];

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


  // Prototype
  // ------------

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
    return this;
  };

  Dataviz.prototype.data = data;

  Dataviz.prototype.dateFormat = function(val){
    if (!arguments.length) return this.view.dateFormat;
    if (typeof val === 'string' || typeof val === 'function') {
      this.view.dateFormat = val;
    }
    else {
      this.view.dateFormat = undefined;
    }
    return this;
  };

  Dataviz.prototype.destroy = function(){
    var library = this.library(),
        type = this.type(),
        element = this.el();

    // Call destroy method if present
    if (Dataviz.libraries[library]
      && Dataviz.libraries[library][type]){
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
    if (!arguments.length) return this.view.labels;
    this.view.labels = (arr instanceof Array ? arr : []);

    // Write labels
    if (this.data()[0].length === 2 && !isDateString(this.data()[1][0])) {
      this.dataset.updateColumn(0, function(value, index){
        if (this.view.labels[index-1]) {
          return String(this.view.labels[index-1]);
        }
        else {
          return value;
        }
      }.bind(this));
    }
    else {
      this.dataset.updateRow(0, function(value, index){
        if (index > 0 && this.view.labels[index-1]) {
          return String(this.view.labels[index-1]);
        }
        else {
          return value;
        }
      }.bind(this));
    }
    return this;
  };

  Dataviz.prototype.labelMapping = function(obj){
    if (!arguments.length) return this.view.labelMapping;
    if (obj === null) {
      this.view.labelMapping = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        this.view.labelMapping[key] = (value ? value : null);
      }.bind(this));
    }

    // Write labels
    if (this.data()[0].length === 2 && !isDateString(this.data()[1][0])) {
      this.dataset.updateColumn(0, function(value){
        if (this.view.labelMapping[value]) {
          return escapeHtml(String(this.view.labelMapping[value]));
        }
        else {
          return escapeHtml(value);
        }
      }.bind(this));
    }
    else {
      this.dataset.updateRow(0, function(value){
        if (this.view.labelMapping[value]) {
          return escapeHtml(String(this.view.labelMapping[value]));
        }
        else {
          return escapeHtml(value);
        }
      }.bind(this));
    }
    return this;
  };

  Dataviz.prototype.library = function(str){
    if (!arguments.length) return this.view['library'];
    this.view['library'] = (str ? String(str) : null);
    return this;
  };

  Dataviz.prototype.message = function(){
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
          loader.render.call(self);
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
      this.message('A DOM element is required. Check out the .el() method.');
      throw 'A DOM element is required. Check out the .el() method.';
      return;
    }

    if (!this.type()) {
      this.message('A chart type is required. Check out the .type() method.');
      throw 'A chart type is required. Check out the .type() method.';
      return;
    }

    domReady(function(){
      if (self.view._prepared && loader.destroy) {
        loader.destroy.apply(self, arguments);
      }
      self.el().innerHTML = '';

      if (Dataviz.libraries[library] === 'undefined'){
        // Error: Unregistered library
        self.message('Incorrect library');
        throw 'Incorrect library';
        return;
      }
      else {
        if (typeof Dataviz.libraries[library][type] === 'undefined') {
          this.message('Incorrect chart type');
          throw 'Incorrect chart type';
          return;
        }
        else {
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

  Dataviz.prototype.sortGroups = function(str){
    if (!arguments.length) return this.view.sortGroups;
    this.view.sortGroups = (str ? String(str) : null);

    // Sort groups
    if (this.view.sortGroups && this.data().length > 1) {
      if (isDateString(this.data()[1][0])) {
        this.dataset.sortColumns(this.view.sortGroups, this.dataset.getColumnSum);
      }
      else {
        this.dataset.sortRows(this.view.sortGroups, this.dataset.getRowSum);
      }
    }
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
    this.view['type'] = (str ? convertChartTypes(str) : null);
    return this;
  };

  Dataviz.prototype.update = function(){
    var library = this.library(),
        type = this.type(),
        element = this.el();
    if (library && type && element && Dataviz.libraries[library][type].update) {
      Dataviz.libraries[library][type].update.apply(this, arguments);
    }
    return this;
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

  // Private
  // ------------

  function buildDomWrapper(el, options){
    var html = '';
    html += '<div class="' + options.theme + '">';
    if (options['title']) {
      html += '<div class="' + options.theme + '-title">' + escapeHtml(options['title']) + '</div>';
    }
    html += '<div class="' + options.theme + '-stage"><div class="' + options.theme + '-rendering"></div></div>';
    if (options.notes) {
      html += '<div class="' + options.theme + '-notes">' + escapeHtml(options.notes) + '</div>';
    }
    html += '</div>';
    el.innerHTML = html;
  }

  function convertChartTypes(str){
    var map = {
      'areachart'   : 'area',
      'barchart'    : 'horizontal-bar',
      'columnchart' : 'bar',
      'linechart'   : 'line',
      'piechart'    : 'pie'
    };
    return map[str] || str;
  }

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
  env.Keen = env.Keen || {};
  env.Keen.Dataviz = Dataviz;
  env.Dataviz = Dataviz;

}).call(this, typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {});
