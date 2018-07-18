import Dataviz, { Dataset } from '../../../lib/browser';

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

  describe('.attributes()', () => {

    it('should get the current properties', () => {
      expect(dataviz1.attributes()).toBeInstanceOf(Object);
    });

    it('should set a hash of properties', () => {
      dataviz1.attributes({ title: 'Updated Attributes', stacked: true });
      expect(dataviz1.config.title).toEqual('Updated Attributes');
      expect(dataviz1.config.stacked).toEqual(true);
    });

    it('should unset properties by passing null', () => {
      dataviz1.attributes({ stacked: null });
      expect(dataviz1.config.stacked).toBe(null);
    });

  });


  describe('.colors()', () => {

    it('should get the current color set', () => {
      expect(dataviz1.colors()).toBeInstanceOf(Array);
      expect(dataviz1.colors()).toEqual(dataviz1.config.colors);
    });

    it('should set a new array of colors', () => {
      const array = ['red','green','blue'];
      dataviz1.colors(array);
      expect(dataviz1.config.colors).toBeInstanceOf(Array);
      expect(dataviz1.config.colors).toHaveLength(3);
      expect(dataviz1.config.colors).toEqual(array);
    });

    it('should unset the colors set by passing null', () => {
      const array = ['red','green','blue'];
      dataviz1.colors(array);
      dataviz1.colors(null);
      expect(dataviz1.config.colors).toBeInstanceOf(Array);
      expect(dataviz1.config.colors).toHaveLength(0);
    });

  });

  describe('.dateFormat()', () => {
    it('should return undefined by default', () => {
      expect(dataviz1.dateFormat()).toBe(undefined);
    });
    it('should set and get a new dateFormat string', () => {
      dataviz1.dateFormat('test');
      expect(dataviz1.dateFormat()).toEqual('test');
    });
    it('should set and get a new dateFormat function', () => {
      const noop = () => {};
      dataviz1.dateFormat(noop);
      expect(dataviz1.dateFormat()).toEqual(noop);
    });
    it('should unset dateFormat by passing null', () => {
      dataviz1.dateFormat(null);
      expect(dataviz1.dateFormat()).toBe(undefined);
    });
  });

  describe('.colorMapping()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.colorMapping()).toEqual({});
    });

    it('should set and get a hash of properties', () => {
      const hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.config.colorMapping).toEqual(hash);
    });

    it('should unset a property by passing null', () => {
      const hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.config.colorMapping.A).toEqual(hash.A);
      dataviz1.colorMapping({ 'A': null });
      expect(dataviz1.config.colorMapping.A)
        .toBe(null);
    });

    it('should reset the configuration by passing null', () => {
      const hash = { 'A': '#aaa', 'B': '#bbb' };
      dataviz1.colorMapping(hash);
      expect(dataviz1.config.colorMapping.A).toEqual(hash.A);
      dataviz1.colorMapping(null);
      expect(dataviz1.config.colorMapping).toEqual({});
    });

  });

  describe('.labels()', () => {

    it('should return an empty array by default', () => {
      expect(dataviz1.labels()).toBeInstanceOf(Array)
      expect(dataviz1.labels()).toHaveLength(0);
    });

    it('should set and get a new array of labels', () => {
      const array = ['A','B','C'];
      dataviz1.labels(array);
      expect(dataviz1.config.labels).toEqual(array);
    });

    it('should unset the labels set by passing null', () => {
      const array = ['A','B','C'];
      dataviz1.labels(array);
      dataviz1.labels(null);
      expect(dataviz1.config.labels).toBeInstanceOf(Array);
      expect(dataviz1.config.labels).toHaveLength(0);
    });

    it('should rewrite the labels in a categorical Dataset instance', () => {
      const array = ['A','B'];
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      dataviz1.data(ds).labels(array);
      expect(dataviz1.dataset.selectColumn(0)).toBeInstanceOf(Array);
      expect(dataviz1.dataset.selectColumn(0)).toHaveLength(4);
      expect(dataviz1.dataset.selectColumn(0)).toEqual(['Index', 'A', 'B', 'Row 3']);
    });

    it('should rewrite the labels in a timeseries Dataset instance', () => {
      const array = ['A'];
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 1, 3],
        ['2013-01-01T12:00:00', 2, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      dataviz1.data(ds).labels(array);
      expect(dataviz1.dataset.selectRow(0)).toBeInstanceOf(Array);
      expect(dataviz1.dataset.selectRow(0)).toHaveLength(3);
      expect(dataviz1.dataset.selectRow(0)).toEqual(['Index', 'A', 'Next']);
    });

  });

  describe('.labelMapping()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.labelMapping()).toEqual({});
    });

    it('should set and get a hash of properties', () => {
      const hash = { '_a_': 'A', '_b_': 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.config.labelMapping).toEqual(hash);
    });

    it('should unset a property by passing null', () => {
      const hash = { '_a_': 'A', '_b_': 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.config.labelMapping._a_).toEqual('A');
      dataviz1.labelMapping({ '_a_': null });
      expect(dataviz1.config.labelMapping._a_).toBe(null);
    });

    it('should reset the configuration by passing null', () => {
      const hash = { _a_: 'A', _b_: 'B' };
      dataviz1.labelMapping(hash);
      expect(dataviz1.config.labelMapping._a_).toEqual('A');
      dataviz1.labelMapping(null);
      expect(dataviz1.config.labelMapping).toEqual({});
    });

    // TODO: re-activate
    it('should rewrite the labels in a categorical Dataset instance', () => {
      const labels = {
        'First': 'A',
        'Row 1': 'A',
        'Row 2': 'B'
      };
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      dataviz1.data(ds).labelMapping(labels);
      expect(dataviz1.dataset.selectColumn(0)).toEqual(['Index', 'A', 'B', 'Row 3']);
    });

    it('should rewrite the labels in a timeseries Dataset instance', () => {
      const labels = {
        'First': 'A',
        'Row 2': 'B'
      };
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 1, 3],
        ['2013-01-01T12:00:00', 2, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      dataviz1.data(ds).labelMapping(labels);
      expect(dataviz1.dataset.selectRow(0)).toEqual(['Index', 'A', 'Next']);
    });

  });

  describe('.notes()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.notes()).toBe(undefined);
    });

    it('should set and get a new notes value', () => {
      dataviz1.notes('test');
      expect(dataviz1.config.notes).toEqual('test');
    });

    it('should unset the notes by passing null', () => {
      dataviz1.notes(null);
      expect(dataviz1.config.notes).toBe(null);
    });

  });

  describe('.title()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.title()).toBe(undefined);
    });

    it('should set and get a new title', () => {
      const title = 'New Title';
      dataviz1.title(title);
      expect(dataviz1.config.title).toEqual(title);
    });

    it('should unset the title by passing null', () => {
      dataviz1.title(null);
      expect(dataviz1.config.title).toBe(null);
    });

  });

  describe('.library()', () => {

    it('should return \'default\' by default', () => {
      expect(dataviz1.library())
        .toEqual('default');
    });

    it('should set and get a new library', () => {
      const lib = 'nvd3';
      dataviz1.library(lib);
      expect(dataviz1.config.library)
        .toEqual(lib);
    });

    it('should unset the library by passing null', () => {
      dataviz1.library(null);
      expect(dataviz1.config.library)
        .toBe(null);
    });

  });

  describe('.theme()', () => {

    it('should return \'keen-dataviz\' by default', () => {
      expect(dataviz1.theme())
        .toEqual('keen-dataviz');
    });

    it('should set and get a new theme', () => {
      const theme = 'custom';
      dataviz1.theme(theme);
      expect(dataviz1.config.theme)
        .toEqual(theme);
    });

    it('should unset the theme by passing null', () => {
      dataviz1.theme(null);
      expect(dataviz1.config.theme)
        .toBe(null);
    });

  });

  describe('.chartOptions()', () => {

    it('should set and get a hash of properties', () => {
      const hash = { legend: { position: 'none' }, stacked: true };
      dataviz1.chartOptions(hash);
      expect(dataviz1.config.legend)
        .toMatchObject(hash.legend);
      expect(dataviz1.config.stacked)
        .toEqual(true);
    });
  });

  describe('.type()', () => {
    it('should return undefined by default', () => {
      expect(dataviz1.type())
        .toBe(undefined);
    });
    it('should set and get a new chartType', () => {
      const chartType = 'magic-pie'
      dataviz1.type(chartType);
      expect(dataviz1.config.type).toEqual(chartType);
    });
    it('should unset properties by passing null', () => {
      dataviz1.type(null);
      expect(dataviz1.config.type)
        .toBe(null);
    });
  });


  describe('.indexBy()', () => {

    it('should return \'timeframe.start\' by default', () => {
      expect(dataviz1.indexBy())
        .toEqual('timeframe.start');
    });

    it('should set and get a new indexBy property', () => {
      dataviz1.indexBy('timeframe.end');
      expect(dataviz1.config.indexBy)
        .toEqual('timeframe.end');
    });

    it('should revert the property to default value by passing null', () => {
      dataviz1.indexBy(null);
      expect(dataviz1.config.indexBy)
        .toEqual('timeframe.start');
    });

  });


  describe('.sortGroups()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.sortGroups())
        .toBe(undefined);
    });

    it('should set and get a new sortGroups property', () => {
      dataviz1.sortGroups('asc');
      expect(dataviz1.config.sortGroups)
        .toEqual('asc');
    });

    it('should unset property by passing null', () => {
      dataviz1.sortGroups(null);
      expect(dataviz1.config.sortGroups)
        .toBe(null);
    });

    it('should sort labels in a categorical Dataset instance', () => {
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'Result'],
        ['Row 1', 1],
        ['Row 2', 2],
        ['Row 3', 3]
      ];
      dataviz1.data(ds).sortGroups('desc');
      expect(dataviz1.dataset.selectColumn(0))
        .toEqual(['Index', 'Row 3', 'Row 2', 'Row 1']);
    });

    it('should sort labels in a timeseries Dataset instance', () => {
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'Next', 'First'],
        ['2012-01-01T12:00:00', 3, 3],
        ['2013-01-01T12:00:00', 3, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      dataviz1.data(ds).sortGroups('asc');
      expect(dataviz1.dataset.selectRow(0))
        .toEqual(['Index', 'First', 'Next']);
    });

  });


  describe('.sortIntervals()', () => {

    it('should return undefined by default', () => {
      expect(dataviz1.sortIntervals())
        .toBe(undefined);
    });

    it('should set and get a new sortIntervals property', () => {
      dataviz1.sortIntervals('asc');
      expect(dataviz1.config.sortIntervals)
        .toEqual('asc');
    });

    it('should unset property by passing null', () => {
      dataviz1.sortIntervals(null);
      expect(dataviz1.config.sortIntervals)
        .toBe(null);
    });

    it('should sort intervals in a timeseries Dataset instance', () => {
      const ds = new Dataset();
      ds.matrix = [
        ['Index', 'First', 'Next'],
        ['2012-01-01T12:00:00', 3, 3],
        ['2013-01-01T12:00:00', 3, 2],
        ['2014-01-01T12:00:00', 3, 1]
      ];
      dataviz1.data(ds).sortIntervals('desc');
      expect(dataviz1.dataset.selectColumn(0))
        .toEqual(['Index', '2014-01-01T12:00:00', '2013-01-01T12:00:00', '2012-01-01T12:00:00']);
    });

  });


  describe('.stacked()', () => {

    it('should return false by default', () => {
      expect(dataviz1.stacked())
        .toEqual(false);
    });

    it('should set `stacked` to true by passing true', () => {
      dataviz1.stacked(true);
      expect(dataviz1.config.stacked)
        .toEqual(true);
    });

    it('should set `stacked` to false by passing null', () => {
      dataviz1.stacked(true);
      dataviz1.stacked(null);
      expect(dataviz1.config.stacked)
        .toEqual(false);
    });

  });

});
