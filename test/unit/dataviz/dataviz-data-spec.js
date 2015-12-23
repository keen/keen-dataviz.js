var expect = require('chai').expect;

var Dataset = require('../../../lib/dataset'),
    Dataviz = require('../../../lib/');

var data_metric = require('../dataset/sample-data/metric'),
    data_groupBy = require('../dataset/sample-data/groupBy'),
    data_double_groupBy = require('../dataset/sample-data/double-groupBy'),

    data_interval = require('../dataset/sample-data/interval'),
    data_interval_groupBy_empties = require('../dataset/sample-data/interval-groupBy-empties'),
    data_interval_double_groupBy = require('../dataset/sample-data/interval-double-groupBy'),

    data_funnel = require('../dataset/sample-data/funnel'),
    data_uniques = require('../dataset/sample-data/select-unique'),
    data_extraction = require('../dataset/sample-data/extraction');

describe('Dataviz', function(){

  beforeEach(function(){
    this.dataviz = new Dataviz();
  });

  afterEach(function(){
    this.dataviz = null;
    Dataviz.visuals = [];
  });

  describe('.data()', function(){

    it('should parse \'metric\' data and set the correct type', function(){
      this.dataviz.data(data_metric);
      expect(this.dataviz.type()).to.eql('metric');
    });
    it('should parse \'grouped-metric\' data and set the correct type', function(){
      this.dataviz.data({
        query: {
          analysis_type: 'count',
          group_by: ['page']
        },
        result: data_groupBy.result
      });
      expect(this.dataviz.type()).to.eql('bar');
    });
    it('should parse \'double-grouped-metric\' data and set the correct type', function(){
      this.dataviz.data(data_double_groupBy);
      expect(this.dataviz.type()).to.eql('bar');
    });

    it('should parse \'interval\' data and set the correct type', function(){
      this.dataviz.data(data_interval);
      expect(this.dataviz.type()).to.eql('area');
    });
    it('should parse \'grouped-interval\' data and set the correct type', function(){
      this.dataviz.data({
        query: {
          analysis_type: 'count',
          group_by: ['key'],
          interval: 'daily'
        },
        result: data_interval_groupBy_empties.result
      });
      expect(this.dataviz.type()).to.eql('line');
    });
    it('should parse \'double-grouped-interval\' data and set the correct type', function(){
      this.dataviz.data(data_interval_double_groupBy);
      expect(this.dataviz.type()).to.eql('line');
    });

    it('should parse \'funnel\' data and set the correct type', function(){
      this.dataviz.data(data_funnel);
      expect(this.dataviz.type()).to.eql('horizontal-bar');
    });
    it('should parse \'list\' data and set the correct type', function(){
      this.dataviz.data(data_uniques);
      expect(this.dataviz.type()).to.eql('table');
    });
    it('should parse \'extraction\' data and set the correct type', function(){
      this.dataviz.data(data_extraction);
      expect(this.dataviz.type()).to.eql('table');
    });

    it('should parse \'funnel\' data and not set a type', function(){
      this.dataviz.type('test').data(data_funnel);
      expect(this.dataviz.type()).to.eql('test');
    });
    it('should parse \'list\' data and not set a type', function(){
      this.dataviz.type('test').data(data_uniques);
      expect(this.dataviz.type()).to.eql('test');
    });
    it('should parse \'extraction\' data and not set a type', function(){
      this.dataviz.type('test').data(data_extraction);
      expect(this.dataviz.type()).to.eql('test');
    });

  });

});
