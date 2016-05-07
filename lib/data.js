var Dataset = require('./dataset');
var extend = require('./utils/extend');

module.exports = function(data){
  if (!arguments.length) return this.dataset.data();
  if (data instanceof Dataset) {
    this.dataset = data;
    return this;
  }
  else {
    return parseResponse.call(this, data);
  }
};

function parseResponse(response){
  var dataset,
      indexBy,
      meta,
      parser,
      parserArgs = [],
      query,
      selectedParser,
      title,
      type;

  indexBy = this.indexBy() ? this.indexBy() : 'timestamp.start';
  meta = response.metadata || {};
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
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-metric';
        parserArgs.push(query.group_by);
      }
      else {
        parser = 'grouped-metric';
      }
    }
    else if (query.interval && !query.group_by) {
      parser = 'interval';
      parserArgs.push(indexBy);
    }
    else if (query.group_by && query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-interval';
        parserArgs.push(query.group_by);
        parserArgs.push(indexBy);
      }
      else {
        parser = 'grouped-interval';
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
      if (typeof response.result[0] === 'number'
        && typeof response.steps !== 'undefined'){
          parser = 'funnel';
          // Move steps into query object
          query.steps = response.steps;
      }

      // Select Unique
      // -------------------------------
      if ((typeof response.result[0] === 'string' || typeof response.result[0] == 'number') && typeof response.steps === 'undefined'){
        parser = 'list';
      }

      // Extraction
      // -------------------------------
      if (!parser) {
        parser = 'extraction';
      }
    }
  }

  // Set title from saved query body, or create a default title
  if (!this.title()) {
    if (meta.display_name) {
      title = meta.display_name;
    }
    else {
      title = getDefaultTitle(query);
    }
    this.title(title);
  }

  // Set type from saved query body, or use a default type
  if (!this.type()) {
    if (meta.visualization && meta.visualization.chart_type) {
      type = meta.visualization.chart_type;
    }
    else {
      type = getDefaultType(parser);
    }
    this.type(type);
  }

  // Define the appropriate parser
  selectedParser = Dataset.parser.apply(this, [parser].concat(parserArgs));

  // Parse the response with augmented query body
  dataset = selectedParser(extend(response, { 'query': query }));

  // Set true dates for 'interval' data
  if (parser.indexOf('interval') > -1) {
    dataset.updateColumn(0, function(value, i){
      return new Date(value);
    });
  }
  this.dataset = dataset;

  return this;
}

function getDefaultTitle(query){
  var analysis = query.analysis_type ? query.analysis_type.replace('_', ' ') : '',
      title;

  title = analysis.replace( /\b./g, function(a){
    return a.toUpperCase();
  });

  if (query.event_collection) {
    title += ' - ' + query.event_collection;
  }
  return title;
}

function getDefaultType(parser){
  var type;
  switch (parser) {
    case 'metric':
      type = 'metric';
      break;
    case 'interval':
      type = 'area';
      break;
    case 'grouped-metric':
    case 'double-grouped-metric':
      type = 'bar';
      break;
    case 'grouped-interval':
    case 'double-grouped-interval':
      type = 'line';
      break;
    case 'funnel':
      type = 'horizontal-bar';
      break;
    case 'list':
    case 'extraction':
    default:
      type = 'table';
  }
  return type;
}
