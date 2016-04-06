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

      window.pie = new Dataviz()
        // .height(200)
        .el('.chart-c3-pie')
        .title('Mmmm, pie...')
        .type('piechart')
        .call(function(){
          this.dataset.matrix = groupedData;
        })
        .render();
  */

  '@tags': ['c3', 'pie'],
  'Donut test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-c3-pie', 1000);

    // Title test
    browser.expect.element('.chart-c3-pie .keen-dataviz-title')
      .text.to.equal('Mmmm, pie...');

    // SVG Element presence test
    browser.expect.element('.chart-c3-pie .c3 svg')
      .to.be.present.before(1000);

    // Number of arcs test
    browser
      .elements('css selector', '.chart-c3-pie .c3-chart-arc', function(elem) {
        this.assert.equal(elem.value.length, 5);
    })

    // Arcs text test
    // TODO

    // Arcs tooltip test
    // TODO

    browser.end();
  }
}
