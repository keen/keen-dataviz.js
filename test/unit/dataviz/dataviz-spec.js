var expect = require('chai').expect;

var Dataset = require('../../../lib/dataset'),
    Dataviz = require('../../../lib/');

describe('Dataviz', () => {

  beforeEach(() => {
    this.dataviz = new Dataviz();
  });

  afterEach(() => {
    this.dataviz = null;
    Dataviz.visuals = new Array();
  });

  describe('constructor', () => {

    it('should create a new Dataviz instance', () => {
      expect(this.dataviz).toBeInstanceOf(Dataviz);
    });

    it('should contain a new Dataset instance', () => {
      expect(this.dataviz.dataset).toBeInstanceOf(Dataset);
    });

    it('should contain a view object', () => {
      expect(this.dataviz.view).to.be.an('object');
    });

    it('should be appended to Dataviz.visuals', () => {
      expect(Dataviz.visuals).to.have.length(1);
      expect(Dataviz.visuals[0]).and.toBeInstanceOf(Dataviz);
    });

  });

  describe('.attributes()', () => {

    it('should get the current properties', () => {
      expect(this.dataviz.attributes()).to.be.an('object');
    });

    it('should set a hash of properties', () => {
      this.dataviz.attributes({ title: 'Updated Attributes', width: 600 });
      expect(this.dataviz.view.title).to.be.a('string')
        .and.to.eql('Updated Attributes');
      expect(this.dataviz.view.width).to.be.a('number')
        .and.to.eql(600);
    });

    it('should unset properties by passing null', () => {
      this.dataviz.attributes({ height: null });
      expect(this.dataviz.view.height).to.not.exist;
    });

  });


  describe('.colors()', () => {

    it('should get the current color set', () => {
      expect(this.dataviz.colors())
        .to.be.an('array')
        .and.to.eql(this.dataviz.view.colors);
    });

    it('should set a new array of colors', () => {
      var array = ['red','green','blue'];
      this.dataviz.colors(array);
      expect(this.dataviz.view.colors).to.be.an('array')
        .and.to.have.length(3)
        .and.to.eql(array);
    });

    it('should unset the colors set by passing null', () => {
      var array = ['red','green','blue'];
      this.dataviz.colors(array);
      this.dataviz.colors(null);
      expect(this.dataviz.view.colors)
        .to.be.an('array')
        .and.to.have.length(0);
    });

  });

  describe('.dateFormat()', () => {
    it('should return undefined by default', () => {
      expect(this.dataviz.dateFormat()).to.be.an('undefined');
    });
    it('should set and get a new dateFormat string', () => {
      this.dataviz.dateFormat('test');
      expect(this.dataviz.dateFormat()).to.be.a('string')
        .and.to.eql('test');
    });
    it('should set and get a new dateFormat function', () => {
      var noop = () => {};
      this.dataviz.dateFormat(noop);
      expect(this.dataviz.dateFormat()).to.be.a('function')
        .and.to.eql(noop);
    });
    it('should unset dateFormat by passing null', () => {
      this.dataviz.dateFormat(null);
      expect(this.dataviz.dateFormat()).to.be.an('undefined');
    });
  });

  describe('.colorMapping()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.colorMapping())
        .to.be.an('object')
        .and.to.deep.equal({});
    });

    it('should set and get a hash of properties', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      this.dataviz.colorMapping(hash);
      expect(this.dataviz.view.colorMapping)
        .to.be.an('object')
        .and.to.deep.equal(hash);
    });

    it('should unset a property by passing null', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      this.dataviz.colorMapping(hash);
      expect(this.dataviz.view.colorMapping.A)
        .to.be.a('string')
        .and.to.eql(hash.A);
      this.dataviz.colorMapping({ 'A': null });
      expect(this.dataviz.view.colorMapping.A)
        .to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      this.dataviz.colorMapping(hash);
      expect(this.dataviz.view.colorMapping.A)
        .to.be.a('string')
        .and.to.eql(hash.A);
      this.dataviz.colorMapping(null);
      expect(this.dataviz.view.colorMapping)
        .to.be.an('object')
        .and.to.deep.equal({});
    });

  });

  describe('.labels()', () => {

    it('should return an empty array by default', () => {
      expect(this.dataviz.labels()).to.be.an('array')
        .and.to.have.length(0);
    });

    it('should set and get a new array of labels', () => {
      var array = ['A','B','C'];
      this.dataviz.labels(array);
      expect(this.dataviz.view.labels).to.be.an('array')
        .and.to.have.length(3)
        .and.to.eql(array);
    });

    it('should unset the labels set by passing null', () => {
      var array = ['A','B','C'];
      this.dataviz.labels(array);
      this.dataviz.labels(null);
      expect(this.dataviz.view.labels).to.be.an('array')
        .and.to.have.length(0);
    });

    it('should rewrite the labels in a categorical Dataset instance', () => {
      var array = ['A','B'];
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      this.dataviz.data(ds).labels(array);
      expect(this.dataviz.dataset.selectColumn(0)).to.be.an('array')
        .and.to.have.length(4)
        .and.to.eql(['Index', 'A', 'B', 'Row 3']);
    });

    it('should rewrite the labels in a timeseries Dataset instance', () => {
      var array = ['A'];
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 1, 3],
        ['2013-01-01T12:00:00', 2, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      this.dataviz.data(ds).labels(array);
      expect(this.dataviz.dataset.selectRow(0)).to.be.an('array')
        .and.to.have.length(3)
        .and.to.eql(['Index', 'A', 'Next']);
    });

  });

  describe('.labelMapping()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.labelMapping())
        .to.be.an('object')
        .and.to.deep.eql({});
    });

    it('should set and get a hash of properties', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      this.dataviz.labelMapping(hash);
      expect(this.dataviz.view.labelMapping)
        .to.be.an('object')
        .and.to.deep.equal(hash);
    });

    it('should unset a property by passing null', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      this.dataviz.labelMapping(hash);
      expect(this.dataviz.view.labelMapping._a_)
        .to.be.a('string')
        .and.to.eql('A');
      this.dataviz.labelMapping({ '_a_': null });
      expect(this.dataviz.view.labelMapping._a_)
        .to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      this.dataviz.labelMapping(hash);
      expect(this.dataviz.view.labelMapping._a_)
        .to.be.a('string')
        .and.to.eql('A');
      this.dataviz.labelMapping(null);
      expect(this.dataviz.view.labelMapping)
        .to.be.an('object')
        .and.to.deep.equal({});

    });

    // TODO: re-activate
    it('should rewrite the labels in a categorical Dataset instance', () => {
      var labels = {
        'First': 'A',
        'Row 1': 'A',
        'Row 2': 'B'
      };
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      this.dataviz.data(ds).labelMapping(labels);
      expect(this.dataviz.dataset.selectColumn(0)).to.be.an('array')
        .and.to.have.length(4)
        .and.to.eql(['Index', 'A', 'B', 'Row 3']);
    });

    it('should rewrite the labels in a timeseries Dataset instance', () => {
      var labels = {
        'First': 'A',
        'Row 2': 'B'
      };
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 1, 3],
        ['2013-01-01T12:00:00', 2, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      this.dataviz.data(ds).labelMapping(labels);
      expect(this.dataviz.dataset.selectRow(0)).to.be.an('array')
        .and.to.have.length(3)
        .and.to.eql(['Index', 'A', 'Next']);
    });

  });

  describe('.height()', () => {
    it('should return undefined by default', () => {
      expect(this.dataviz.height())
        .to.be.undefined;
    });
    it('should set and get a new height', () => {
      var height = 375;
      this.dataviz.height(height);
      expect(this.dataviz.view.height)
        .to.be.a('number')
        .and.to.eql(height);
    });
    it('should unset the height by passing null', () => {
      this.dataviz.height(null);
      expect(this.dataviz.view.height)
        .to.not.exist;
    });
  });

  describe('.notes()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.notes())
        .to.be.an('undefined');
    });

    it('should set and get a new notes value', () => {
      this.dataviz.notes('test');
      expect(this.dataviz.view.notes)
        .to.be.a('string')
        .and.to.eql('test');
    });

    it('should unset the notes by passing null', () => {
      this.dataviz.notes(null);
      expect(this.dataviz.view.notes)
        .to.not.exist;
    });

  });

  describe('.title()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.title()).to.be.an('undefined');
    });

    it('should set and get a new title', () => {
      var title = 'New Title';
      this.dataviz.title(title);
      expect(this.dataviz.view.title)
        .to.be.a('string')
        .and.to.eql(title);
    });

    it('should unset the title by passing null', () => {
      this.dataviz.title(null);
      expect(this.dataviz.view.title)
        .to.not.exist;
    });

  });

  describe('.width()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.width()).to.be.an('undefined');
    });

    it('should set and get a new width', () => {
      var width = 900;
      this.dataviz.width(width);
      expect(this.dataviz.view.width)
        .to.be.a('number')
        .and.to.eql(width);
    });

    it('should unset the width by passing null', () => {
      this.dataviz.width(null);
      expect(this.dataviz.view.width)
        .to.not.exist;
    });

  });

  describe('.library()', () => {

    it('should return \'default\' by default', () => {
      expect(this.dataviz.library())
        .to.be.a('string')
        .and.to.eql('default');
    });

    it('should set and get a new library', () => {
      var lib = 'nvd3';
      this.dataviz.library(lib);
      expect(this.dataviz.view.library)
        .to.be.a('string')
        .and.to.eql(lib);
    });

    it('should unset the library by passing null', () => {
      this.dataviz.library(null);
      expect(this.dataviz.view.library)
        .to.not.exist;
    });

  });

  describe('.theme()', () => {

    it('should return \'keen-dataviz\' by default', () => {
      expect(this.dataviz.theme())
        .to.be.a('string')
        .and.to.eql('keen-dataviz');
    });

    it('should set and get a new theme', () => {
      var theme = 'custom';
      this.dataviz.theme(theme);
      expect(this.dataviz.view.theme)
        .to.be.a('string')
        .and.to.eql(theme);
    });

    it('should unset the theme by passing null', () => {
      this.dataviz.theme(null);
      expect(this.dataviz.view.theme)
        .to.not.exist;
    });

  });

  describe('.chartOptions()', () => {

    it('should set and get a hash of properties', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      this.dataviz.chartOptions(hash);
      expect(this.dataviz.view.chartOptions.legend)
        .to.be.an('object')
        .and.to.deep.eql(hash.legend);
      expect(this.dataviz.view.chartOptions.isStacked)
        .to.be.a('boolean')
        .and.to.eql(true);
    });

    it('should unset properties by passing null', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      this.dataviz.chartOptions(hash);
      this.dataviz.chartOptions({ legend: null });
      expect(this.dataviz.view.chartOptions.legend).to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      this.dataviz.chartOptions(hash);
      this.dataviz.chartOptions(null);
      expect(this.dataviz.view.chartOptions)
        .to.be.an('object')
        .and.to.deep.equal({});
    });

  });

  describe('.type()', () => {
    it('should return undefined by default', () => {
      expect(this.dataviz.type())
        .to.be.an('undefined');
    });
    it('should set and get a new chartType', () => {
      var chartType = 'magic-pie'
      this.dataviz.type(chartType);
      expect(this.dataviz.view.type)
        .to.be.a('string')
        .and.to.eql(chartType);
    });
    it('should unset properties by passing null', () => {
      this.dataviz.type(null);
      expect(this.dataviz.view.type)
        .to.not.exist;
    });
  });


  describe('.indexBy()', () => {

    it('should return \'timeframe.start\' by default', () => {
      expect(this.dataviz.indexBy())
        .to.be.a('string')
        .and.to.eql('timeframe.start');
    });

    it('should set and get a new indexBy property', () => {
      this.dataviz.indexBy('timeframe.end');
      expect(this.dataviz.view.indexBy)
        .to.be.a('string')
        .and.to.eql('timeframe.end');
    });

    it('should revert the property to default value by passing null', () => {
      this.dataviz.indexBy(null);
      expect(this.dataviz.view.indexBy)
        .to.be.a('string')
        .and.to.eql('timeframe.start');
    });

  });


  describe('.sortGroups()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.sortGroups())
        .to.be.an('undefined');
    });

    it('should set and get a new sortGroups property', () => {
      this.dataviz.sortGroups('asc');
      expect(this.dataviz.view.sortGroups)
        .to.be.a('string')
        .and.to.eql('asc');
    });

    it('should unset property by passing null', () => {
      this.dataviz.sortGroups(null);
      expect(this.dataviz.view.sortGroups)
        .to.not.exist;
    });

    it('should sort labels in a categorical Dataset instance', () => {
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      this.dataviz.data(ds).sortGroups('desc');
      expect(this.dataviz.dataset.selectColumn(0)).to.be.an('array')
        .and.to.have.length(4)
        .and.to.eql(['Index', 'Row 3', 'Row 2', 'Row 1']);
    });

    it('should sort labels in a timeseries Dataset instance', () => {
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 3, 3],
        ['2013-01-01T12:00:00', 3, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      this.dataviz.data(ds).sortGroups('asc');
      expect(this.dataviz.dataset.selectRow(0)).to.be.an('array')
        .and.to.have.length(3)
        .and.to.eql(['Index', 'Next', 'First']);
    });

  });


  describe('.sortIntervals()', () => {

    it('should return undefined by default', () => {
      expect(this.dataviz.sortIntervals())
        .to.be.an('undefined');
    });

    it('should set and get a new sortIntervals property', () => {
      this.dataviz.sortIntervals('asc');
      expect(this.dataviz.view.sortIntervals)
        .to.be.a('string')
        .and.to.eql('asc');
    });

    it('should unset property by passing null', () => {
      this.dataviz.sortIntervals(null);
      expect(this.dataviz.view.sortIntervals)
        .to.not.exist;
    });

    it('should sort intervals in a timeseries Dataset instance', () => {
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 3, 3],
        ['2013-01-01T12:00:00', 3, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      this.dataviz.data(ds).sortIntervals('desc');
      expect(this.dataviz.dataset.selectColumn(0)).to.be.an('array')
        .and.to.have.length(4)
        .and.to.eql(['Index', '2014-01-01T12:00:00', '2013-01-01T12:00:00', '2012-01-01T12:00:00']);
    });

  });


  describe('.stacked()', () => {

    it('should return false by default', () => {
      expect(this.dataviz.stacked())
        .to.be.a('boolean')
        .and.to.eql(false);
    });

    it('should set `stacked` to true by passing true', () => {
      this.dataviz.stacked(true);
      expect(this.dataviz.view.stacked)
        .to.be.a('boolean')
        .and.to.eql(true);
    });

    it('should set `stacked` to false by passing null', () => {
      this.dataviz.stacked(true);
      this.dataviz.stacked(null);
      expect(this.dataviz.view.stacked)
        .to.be.a('boolean')
        .and.to.eql(false);
    });

  });

});
