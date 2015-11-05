var Spinner = require('spin.js');

var each = require('../utils/each'),
    extend = require('../utils/extend'),
    prettyNumber = require('../utils/pretty-number');

var types = {};

function initialize(){
  defineC3();
  defineCustomMessage();
  defineCustomMetric();
  defineCustomSpinner();
  return types;
}

function defineC3(){
  var c3Types = [
    'area', 'area-spline', 'area-step',
    'bar', 'donut', 'gauge', 'line',
    'pie', 'step', 'spline'
  ];

  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        var setup = getC3SetupTemplate.call(this, type);
        var options = extend(setup, this.chartOptions());
        this.view._artifacts['c3'] = c3.generate(options);
        this.update();
      },
      update: function(){
        var self = this, cols = [];
        // if (type === 'gauge') {
        //   self.view._artifacts['default'].load({
        //     columns: [ [self.title(), self.data()[1][1]] ]
        //   })
        // }
        // else if (type === 'pie' || type === 'donut') {
        //   self.view._artifacts['default'].load({
        //     columns: self.dataset.data.output.slice(1)
        //   });
        // }
        // else {
        //   if (this.dataType().indexOf('chron') > -1) {
        //     cols.push(self.dataset.selectColumn(0));
        //     cols[0][0] = 'x';
        //   }
        //
        //   each(self.data()[0], function(c, i){
        //     if (i > 0) {
        //       cols.push(self.dataset.selectColumn(i));
        //     }
        //   });
        //
        //   if (self.stacked()) {
        //     self.view._artifacts['c3'].groups([self.labels()]);
        //   }
        //
        //   self.view._artifacts['c3'].load({
        //     columns: cols
        //   });
        // }
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

function getC3SetupTemplate(type){
  var setup = {
    axis: {},
    bindto: this.el(),
    data: {
      columns: []
    },
    color: {
      pattern: this.colors()
    },
    size: {
      height: this.height(),
      width: this.width()
    }
  };

  // Enforce type, sorry no overrides here
  setup['data']['type'] = type;

  // if (type === 'gauge') {}
  // else if (type === 'pie' || type === 'donut') {
  //   // setup[type] = { title: this.title() };
  // }
  // else {
  //   if (this.dataType().indexOf('chron') > -1) {
  //     setup['data']['x'] = 'x';
  //     setup['axis']['x'] = {
  //       type: 'timeseries',
  //       tick: {
  //         format: '%Y-%m-%d'
  //       }
  //     };
  //   }
  //   else {
  //     if (this.dataType() === 'cat-ordinal') {
  //       setup['axis']['x'] = {
  //         type: 'category',
  //         categories: this.labels()
  //       };
  //     }
  //   }
  //   if (this.title()) {
  //     setup['axis']['y'] = { label: this.title() }
  //   }
  // }
  return setup;
}

function defineCustomMessage(){
  types['message'] = {
    render: function(text){
      var elem = document.createElement('div'),
          msg = document.createElement('span');

      elem.className = 'keen-dataviz-message';
      // elem.style.height = String(this.height() + 'px');
      elem.style.paddingTop = (this.height() / 2 - 12) + 'px';
      elem.style.paddingBottom = (this.height() / 2 - 12) + 'px';
      elem.style.width = String(this.width() + 'px');

      msg.innerHTML = text || '';
      elem.appendChild(msg);

      this.el().innerHTML = '';
      this.el().appendChild(elem);
    },
    update: function(){
      this.render();
    },
    destroy: function(){
      // no special clean-up
    }
  };
}

function defineCustomMetric(){
  // types['metric']
  types['metric'] = {
    render: function(){
      var title = this.title() || this.data()[1][0],
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
        prefix = '<span class="keen-dataviz-metric-prefix">' + opts['prefix'] + '</span>';
      }
      if (opts['suffix']) {
        suffix = '<span class="keen-dataviz-metric-suffix">' + opts['suffix'] + '</span>';
      }

      this.el().innerHTML = '' +
        '<div class="keen-dataviz-metric" style="width:' + styles.width + ';" title="' + value + '">' +
          '<span class="keen-dataviz-metric-value">' + prefix + formattedNum + suffix + '</span>' +
          '<span class="keen-dataviz-metric-title">' + title + '</span>' +
        '</div>';
    },
    update: function(){
      this.render();
    },
    destroy: function(){
      // no special clean-up
    }
  };
}

function defineCustomSpinner(){
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
      console.log('RENDER');
      var spinner = document.createElement('div');
      var height = this.height() || defaults.height;

      spinner.className = 'keen-dataviz-spinning';
      spinner.style.height = String(height + 'px');
      spinner.style.position = 'relative';
      spinner.style.width = String(this.width() + 'px');

      this.el().innerHTML = '';
      this.el().appendChild(spinner);
      this.view._artifacts['spinner'] = new Spinner(defaults).spin(spinner);
    },
    update: function(){},
    destroy: function(){
      console.log('DESTROY');
      if (this.view._artifacts['spinner']) {
        this.view._artifacts['spinner'].stop();
        this.view._artifacts['spinner'] = null;
      }
    }
  };
}

module.exports = initialize;
