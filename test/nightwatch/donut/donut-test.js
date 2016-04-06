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

      window.donut = new Dataviz()
        .el('.chart-c3-donut')
        .title('Mmmm, donuts...')
        .type('donut')
        .chartOptions({})
        .call(function(){
          this.dataset.matrix = groupedData;
        })
        .render();
  */

  '@tags': ['c3', 'donut'],
  'Donut test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-donut', 1000);

    // Title test
    browser.expect.element('.chart-c3-donut .keen-dataviz-title')
      .text.to.equal('Mmmm, donuts...');

    // SVG Element presence test
    browser.expect.element('.chart-c3-donut .c3 svg')
      .to.be.present.before(1000);

    // Number of arcs test
    browser
      .elements('css selector', '.chart-c3-donut .c3-chart-arc', function(elem) {
        this.assert.equal(elem.value.length, 5);
    })

    // Arcs text test
    // TODO

    // Arcs tooltip test
    // TODO

    browser.end();
  }
}
