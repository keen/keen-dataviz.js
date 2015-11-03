var Dataset = require('../index');

/*
  Parser pattern (curried):
  var myParser = Dataset.parsers('extraction');
  var myDataset = myParser(res);
  ---
  'metric'
  'grouped-metric'
  'grouped-interval'
  'double-grouped-metric'
  'double-grouped-interval'
  'funnel'
  'list'
  'extraction'

  // Parsers handle data transformation and
  // allow for greater customization
  function myParser(res){
    var ds = new Dataset();
    // build dataset from res.result
    // ds.set(['Result', 'Value'], res.result);
    return ds;
  }

*/

var parserMap = {

  'metric': function(res){
  },

  'grouped-metric': function(res){
  },

  'grouped-interval': function(res){
  },

  'double-grouped-metric': function(res){
  },

  'double-grouped-interval': function(res){
  }

  'funnel': function(res){
  },

  'list': function(res){
  },

  'extraction': function(res){
  }

};

function Parsers(name){
  if (!parserMap[name]) {
    throw 'Requested parser does not exist';
  }
  else {
    return parserMap[name];
  }
}

module.exports = Parsers;
