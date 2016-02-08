var funnel = require('./funnel');

module.exports = {
  "query": {
    "analysis_type": "funnel",
    "steps": funnel.steps
  },
  "result": funnel.result
};
