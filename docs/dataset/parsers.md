# Data Parsers

The following parsers are available to turn incoming API responses into `Dataviz`-friendly `Dataset` instances:

* 'metric'
* 'interval'
* 'grouped-metric'
* 'grouped-interval'
* 'double-grouped-metric'
* 'double-grouped-interval'
* 'funnel'
* 'list'
* 'extraction'

These parsers are used internally, when response types can be successfully inferred. These can also be accessed manually, by defining `var myParser = Dataset.parser('name')`.

## Example usage

```javascript
var chart = new Keen.Dataviz() // selector OR node, same for .el(...)
  .height(300)
  .type('metric')
  .prepare();

var metricParser = Keen.Dataset.parser('metric');

chart
  .data(metricParser({ result: 1337 }))
  .render();
```

## Custom parsers

This pattern can be replicated to parse data of any structure or origin.

```javascript
var chart = new Keen.Dataviz() // selector OR node, same for .el(...)
  .height(300)
  .type('bar')
  .data(customParser(someDataObject))
  .render();

function customParser(data){
  var ds = new Keen.Dataset();
  // Build and return a new Dataset from data argument
  // ds.set(['Column Name', 'Row Name'], data.result);
  return ds;
}
```
