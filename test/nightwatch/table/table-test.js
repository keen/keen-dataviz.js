module.exports = {
  '@tags': ['custom', 'table'],
  'Table header test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-demo-table .keen-dataviz-table', 1000);

    var tableHeaders = ['Index', 'First', 'Second', 'Another', 'Fourth', 'Fifth', 'Last'];

    // Run through header's `th` tags to see if they  match
    browser
      .elements('css selector', '.chart-demo-table .keen-dataviz-table-fixed-header th', function(elems) {
        elems.value.forEach(function(elem, i) {
          browser.elementIdText(elem.ELEMENT, function(result) {
            this.assert.equal(result.value, tableHeaders[i]);
          });
        });
      })

    browser.end();
  }
}
