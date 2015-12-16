requirejs.config({
  paths: {
    'keen-dataviz': '../../../dist/keen-dataviz',
    'keen-dataset': '../../../dist/keen-dataviz'
  }
});

require([
    'keen-dataviz',
    'keen-dataset'
  ], function(Dataviz, Dataset) {

  console.log(arguments);
  console.log(new Dataviz());
  console.log(new Dataset());

});
