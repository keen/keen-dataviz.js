module.exports = {
  /*
     var groupedData = [
       [ 'Index', 'First' ],
       [ 'A', 189.98 ],
       [ 'B', 135.83 ],
       [ 'C', 124.56 ],
       [ 'D', 117.22 ],
       [ 'E', 55.12  ]
     ];

     window.bar = new Dataviz()
     .height(300)
     .el('.chart-c3-bar')
     .title('Bar Chart')
     .type('bar')
     .call(function(){
     this.dataset.matrix = groupedData;
     })
     .render();
  */

  '@tags': ['c3', 'bar', 'categorical'],
  'Categorical Bar graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-bar', 1000);

    // Title test
    browser.expect.element('.chart-c3-bar .keen-dataviz-title')
      .text.to.equal('Bar Chart');

    // Number of bars test
    browser
      .elements('css selector', '.chart-c3-bar .c3-chart-bars path.c3-bar', function(elem) {
        this.assert.equal(elem.value.length, 5);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'bar', 'categorical'],
  'Categorical Multi Bar Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-bar-multi', 1000);

    // Title test
    browser.expect.element('.chart-c3-bar-multi .keen-dataviz-title')
      .text.to.equal('Bar Chart');

    // Number of bars test
    browser
      .elements('css selector', '.chart-c3-bar-multi .c3-chart-bars path.c3-bar', function(elem) {
        this.assert.equal(elem.value.length, 15);
      });

    // Legend test
    browser
      .elements('css selector', '.chart-c3-bar-multi .c3-legend-item', function(elem) {
        this.assert.equal(elem.value.length, 3);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'bar', 'timeseries'],
  'Timeseries Bar Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-bar-time', 1000);

    // Title test
    browser.expect.element('.chart-c3-bar-time .keen-dataviz-title')
      .text.to.equal('Bar Chart');

    // Number of bars test
    browser
      .elements('css selector', '.chart-c3-bar-time .c3-chart-bars path.c3-bar', function(elem) {
        this.assert.equal(elem.value.length, 5);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'bar', 'timeseries'],
  'Timeseries Multi Bar Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-bar-time-multi', 1000);

    // Title test
    browser.expect.element('.chart-c3-bar-time-multi .keen-dataviz-title')
      .text.to.equal('Bar Chart');

    // Number of bars test
    browser
      .elements('css selector', '.chart-c3-bar-time-multi .c3-chart-bars path.c3-bar', function(elem) {
        this.assert.equal(elem.value.length, 15);
      });

    // X Axis Label test
    // TODO

    browser.end();
  }
}
