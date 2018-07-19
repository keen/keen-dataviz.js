# Custom types and libraries

```javascript
/*
  Registering a library
  'default' contains a mix of c3.js and custom view renderers
*/

KeenDataviz.register('my-library', {
  'my-chart-type': {
    render: function(){},
    destroy: function(){}
  }
  //, metric: {}
  //, table: {}
});

// Then use these libraries and types
const chart = new KeenDataviz({
    type: 'my-chart-type',
    library: 'my-library'
  })
  .render({ result: 621 });

```
