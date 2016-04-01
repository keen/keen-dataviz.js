module.exports = {
  '@tags': ['custom', 'table'],
  'Table header test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-demo-table .keen-dataviz-table', 1000);

    browser.expect.element('.chart-demo-table thead tr')
      .text.to.equal('Index First Second Another Fourth Fifth Last')
  }
}
