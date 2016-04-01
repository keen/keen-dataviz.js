module.exports = {
  '@tags': ['metric', 'custom'],
  'Metric Test': function(browser) {
    browser.url('http://localhost:9002/demo')
      .waitForElementVisible('.chart-demo-metric', 1000)

    browser.expect.element('.keen-dataviz-metric-title')
      .text.to.equal('High-fives today')
  },

  '@tags': ['message', 'custom'],
  'Message test': function(browser) {
//    browser.url('http://localhost:9002/demo')
//      .waitForElementVisible('.chart-demo-message', 1000)

    browser.expect.element('.keen-dataviz-message')
      .text.to.equal('This is a manual message!')
  }
}
