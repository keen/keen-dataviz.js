# Keen.Dataviz

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
      .parseRequest(this)
      .title('New Customers per Week')
      .render();
  }
});

// let's update this chart every 10 seconds
setInterval(function(){
  chart.prepare(); // restart the spinner
  req.refresh();
}, 10*1000);

```

## DOM Element

### .el(DOMElement)

Put this awesome chart somewhere!

```javascript
chart.el(document.getElementById('myChart'));
```

### .prepare()

Clears `el` DOM element and kicks off a loading indicator

```javascript
chart
  .el(document.getElementById('my-chart'))
  .prepare(); // loading indicator begins
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

**Important:** this method **must** be called _after_ `.data()`, `.parseRequest()`, or `.parseRawData()`, and _before_ `.render()` to take effect. This method executes a one-time, permanent modification of the underlying `Dataset` instance, and will be overwritten every time the chart consumes new data.

_Avoid if possible, but can be useful for funnels._

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

### .stacked(boolean)

Determine whether or not the intervals of time/sequence-based charts are stacked. This setting interfaces with the various stacking methods of supported charting libraries, so there may be alternative ways to do this with `.chartOptions()`.

```javascript
chart.stacked(true);
chart.stacked(); // returns the stacked state
// Default: false
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


## Adapter Actions

Adapters are small modules that we've designed to manage visualizations, sort of like a controller would manage views of a web app.

### .render()

Render the chosen visualization with available data.

```javascript
chart
  .title('Daily Active Users')
  .height(240)
  .render();
```

### .message(string)

Display a given message in place of the chart

```javascript
chart.message('Sorry, something went wrong!');
```


### .destroy()

Remove this chart from the DOM, free up memory, etc.

```javascript
chart.destroy();
```


## Data Handling

### .data(input)

This method is something of a Swiss Army knife, accepting several different types of input.

1. Keen.Request instance, from within a query response callback
2. Raw data, typically from modifying a query response manually
3. Keen.Dataset instance (new)

```javascript
chart.data({ result: 0 });
chart.data(); // returns current Dataset instance
```

If you pass in a Keen.Request instance, this method will forward the call to `.parseRequest()`, which is explicitly intended for this type of work. Feel free to use that method when possible.

If you pas in raw data, this method will forward the call to `.parseRawData()`, which tries it's best to make sense of what you've given it. If you run into trouble here, just give us a shout.

Each of these scenarios results in a new Keen.Dataset instance. If you pass in a Keen.Dataset instance directly, it will be piped directly into to fierce beating heart of the Dataviz beast.


### .parseRequest(<Keen.Request>)

Evaluates both the API response and the Query that inspired it, to figure out exactly what type of data we're working with. This method sets a few defaults, like `title`, `dataType` and `defaultChartType`, which help the library kick out the right default visualizations.

```javascript
var client = new Keen({ ... });
var query = new Keen.Query('count', {
  eventCollection: 'pageviews'
});
client.run(query, function(){
  chart.parseRequest(this);
})
```

### .parseRawData(object)

Evaluates the API response structure to figure out what it might be, and helps the visualization get to know its true self.

```javascript
var client = new Keen({ ... });
var query = new Keen.Query('count', {
  eventCollection: 'pageviews'
});
client.run(query, function(res){
  res.result = 12321414;
  chart.parseRawData(res);
})
```

## Custom Internal Access

### .call(fn)

Call arbitrary functions within the chaining context.

```javascript
chart
  .call(function(){
    var total = this.data().slice(1).length;
    this.title('Total Results: ' + total);
  })
  .colors(['blue', 'green', 'aqua', 'peach'])
  .render();
```


## Adapter Selection

#### .library(string)

```javascript
chart.library('chartjs');
chart.library(); // returns current library selection
```

#### .type(string)

```javascript
chart.type('bar');
chart.type(); // returns current chartType selection
```

#### .chartOptions(object)

Set configuration options intended for the underlying charting library adapter. Each adapter will document how this works for various libraries and chartTypes.

```
chart.chartOptions({
  isStacked: true,
  legend: {
    position: 'none'
  }
});
chart.chartOptions(); // return current chartOptions
```
