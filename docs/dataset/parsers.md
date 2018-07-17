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

These parsers are used internally, when response types can be successfully inferred. These can also be accessed manually, by defining `const myParser = Dataset.parser('name')`.

## Example usage

```javascript
const chart = new KeenDataviz({
  container: '#chart1' // querySelector for parent HTML element
  type: 'metric'
});

const metricParser = Keen.Dataset.parser('metric');

chart
  .render(metricParser({ result: 1337 }));
```

## Custom parsers

This pattern can be replicated to parse data of any structure or origin.

```javascript
const chart = new KeenDataviz({
    container: '#chart1'
    type: 'bar'
  })
  .render(customParser(someDataObject));

function customParser(data){
  const ds = new Keen.Dataset();
  // Build and return a new Dataset from data argument
  // ds.set(['Column Name', 'Row Name'], data.result);
  return ds;
}
```
