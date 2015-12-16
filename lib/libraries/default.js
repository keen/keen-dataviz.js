var Spinner = require('spin.js');

var each = require('../utils/each'),
    extend = require('../utils/extend'),
    prettyNumber = require('../utils/pretty-number');

var types = {};

function initialize(){
  defineC3();
  defineMessage();
  defineMetric();
  defineSpinner();
  return types;
}

function defineC3(){
  var c3Types = [
    // Standard types
    'area', 'area-spline', 'area-step',
    'bar', 'donut', 'gauge', 'line',
    'pie', 'step', 'spline',

    // Horizontal variant types
    'horizontal-area',
    'horizontal-area-spline',
    'horizontal-area-step',
    'horizontal-bar',
    'horizontal-line',
    'horizontal-step',
    'horizontal-spline'
  ];

  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        var self = this;
        var options = extend({
          axis: {},
          bindto: this.el(),
          data: {
            columns: [],
            type: type.replace('horizontal-', '')
          },
          color: {
            pattern: this.colors()
          },
          size: {
            height: this.height(),
            width: this.width()
          }
        }, this.chartOptions());

        if (type === 'gauge') {
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
            options.axis.rotated = true;
          }

          if (!isNaN(new Date(this.data()[1][0]).getTime())) {
            // TIMESERIES
            options.axis.x = {
              type: 'timeseries',
              tick: { format: '%Y-%m-%d' }
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
            options.axis.x = {
              type: 'category',
              categories: this.dataset.selectColumn(0).slice(1)
            };
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }

          each(this.data()[0], function(cell, i){
            if (i > 0) {
              options.data.columns.push(self.dataset.selectColumn(i));
            }
          });

        }

        this.view._artifacts['c3'] = c3.generate(options);
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


function defineMessage(){
  types['message'] = {
    render: function(text){
      var elem = document.createElement('div'),
          msg = document.createElement('span');

      elem.className = this.theme() + '-message';
      elem.style.height = String(this.height() + 'px');
      elem.style.paddingTop = (this.height() / 2 - 12) + 'px';
      elem.style.width = String(this.width() + 'px');

      msg.innerHTML = text || '';
      elem.appendChild(msg);

      this.el().innerHTML = '';
      this.el().appendChild(elem);
    },
    update: function(){
      // no special update handling
      this.render();
    },
    destroy: function(){
      // no special clean-up
    }
  };
}

function defineMetric(){
  types['metric'] = {
    render: function(){
      var theme = this.theme(),
          title = this.title() || this.data()[1][0],
          value = this.data()[1][1] || '-',
          width = this.width(),
          opts = this.chartOptions(),
          prefix = '',
          suffix = '';

      var styles = {
        'width': (width) ? width + 'px' : 'auto'
      };

      var formattedNum = value;
      if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
        && !isNaN(parseInt(value)) ) {
          formattedNum = prettyNumber(value);
      }

      if (opts['prefix']) {
        prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
      }
      if (opts['suffix']) {
        suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
      }

      this.el().innerHTML = '' +
        '<div class="' + theme + '-metric" style="width:' + styles.width + ';" title="' + value + '">' +
          '<span class="' + theme + '-metric-value">' + prefix + formattedNum + suffix + '</span>' +
          '<span class="' + theme + '-metric-title">' + title + '</span>' +
        '</div>';
    },
    update: function(){
      // no special update handling
      this.render();
    },
    destroy: function(){
      // no special clean-up
    }
  };
}

function defineSpinner(){
  var defaults = {
    height: 138,          // Used if no height is provided
    lines: 10,            // The number of lines to draw
    length: 8,            // The length of each line
    width: 3,             // The line thickness
    radius: 10,           // The radius of the inner circle
    corners: 1,           // Corner roundness (0..1)
    rotate: 0,            // The rotation offset
    direction: 1,         // 1: clockwise, -1: counterclockwise
    color: '#4D4D4D',     // #rgb or #rrggbb or array of colors
    speed: 1.67,          // Rounds per second
    trail: 60,            // Afterglow percentage
    shadow: false,        // Whether to render a shadow
    hwaccel: false,       // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9,          // The z-index (defaults to 2000000000)
    top: '50%',           // Top position relative to parent
    left: '50%'           // Left position relative to parent
  };

  types['spinner'] = {
    render: function(){
      var spinner = document.createElement('div');
      var height = this.height() || defaults.height;

      spinner.className = this.theme() + '-spinning';
      spinner.style.height = String(height + 'px');
      spinner.style.position = 'relative';
      spinner.style.width = String(this.width() + 'px');

      this.el().innerHTML = '';
      this.el().appendChild(spinner);
      this.view._artifacts['spinner'] = new Spinner(defaults).spin(spinner);
    },
    update: function(){
      // no special update handling
      this.render();
    },
    destroy: function(){
      if (this.view._artifacts['spinner']) {
        this.view._artifacts['spinner'].stop();
        this.view._artifacts['spinner'] = null;
      }
    }
  };
}

module.exports = initialize;
