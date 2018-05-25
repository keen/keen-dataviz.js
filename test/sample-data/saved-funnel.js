var funnel = require('./funnel');

module.exports = {
  "query": {
    "analysis_type": "funnel"
  },
  "result": {
    "result": funnel.result,
    "steps": funnel.steps
  }
};
