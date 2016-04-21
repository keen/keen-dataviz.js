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

     window.line = new Dataviz()
     .height(300)
     .el('.chart-c3-line')
     .title('Line Chart')
     .type('line')
     .call(function(){
        this.dataset.matrix = groupedData;
     })
     .render();
  */

  '@tags': ['c3', 'line', 'categorical'],
  'Categorical Line graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-line', 1000);

    // Title test
    browser.expect.element('.chart-c3-line .keen-dataviz-title')
      .text.to.equal('Line Chart');

    // Number of lines test
    browser
      .elements('css selector', '.chart-c3-line .c3-chart-lines path.c3-line', function(elem) {
        this.assert.equal(elem.value.length, 1);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'line', 'categorical'],
  'Categorical Multi line Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-line-multi', 1000);

    // Title test
    browser.expect.element('.chart-c3-line-multi .keen-dataviz-title')
      .text.to.equal('Line Chart');

    // Number of lines test
    browser
      .elements('css selector', '.chart-c3-line-multi .c3-chart-lines path.c3-line', function(elem) {
        this.assert.equal(elem.value.length, 3);
      });

    // Legend test
    browser
      .elements('css selector', '.chart-c3-line-multi .c3-legend-item', function(elem) {
        this.assert.equal(elem.value.length, 3);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'line', 'timeseries'],
  'Timeseries Line Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-line-time', 1000);

    // Title test
    browser.expect.element('.chart-c3-line-time .keen-dataviz-title')
      .text.to.equal('Line Chart');

    // Number of lines test
    browser
      .elements('css selector', '.chart-c3-line-time .c3-chart-lines path.c3-line', function(elem) {
        this.assert.equal(elem.value.length, 1);
      });

    // X Axis Label test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'line', 'timeseries'],
  'Timeseries Multi line Graph': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-line-time-multi', 1000);

    // Title test
    browser.expect.element('.chart-c3-line-time-multi .keen-dataviz-title')
      .text.to.equal('Line Chart');

    // Number of lines test
    browser
      .elements('css selector', '.chart-c3-line-time-multi .c3-chart-lines path.c3-line', function(elem) {
        this.assert.equal(elem.value.length, 3);
      });

    // X Axis Label test
    // TODO

    browser.end();
  }
}
