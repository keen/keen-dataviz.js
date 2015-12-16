var Dataset = require('../dataset');
var extend = require('./extend');

module.exports = function(data){
  if (!arguments.length) return this.dataset.data();
  if (data instanceof Dataset) {
    this.dataset = data;
  }
  else {
    if (!this.title()) {
      this.title(getDefaultTitle(data.query));
    }
    this.dataset = parseResponse.call(this, data);
  }
  return this;
};

function getDefaultTitle(query){
  var analysis = query.analysis_type.replace('_', ' '),
      title;

  title = analysis.replace( /\b./g, function(a){
    return a.toUpperCase();
  });

  if (query.event_collection) {
    title += ' - ' + query.event_collection;
  }
  return title;
}

function parseResponse(response){
  var dataset,
      indexBy,
      parser,
      parserArgs = [],
      query;

  indexBy = this.indexBy() ? this.indexBy() : 'timestamp.start';
  query = (typeof response.query !== 'undefined') ? response.query : {};

  // Ensure all required params are present
  query = extend({
    analysis_type: null,
    event_collection: null,
    filters: [],
    group_by: null,
    interval: null,
    timeframe: null,
    timezone: null
  }, query);

  if (query.analysis_type === 'funnel') {
    parser = 'funnel';
  }
  else if (query.analysis_type === 'extraction'){
    parser = 'extraction';
  }
  else if (query.analysis_type === 'select_unique') {
    if (!query.group_by && !query.interval) {
      parser = 'list';
    }
    // else { Not supported }
  }
  else if (query.analysis_type) {
    if (!query.group_by && !query.interval) {
      parser = 'metric';
    }
    else if (query.group_by && !query.interval) {
      if (typeof query.group_by === 'string') {
        parser = 'grouped-metric';
      }
      else {
        parser = 'double-grouped-metric';
        parserArgs.push(query.group_by);
      }
    }
    else if (query.interval && !query.group_by) {
      parser = 'interval';
      parserArgs.push(indexBy);
    }
    else if (query.group_by && query.interval) {
      if (typeof query.group_by === 'string') {
        parser = 'grouped-interval';
        parserArgs.push(indexBy);
      }
      else {
        parser = 'double-grouped-interval';
        parserArgs.push(query.group_by);
        parserArgs.push(indexBy);
      }
    }
  }

  if (!parser) {

    // Metric
    // -------------------------------
    if (typeof response.result === 'number'){
      parser = 'metric';
    }

    // Everything else
    // -------------------------------
    if (response.result instanceof Array && response.result.length > 0){

      // Interval w/ single value
      // -------------------------------
      if (response.result[0].timeframe && (typeof response.result[0].value == 'number' || response.result[0].value == null)) {
        parser = 'interval';
        parserArgs.push(indexBy)
      }

      // Static GroupBy
      // -------------------------------
      if (typeof response.result[0].result == 'number'){
        parser = 'grouped-metric';
      }

      // Grouped Interval
      // -------------------------------
      if (response.result[0].value instanceof Array){
        parser = 'grouped-interval';
        parserArgs.push(indexBy)
      }

      // Funnel
      // -------------------------------
      if (typeof response.result[0] == 'number' && typeof response.steps !== 'undefined'){
        parser = 'funnel';
      }

      // Select Unique
      // -------------------------------
      if ((typeof response.result[0] == 'string' || typeof response.result[0] == 'number') && typeof response.steps === 'undefined'){
        parser = 'list';
      }

      // Extraction
      // -------------------------------
      if (!parser) {
        parser = 'extraction';
      }
    }
  }

  dataset = Dataset.parser.apply(this, [parser].concat(parserArgs))(response);

  if (parser.indexOf('interval') > -1) {
    dataset.updateColumn(0, function(value, i){
      return new Date(value);
    });
  }

  return dataset;
}
