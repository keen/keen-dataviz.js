var c3 = require('c3'),
    d3 = require('d3');

var each = require('../utils/each'),
    extend = require('../utils/extend'),
    extendDeep = require('../utils/extend-deep'),
    isDateString = require('../utils/assert-date-string');

var c3DefaultDateFormat = require('./c3/extensions/default-date-format');
var c3PaginatingLegend = require('./c3/extensions/paginating-legend');
var c3TooltipContents = require('./c3/extensions/tooltip-contents');

var types = {
  'message' : require('./default/message'),
  'metric'  : require('./default/metric'),
  'table'   : require('./default/table'),
  'spinner' : require('./default/spinner')
};

module.exports = function(lib) {
  var timer, delay;
  bindResizeListener(function(){
    if (timer) {
      clearTimeout(timer);
    }
    delay = (lib.visuals.length > 12) ? 1000 : 250;
    timer = setTimeout(function(){
      each(lib.visuals, function(chart){
        if (chart.view._artifacts.c3) {
          chart.view._artifacts.c3.resize();
        }
      });
    }, delay);
  });

  defineC3();
  return types;
};

function defineC3(){
  var c3Types = [
    // Standard types
    'area',
    'area-spline',
    'area-step',
    'bar',
    'donut',
    'gauge',
    'line',
    'pie',
    'step',
    'spline',

    // Horizontal variant types
    'horizontal-area',
    'horizontal-area-spline',
    'horizontal-area-step',
    'horizontal-bar',
    'horizontal-line',
    'horizontal-step',
    'horizontal-spline'
  ];

  function getDefaultOptions(){
    var DEFAULT_OPTIONS,
        ENFORCED_OPTIONS,
        options;

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
      tooltip: {}
    };

    ENFORCED_OPTIONS = {
      bindto: this.el().querySelector('.' + this.theme() + '-rendering'),
      color: {
        pattern: this.colors()
      },
      data: {
        colors: extend({}, this.colorMapping()),
        columns: [],
        type: this.type().replace('horizontal-', '')
      },
      size: {
        height: this.height() ? this.height() - this.el().offsetHeight : 400,
        width: this.width()
      },
      tooltip: {},
      transition: {
        duration: 0
      }
    };

    // Apply chartOptions
    options = extendDeep({}, DEFAULT_OPTIONS, this.chartOptions());

    // Apply enforced options
    options = extendDeep(options, ENFORCED_OPTIONS);
    options.color.pattern = ENFORCED_OPTIONS.color.pattern;
    options.data.colors = ENFORCED_OPTIONS.data.colors;
    options.data.columns = ENFORCED_OPTIONS.data.columns;

    return options;
  }

  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        var options = getDefaultOptions.call(this);

        if (this.data()[0].length === 1 || this.data().length === 1) {
          this.message('No data to display');
          return;
        }

        if (type === 'gauge') {
          // Accommodate a neat bug:
          options.legend.position = 'bottom';
          options.data.columns = [[
            this.title() || this.data()[1][0],
            this.data()[1][1]
          ]];
        }
        else if (type === 'pie' || type === 'donut') {
          options.data.columns = this.data().slice(1);
        }
        else {

          // Apply formatting for horizontal variant types
          if (type.indexOf('horizontal-') > -1) {
            options.axis.rotated = type.indexOf('horizontal-') > -1;
          }

          if (isDateString(this.data()[1][0])) {
            // TIMESERIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'timeseries';
            options.axis.x.tick = options.axis.x.tick || {
              format: this.dateFormat() || c3DefaultDateFormat(this.data()[1][0], this.data()[2] ? this.data()[2][0] : this.data()[1][0]),
              culling: { max: 5 }
            };

            options.data.columns[0] = [];
            each(this.dataset.selectColumn(0), function(cell, i){
              if (i > 0) {
                cell = new Date(cell);
              }
              options.data.columns[0][i] = cell;
            });
            options.data.columns[0][0] = 'x';
            options.data.x = 'x';
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }
          else {
            // CATEGORIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'category';
            options.axis.x.categories = this.dataset.selectColumn(0).slice(1);
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }

          if (this.data()[0].length === 2) {
            options.legend.show = false;
          }

          each(this.data()[0], function(cell, i){
            if (i > 0) {
              options.data.columns.push(this.dataset.selectColumn(i));
            }
          }.bind(this));

        }

        if (options.legend.show === true
          && options.legend.position === 'right'
            && ['gauge'].indexOf(type.replace('horizontal-', ''))) {

                // Apply custom color handling
                options.data.color = c3CustomDataMapping.bind(this);

                // Apply custom tooltip
                options.tooltip = {
                  contents: c3TooltipContents,
                  format: {
                    value: c3CustomTooltipFiltering.bind(this)
                  }
                };

                options.legend.show = false;
                var paddedWidth = this.el().querySelector('.' + this.theme() + '-rendering').offsetWidth - 100;
                options.size.width = options.size.width || paddedWidth;
                this.el().querySelector('.' + this.theme() + '-rendering').setAttribute('style', 'margin-right: 120px;');

                // Render artifacts
                this.view._artifacts['c3'] = c3.generate(options);
                c3PaginatingLegend.call(this, options.data.columns);
        }
        else {
          options.legend.show = false;
          this.view._artifacts['c3'] = c3.generate(options);
        }

      },
      update: function(){
        // no special update handling
        this.render();
      },
      destroy: function(){
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
  if (this.view._artifacts.pagination
    && this.type() !== 'gauge'
      /*&& this.type() !== 'pie'
        && this.type() !== 'donut'*/) {
          // console.log(this.view._artifacts.pagination.labels);
          scope = this.view._artifacts.pagination.labels;
          if ((d.id && scope.indexOf(d.id) > -1)
            || (d && !d.id && scope.indexOf(d) > -1)) {
              return color;
          }
          else {
            if (this.type() === 'donut' || this.type() === 'pie') {
              return 'rgba(0,0,0,.1)';
            }
            else {
              return 'rgba(0,0,0,.07)';
            }
          }
  }
  else {
    return color;
  }
}

function c3CustomTooltipFiltering(value, ratio, id, index) {
  var scope;
  if (this.view._artifacts.pagination
    && this.type() !== 'gauge'
      /*&& this.type() !== 'pie'
        && this.type() !== 'donut'*/) {
          scope = this.view._artifacts.pagination.labels;
          if (scope.indexOf(id) > -1) {
            return value;
          }
  }
  else {
    return value;
  }
}

function bindResizeListener(fn){
  if ('undefined' === typeof window) return;
  window.onresize = window.resize = function(){};
  if (window.addEventListener) {
    window.addEventListener('resize', fn, true);
  }
  else if (window.attachEvent) {
    window.attachEvent('onresize', fn);
  }
}
