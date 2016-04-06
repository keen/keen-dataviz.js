module.exports = {
  /*
     var gaugeData = [
        [ 'Index', 'Value' ],
        [ 'Result', 79.1 ]
     ];
    window.gauge = new Dataviz()
      .height(160)
      .el('.chart-c3-gauge')
      .title('Percentage of awesome')
      .theme('custom-theme')
      .notes('Sample notes go down here')
      .type('gauge')
      .call(function(){
        this.dataset.matrix = gaugeData;
      })
      .render();
  */

  '@tags': ['c3', 'gauge'],
  'Gauge test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-gauge', 1000);

    // Title test
    browser.expect.element('.chart-c3-gauge .custom-theme-title')
      .text.to.equal('Percentage of awesome');

    // Notes test
    browser.expect.element('.chart-c3-gauge .custom-theme-notes')
      .text.to.equal('Sample notes go down here');

    // SVG Element presence test
    browser.expect.element('.chart-c3-gauge .c3 svg')
      .to.be.present.before(1000);

    // Value test - is this necessary?
    browser.expect.element('.chart-c3-gauge .c3-target-Percentage-of-awesome text')
      .text.to.equal('79.1%');

    browser.end();
  }
}
