import { Dataset } from '../../../lib/browser';
import each from '../../../lib/utils/each';

import data_metric from './sample-data/metric';
import data_groupBy from './sample-data/groupBy';
import data_double_groupBy from './sample-data/double-groupBy';
import data_groupBy_boolean  from './sample-data/groupBy-boolean';

import data_interval from './sample-data/interval';
import data_interval_groupBy_empties from './sample-data/interval-groupBy-empties';
import data_interval_groupBy_all_empty from './sample-data/interval-groupBy-all-empty';
import data_interval_double_groupBy from './sample-data/interval-double-groupBy';
import data_interval_groupBy_boolean from './sample-data/interval-groupBy-boolean';
import data_interval_groupBy_nulls from './sample-data/interval-groupBy-nulls';

import data_funnel from './sample-data/funnel';
import data_saved_funnel from './sample-data/saved-funnel';
import data_uniques from './sample-data/select-unique';
import data_extraction from './sample-data/extraction';
import data_extraction_uneven from './sample-data/extraction-uneven';

describe('Dataset', () => {
  let ds;

  beforeEach(() => {
    ds = new Dataset();
  });
  afterEach(() => {
    ds = null;
  });

  describe('constructor', () => {
    it('should return a new Dataset instance', () => {
      expect(ds).toBeInstanceOf(Dataset);
    });

    it('should have a matrix property', () => {
      expect(ds.matrix).toEqual([['Index']]);
    });
  });

  describe('.data()', () => {
    it('should output the correct values', () => {
      expect(ds.data()).toBeInstanceOf(Array);
      expect(ds.data()).toHaveLength(1);
    });
    it('should rewrite the internal matrix value', () => {
      ds.data([]);
      expect(ds.data()).toBeInstanceOf(Array);
      expect(ds.data()).toHaveLength(0);
    });
  });

  describe('.set()', () => {

    it('should create a column and row when they don\'t already exist (integer)', () => {
      ds.data([['Index']]);
      ds.set([1,1], 10);
      expect(ds.selectRow(1))
        .toEqual(['1', 10]);
    });

    it('should create a column and row when they don\'t already exist (string)', () => {
      ds.data([['Index']]);
      ds.set(['A','Row'], 10);
      expect(ds.selectRow(1))
        .toEqual(['Row', 10]);
    });

    it('should create multiple columns and rows in the proper order (integers)', () => {
      ds.data([['Index']]);
      ds.set([1,1], 10);
      ds.set([2,2], 10);
      ds.set([1,3], 10);
      expect(ds.selectRow(1))
        .toEqual(['1', 10, null]);
      expect(ds.selectRow(2))
        .toEqual(['2', null, 10]);
      expect(ds.selectRow(3))
        .toEqual(['3', 10, null]);
      expect(ds.selectColumn(2))
        .toEqual(['2', null, 10, null]);
    });

    it('should create multiple columns and rows in the proper order (strings)', () => {
      ds.data([['Index']]);
      ds.set(['A','Row 1'], 10);
      ds.set(['B','Row 2'], 10);
      ds.set(['A','Row 3'], 10);
      expect(ds.selectRow(1))
        .toEqual(['Row 1', 10, null]);
      expect(ds.selectRow(2))
        .toEqual(['Row 2', null, 10]);
      expect(ds.selectRow(3))
        .toEqual(['Row 3', 10, null]);
      expect(ds.selectColumn(2))
        .toEqual(['B', null, 10, null]);
    });

  });

  describe('Access Rows', () => {

    describe('.selectRow()', () => {
      it('should return a given row', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        expect(ds.selectRow(1))
          .toEqual(table[1]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        const table = [['Index', 'A', 'B'],['1 a', 342, 664],['1 b', 353, 322]];
        ds.data(table);
        expect(ds.selectRow('1 a'))
          .toEqual(table[1]);
      });
    });

    describe('.appendRow()', () => {
      it('should append a row of nulls when passed nothing', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendRow(2);
        expect(ds.selectRow(3))
          .toEqual([2, null, null]);
      });
      it('should append a given row when passing an array', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendRow(2, [344, 554]);
        expect(ds.selectRow(3))
          .toEqual([2, 344, 554]);
      });
      it('should append a given row when passing a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 10, 20],[1, 5, 5]];
        ds.data(table);
        ds.appendRow(2, ds.getColumnSum);
        expect(ds.selectRow(3))
          .toEqual([2, 15, 25]);
      });
      it('should append a given row when passing a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendRow(0, (c, i) => {
          return 0;
        });
        expect(ds.selectRow(3))
          .toEqual([0, 0, 0]);
      });
      it('should append an empty row when nothing returned from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendRow(2, () => {});
        expect(ds.selectRow(3))
          .toEqual([2, null, null]);
      });
      it('should extend other rows when passed array is longer than existing rows', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.appendRow('new', [ 333, 222, 111 ]);
        expect(ds.selectRow('new'))
          .toEqual(['new', 333, 222, 111]);
        expect(ds.selectColumn(3))
          .toEqual(['3', null, null, 111]);
      });
    });

    describe('.insertRow()', () => {
      it('should insert a row of nulls at a given index when passed nothing', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertRow(1);
        expect(ds.selectRow(1))
          .toEqual([null, null, null]);
      });
      it('should insert a given row at a given index', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertRow(1, 2, [344, 554]);
        expect(ds.selectRow(1))
          .toEqual([2, 344, 554]);
      });
      it('should insert a given row when passing a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 10, 20],[1, 5, 5]];
        ds.data(table);
        ds.insertRow(1, 'Total', ds.getColumnSum);
        expect(ds.selectRow(1))
          .toEqual(['Total', 15, 25]);
      });
      it('should insert a given row when passing a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertRow(1, 'Total', (c, i) => {
          return 0;
        });
        expect(ds.selectRow(1))
          .toEqual(['Total', 0, 0]);
      });
      it('should insert an empty row when nothing is returned from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertRow(1, 'Total', () => {});
        expect(ds.selectRow(1))
          .toEqual(['Total', null, null]);
      });
      it('should extend other rows when the passed array is longer than other rows', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.insertRow(1, 'Total', [123, 321, 323, null]);
        expect(ds.selectRow(1))
          .toEqual(['Total', 123, 321, 323, null]);
        expect(ds.selectColumn(3))
          .toEqual(['3', 323, null, null]);
        expect(ds.selectColumn(4))
          .toEqual(['4', null, null, null]);
      });
    });

    describe('.updateRow()', () => {
      it('should replace a given row by passing a new one', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateRow(1, [10, 10]);
        expect(ds.selectRow(1))
          .toEqual([0, 10, 10]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        const table = [['Index', 'A', 'B'],['2 a', 342, 664],['1 b', 353, 322]];
        ds.data(table);
        ds.updateRow('2 a', [1, 2]);
        expect(ds.selectRow(1))
          .toEqual(['2 a', 1, 2]);
      });
      it('should rewrite a given row with a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateRow(1, function(value, index, col){
          return this.getColumnSum(col);
        });
        expect(ds.selectRow(1))
          .toEqual([1, 695, 986]);
      });
      it('should keep the previous cell value if nothing is returne from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateRow(1, () => {});
        expect(ds.selectRow(1))
          .toEqual([0, 342, 664]);
      });
      it('should rewrite a given row with a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateRow(1, function(value, index, col){
          return this.getColumnSum(col);
        });
        expect(ds.selectRow(1))
          .toEqual([1, 695, 986]);
      });
      it('should extend other rows when passed array is longer than existing rows', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.updateRow(1, [10, 10, null, null]);
        expect(ds.selectRow(1))
          .toEqual([0, 10,10,null,null]);
        expect(ds.selectColumn(3))
          .toEqual(['3', null, null]);
      });
    });

    describe('.deleteRow()', () => {
      it('should delete a given row', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.deleteRow(1);
        expect(ds.data())
          .toHaveLength(2);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        const table = [['Index', 'A', 'B'],['1 a', 342, 664],['2 b', 353, 322]];
        ds.data(table);
        ds.deleteRow('1 a');
        expect(ds.data())
          .toHaveLength(2);
      });
    });

    describe('.filterRows()', () => {
      it('should delete rows not surviving the filter', () => {
        const table = [['Index', 'A', 'B'],[0, 5, 5],[1, 10, 10]];
        ds.data(table);
        ds.filterRows(function(row, i){
          let total = 0;
          for (let i=0; i < row.length; i++){
            if (i > 0 && !isNaN(parseInt(row[i]))) {
              total += parseInt(row[i]);
            }
          }
          return total < 11;
        });
        expect(ds.data())
          .toHaveLength(2);
        expect(ds.data()[1][1])
          .toEqual(5);
      });
    });

    describe('.sortRows()', () => {
      beforeEach(() => {
        ds.data([
          ['Index', 'A', 'B', 'C'],
          [0, 1, 5, 10],
          [1, 2, 10, 20],
          [2, 4, 20, 40]
        ]);
      });
      it('should sort rows properly, without calling a comparator', () => {
        expect(ds.sortRows('asc').data()[1][0]).toEqual(0);
        expect(ds.sortRows('desc').data()[1][0]).toEqual(2);
      });
      it('should sort rows properly, when calling a general comparator (sum)', () => {
        expect(ds
          .sortRows('asc', ds.sum, 1)
          .data()[1][0])
        .toEqual(0);
        expect(ds
          .sortRows('desc', ds.sum, 1)
          .data()[1][0])
        .toEqual(2);
      });
      it('should sort rows ascending, when calling a specific comparator (getRowSum)', () => {
        expect(ds
          .sortRows('asc', ds.getRowSum)
          .data()[1][0])
        .toEqual(0);
        expect(ds
          .sortRows('desc', ds.getRowSum)
          .data()[1][0])
        .toEqual(2);
      });
      it('should sort rows ascending, when calling a custom comparator', () => {
        const demo = function(row){
          return this.getRowSum(row);
        };
        expect(ds
          .sortRows('asc', demo)
          .data()[1][0])
        .toEqual(0);
        expect(ds
          .sortRows('desc', demo)
          .data()[1][0])
        .toEqual(2);
      });
    });

  });

  describe('Access Columns', () => {

    describe('.selectColumn()', () => {
      it('should return an array representing a given column', () => {
        ds.data([['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]]);
        expect(ds.selectColumn(1))
          .toEqual(['A', 342, 353]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        ds.data([['Index', '1A', '2B'],[0, 342, 664],[1, 353, 322]]);
        expect(ds.selectColumn('1A'))
          .toEqual(['1A', 342, 353]);
      });
    });

    describe('.appendColumn()', () => {
      it('should append a given column of nulls when passed nothing', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendColumn('C');
        expect(ds.selectColumn(3))
          .toEqual(['C', null, null]);
      });
      it('should append a given column when passing an array', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendColumn('C', [0, 0]);
        expect(ds.selectColumn(3))
          .toEqual(['C', 0, 0]);
      });
      it('should append a given column when passing a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 1, 1],[1, 2, 2]];
        ds.data(table);
        ds.appendColumn('C', ds.getRowSum);
        expect(ds.selectColumn(3))
          .toEqual(['C', 2, 4]);
      });
      it('should append a given column when passing a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendColumn('C', function(row, i){
          return 0;
        });
        expect(ds.selectColumn(3))
          .toEqual(['C', 0, 0]);
      });
      it('should append a column of empty values nothing is returned from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.appendColumn('C', () => {});
        expect(ds.selectColumn(3))
          .toEqual(['C', null, null]);
      });
      it('should extend other columns when passed array is longer than existing columns', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.appendColumn('C', [123, 456, 789, 321]);
        expect(ds.selectColumn(3))
          .toEqual(['C', 123, 456, 789, 321]);
        expect(ds.selectRow(3))
          .toEqual(['3', null, null, 789]);
        expect(ds.selectRow(4))
          .toEqual(['4', null, null, 321]);
      });
    });

    describe('.insertColumn()', () => {
      it('should insert a column of nulls when passing nothing', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertColumn(1);
        expect(ds.selectColumn(1))
          .toEqual([null, null, null]);
      });
      it('should insert a given column at a given index', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertColumn(1, '_', [0, 0]);
        expect(ds.selectColumn(1))
          .toEqual(['_', 0, 0]);
      });
      it('should insert a given column at a given index when passing a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertColumn(1, 'Total', ds.getRowSum);
        expect(ds.selectColumn(1))
          .toEqual(['Total', 1006, 675]);
      });
      it('should insert a given column at a given index when passing a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertColumn(1, 'Total', function(r){
          return 0;
        });
        expect(ds.selectColumn(1))
          .toEqual(['Total', 0, 0]);
      });
      it('should insert an empty column when nothing is returned from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.insertColumn(1, 'Total', () => {});
        expect(ds.selectColumn(1))
          .toEqual(['Total', null, null]);
      });

      it('should extend other columns when passed array is longer than existing columns', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.insertColumn(1, 'Total', [10, 10, 10, null]);
        expect(ds.selectColumn(1))
          .toEqual(['Total', 10, 10, 10, null]);
        expect(ds.selectRow(2))
          .toEqual([1, 10, 353, 322]);
        expect(ds.selectRow(3))
          .toEqual(['3', 10, null, null]);
        expect(ds.selectRow(4))
          .toEqual(['4', null, null, null]);
      });

    });

    describe('.updateColumn()', () => {
      it('should replace a given column by passing a new one', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateColumn(1, [0, 0]);
        expect(ds.selectColumn(1))
          .toEqual(['A', 0, 0]);
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        const table = [['Index', '3 A', '12 B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateColumn('3 A', [0, 0]);
        expect(ds.selectColumn(1))
          .toEqual(['3 A', 0, 0]);
      });
      it('should rewrite each cell of given column with a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateColumn(1, function(value, index, row){ return 5; });
        expect(ds.selectColumn(1))
          .toEqual(['A', 5, 5]);
      });
      it('should keep the previous cell value when nothing returned from a custom function', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateColumn(1, () => {});
        expect(ds.selectColumn(1))
          .toEqual(['A', 342, 353]);
      });
      it('should rewrite each cell of given column with a computational helper', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.updateColumn(1, function(value, index, row){
          return this.getRowSum(row);
        });
        expect(ds.selectColumn(1))
          .toEqual(['A', 1006, 675]);
      });
      it('should extend other columns when passed array is longer than existing columns', () => {
        const table = [
          ['Index', 'A', 'B'],
          [0, 342, 664],
          [1, 353, 322]
        ];
        ds.data(table);
        ds.updateColumn(1, [10, 10, null, null]);
        expect(ds.selectColumn(1))
          .toEqual(['A', 10, 10, null, null]);
        expect(ds.selectColumn(2))
          .toEqual(['B', 664, 322, null, null]);
        expect(ds.selectRow(3))
          .toEqual(['3', null, null]);
      });
    });

    describe('.deleteColumn()', () => {
      it('should delete a given column', () => {
        const table = [['Index', 'A', 'B'],[0, 342, 664],[1, 353, 322]];
        ds.data(table);
        ds.deleteColumn(1);
        expect(ds.data())
          .toHaveLength(3);
        expect(ds.data()[0])
          .toHaveLength(2);
        expect(ds.data()[0][1])
          .toEqual('B');
      });
      it('should accept a string query argument, even if string starts with a number (indexOf match)', () => {
        const table = [['Index', '1A', '2B'],['b', 342, 664],['b', 353, 322]];
        ds.data(table);
        ds.deleteColumn('1A');
        expect(ds.data())
          .toHaveLength(3);
        expect(ds.data()[0])
          .toHaveLength(2);
        expect(ds.data()[0][1])
          .toEqual('2B');
      });
    });

    describe('.filterColumns()', () => {
      it('should delete columns not surviving the filter', () => {
        const table = [['Index', 'A', 'B'],[0, 5, 10],[1, 10, 10]];
        ds.data(table);
        ds.filterColumns(function(col, index){
          if (index < 1) return true;
          let total = 0;
          for (let i=0; i < col.length; i++){
            if (i > 0 && !isNaN(parseInt(col[i]))) {
              total += parseInt(col[i]);
            }
          }
          return total > 15;
        });
        expect(ds.data())
          .toHaveLength(3);
        expect(ds.data()[0])
          .toHaveLength(2);
        expect(ds.data()[0][1])
          .toEqual('B');
      });
    });

    describe('.sortColumns()', () => {
      beforeEach(() => {
        ds.data([
          ['Index', 'A', 'B', 'C'],
          [0, 1, 5, 10],
          [1, 2, 10, 20],
          [2, 4, 20, 40]
        ]);
      });
      it('should sort columns properly, without calling a comparator', () => {
        ds.sortColumns('asc');
        expect(ds.data()[0][1]).toEqual('A');
        ds.sortColumns('desc');
        expect(ds.data()[0][1]).toEqual('C');
      });
      it('should sort columns properly, when calling a general comparator (sum)', () => {
        expect(ds
          .sortColumns('asc', ds.sum, 1)
          .data()[0][1])
        .toEqual('A');
        expect(ds
          .sortColumns('desc', ds.sum, 1)
          .data()[0][1])
        .toEqual('C');
      });
      it('should sort columns ascending, when calling a specific comparator (getColumnSum)', () => {
        expect(ds
          .sortColumns('asc', ds.getColumnSum)
          .data()[0][1])
        .toEqual('A');
        expect(ds
          .sortColumns('desc', ds.getColumnSum)
          .data()[0][1])
        .toEqual('C');
      });
      it('should sort columns ascending, when calling a custom comparator', () => {
        const demo = function(row){
          return this.getColumnSum(row);
        };
        expect(ds
          .sortColumns('asc', demo)
          .data()[0][1])
        .toEqual('A');
        expect(ds
          .sortColumns('desc', demo)
          .data()[0][1])
        .toEqual('C');
      });
    });

  });

  describe('Helpers', () => {

    describe('#sum', () => {
      it('should return the sum for an unbounded range', () => {
        const sum = ds.sum([10,10,10,10,10]);
        expect(sum).toEqual(50);
      });
      it('should return the sum for a partially bounded range', () => {
        const sum = ds.sum([10,10,10,10,10], 1);
        expect(sum).toEqual(40);
      });
      it('should return the sum for a fully bounded range', () => {
        const sum = ds.sum([10,10,10,10,10], 1, 3);
        expect(sum).toEqual(30);
      });
      describe('#getRowSum', () => {
        it('should return the sum of values in a given row (array), excluding the first value', () => {
          const sum = ds.getRowSum([2, 0, 1, 2, 3]);
          expect(sum).toEqual(6);
        });
      });
      describe('#getColumnSum', () => {
        it('should return the sum of values in a given column (array), excluding the first value', () => {
          const sum = ds.getColumnSum([2, 0, 1, 2, 3]);
          expect(sum).toEqual(6);
        });
      });
    });

    describe('#average', () => {
      it('should return the average for an unbounded range', () => {
        const avg = ds.average([1,2,3,4,5]);
        expect(avg).toEqual(3);
      });
      it('should return the average for a partially bounded range', () => {
        const avg = ds.average([1,2,3,4,5], 1);
        expect(avg).toEqual(3.5);
      });
      it('should return the average for a fully bounded range', () => {
        const avg = ds.average([1,2,3,4,5], 1, 3);
        expect(avg).toEqual(3);
      });
      describe('#getRowAverage', () => {
        it('should return the average of values in a given row (array), excluding the first value', () => {
          const avg = ds.getRowAverage(['Exclude', 0, 1, 2, 3]);
          expect(avg).toEqual(1.5);
        });
      });
      describe('#getColumnAverage', () => {
        it('should return the average of values in a given column (array), excluding the first value', () => {
          const avg = ds.getColumnAverage(['Exclude', 0, 1, 2, 3]);
          expect(avg).toEqual(1.5);
        });
      });
    });


    describe('#minimum', () => {
      it('should return the minimum for an unbounded range', () => {
        const min = ds.minimum([1,2,3,4,5]);
        expect(min).toEqual(1);
      });
      it('should return the minimum for a partially bounded range', () => {
        const min = ds.minimum([1,2,3,4,5], 1);
        expect(min).toEqual(2);
      });
      it('should return the minimum for a fully bounded range', () => {
        const min = ds.minimum([1,2,3,4,5], 1, 3);
        expect(min).toEqual(2);
      });
      describe('#getRowMinimum', () => {
        it('should return the minimum of values in a given row (array), excluding the first value', () => {
          const min = ds.getRowMinimum(['Exclude', 0, 1, 2, 3]);
          expect(min).toEqual(0);
        });
      });
      describe('#getColumnMinimum', () => {
        it('should return the minimum of values in a given column (array), excluding the first value', () => {
          const min = ds.getColumnMinimum(['Exclude', 0, 1, 2, 3]);
          expect(min).toEqual(0);
        });
      });
    });

    describe('#maximum', () => {
      it('should return the maximum for an unbounded range', () => {
        const max = ds.maximum([1,2,3,4,5]);
        expect(max).toEqual(5);
      });
      it('should return the maximum for a partially bounded range', () => {
        const max = ds.maximum([1,2,3,4,5], 1);
        expect(max).toEqual(5);
      });
      it('should return the maximum for a fully bounded range', () => {
        const max = ds.maximum([1,2,3,4,5], 1, 3);
        expect(max).toEqual(4);
      });
      describe('#getRowMaximum', () => {
        it('should return the maximum of values in a given row (array), excluding the first value', () => {
          const max = ds.getRowMaximum(['Exclude', 0, 1, 2, 3]);
          expect(max).toEqual(3);
        });
      });
      describe('#getColumnMaximum', () => {
        it('should return the maximum of values in a given column (array), excluding the first value', () => {
          const max = ds.getColumnMaximum(['Exclude', 0, 1, 2, 3]);
          expect(max).toEqual(3);
        });
      });
    });



    describe('#getRowIndex', () => {
      it('should return the first value of a given row (array)', () => {
        expect(ds.getRowIndex(['Index', 0, 1, 2, 3])).toEqual('Index');
      });
    });

    describe('#getColumnLabel', () => {
      it('should return the first value of a given column (array)', () => {
        expect(ds.getColumnLabel(['Series A', 1, 2, 3, 4,])).toEqual('Series A');
      });
    });



  });

  describe('Parse with #set', () => {

    it('metric.json', () => {
      const parser = Dataset.parser('metric');
      const dataset = parser(data_metric);

      expect(dataset.data())

        .toHaveLength(2);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('Value');
      expect(dataset.data()[1][0]).toEqual('Result');
      expect(dataset.data()[1][1]).toEqual(2450);
      expect(dataset.type()).toEqual('metric');
    });

    it('interval.json (indexed by timeframe.end)', () => {
      const parser = Dataset.parser('interval', 'timeframe.end');
      const dataset = parser(data_interval);

      expect(dataset.data())
        .toHaveLength(13);
      expect(dataset.data()[0]).toHaveLength(2);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('Result');

      // timeframe.end
      expect(dataset.data()[1][0])
        .toEqual('2015-01-01T00:00:00.000Z');
      expect(dataset.type()).toEqual('interval');
    });

    it('groupby.json', () => {
      const dataset = Dataset.parser('grouped-metric')(data_groupBy);

      expect(dataset.data())
        .toHaveLength(56);
      expect(dataset.data()[0]).toHaveLength(2);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('Result');
      expect(dataset.type()).toEqual('grouped-metric');
    });

    it('groupBy-boolean.json', () => {
      const dataset = Dataset.parser('grouped-metric')(data_groupBy_boolean);
      dataset.sortRows('desc', dataset.sum, 1);

      expect(dataset.data())
        .toHaveLength(4);
      expect(dataset.data()[1][0]).toEqual('true');
      expect(dataset.data()[2][0]).toEqual('false');
      expect(dataset.type()).toEqual('grouped-metric');
    });

    it('interval-groupBy-empties.json', () => {
      const dataset = Dataset.parser('grouped-interval')(data_interval_groupBy_empties);
      expect(dataset.data())
        .toHaveLength(7);
      expect(dataset.type()).toEqual('grouped-interval');
    });

    it('interval-groupBy-boolean.json (indexed by timeframe.end)', () => {
      const parser = Dataset.parser('grouped-interval', 'timeframe.end');
      const dataset = parser(data_interval_groupBy_boolean);
      expect(dataset.data())
        .toHaveLength(7);
      expect(dataset.data()[1][0])
        .toEqual('2013-11-01T07:00:00.000Z');
      expect(dataset.type()).toEqual('grouped-interval');
    });

    it('interval-groupBy-nulls.json', () => {
      const dataset = Dataset.parser('grouped-interval')(data_interval_groupBy_nulls);

      dataset.sortColumns('desc', dataset.sum, 1);
      dataset.sortRows('asc');

      expect(dataset.data())
        .toHaveLength(7);
      expect(dataset.data()[0]).toHaveLength(3);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('null');
      expect(dataset.data()[0][2]).toEqual('Windows Vista');
      expect(dataset.type()).toEqual('grouped-interval');
    });

    it('extraction.json 1', () => {
      const dataset = Dataset.parser('extraction')(data_extraction);

      expect(dataset.data())
        .toHaveLength(data_extraction.result.length+1);
      expect(dataset.data()[0]).toHaveLength(7);
      expect(dataset.data()[0][0]).toEqual('keen.timestamp');
      expect(dataset.data()[0][1]).toEqual('keen.created_at');
      expect(dataset.data()[0][2]).toEqual('keen.id');
      expect(dataset.type()).toEqual('extraction');
    });

    it('extraction-uneven.json', () => {
      const dataset = Dataset.parser('extraction')(data_extraction_uneven);

      expect(dataset.data())
        .toHaveLength(data_extraction_uneven.result.length+1);
      expect(dataset.type()).toEqual('extraction');
    });

    it('funnel.json', () => {
      const dataset = Dataset.parser('funnel')(data_funnel);

      expect(dataset.data())
        .toHaveLength(7);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('Step Value');
      expect(dataset.data()[1][0]).toEqual('pageview');
      expect(dataset.data()[1][1]).toEqual(42);
      expect(dataset.type()).toEqual('funnel');
    });

    it('saved-funnel.json', () => {
      const dataset = Dataset.parser('funnel')(data_saved_funnel);

      expect(dataset.data())
        .toHaveLength(7);
      expect(dataset.data()[0][0]).toEqual('Index');
      expect(dataset.data()[0][1]).toEqual('Step Value');
      expect(dataset.data()[1][0]).toEqual('pageview');
      expect(dataset.data()[1][1]).toEqual(42);
      expect(dataset.type()).toEqual('funnel');
    });

    it('double-groupBy.json', () => {
      const parser = Dataset.parser('double-grouped-metric', [
        'session.geo_information.city',
        'session.geo_information.province' ]);
      const dataset = parser(data_double_groupBy);

      expect(dataset.data())
        .toHaveLength(194);
      expect(dataset.data()[0])
        .toHaveLength(2);
      expect(dataset.type()).toEqual('double-grouped-metric');
    });

    it('interval-double-groupBy.json (indexed by timeframe.end)', () => {
      const parser = Dataset.parser('double-grouped-interval', [
        'first.property',
        'second.property' ], 'timeframe.end');
      const dataset = parser(data_interval_double_groupBy);

      expect(dataset.data())
        .toHaveLength(4);
      expect(dataset.data()[0])
        .toHaveLength(5);
      expect(dataset.selectColumn(0)[1])
        .toEqual('2014-04-23T07:00:00.000Z');
      expect(dataset.type()).toEqual('double-grouped-interval');
    });

    it('select-unique.json', () => {
      const dataset = Dataset.parser('list')(data_uniques);

      expect(dataset.data())
        .toHaveLength(60);
      expect(dataset.type()).toEqual('list');
    });

  });

});
