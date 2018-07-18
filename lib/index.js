import data from './data';
import { Dataset } from './dataset';
// Utils
import { each } from './utils/each';
import isDateString from './utils/assert-date-string';
import { stripHtmlTags } from './utils/strip-html-tags';
import { escapeHtml } from './utils/escape-html';
import libraries from './libraries';
import { extendDeep } from './utils/extend-deep';

// Constructor
export const Dataviz = function (options = {}) {
  if (this instanceof Dataviz === false) {
    return new Dataviz(options);
  }

  const datavizInstance = this;

  const defaultOptions = {
    showDeprecationWarnings: true,
    container: undefined, // querySelector of container, for example '#someDiv'
    containerElement: undefined, // HTML parent element for the chart
    // width: undefined, *deprecated* - use CSS
    // height: undefined, *deprecated* - use CSS
    title: undefined,
    notes: undefined,
    theme: 'keen-dataviz',

    colors: [
      '#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb',
      '#5a9eed', '#73d483', '#c879bb', '#0099b6', '#d74d58', '#cb9141',
      '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e',
      '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd',
      '#73aff4', '#87e096', '#d88bcb',
    ],

    colorMapping: {},

    indexBy: 'timeframe.start',
    labels: [],
    labelMapping: {},
    library: 'default',
    sortGroups: undefined,
    sortIntervals: undefined,
    showLoadingSpinner: false,

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

  this.config = { ...extendDeep(defaultOptions, options) };

  // get DOM node by query
  if (this.config.container) {
    this.el(this.config.container);
  }

  this.dataset = new Dataset();
  this.view = {
    _prepared: false,
    _rendered: false,
    _artifacts: { /* state bin */ }
  };

  Dataviz.visuals.push(this);

  if (this.config.showLoadingSpinner) {
    this.prepare();
  }
};

Dataviz.libraries = { default: {} };
if (typeof window !== 'undefined') {
  Dataviz.libraries.default = libraries(Dataviz);
}
Dataviz.visuals = [];

Dataviz.register = function (name, actions) {
  Dataviz.libraries[name] = Dataviz.libraries[name] || {};
  each(actions, function(method, key){
    Dataviz.libraries[name][key] = method;
  });
};

Dataviz.find = function(target){
  if (!arguments.length) return Dataviz.visuals;
  const el = target.nodeName ? target : document.querySelector(target);
  let match = null;
  each(Dataviz.visuals, function(visual){
    if (el == visual.config.container){
      match = visual;
      return false;
    }
  });
  return match;
};


  // Prototype
  // ------------

Dataviz.prototype.attributes = function(obj){
  if (this.config.showDeprecationWarnings) {
    console.log('.attributes() is deprecated. Use: new KeenDataviz({ _your_value_here_ })');
  }
  if (!arguments.length) return this.config;
  const view = this.config;
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
  if (this.config.showDeprecationWarnings) {
    console.log('.chartOptions() is deprecated. Use: new KeenDataviz({ _your_value_here_ })');
  }
  if (!arguments.length) return this.config;
  this.config = extendDeep(this.config, obj);
  return this;
};

Dataviz.prototype.colors = function(arr){
  if (this.config.showDeprecationWarnings) {
    console.log('.colors() is deprecated. Use: new KeenDataviz({ colors: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.colors;
  this.config.colors = (arr instanceof Array ? arr : []);
  return this;
};

Dataviz.prototype.colorMapping = function(obj){
  if (this.config.showDeprecationWarnings) {
    console.log('.colorMapping() is deprecated. Use: new KeenDataviz({ colorMapping: _your_value_here_ })');
  }
  const datavizInstance = this;
  if (!arguments.length) return this.config.colorMapping;
  if (obj === null) {
    this.config.colorMapping = {};
  }
  else if (typeof obj === 'object') {
    each(obj, function(value, key){
      datavizInstance.config.colorMapping[key] = (value ? value : null);
    });
  }
  return this;
};

Dataviz.prototype.data = data;

Dataviz.prototype.dateFormat = function(val){
  if (this.config.showDeprecationWarnings) {
    console.log('.dateFormat() is deprecated. Use: new KeenDataviz({ dateFormat: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.dateFormat;
  if (typeof val === 'string' || typeof val === 'function') {
    this.config.dateFormat = val;
  }
  else {
    this.config.dateFormat = undefined;
  }
  return this;
};

Dataviz.prototype.destroy = function(){
  const library = this.library();
  const type = this.config.type;
  const element = this.el();

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
  const datavizInstance = this;
  if (!arguments.length) return this.config.containerElement;
  domReady(function(){
    if (target && target !== null) {
      if (target.nodeName) {
        datavizInstance.config.containerElement = target;
      }
      else if (document.querySelector) {
        datavizInstance.config.containerElement = document.querySelector(target);
      }
    }
    else {
      datavizInstance.config.containerElement = undefined;
    }
  });
  return this;
};

Dataviz.prototype.height = function(num){
  if (this.config.showDeprecationWarnings) {
    console.log('.height() is deprecated - use CSS classes');
  }
  return this;
};

// IMPORTANT: Must be run before data parsing
Dataviz.prototype.indexBy = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.indexBy() is deprecated. Use: new KeenDataviz({ indexBy: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.indexBy;
  this.config.indexBy = (str ? String(str) : 'timeframe.start');
  return this;
};

Dataviz.prototype.labels = function(arr){
  if (this.config.showDeprecationWarnings) {
    console.log('.labels() is deprecated. Use: new KeenDataviz({ labels: _your_value_here_ })');
  }

  if (!arguments.length) return this.config.labels;
  this.config.labels = (arr instanceof Array ? arr : []);

  setLabels(this);

  return this;
};

function setLabels(datavizInstance){
  // Write labels
  if (datavizInstance.data()[0].length === 2 && !isDateString(datavizInstance.data()[1][0])) {
    datavizInstance.dataset.updateColumn(0, function(value, index){
      if (datavizInstance.config.labels[index-1]) {
        return stripHtmlTags(String(datavizInstance.config.labels[index-1]));
      }
      return stripHtmlTags(value);
    }.bind(datavizInstance));
  }
  else {
    datavizInstance.dataset.updateRow(0, function(value, index){
      if (index > 0 && datavizInstance.config.labels[index-1]) {
        return stripHtmlTags(String(datavizInstance.config.labels[index-1]));
      }
      return stripHtmlTags(value);
    }.bind(datavizInstance));
  }
}

Dataviz.prototype.labelMapping = function(obj){
  if (this.config.showDeprecationWarnings) {
    console.log('.labelMapping() is deprecated. Use: new KeenDataviz({ labelMapping: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.labelMapping;
  if (obj === null) {
    this.config.labelMapping = {};
  }
  else if (typeof obj === 'object') {
    each(obj, function(value, key){
      this.config.labelMapping[key] = (value ? value : null);
    }.bind(this));
  }

  mapLabels(this);

  return this;
};

function mapLabels(datavizInstance){
  // Write labels
  if (datavizInstance.data()[0].length === 2 && !isDateString(datavizInstance.data()[1][0])) {
    datavizInstance.dataset.updateColumn(0, function(value){
      if (datavizInstance.config.labelMapping[value]) {
        return stripHtmlTags(String(datavizInstance.config.labelMapping[value]));
      }
      return stripHtmlTags(value);
    }.bind(datavizInstance));
  }
  else {
    datavizInstance.dataset.updateRow(0, function(value){
      if (datavizInstance.config.labelMapping[value]) {
        return stripHtmlTags(String(datavizInstance.config.labelMapping[value]));
      }
      return stripHtmlTags(value);
    }.bind(datavizInstance));
  }
}

Dataviz.prototype.library = function(str){
    if (!arguments.length) return this.config['library'];
    this.config['library'] = (str ? String(str) : null);
    return this;
};

Dataviz.prototype.message = function(){
    if (this.view._rendered) {
      this.destroy();
    }
    if (this.el()) {
      this.el().innerHTML = '';
      const message = Dataviz.libraries.default.message;
      if (message.render) {
        message.render.apply(this, arguments);
      }
    }
    return this;
};

Dataviz.prototype.notes = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.notes() is deprecated. Use: new KeenDataviz({ notes: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.notes;
  this.config.notes = (str ? String(str) : null);
  return this;
};

Dataviz.prototype.prepare = function(){
    const datavizInstance = this;

    if (!this.el()) {
      throw `${this.config.container} not found. A DOM parent element is required to mount the chart.`;
      return;
    }

    domReady(function(){
      if (datavizInstance.view._rendered) {
        datavizInstance.destroy();
      }
      if (datavizInstance.el()) {
        datavizInstance.el().innerHTML = '';
        const loader = Dataviz.libraries.default.spinner;
        if (loader.render) {
          loader.render.call(datavizInstance);
        }
        datavizInstance.view._prepared = true;
      }
    });

    return this;
};

Dataviz.prototype.render = function(rawData = undefined){
  const datavizInstance = this;
  if (rawData) {
    return datavizInstance.data(rawData).render();
  }
  if (Object.keys(this.config.labelMapping).length > 0){
    mapLabels(datavizInstance);
  }
  if (!!this.config.labels && Object.keys(this.config.labels).length > 0){
    setLabels(datavizInstance);
  }
  if (!!this.config.sortGroups) {
    sortGroups(datavizInstance);
  }
  if (!!this.config.sortIntervals) {
    sortIntervals(datavizInstance);
  }

  const loader = Dataviz.libraries.default.spinner;
  const library = this.config.library;
  const type = this.config.type;
  const containerElement = this.el();

  if (!containerElement || containerElement === undefined) {
    const msg = `${this.config.container} not found. A DOM parent element is required to mount the chart.`;
    console.error(msg);
    throw msg;
    return;
  }

  domReady(function(){
    if (datavizInstance.view._prepared && loader.destroy) {
      loader.destroy.apply(datavizInstance, arguments);
    }
    containerElement.innerHTML = '';

    if (Dataviz.libraries[library] === 'undefined'){
      // Error: Unregistered library
      const msg = `Incorrect library`;
      datavizInstance.message(msg);
      throw msg;
      return;
    }
    else {
      if (typeof Dataviz.libraries[library][type] === 'undefined') {
        const msg = `Incorrect chart type`;
        datavizInstance.message(msg);
        throw msg;
        return;
      }
      else {
        buildDomWrapper(containerElement,
          datavizInstance.config
        );
        Dataviz.libraries[library][type].render.call(datavizInstance);
        datavizInstance.view._rendered = true;
      }
    }
  });
  return this;
};

Dataviz.prototype.sortGroups = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.sortGroups() is deprecated. Use: new KeenDataviz({ sortGroups: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.sortGroups;
  this.config.sortGroups = (str ? String(str) : null);

  sortGroups(this, str);

  return this;
};

function sortGroups(datavizInstance){
  // Sort groups
  if (datavizInstance.config.sortGroups && datavizInstance.data().length > 1) {
    if (isDateString(datavizInstance.data()[1][0])) {
      datavizInstance.dataset.sortColumns(datavizInstance.config.sortGroups, datavizInstance.dataset.getColumnSum);
    }
    else {
      datavizInstance.dataset.sortRows(datavizInstance.config.sortGroups, datavizInstance.dataset.getRowSum);
    }
  }
}

Dataviz.prototype.sortIntervals = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.sortIntervals() is deprecated. Use: new KeenDataviz({ sortIntervals: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.sortIntervals;
  this.config.sortIntervals = (str ? String(str) : null);

  sortIntervals(this);

  return this;
};

function sortIntervals(datavizInstance){
  if (datavizInstance.config.sortIntervals) {
    datavizInstance.dataset.sortRows(datavizInstance.config.sortIntervals);
  }
}

Dataviz.prototype.stacked = function(bool){
  if (this.config.showDeprecationWarnings) {
    console.log('.stacked() is deprecated. Use: new KeenDataviz({ stacked: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.stacked;
  this.config.stacked = bool ? true : false;
  return this;
};

Dataviz.prototype.theme = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.theme() is deprecated. Use: new KeenDataviz({ theme: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.theme;
  this.config.theme = (str ? String(str) : null);
  return this;
};

Dataviz.prototype.title = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.title() is deprecated. Use: new KeenDataviz({ title: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.title;
  this.config.title = (str ? String(str) : null);
  return this;
};

Dataviz.prototype.type = function(str){
  if (this.config.showDeprecationWarnings) {
    console.log('.type() is deprecated. Use: new KeenDataviz({ type: _your_value_here_ })');
  }
  if (!arguments.length) return this.config.type;
  this.config.type = (str ? convertChartTypes(str) : null);
  return this;
};

Dataviz.prototype.update = function(){
  const library = this.config.library;
  const type = this.config.type;
  const element = this.el();
  if (library && type && element && Dataviz.libraries[library][type].update) {
    Dataviz.libraries[library][type].update.apply(this, arguments);
  }
  return this;
};

Dataviz.prototype.width = function(num){
  if (this.config.showDeprecationWarnings) {
    console.log('.width() is deprecated - use CSS classes');
  }
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

function buildDomWrapper(el, options) {
  let html = '';
  let chart100percentWide = '';
  if (options.legend.position === 'top' || options.legend.position === 'bottom') {
    chart100percentWide = 'c3-chart-100-percent';
  }

  let container = `<div class="c3-chart ${chart100percentWide}"></div>`;
  let align = 'horizontal';
  if (options.legend.position === 'left' || options.legend.position === 'right') {
    align = 'vertical';
  }
  if (options.legend.position === 'top' || options.legend.position === 'left') {
    container = `<div class="keen-c3-legend keen-c3-legend-${align} keen-c3-legend-${options.legend.position}"></div>${container}`;
  } else {
    container = `${container}<div class="keen-c3-legend keen-c3-legend-${align} keen-c3-legend-${options.legend.position}"></div>`;
  }
  html += `<div class="${options.theme}">`;
  if (options.title) {
    html += `<div class="${options.theme}-title">${options.title}</div>`;
  }
  html += `<div class="${options.theme}-rendering ${options.theme}-rendering-${align}">${container}</div>`;
  if (options.notes) {
    html += `<div class="${options.theme}-notes">${options.notes}</div>`;
  }
  html += `</div>`;
  el.innerHTML = html;
}

function convertChartTypes(str) {
  const map = {
    areachart: 'area',
    barchart: 'horizontal-bar',
    columnchart: 'bar',
    linechart: 'line',
    piechart: 'pie',
  };
  return map[str] || str;
}

function testDom(fn) {
  if (/in/.test(document.readyState)) {
    setTimeout(function(){
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

export { Dataset } from './dataset';

export default Dataviz;
