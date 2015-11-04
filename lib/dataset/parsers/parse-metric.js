var Dataset = require('../index');
console.log(typeof Dataset, Dataset);

module.exports = function(res){
  var dataset = new Dataset();
  dataset.set(['Value', 'Result'], res.result);
  return dataset;
};
