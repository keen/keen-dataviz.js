# Custom types and libraries

```javascript
/*
  Registering a library
  'default' contains a mix of c3.js and custom view renderers
*/

Dataviz.register('my-library', {
  'my-chart-type': {
    render: function(){},
    destroy: function(){}
  }
  //, metric: {}
  //, table: {}
});

// Then use these libraries and types
const chart = new Keen.Dataviz()
  .library('my-library')
  .type('my-chart-type')
  .height(300)
  .data({ result: 621 })
  .render();

```
