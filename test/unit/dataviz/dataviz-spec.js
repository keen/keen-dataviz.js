import { Dataset, Dataviz } from '../../../lib/browser';

describe('Dataviz', () => {
  let dataviz1;

  beforeEach(() => {
    dataviz1 = new Dataviz();
  });

  afterEach(() => {
    dataviz1 = null;
    Dataviz.visuals = [];
  });

  describe('constructor', () => {

    it('should create a new Dataviz instance', () => {
      expect(dataviz1).toBeInstanceOf(Dataviz);
    });

    it('should contain a new Dataset instance', () => {
      expect(dataviz1.dataset).toBeInstanceOf(Dataset);
    });

    it('should contain a view object', () => {
      expect(dataviz1.view).toBeInstanceOf(Object);
    });

    it('should be appended to Dataviz.visuals', () => {
      expect(Dataviz.visuals.length).toBe(1);
      expect(Dataviz.visuals[0]).toBeInstanceOf(Dataviz);
    });

  });
/*
  describe('.attributes()', () => {

    it('should get the current properties', () => {
      expect(dataviz1.attributes()).toBeInstanceOf(Object);
    });

    it('should set a hash of properties', () => {
      dataviz1.attributes({ title: 'Updated Attributes', width: 600 });
      expect(dataviz1.view.title).toBeInstanceOf(String);
        .and.toEqual('Updated Attributes');
      expect(dataviz1.view.width).toBeInstanceOf(Number)
        .and.toEqual(600);
    });

    it('should unset properties by passing null', () => {
      dataviz1.attributes({ height: null });
      expect(dataviz1.view.height).to.not.exist;
    });

  });


  describe('.colors()', () => {

    it('should get the current color set', () => {
      expect(dataviz1.colors())
        .toBeInstanceOf(Array)
        .and.toEqual(dataviz1.view.colors);
    });

    it('should set a new array of colors', () => {
      var array = ['red','green','blue'];
      dataviz1.colors(array);
      expect(dataviz1.view.colors).toBeInstanceOf(Array)
        .and.toHaveLength(3)
        .and.toEqual(array);
    });

    it('should unset the colors set by passing null', () => {
      var array = ['red','green','blue'];
      dataviz1.colors(array);
      dataviz1.colors(null);
      expect(dataviz1.view.colors)
        .toBeInstanceOf(Array)
        .and.toHaveLength(0);
    });

  });

  describe('.dateFormat()', () => {
    it('should return undefined by default', () => {
      expect(dataviz1.dateFormat()).to.be.an('undefined');
    });
    it('should set and get a new dateFormat string', () => {
      dataviz1.dateFormat('test');
      expect(dataviz1.dateFormat()).toBeInstanceOf(String);
        .and.toEqual('test');
    });
    it('should set and get a new dateFormat function', () => {
      var noop = () => {};
      dataviz1.dateFormat(noop);
      expect(dataviz1.dateFormat()).to.be.a('function')
        .and.toEqual(noop);
    });
    it('should unset dateFormat by passing null', () => {
      dataviz1.dateFormat(null);
      expect(dataviz1.dateFormat()).to.be.an('undefined');
    });
  });

  describe('.colorMapping()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.colorMapping())
        .to.be.an('object')
        .and.to.deep.equal({});
    });

    it('should set and get a hash of properties', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.view.colorMapping)
        .to.be.an('object')
        .and.to.deep.equal(hash);
    });

    it('should unset a property by passing null', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.view.colorMapping.A)
        ..toBeInstanceOf(String);
        .and.toEqual(hash.A);
      dataviz1.colorMapping({ 'A': null });
      expect(dataviz1.view.colorMapping.A)
        .to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.view.colorMapping.A)
        ..toBeInstanceOf(String);
        .and.toEqual(hash.A);
      dataviz1.colorMapping(null);
      expect(dataviz1.view.colorMapping)
        .to.be.an('object')
        .and.to.deep.equal({});
    });

  });

  describe('.labels()', () => {

    it('should return an empty array by default', () => {
      expect(dataviz1.labels()).toBeInstanceOf(Array)
        .and.toHaveLength(0);
    });

    it('should set and get a new array of labels', () => {
      var array = ['A','B','C'];
      dataviz1.labels(array);
      expect(dataviz1.view.labels).toBeInstanceOf(Array)
        .and.toHaveLength(3)
        .and.toEqual(array);
    });

    it('should unset the labels set by passing null', () => {
      var array = ['A','B','C'];
      dataviz1.labels(array);
      dataviz1.labels(null);
      expect(dataviz1.view.labels).toBeInstanceOf(Array)
        .and.toHaveLength(0);
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
      dataviz1.data(ds).labels(array);
      expect(dataviz1.dataset.selectColumn(0)).toBeInstanceOf(Array)
        .and.toHaveLength(4)
        .and.toEqual(['Index', 'A', 'B', 'Row 3']);
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
      dataviz1.data(ds).labels(array);
      expect(dataviz1.dataset.selectRow(0)).toBeInstanceOf(Array)
        .and.toHaveLength(3)
        .and.toEqual(['Index', 'A', 'Next']);
    });

  });

  describe('.labelMapping()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.labelMapping())
        .to.be.an('object')
        .and.to.deep.eql({});
    });

    it('should set and get a hash of properties', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.view.labelMapping)
        .to.be.an('object')
        .and.to.deep.equal(hash);
    });

    it('should unset a property by passing null', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.view.labelMapping._a_)
        ..toBeInstanceOf(String);
        .and.toEqual('A');
      dataviz1.labelMapping({ '_a_': null });
      expect(dataviz1.view.labelMapping._a_)
        .to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { '_a_': 'A', '_b_': 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.view.labelMapping._a_)
        ..toBeInstanceOf(String);
        .and.toEqual('A');
      dataviz1.labelMapping(null);
      expect(dataviz1.view.labelMapping)
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
      dataviz1.data(ds).labelMapping(labels);
      expect(dataviz1.dataset.selectColumn(0)).toBeInstanceOf(Array)
        .and.toHaveLength(4)
        .and.toEqual(['Index', 'A', 'B', 'Row 3']);
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
      dataviz1.data(ds).labelMapping(labels);
      expect(dataviz1.dataset.selectRow(0)).toBeInstanceOf(Array)
        .and.toHaveLength(3)
        .and.toEqual(['Index', 'A', 'Next']);
    });

  });

  describe('.height()', () => {
    it('should return undefined by default', () => {
      expect(dataviz1.height())
        .to.be.undefined;
    });
    it('should set and get a new height', () => {
      var height = 375;
      dataviz1.height(height);
      expect(dataviz1.view.height)
        .toBeInstanceOf(Number)
        .and.toEqual(height);
    });
    it('should unset the height by passing null', () => {
      dataviz1.height(null);
      expect(dataviz1.view.height)
        .to.not.exist;
    });
  });

  describe('.notes()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.notes())
        .to.be.an('undefined');
    });

    it('should set and get a new notes value', () => {
      dataviz1.notes('test');
      expect(dataviz1.view.notes)
        ..toBeInstanceOf(String);
        .and.toEqual('test');
    });

    it('should unset the notes by passing null', () => {
      dataviz1.notes(null);
      expect(dataviz1.view.notes)
        .to.not.exist;
    });

  });

  describe('.title()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.title()).to.be.an('undefined');
    });

    it('should set and get a new title', () => {
      var title = 'New Title';
      dataviz1.title(title);
      expect(dataviz1.view.title)
        ..toBeInstanceOf(String);
        .and.toEqual(title);
    });

    it('should unset the title by passing null', () => {
      dataviz1.title(null);
      expect(dataviz1.view.title)
        .to.not.exist;
    });

  });

  describe('.width()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.width()).to.be.an('undefined');
    });

    it('should set and get a new width', () => {
      var width = 900;
      dataviz1.width(width);
      expect(dataviz1.view.width)
        .toBeInstanceOf(Number)
        .and.toEqual(width);
    });

    it('should unset the width by passing null', () => {
      dataviz1.width(null);
      expect(dataviz1.view.width)
        .to.not.exist;
    });

  });

  describe('.library()', () => {

    it('should return \'default\' by default', () => {
      expect(dataviz1.library())
        ..toBeInstanceOf(String);
        .and.toEqual('default');
    });

    it('should set and get a new library', () => {
      var lib = 'nvd3';
      dataviz1.library(lib);
      expect(dataviz1.view.library)
        ..toBeInstanceOf(String);
        .and.toEqual(lib);
    });

    it('should unset the library by passing null', () => {
      dataviz1.library(null);
      expect(dataviz1.view.library)
        .to.not.exist;
    });

  });

  describe('.theme()', () => {

    it('should return \'keen-dataviz\' by default', () => {
      expect(dataviz1.theme())
        ..toBeInstanceOf(String);
        .and.toEqual('keen-dataviz');
    });

    it('should set and get a new theme', () => {
      var theme = 'custom';
      dataviz1.theme(theme);
      expect(dataviz1.view.theme)
        ..toBeInstanceOf(String);
        .and.toEqual(theme);
    });

    it('should unset the theme by passing null', () => {
      dataviz1.theme(null);
      expect(dataviz1.view.theme)
        .to.not.exist;
    });

  });

  describe('.chartOptions()', () => {

    it('should set and get a hash of properties', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      dataviz1.chartOptions(hash);
      expect(dataviz1.view.chartOptions.legend)
        .to.be.an('object')
        .and.to.deep.eql(hash.legend);
      expect(dataviz1.view.chartOptions.isStacked)
        .to.be.a('boolean')
        .and.toEqual(true);
    });

    it('should unset properties by passing null', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      dataviz1.chartOptions(hash);
      dataviz1.chartOptions({ legend: null });
      expect(dataviz1.view.chartOptions.legend).to.not.exist;
    });

    it('should reset the configuration by passing null', () => {
      var hash = { legend: { position: 'none' }, isStacked: true };
      dataviz1.chartOptions(hash);
      dataviz1.chartOptions(null);
      expect(dataviz1.view.chartOptions)
        .to.be.an('object')
        .and.to.deep.equal({});
    });

  });

  describe('.type()', () => {
    it('should return undefined by default', () => {
      expect(dataviz1.type())
        .to.be.an('undefined');
    });
    it('should set and get a new chartType', () => {
      var chartType = 'magic-pie'
      dataviz1.type(chartType);
      expect(dataviz1.view.type)
        ..toBeInstanceOf(String);
        .and.toEqual(chartType);
    });
    it('should unset properties by passing null', () => {
      dataviz1.type(null);
      expect(dataviz1.view.type)
        .to.not.exist;
    });
  });


  describe('.indexBy()', () => {

    it('should return \'timeframe.start\' by default', () => {
      expect(dataviz1.indexBy())
        ..toBeInstanceOf(String);
        .and.toEqual('timeframe.start');
    });

    it('should set and get a new indexBy property', () => {
      dataviz1.indexBy('timeframe.end');
      expect(dataviz1.view.indexBy)
        ..toBeInstanceOf(String);
        .and.toEqual('timeframe.end');
    });

    it('should revert the property to default value by passing null', () => {
      dataviz1.indexBy(null);
      expect(dataviz1.view.indexBy)
        ..toBeInstanceOf(String);
        .and.toEqual('timeframe.start');
    });

  });


  describe('.sortGroups()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.sortGroups())
        .to.be.an('undefined');
    });

    it('should set and get a new sortGroups property', () => {
      dataviz1.sortGroups('asc');
      expect(dataviz1.view.sortGroups)
        ..toBeInstanceOf(String);
        .and.toEqual('asc');
    });

    it('should unset property by passing null', () => {
      dataviz1.sortGroups(null);
      expect(dataviz1.view.sortGroups)
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
      dataviz1.data(ds).sortGroups('desc');
      expect(dataviz1.dataset.selectColumn(0)).toBeInstanceOf(Array)
        .and.toHaveLength(4)
        .and.toEqual(['Index', 'Row 3', 'Row 2', 'Row 1']);
    });

    it('should sort labels in a timeseries Dataset instance', () => {
      var ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 3, 3],
        ['2013-01-01T12:00:00', 3, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      dataviz1.data(ds).sortGroups('asc');
      expect(dataviz1.dataset.selectRow(0)).toBeInstanceOf(Array)
        .and.toHaveLength(3)
        .and.toEqual(['Index', 'Next', 'First']);
    });

  });


  describe('.sortIntervals()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.sortIntervals())
        .to.be.an('undefined');
    });

    it('should set and get a new sortIntervals property', () => {
      dataviz1.sortIntervals('asc');
      expect(dataviz1.view.sortIntervals)
        ..toBeInstanceOf(String);
        .and.toEqual('asc');
    });

    it('should unset property by passing null', () => {
      dataviz1.sortIntervals(null);
      expect(dataviz1.view.sortIntervals)
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
      dataviz1.data(ds).sortIntervals('desc');
      expect(dataviz1.dataset.selectColumn(0)).toBeInstanceOf(Array)
        .and.toHaveLength(4)
        .and.toEqual(['Index', '2014-01-01T12:00:00', '2013-01-01T12:00:00', '2012-01-01T12:00:00']);
    });

  });


  describe('.stacked()', () => {

    it('should return false by default', () => {
      expect(dataviz1.stacked())
        .to.be.a('boolean')
        .and.toEqual(false);
    });

    it('should set `stacked` to true by passing true', () => {
      dataviz1.stacked(true);
      expect(dataviz1.view.stacked)
        .to.be.a('boolean')
        .and.toEqual(true);
    });

    it('should set `stacked` to false by passing null', () => {
      dataviz1.stacked(true);
      dataviz1.stacked(null);
      expect(dataviz1.view.stacked)
        .to.be.a('boolean')
        .and.toEqual(false);
    });

  });
*/
});
