module.exports = {
  '@tags': ['c3', 'pie'],
  'Pie test': function(browser) {
    browser.url('http://localhost:9002/nightwatch/pie/pie_test.html')
      .waitForElementVisible('.pie-chart', 1000);

    // Title test
    browser.expect.element('.pie-chart .keen-dataviz-title')
      .text.to.equal('Mmmm, pie...');

    // SVG Element presence test
    browser.expect.element('.pie-chart .c3 svg')
      .to.be.present.before(1000);

    // Number of arcs test
    browser
      .elements('css selector', '.pie-chart .c3-chart-arc', function(elem) {
        this.assert.equal(elem.value.length, 4);
    })

    // Arcs text test
    // TODO

    // Arcs tooltip test
    // TODO

    browser.end();
  },

  '@tags': ['c3', 'pie'],
  'Pie test visibility threshold test': function(browser) {
    browser.url('http://localhost:9002/nightwatch/pie/pie_test.html')
      .waitForElementVisible('.pie-chart', 1000);

    browser.expect.element('.pie-chart .c3 svg')
      .to.be.present.before(1000);

    browser
      .elements('css selector', '.pie-chart-visibility-threshold .c3-chart-arc', function(elem) {
        this.assert.equal(elem.value.length, 5);
      })

    browser.end();
  }
}
