var Dataset = require('../index');

module.exports = function(res){
  var dataset = new Dataset();
  dataset.set(['Value', 'Result'], res.result);
  return dataset;
}
