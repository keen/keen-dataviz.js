# keen-dataviz.js

This project contains the most advanced data visualization functionality available for Keen IO, and will soon be built directly into keen-js, replacing and upgrading the current visualization capabilities of that library.

**Upgrading from keen-js?** [Read this](#upgrading-from-keen-js).

**Getting Started:**

If you haven't done so already, login to Keen IO to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

* [Install the library](#install-the-library)
* ...

**Upgrading from keen-js:**

*Breaking changes, deprecations, etc.*


## Install the library

This library is best loaded synchronously as outlined below, but can also be installed via npm or bower:

```ssh
# via npm
$ npm install keen-dataviz

# or bower
$ bower install keen-dataviz
```

Include [keen-js](https://github.com/keen/keen-js), [keen-dataviz.js](dist/keen-dataviz.js), and [keen-dataviz.css](dist/keen-dataviz.css) within your page or project. Visualizations are powered by the C3.js library, which itself requires D3.js. These dependencies should be included first.

```html
<html>
  <head>
    <!-- Dependencies -->
    <link href='//oss.maxcdn.com/c3/0.1.42/c3.css' rel='stylesheet' />
    <script src='//oss.maxcdn.com/d3js/3.5.6/d3.min.js'></script>
    <script src='//oss.maxcdn.com/c3/0.1.42/c3.min.js'></script>

    <!-- Keen JS SDK -->
    <script src='//oss.maxcdn.com/keen.js/3.2.7/keen.min.js'></script>

    <!-- Keen.Dataviz -->
    <link href='keen-dataviz.css' rel='stylesheet' />
    <script src='keen-dataviz.js'></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id='my-chart-div'></div>

    <!-- Create and Render -->
    <script>
    Keen.ready(function(){

      var chart = new Keen.Dataviz()
        .el('#my-chart-div')
        .colors(['red', 'orange', 'green'])
        .height(500)
        .title('New Customers per Week')
        .type('metric')
        .prepare();

      // Make async request to Keen API, then:
      chart
        .parseRawData({
          result: 2450
        })
        .render();
    });
    </script>
  </body>
</html>
```

## Example usage

Create a new Dataviz instance. This `chart` variable will be used throughout this guide as a reference to a `Dataviz` instance.

```javascript
var chart = new Keen.Dataviz('#dom-selector')
  .title('New Customers per Week')
  .height(500)
  .colors(['red', 'orange', 'green'])
  .sortGroups('desc')
  .prepare();

// Given client-powered query:
client.run(query, function(err, res){
  chart
    .parseRequest(this)
    .render();
});

```

## Visual Attributes

### .attributes(object)

Set or get attributes with one fell swoop!

```javascript
chart.attributes({
  title: 'My Title!',
  width: 600
});

// Return attributes object
chart.attributes();
```

### .colors(array)

```javascript
chart.colors([
  'blue',
  'gree',
  'red'
]);

// Return array of colors
chart.colors();
```

### .colorMapping(object)

```javascript
chart.colorMapping({
  'Label A': '#ffff00',
  'Label B': '#d7d7d7',
  'Label C': 'green'
});

// Return current color map object
chart.colorMapping();
```

### .height(number)

```javascript
chart.height(450);

// Return current height
chart.height();
```

### .indexBy(string)

Determine which part of timeframes are visualized (`'timeframe.start'` (default) or `'timeframe.end'`).

```javascript
chart.indexBy('timeframe.end');

// Return current value
chart.indexBy();
```

### .labels(array)

Avoid if possible, but can be useful for funnels.

```javascript
chart.labels([
  'Step 1',
  'Step 2',
  'Step 3'
]);

// Return array of labels
chart.labels();
```

### .labelMapping(object)

```javascript
chart.labelMapping({
  'visit_adv_inbound': 'First visit',
  'visit_signup_page': 'Viewed signup page'
});

// Return current label map object
chart.labelMapping();
```

### .notes(string)

Include footnotes beneath the chart.

```javascript
chart.notes('String of text to include as chart notes');

// Return current notes
chart.notes();
```

### .sortGroups(string)

Determine how groupBy results are sorted (`'asc'` for ascending, `'desc'` for descending).

```javascript
chart.sortGroups('asc');

// Return current value
chart.sortGroups();
```

### .sortIntervals(string)

Determine how interval results are sorted (`'asc'` for ascending, `'desc'` for descending).

```javascript
chart.sortIntervals('desc');

// Return current value
chart.sortIntervals();
```

### .title(string)

```javascript
chart.title('Hi, I\'m a chart!');

// Return current title
chart.title();
```

### .width(number)

```javascript
chart.width(900);

// Return current width
chart.width();
```

### .data()
### .parseRequest()
### .parseRawData()

### .chartOptions(object)
### .library(string)
### .type(string)
### .theme(string)

### .destroy()
### .message()
### .prepare()
### .render()
### .update()

### .call(function)


## Deprecated

* `.adapter(object)`
* `.dataType(string)`
* `.el(DOMElement)` (passed into constructor)
* `.chartType(string)` (alias for `.type()`)
* `.error(string)` (alias for `.message()`)
* `.initialize()` (no-op)

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
  <div class='keen-dataviz'>
    <div class='keen-dataviz-title'>
      Pageviews (last 24 hours)
    </div>
    <div class='keen-dataviz-stage'>
      {{visualization}}
    </div>
    <div class='keen-dataviz-notes'>
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
