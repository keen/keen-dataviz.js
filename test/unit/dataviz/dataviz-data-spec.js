var expect = require('chai').expect;

var Dataset = require('../../../lib/dataset'),
    Dataviz = require('../../../lib/');

describe('Dataviz', function(){

  beforeEach(function(){
    this.dataviz = new Dataviz();
  });

  afterEach(function(){
    this.dataviz = null;
    Dataviz.visuals = new Array();
  });

  describe('.data()', function(){
    //
  });

  describe('.parseRequest()', function(){
    //
  });

  describe('.parseRawData()', function(){
    //
  });

});
