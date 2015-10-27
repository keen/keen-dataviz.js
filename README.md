# keen-dataviz.js

```javascript
// Dataviz Reboot
// + keen-dataviz.js
// + keen-dataviz.css

// var Dataviz = require('keen-dataviz');
// var Dataset = require('keen-dataviz/lib/dataset');
function Dataviz(){}
function Dataset(){}

var chart = new Dataviz('#chart-div') // selector OR node, same for .el(...)
  .height(300)
  .theme('keen-dataviz') // (default, see below)
  .title('Pageviews (last 24 hours)')
  .notes('Footnotes at the bottom')
  .type('bar')
  .prepare();

chart
  .data(myParser({ result: 1337 }))
  .render();

// Parsers handle data transformation and
// allow for greater customization
function myParser(response){
  var ds = new Dataset();
  // build dataset from response.result
  // ds.set(['Result', 'Value'], response.result);
  return ds;
}

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
*/


/*

  New: Build a themed/styled wrapper within target node
  Why?
    - Title/footnotes are important, but are not
      universally supported by charting libraries
    - A simple theme/style switch formats this
      wrapper for dashboard use case (less > more)

  New: Applying a custom theme removes all default styling
  Why?
    - Prefer full CSS control over fighting inheritance

  // HTML:
  <div class="keen-dataviz">
    <div class="keen-dataviz-title">
      Pageviews (last 24 hours)
    </div>
    <div class="keen-dataviz-stage">
      {{visualization}}
    </div>
    <div class="keen-dataviz-notes">
      Last updated: 43 minutes ago (cached)
    </div>
  </div>

  // CSS (theming):
  .my-custom-theme {}
  .my-custom-theme .keen-dataviz-title {}
  .my-custom-theme .keen-dataviz-stage {}
  .my-custom-theme .keen-dataviz-notes {}
*/



/*
  Registering a library
  'default' contains a mix of c3.js and custom view renderers
*/
Dataviz.register('default', {
  'bar': {
    render: function(){},
    update: function(){},
    destroy: function(){}
  }
  //, line: {}
  //, spline: {}
  //, ...
});
```
