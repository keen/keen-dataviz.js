var each = require('../utils/each'),
    extend = require('../utils/extend');

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

function defineCustomSpinner(){
  // types['spinner']
}

function defineCustomMessage(){
  // types['message']
}

function defineCustomMetric(){
  // types['metric']
}

module.exports = initialize;
