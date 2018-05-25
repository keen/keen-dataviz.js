import { Dataviz } from '../../../lib/browser';

import data_metric from '../../sample-data/metric';
import data_groupBy from '../../sample-data/groupBy';
import data_double_groupBy from '../../sample-data/double-groupBy';

import data_interval from '../../sample-data/interval';
import data_interval_groupBy_empties from '../../sample-data/interval-groupBy-empties';
import data_interval_groupBy_all_empty from '../../sample-data/interval-groupBy-all-empty';
import data_interval_double_groupBy from '../../sample-data/interval-double-groupBy';

import data_funnel from '../../sample-data/funnel';
import data_uniques from '../../sample-data/select-unique';
import data_extraction from '../../sample-data/extraction';

describe('Dataviz', () => {
  let dataviz1;

  beforeEach(() => {
    dataviz1 = new Dataviz();
  });

  afterEach(() => {
    dataviz1 = null;
    Dataviz.visuals = [];
  });

  describe('.data()', () => {

    it('should set title and type from saved query body', () => {
      dataviz1
        .data({
          result: 123,
          metadata: {
            display_name: 'test',
            visualization: { chart_type: 'metric' }
          }
        });
      expect(dataviz1.title()).toEqual('test');
      expect(dataviz1.type()).toEqual('metric');
    });
    it('should not set title and type from saved query body when already set', () => {
      dataviz1
        .title('Already set')
        .type('table')
        .data({
          result: 123,
          metadata: {
            display_name: 'test',
            visualization: { chart_type: 'metric' }
          }
        });
      expect(dataviz1.title()).toEqual('Already set');
      expect(dataviz1.type()).toEqual('table');
    });

    it('should parse \'metric\' data and set the correct type', () => {
      dataviz1.data(data_metric);
      expect(dataviz1.type()).toEqual('metric');
    });
    it('should parse \'grouped-metric\' data and set the correct type', () => {
      dataviz1.data({
        query: {
          analysis_type: 'count',
          group_by: ['page']
        },
        result: data_groupBy.result
      });
      expect(dataviz1.type()).toEqual('bar');
    });
    it('should parse \'double-grouped-metric\' data and set the correct type', () => {
      dataviz1.data(data_double_groupBy);
      expect(dataviz1.type()).toEqual('bar');
    });

    it('should parse \'interval\' data and set the correct type', () => {
      dataviz1.data(data_interval);
      expect(dataviz1.type()).toEqual('area');
    });
    it('should parse \'grouped-interval\' data and set the correct type', () => {
      dataviz1.data({
        query: {
          analysis_type: 'count',
          group_by: ['key'],
          interval: 'daily'
        },
        result: data_interval_groupBy_empties.result
      });
      expect(dataviz1.type()).toEqual('line');
    });
    it('should parse empty \'grouped-interval\' data and set the correct type', () => {
      dataviz1.data({
        query: {
          analysis_type: 'count',
          group_by: ['key'],
          interval: 'daily'
        },
        result: data_interval_groupBy_all_empty.result
      });
      expect(dataviz1.type()).toEqual('line');
    });
    it('should parse \'double-grouped-interval\' data and set the correct type', () => {
      dataviz1.data(data_interval_double_groupBy);
      expect(dataviz1.type()).toEqual('line');
    });

    it('should parse \'funnel\' data and set the correct type', () => {
      dataviz1.data(data_funnel);
      expect(dataviz1.type()).toEqual('horizontal-bar');
    });
    it('should parse \'list\' data and set the correct type', () => {
      dataviz1.data(data_uniques);
      expect(dataviz1.type()).toEqual('table');
    });
    it('should parse \'extraction\' data and set the correct type', () => {
      dataviz1.data(data_extraction);
      expect(dataviz1.type()).toEqual('table');
    });

    it('should parse \'funnel\' data and not set a type', () => {
      dataviz1.type('test').data(data_funnel);
      expect(dataviz1.type()).toEqual('test');
    });
    it('should parse \'list\' data and not set a type', () => {
      dataviz1.type('test').data(data_uniques);
      expect(dataviz1.type()).toEqual('test');
    });
    it('should parse \'extraction\' data and not set a type', () => {
      dataviz1.type('test').data(data_extraction);
      expect(dataviz1.type()).toEqual('test');
    });

  });

});
