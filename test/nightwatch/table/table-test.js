module.exports = {
  '@tags': ['custom', 'table'],
  'disabled': true,
  'Table header test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-demo-table .keen-dataviz-table', 1000);

    var tableHeaders = ['Index', 'First', 'Second', 'Another', 'Fourth', 'Fifth', 'Last'];
    // Run through `thead tr` tags to see if they  match

    browser.end();
  }
}
