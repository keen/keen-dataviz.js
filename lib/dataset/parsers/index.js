var parsers = {
  'metric':                   require('./parse-metric'),
  'interval':                 require('./parse-interval'),
  'grouped-metric':           require('./parse-grouped-metric'),
  'grouped-interval':         require('./parse-grouped-interval'),
  'double-grouped-metric':    require('./parse-double-grouped-metric'),
  'double-grouped-interval':  require('./parse-double-grouped-interval'),
  'funnel':                   require('./parse-funnel'),
  'list':                     require('./parse-list'),
  'extraction':               require('./parse-extraction')
};

module.exports = function(name){
  if (!parsers[name]) {
    throw 'Requested parser does not exist';
  }
  else {
    return parsers[name];
  }
}
