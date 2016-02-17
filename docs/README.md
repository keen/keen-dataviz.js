# Keen.Dataviz API

## Example usage

Create a new Dataviz instance. This `chart` variable will be used throughout this guide as a reference to a `Dataviz` instance.

```javascript
var chart = new Keen.Dataviz()
  .el('#my-chart')
  .height(500)
  .colors(['red', 'orange', 'green'])
  .sortGroups('desc')
  .prepare();

var req = client.run(query, function(err, res){
  if (err) {
    chart.error(err.message);
  }
  else {
    chart
      .data(res)
      .title('New Customers per Week')
      .render();
  }
});

// lets update this chart every 10 seconds
setInterval(function(){
  chart.prepare(); // restart the spinner
  req.refresh();
}, 10*1000);

```

## Chart types

The following chart types are available for immediate use via the [`.type()` method](#type). Make sure [C3.js](http://c3js.org) and [D3.js](http://d3js.org) are installed before using any of the visualization types that rely on those dependencies.

Custom (built by us):

* metric
* message

Powered by [Spin.js](http://fgnass.github.io/spin.js/) (bundled with this library):

* spinner

Powered by [C3.js](http://c3js.org/examples.html) (installed separately):

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



## Prototype methods

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

### .call(function)

Call arbitrary functions within the prototype/instance context.

```javascript
chart
  .call(function(){
    var total = this.data().slice(1).length;
    this.title('Total Results: ' + total);
  })
```

### .chartOptions(object)

Set configuration options intended for the underlying charting library adapter. Each adapter will document how this works for various libraries and chartTypes.

```javascript
chart
  .chartOptions({
    isStacked: true,
    legend: {
      position: 'none'
    }
  });

// Return current chartOptions
chart.chartOptions();
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
var ds = new Keen.Dataset();
ds.set(['Value', 'Result'], 621);
chart.data(ds);

// Return current Dataset.data() output
chart.data();

// Check out what 'type' we have set:
chart.type(); // 'metric' for this example
```

### .destroy()

Destroy a visualization and remove all rendered DOM elements.

```javascript
chart.destroy();
```

### .el(DOMElement)

Put this awesome chart somewhere!

```javascript
chart.el(document.getElementById('myChart'));
```

### .height(number)

```javascript
chart.height(450);

// Return current height
chart.height();
```

### .indexBy(string)

Determine which part of timeframes are visualized (`timeframe.start` (default) or `timeframe.end`).

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

### .summarize(boolean)

Option for stacked bar or stacked area graph to display 15 items at a time.
Values that aren't displayed are placed in an 'Other' bar.

If there is already a category named 'Other', then that category will be named
'Other (Generated)'.

```javascript
chart
  .type('bar')
  .stacked(true)
  .summarize(true)
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

### .visibilityThreshold(number)

Set the minimum percentage (given as a float between 0 and 1) that a value has to be
in order for a slice in a donut or pie chart to be visible. All values with a percentage
less than the threshold will be placed in a slice called 'Other'.

Ex:

``` javascript
var res = { result: [ ['A', 1], ['B', 10], ['C', 11], ['D', 0.5] ] };

chart
.type('pie') // or donut
.data(res)
.visibilityThreshold(0.2) // Visibility is 0.2 (20%)
```

`['A', 1]` and `['D', 0.5]` will be placed in the 'Other' slice.

### .width(number)

```javascript
chart.width(900);

// Return current width
chart.width();
```

## C3 Extensions
