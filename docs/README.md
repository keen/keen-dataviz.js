# Keen.Dataviz API

## Example usage

Create a new Dataviz instance. This `chart` variable will be used throughout this guide as a reference to a `Dataviz` instance.

```html
<html>
  <head>
    <meta charset="utf-8">
    <!-- Use keen-analysis.js to fetch query results -->
    <script src="https://cdn.jsdelivr.net/npm/keen-analysis@2"></script>

    <!-- Dataviz dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/keen-dataviz@3"></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id="my-chart-div"></div>

    <!-- Create and Render -->
    <script>
      const chart = new Keen.Dataviz()
        .el('#my-chart-div')
        .colors(['red', 'orange', 'green'])
        .height(500)
        .title('New Customers per Week')
        .type('metric')
        .prepare();


      // Use keen-analysis.js to run a query
      // and pass the result into your chart:
      const client = new Keen({
        projectId: 'YOUR_PROJECT_ID',
        readKey: 'YOUR_READ_KEY'
      });

      client
        .query('count', {
          event_collection: 'pageviews',
          timeframe: 'this_14_days',
          interval: 'daily'
        })
        .then(function(res){
          // Handle the result
          chart
            .data(res)
            .render();
        })
        .catch(function(err){
          // Handle the error
          chart
            .message(err.message);
        });
    </script>
  </body>
</html>
```

## Chart types

Powered by [C3.js](http://c3js.org/examples.html):

* [area](http://c3js.org/samples/chart_area.html)
* [area-spline](http://c3js.org/samples/chart_area.html)
* [area-step](http://c3js.org/samples/chart_step.html)
* [bar](http://c3js.org/samples/chart_bar.html)
* [donut](http://c3js.org/samples/chart_donut.html)
* [gauge](http://c3js.org/samples/chart_gauge.html)
* [line](http://c3js.org/samples/simple_multiple.html)
* [pie](http://c3js.org/samples/chart_pie.html)
* [spline](http://c3js.org/samples/chart_spline.html)
* [step](http://c3js.org/samples/chart_step.html)

Types like "bar" and "line" support [axis rotation](http://c3js.org/samples/axes_rotated.html). To make this easier to achieve, an additional series of types have been exposed, which automatically handle this configuration:

* horizontal-area
* horizontal-area-spline
* horizontal-area-step
* horizontal-bar
* horizontal-line
* horizontal-spline
* horizontal-step

### Custom (built by us):

* metric
* message


## Prototype methods

### .call(function)

Call arbitrary functions within the prototype/instance context.

```javascript
chart
  .call(function(){
    const total = this.data().slice(1).length;
    this.title('Total Results: ' + total);
  })
```

### .colors(array)

```javascript
chart.colors([
  'blue',
  'green',
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

### .data()

This method accepts two forms of input data.

* **Object:** Raw data, either from a query API response or a manually constructed object
* **Keen.Dataset instance**

**Important:** objects passed into `.data()` will be inspected to infer which type of response is being handled, and to parse accordingly. This is where the library determines a default `type` (listed above) to use, if no type value has been set.

```javascript
// Object
chart.data({ result: 621 });

// Dataset instance
const ds = new Keen.Dataset();
ds.set(['Value', 'Result'], 621);
chart.data(ds);

// Return current Dataset.data() output
chart.data();

// Check out what 'type' we have set:
chart.type(); // 'metric' for this example
```

### .dateFormat()

Date formatting is possible by passing either a string or function to `dateFormat`. In either case, this value will be set as the `axis.x.tick.format` configuration property. As a built-in feature of C3.js, functions are used as an iterator, receiving the date for each interval in milliseconds.

```javascript
// Use a string template
chart.dateFormat('%Y-%m');

// .. or a function
chart.dateFormat(function(ms){
  const date = new Date(ms);
  return date.getFullYear();
});

// Return current setting
chart.dateFormat();
```

**Date Localization:** Dates will be localized to the browser's timezone by default. This is generally desirable, but there are some instances where you may wish to retain the timezones that are returned by the API. You can [disable this behavior](http://c3js.org/reference.html#axis-x-localtime) in any C3.js-based visualization by setting `axis.x.localtime` to `false`, via `chartOptions()`:

```javascript
chart.chartOptions({
  axis: {
    x: {
      localtime: false
    }
  }
});
```


### .destroy()

Destroy a visualization and remove all rendered DOM elements.

```javascript
chart.destroy();
```

### .el(DOMSelector)

Put this awesome chart somewhere!

```javascript
// Pass in a selector
chart.el('#my-chart');

// ..or a DOM node
chart.el(document.getElementById('my-chart'));

// Return current element
chart.el();
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

### .library(string)

Specify the library for a visualization. _Default value is default_.

```javascript
chart.library('my-custom-library');
```

### .message(string)

Display a message for a visualization. _Previously `.error()`)_.

```javascript
chart.message('Oops, an error occured!');
```

### .notes(string)

Include footnotes beneath the chart.

```javascript
chart.notes('String of text to include as chart notes');

// Return current notes
chart.notes();
```

### .prepare()

Activate the spinner for a visualization.

```javascript
chart.prepare();
```

### .render()

Render the visualization.

```javascript
chart.render();
```

### .sortGroups(string)

Determine how groupBy results are sorted (`asc` for ascending, `desc` for descending).

```javascript
chart.sortGroups('asc');

// Return current value
chart.sortGroups();
```

### .sortIntervals(string)

Determine how interval results are sorted (`asc` for ascending, `desc` for descending).

```javascript
chart.sortIntervals('desc');

// Return current value
chart.sortIntervals();
```

### .stacked(boolean)

Create a stacked chart, used to break down and compare parts of a whole.

```javascript
chart.stacked(true);
 ```

### .theme(string)

Learn more about themes [here](/docs/themes.md).

```javascript
chart.theme('custom-theme');

// Return current theme
chart.theme();
```

### .title(string)

```javascript
chart.title('Hi, I\m a chart!');

// Return current title
chart.title();
```

### .type(string)

Specify the visualization type. _Previously `.chartType()`)_. If no type is set, the library will set the best option when you pass an API response to [`.data()`](#data).

```javascript
chart.type('bar');

// Return current type
chart.type();
```
