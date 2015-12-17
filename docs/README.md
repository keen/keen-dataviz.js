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

## Dataviz API

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
    this.title("Total Results: " + total);
  })
```

### .chartOptions(object)

Set configuration options intended for the underlying charting library adapter. Each adapter will document how this works for various libraries and chartTypes.

```javascript
chart
  .chartOptions({
    isStacked: true,
    legend: {
      position: "none"
    }
  });

// Return current chartOptions
chart.chartOptions();
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

### .data(objectOrDataset)

This method accepts two forms of input data.

* **Object:** Raw data, either from a query API response or a manually constructed object
* **Keen.Dataset instance**

```javascript
// Object
chart.data({ result: 621 });

// Dataset instance
var ds = new Keen.Dataset();
ds.set(['Value', 'Result'], 621);
chart.data(ds);

// Return current Dataset.data() output
chart.data();
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

### .library(string)

Specify the library for a visualization. _Default value is 'default'_.

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

### .theme(string)

Learn more about themes [here](/docs/themes.md).

```javascript
chart.theme('custom-theme');

// Return current theme
chart.theme();
```

### .title(string)

```javascript
chart.title('Hi, I\'m a chart!');

// Return current title
chart.title();
```

### .type(string)

Specify the visualization type. _Previously `.chartType()`)_.

```javascript
chart.type('bar');

// Return current type
chart.type();
```

### .width(number)

```javascript
chart.width(900);

// Return current width
chart.width();
```
