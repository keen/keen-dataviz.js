var expect = require('chai').expect;

var Dataset = require('../../../lib/dataset');
var each = require('../../../lib/utils/each');

var data_extraction = require('./sample-data/extraction'),
    data_extraction_uneven = require('./sample-data/extraction-uneven')
    data_metric = require('./sample-data/metric'),
    data_interval = require('./sample-data/interval'),
    data_groupBy = require('./sample-data/groupBy'),
    data_groupBy_boolean = require('./sample-data/groupBy-boolean'),
    data_double_groupBy = require('./sample-data/double-groupBy'),
    data_interval_double_groupBy = require('./sample-data/interval-double-groupBy'),
    data_interval_groupBy_empties = require('./sample-data/interval-groupBy-empties'),
    data_interval_groupBy_boolean = require('./sample-data/interval-groupBy-boolean'),
    data_interval_groupBy_nulls = require('./sample-data/interval-groupBy-nulls'),
    data_funnel = require('./sample-data/funnel'),
    data_saved_funnel = require('./sample-data/saved-funnel'),
    data_uniques = require('./sample-data/select-unique');

describe('Dataset', () => {

  beforeEach(() => {
    this.ds = new Dataset();
  });
  afterEach(() => {
    this.ds = null;
  });

  describe('constructor', () => {
    it('should return a new Dataset instance', () => {
      expect(this.ds).toBeInstanceOf(Dataset);
    });

    it('should have a matrix property', () => {
      expect(this.ds.matrix).to.deep.equal([['Index']]);
    });
  });

  describe('.data()', () => {
    it('should output the correct values', () => {
      expect(this.ds.data()).to.be.an('array')
        .and.to.be.of.length(1);
    });
    it('should rewrite the internal matrix value', () => {
      this.ds.data([]);
      expect(this.ds.data()).to.be.an('array')
        .and.to.be.of.length(0);
    });
  });

  describe('.set()', () => {

    it('should create a column and row when they don\'t already exist (integer)', () => {
      this.ds.data([['Index']]);
      this.ds.set([1,1], 10);
      expect(this.ds.selectRow(1)).to.be.an('array')
        .and.to.deep.equal(['1', 10]);
    });

    it('should create a column and row when they don\'t already exist (string)', () => {
      this.ds.data([['Index']]);
      this.ds.set(['A','Row'], 10);
      expect(this.ds.selectRow(1)).to.be.an('array')
        .and.to.deep.equal(['Row', 10]);
    });

    it('should create multiple columns and rows in the proper order (integers)', () => {
      this.ds.data([['Index']]);
      this.ds.set([1,1], 10);
      this.ds.set([2,2], 10);
      this.ds.set([1,3], 10);
      expect(this.ds.selectRow(1)).to.be.an('array')
        .and.to.deep.equal(['1', 10, null]);
      expect(this.ds.selectRow(2)).to.be.an('array')
        .and.to.deep.equal(['2', null, 10]);
      expect(this.ds.selectRow(3)).to.be.an('array')
        .and.to.deep.equal(['3', 10, null]);
      expect(this.ds.selectColumn(2)).to.be.an('array')
        .and.to.deep.equal(['2', null, 10, null]);
    });

    it('should create multiple columns and rows in the proper order (strings)', () => {
      this.ds.data([['Index']]);
      this.ds.set(['A','Row 1'], 10);
      this.ds.set(['B','Row 2'], 10);
      this.ds.set(['A','Row 3'], 10);
      expect(this.ds.selectRow(1)).to.be.an('array')
        .and.to.deep.equal(['Row 1', 10, null]);
      expect(this.ds.selectRow(2)).to.be.an('array')
        .and.to.deep.equal(['Row 2', null, 10]);
      expect(this.ds.selectRow(3)).to.be.an('array')
        .and.to.deep.equal(['Row 3', 10, null]);
      expect(this.ds.selectColumn(2)).to.be.an('array')
        .and.to.deep.equal(['B', null, 10, null]);
    });

  });

  describe('Access Rows', () => {

    describe('.selectRow()', function() {
      it('should return a given row', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(table[1]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        var table = [['Index', 'A', 'B'],['1 a', 342, 664],['1 b', 353, 322]];
        this.ds.data(table);
        expect(this.ds.selectRow('1 a')).to.be.an('array')
          .and.to.deep.equal(table[1]);
      });
    });

    describe('.appendRow()', function() {
      it('should append a row of nulls when passed nothing', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendRow(2);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal([2, null, null]);
      });
      it('should append a given row when passing an array', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendRow(2, [344, 554]);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal([2, 344, 554]);
      });
      it('should append a given row when passing a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 10, 20],[1, 5, 5]];
        this.ds.data(table);
        this.ds.appendRow(2, this.ds.getColumnSum);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal([2, 15, 25]);
      });
      it('should append a given row when passing a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendRow(0, function(c, i){
          return 0;
        });
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal([0, 0, 0]);
      });
      it('should append an empty row when nothing returned from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendRow(2, () => {});
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal([2, null, null]);
      });
      it('should extend other rows when passed array is longer than existing rows', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.appendRow('new', [ 333, 222, 111 ]);
        expect(this.ds.selectRow('new')).to.be.an('array')
          .and.to.deep.equal(['new', 333, 222, 111]);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['3', null, null, 111]);
      });
    });

    describe('.insertRow()', function() {
      it('should insert a row of nulls at a given index when passed nothing', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertRow(1);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([null, null, null]);
      });
      it('should insert a given row at a given index', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertRow(1, 2, [344, 554]);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([2, 344, 554]);
      });
      it('should insert a given row when passing a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 10, 20],[1, 5, 5]];
        this.ds.data(table);
        this.ds.insertRow(1, 'Total', this.ds.getColumnSum);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 15, 25]);
      });
      it('should insert a given row when passing a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertRow(1, 'Total', function(c, i){
          return 0;
        });
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 0, 0]);
      });
      it('should insert an empty row when nothing is returned from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertRow(1, 'Total', () => {});
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(['Total', null, null]);
      });
      it('should extend other rows when the passed array is longer than other rows', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.insertRow(1, 'Total', [123, 321, 323, null]);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 123, 321, 323, null]);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['3', 323, null, null]);
        expect(this.ds.selectColumn(4)).to.be.an('array')
          .and.to.deep.equal(['4', null, null, null]);
      });
    });

    describe('.updateRow()', function() {
      it('should replace a given row by passing a new one', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateRow(1, [10, 10]);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([0, 10, 10]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        var table = [['Index', 'A', 'B'],['2 a', 342, 664],['1 b', 353, 322]];
        this.ds.data(table);
        this.ds.updateRow('2 a', [1, 2]);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal(['2 a', 1, 2]);
      });
      it('should rewrite a given row with a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateRow(1, function(value, index, col){
          return this.getColumnSum(col);
        });
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([1, 695, 986]);
      });
      it('should keep the previous cell value if nothing is returne from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateRow(1, () => {});
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([0, 342, 664]);
      });
      it('should rewrite a given row with a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateRow(1, function(value, index, col){
          return this.getColumnSum(col);
        });
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([1, 695, 986]);
      });
      it('should extend other rows when passed array is longer than existing rows', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.updateRow(1, [10, 10, null, null]);
        expect(this.ds.selectRow(1)).to.be.an('array')
          .and.to.deep.equal([0, 10,10,null,null]);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['3', null, null]);
      });
    });

    describe('.deleteRow()', function() {
      it('should delete a given row', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.deleteRow(1);
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(2);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        var table = [['Index', 'A', 'B'],['1 a', 342, 664],['2 b', 353, 322]];
        this.ds.data(table);
        this.ds.deleteRow('1 a');
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(2);
      });
    });

    describe('.filterRows()', function() {
      it('should delete rows not surviving the filter', () => {
        var table = [['Index', 'A', 'B'],[0, 5, 5],[1, 10, 10]];
        this.ds.data(table);
        this.ds.filterRows(function(row, i){
          var total = 0;
          for (var i=0; i < row.length; i++){
            if (i > 0 && !isNaN(parseInt(row[i]))) {
              total += parseInt(row[i]);
            }
          }
          return total < 11;
        });
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(2);
        expect(this.ds.data()[1][1]).to.be.a('number')
          .and.to.eql(5);
      });
    });

    describe('.sortRows()', () => {
      beforeEach(() => {
        this.ds.data([
          ['Index', 'A', 'B', 'C'],
          [0, 1, 5, 10],
          [1, 2, 10, 20],
          [2, 4, 20, 40]
        ]);
      });
      it('should sort rows properly, without calling a comparator', () => {
        expect(this.ds.sortRows('asc').data()[1][0]).to.eql(0);
        expect(this.ds.sortRows('desc').data()[1][0]).to.eql(2);
      });
      it('should sort rows properly, when calling a general comparator (sum)', () => {
        expect(this.ds
          .sortRows('asc', this.ds.sum, 1)
          .data()[1][0])
        .to.eql(0);
        expect(this.ds
          .sortRows('desc', this.ds.sum, 1)
          .data()[1][0])
        .to.eql(2);
      });
      it('should sort rows ascending, when calling a specific comparator (getRowSum)', () => {
        expect(this.ds
          .sortRows('asc', this.ds.getRowSum)
          .data()[1][0])
        .to.eql(0);
        expect(this.ds
          .sortRows('desc', this.ds.getRowSum)
          .data()[1][0])
        .to.eql(2);
      });
      it('should sort rows ascending, when calling a custom comparator', () => {
        var demo = function(row){
          return this.getRowSum(row);
        };
        expect(this.ds
          .sortRows('asc', demo)
          .data()[1][0])
        .to.eql(0);
        expect(this.ds
          .sortRows('desc', demo)
          .data()[1][0])
        .to.eql(2);
      });
    });

  });

  describe('Access Columns', () => {

    describe('.selectColumn()', function() {
      it('should return an array representing a given column', () => {
        this.ds.data([['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 342, 353]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        this.ds.data([['Index', '1A', '2B'],[0, 342, 664],[1, 353, 322]]);
        expect(this.ds.selectColumn('1A')).to.be.an('array')
          .and.to.deep.equal(['1A', 342, 353]);
      });
    });

    describe('.appendColumn()', function() {
      it('should append a given column of nulls when passed nothing', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendColumn('C');
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', null, null]);
      });
      it('should append a given column when passing an array', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendColumn('C', [0, 0]);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', 0, 0]);
      });
      it('should append a given column when passing a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 1, 1],[1, 2, 2]];
        this.ds.data(table);
        this.ds.appendColumn('C', this.ds.getRowSum);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', 2, 4]);
      });
      it('should append a given column when passing a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendColumn('C', function(row, i){
          return 0;
        });
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', 0, 0]);
      });
      it('should append a column of empty values nothing is returned from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.appendColumn('C', () => {});
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', null, null]);
      });
      it('should extend other columns when passed array is longer than existing columns', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.appendColumn('C', [123, 456, 789, 321]);
        expect(this.ds.selectColumn(3)).to.be.an('array')
          .and.to.deep.equal(['C', 123, 456, 789, 321]);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal(['3', null, null, 789]);
        expect(this.ds.selectRow(4)).to.be.an('array')
          .and.to.deep.equal(['4', null, null, 321]);
      });
    });

    describe('.insertColumn()', function() {
      it('should insert a column of nulls when passing nothing', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertColumn(1);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal([null, null, null]);
      });
      it('should insert a given column at a given index', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertColumn(1, '_', [0, 0]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['_', 0, 0]);
      });
      it('should insert a given column at a given index when passing a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertColumn(1, 'Total', this.ds.getRowSum);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 1006, 675]);
      });
      it('should insert a given column at a given index when passing a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertColumn(1, 'Total', function(r){
          return 0;
        });
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 0, 0]);
      });
      it('should insert an empty column when nothing is returned from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.insertColumn(1, 'Total', () => {});
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['Total', null, null]);
      });

      it('should extend other columns when passed array is longer than existing columns', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.insertColumn(1, 'Total', [10, 10, 10, null]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['Total', 10, 10, 10, null]);
        expect(this.ds.selectRow(2)).to.be.an('array')
          .and.to.deep.equal([1, 10, 353, 322]);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal(['3', 10, null, null]);
        expect(this.ds.selectRow(4)).to.be.an('array')
          .and.to.deep.equal(['4', null, null, null]);
      });

    });

    describe('.updateColumn()', function() {
      it('should replace a given column by passing a new one', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateColumn(1, [0, 0]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 0, 0]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        var table = [['Index', '3 A', '12 B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateColumn('3 A', [0, 0]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['3 A', 0, 0]);
      });
      it('should rewrite each cell of given column with a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateColumn(1, function(value, index, row){ return 5; });
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 5, 5]);
      });
      it('should keep the previous cell value when nothing returned from a custom function', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateColumn(1, () => {});
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 342, 353]);
      });
      it('should rewrite each cell of given column with a computational helper', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.updateColumn(1, function(value, index, row){
          return this.getRowSum(row);
        });
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 1006, 675]);
      });
      it('should extend other columns when passed array is longer than existing columns', () => {
        var table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        this.ds.data(table);
        this.ds.updateColumn(1, [10, 10, null, null]);
        expect(this.ds.selectColumn(1)).to.be.an('array')
          .and.to.deep.equal(['A', 10, 10, null, null]);
        expect(this.ds.selectColumn(2)).to.be.an('array')
          .and.to.deep.equal(['B', 664, 322, null, null]);
        expect(this.ds.selectRow(3)).to.be.an('array')
          .and.to.deep.equal(['3', null, null]);
      });
    });

    describe('.deleteColumn()', function() {
      it('should delete a given column', () => {
        var table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        this.ds.data(table);
        this.ds.deleteColumn(1);
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(3);
        expect(this.ds.data()[0]).to.be.an('array')
          .and.to.have.length(2);
        expect(this.ds.data()[0][1]).to.be.a('string')
          .and.to.eql('B');
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        var table = [['Index', '1A', '2B'],['b', 342, 664],['b', 353, 322]];
        this.ds.data(table);
        this.ds.deleteColumn('1A');
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(3);
        expect(this.ds.data()[0]).to.be.an('array')
          .and.to.have.length(2);
        expect(this.ds.data()[0][1]).to.be.a('string')
          .and.to.eql('2B');
      });
    });

    describe('.filterColumns()', function() {
      it('should delete columns not surviving the filter', () => {
        var table = [['Index', 'A', 'B'],[0, 5, 10],[1, 10, 10]];
        this.ds.data(table);
        this.ds.filterColumns(function(col, index){
          if (index < 1) return true;
          var total = 0;
          for (var i=0; i < col.length; i++){
            if (i > 0 && !isNaN(parseInt(col[i]))) {
              total += parseInt(col[i]);
            }
          }
          return total > 15;
        });
        expect(this.ds.data()).to.be.an('array')
          .and.to.have.length(3);
        expect(this.ds.data()[0]).to.be.an('array')
          .and.to.have.length(2);
        expect(this.ds.data()[0][1]).to.be.a('string')
          .and.to.eql('B');
      });
    });

    describe('.sortColumns()', () => {
      beforeEach(() => {
        this.ds.data([
          ['Index', 'A', 'B', 'C'],
          [0, 1, 5, 10],
          [1, 2, 10, 20],
          [2, 4, 20, 40]
        ]);
      });
      it('should sort columns properly, without calling a comparator', () => {
        this.ds.sortColumns('asc');
        expect(this.ds.data()[0][1]).to.eql('A');
        this.ds.sortColumns('desc');
        expect(this.ds.data()[0][1]).to.eql('C');
      });
      it('should sort columns properly, when calling a general comparator (sum)', () => {
        expect(this.ds
          .sortColumns('asc', this.ds.sum, 1)
          .data()[0][1])
        .to.eql('A');
        expect(this.ds
          .sortColumns('desc', this.ds.sum, 1)
          .data()[0][1])
        .to.eql('C');
      });
      it('should sort columns ascending, when calling a specific comparator (getColumnSum)', () => {
        expect(this.ds
          .sortColumns('asc', this.ds.getColumnSum)
          .data()[0][1])
        .to.eql('A');
        expect(this.ds
          .sortColumns('desc', this.ds.getColumnSum)
          .data()[0][1])
        .to.eql('C');
      });
      it('should sort columns ascending, when calling a custom comparator', () => {
        var demo = function(row){
          return this.getColumnSum(row);
        };
        expect(this.ds
          .sortColumns('asc', demo)
          .data()[0][1])
        .to.eql('A');
        expect(this.ds
          .sortColumns('desc', demo)
          .data()[0][1])
        .to.eql('C');
      });
    });

  });

  describe('Helpers', () => {

    describe('#sum', () => {
      it('should return the sum for an unbounded range', () => {
        var sum = this.ds.sum([10,10,10,10,10]);
        expect(sum).to.eql(50);
      });
      it('should return the sum for a partially bounded range', () => {
        var sum = this.ds.sum([10,10,10,10,10], 1);
        expect(sum).to.eql(40);
      });
      it('should return the sum for a fully bounded range', () => {
        var sum = this.ds.sum([10,10,10,10,10], 1, 3);
        expect(sum).to.eql(30);
      });
      describe('#getRowSum', () => {
        it('should return the sum of values in a given row (array), excluding the first value', () => {
          var sum = this.ds.getRowSum([2, 0, 1, 2, 3]);
          expect(sum).to.eql(6);
        });
      });
      describe('#getColumnSum', () => {
        it('should return the sum of values in a given column (array), excluding the first value', () => {
          var sum = this.ds.getColumnSum([2, 0, 1, 2, 3]);
          expect(sum).to.eql(6);
        });
      });
    });

    describe('#average', () => {
      it('should return the average for an unbounded range', () => {
        var avg = this.ds.average([1,2,3,4,5]);
        expect(avg).to.eql(3);
      });
      it('should return the average for a partially bounded range', () => {
        var avg = this.ds.average([1,2,3,4,5], 1);
        expect(avg).to.eql(3.5);
      });
      it('should return the average for a fully bounded range', () => {
        var avg = this.ds.average([1,2,3,4,5], 1, 3);
        expect(avg).to.eql(3);
      });
      describe('#getRowAverage', () => {
        it('should return the average of values in a given row (array), excluding the first value', () => {
          var avg = this.ds.getRowAverage(['Exclude', 0, 1, 2, 3]);
          expect(avg).to.eql(1.5);
        });
      });
      describe('#getColumnAverage', () => {
        it('should return the average of values in a given column (array), excluding the first value', () => {
          var avg = this.ds.getColumnAverage(['Exclude', 0, 1, 2, 3]);
          expect(avg).to.eql(1.5);
        });
      });
    });


    describe('#minimum', () => {
      it('should return the minimum for an unbounded range', () => {
        var min = this.ds.minimum([1,2,3,4,5]);
        expect(min).to.eql(1);
      });
      it('should return the minimum for a partially bounded range', () => {
        var min = this.ds.minimum([1,2,3,4,5], 1);
        expect(min).to.eql(2);
      });
      it('should return the minimum for a fully bounded range', () => {
        var min = this.ds.minimum([1,2,3,4,5], 1, 3);
        expect(min).to.eql(2);
      });
      describe('#getRowMinimum', () => {
        it('should return the minimum of values in a given row (array), excluding the first value', () => {
          var min = this.ds.getRowMinimum(['Exclude', 0, 1, 2, 3]);
          expect(min).to.eql(0);
        });
      });
      describe('#getColumnMinimum', () => {
        it('should return the minimum of values in a given column (array), excluding the first value', () => {
          var min = this.ds.getColumnMinimum(['Exclude', 0, 1, 2, 3]);
          expect(min).to.eql(0);
        });
      });
    });

    describe('#maximum', () => {
      it('should return the maximum for an unbounded range', () => {
        var max = this.ds.maximum([1,2,3,4,5]);
        expect(max).to.eql(5);
      });
      it('should return the maximum for a partially bounded range', () => {
        var max = this.ds.maximum([1,2,3,4,5], 1);
        expect(max).to.eql(5);
      });
      it('should return the maximum for a fully bounded range', () => {
        var max = this.ds.maximum([1,2,3,4,5], 1, 3);
        expect(max).to.eql(4);
      });
      describe('#getRowMaximum', () => {
        it('should return the maximum of values in a given row (array), excluding the first value', () => {
          var max = this.ds.getRowMaximum(['Exclude', 0, 1, 2, 3]);
          expect(max).to.eql(3);
        });
      });
      describe('#getColumnMaximum', () => {
        it('should return the maximum of values in a given column (array), excluding the first value', () => {
          var max = this.ds.getColumnMaximum(['Exclude', 0, 1, 2, 3]);
          expect(max).to.eql(3);
        });
      });
    });



    describe('#getRowIndex', () => {
      it('should return the first value of a given row (array)', () => {
        expect(this.ds.getRowIndex(['Index', 0, 1, 2, 3])).to.eql('Index');
      });
    });

    describe('#getColumnLabel', () => {
      it('should return the first value of a given column (array)', () => {
        expect(this.ds.getColumnLabel(['Series A', 1, 2, 3, 4,])).to.eql('Series A');
      });
    });



  });

  describe('Parse with #set', function() {

    it('metric.json', () => {
      var parser = Dataset.parser('metric');
      var dataset = parser(data_metric);

      expect(dataset.data())
        .to.be.an('array')
        .and.to.be.of.length(2);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('Value');
      expect(dataset.data()[1][0]).to.eql('Result');
      expect(dataset.data()[1][1]).to.eql(2450);
      expect(dataset.type()).to.eql('metric');
    });

    it('interval.json (indexed by timeframe.end)', () => {
      var parser = Dataset.parser('interval', 'timeframe.end');
      var dataset = parser(data_interval);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(13);
      expect(dataset.data()[0]).to.be.of.length(2);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('Result');

      // timeframe.end
      expect(dataset.data()[1][0])
        .to.eql('2015-01-01T00:00:00.000Z');
      expect(dataset.type()).to.eql('interval');
    });

    it('groupby.json', () => {
      var dataset = Dataset.parser('grouped-metric')(data_groupBy);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(56);
      expect(dataset.data()[0]).to.be.of.length(2);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('Result');
      expect(dataset.type()).to.eql('grouped-metric');
    });

    it('groupBy-boolean.json', () => {
      var dataset = Dataset.parser('grouped-metric')(data_groupBy_boolean);
      dataset.sortRows('desc', dataset.sum, 1);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(4);
      expect(dataset.data()[1][0]).to.eql('true');
      expect(dataset.data()[2][0]).to.eql('false');
      expect(dataset.type()).to.eql('grouped-metric');
    });

    it('interval-groupBy-empties.json', () => {
      var dataset = Dataset.parser('grouped-interval')(data_interval_groupBy_empties);
      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(7);
      expect(dataset.type()).to.eql('grouped-interval');
    });

    it('interval-groupBy-boolean.json (indexed by timeframe.end)', () => {
      var parser = Dataset.parser('grouped-interval', 'timeframe.end');
      var dataset = parser(data_interval_groupBy_boolean);
      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(7);
      expect(dataset.data()[1][0])
        .to.eql('2013-11-01T07:00:00.000Z');
      expect(dataset.type()).to.eql('grouped-interval');
    });

    it('interval-groupBy-nulls.json', () => {
      var dataset = Dataset.parser('grouped-interval')(data_interval_groupBy_nulls);

      dataset.sortColumns('desc', dataset.sum, 1);
      dataset.sortRows('asc');

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(7);
      expect(dataset.data()[0]).to.be.of.length(3);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('null');
      expect(dataset.data()[0][2]).to.eql('Windows Vista');
      expect(dataset.type()).to.eql('grouped-interval');
    });

    it('extraction.json 1', () => {
      var dataset = Dataset.parser('extraction')(data_extraction);

      expect(dataset.data())
        .to.be.an('array')
        .and.to.be.of.length(data_extraction.result.length+1);
      expect(dataset.data()[0]).to.be.of.length(7);
      expect(dataset.data()[0][0]).to.eql('keen.timestamp');
      expect(dataset.data()[0][1]).to.eql('keen.created_at');
      expect(dataset.data()[0][2]).to.eql('keen.id');
      expect(dataset.type()).to.eql('extraction');
    });

    it('extraction-uneven.json', () => {
      var dataset = Dataset.parser('extraction')(data_extraction_uneven);

      expect(dataset.data())
        .to.be.an('array')
        .and.to.be.of.length(data_extraction_uneven.result.length+1);
      expect(dataset.type()).to.eql('extraction');
    });

    it('funnel.json', () => {
      var dataset = Dataset.parser('funnel')(data_funnel);

      expect(dataset.data())
        .to.be.an('array')
        .and.to.be.of.length(7);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('Step Value');
      expect(dataset.data()[1][0]).to.be.eql('pageview');
      expect(dataset.data()[1][1]).to.be.eql(42);
      expect(dataset.type()).to.eql('funnel');
    });

    it('saved-funnel.json', () => {
      var dataset = Dataset.parser('funnel')(data_saved_funnel);

      expect(dataset.data())
        .to.be.an('array')
        .and.to.be.of.length(7);
      expect(dataset.data()[0][0]).to.eql('Index');
      expect(dataset.data()[0][1]).to.eql('Step Value');
      expect(dataset.data()[1][0]).to.be.eql('pageview');
      expect(dataset.data()[1][1]).to.be.eql(42);
      expect(dataset.type()).to.eql('funnel');
    });

    it('double-groupBy.json', () => {
      var parser = Dataset.parser('double-grouped-metric', [
        'session.geo_information.city',
        'session.geo_information.province' ]);
      var dataset = parser(data_double_groupBy);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(194);
      expect(dataset.data()[0])
        .to.be.of.length(2);
      expect(dataset.type()).to.eql('double-grouped-metric');
    });

    it('interval-double-groupBy.json (indexed by timeframe.end)', () => {
      var parser = Dataset.parser('double-grouped-interval', [
        'first.property',
        'second.property' ], 'timeframe.end');
      var dataset = parser(data_interval_double_groupBy);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(4);
      expect(dataset.data()[0]).to.be.an('array')
        .and.to.be.of.length(5);
      expect(dataset.selectColumn(0)[1]).to.be.a('string')
        .and.to.eql('2014-04-23T07:00:00.000Z');
      expect(dataset.type()).to.eql('double-grouped-interval');
    });

    it('select-unique.json', () => {
      var dataset = Dataset.parser('list')(data_uniques);

      expect(dataset.data()).to.be.an('array')
        .and.to.be.of.length(60);
      expect(dataset.type()).to.eql('list');
    });

  });

});
