import { prettyNumber } from '../../../lib/utils/pretty-number';

describe('Utils', () => {

  describe('prettyNumber', () => {

    it ('should return a string', () => {
      expect(prettyNumber(-45.009)).toBe('-45.0');
      expect(prettyNumber(.000005)).toBe('0.00000500');
      expect(prettyNumber(0)).toBe('0');
      expect(prettyNumber(123456)).toBe('123k');
      expect(prettyNumber(1800000000000000000000)).toBe('1.80e+21');
    });

    it ('should correctly format ints and floats between -1 and 1', () => {
      expect(prettyNumber(-1)).toEqual('-1');
      expect(prettyNumber(-1.0)).toEqual('-1');
      expect(prettyNumber(-1.00)).toEqual('-1');
      expect(prettyNumber(-.00000000000000005)).toEqual('-5.00e-17');
      expect(prettyNumber(-.0070304020)).toEqual('-0.00703');
      expect(prettyNumber(0)).toEqual('0');
      expect(prettyNumber(.0000000000001)).toEqual('1.00e-13');
      expect(prettyNumber(.0000560002)).toEqual('0.0000560');
      expect(prettyNumber(.098768)).toEqual('0.0988');
      expect(prettyNumber(1)).toEqual('1');
      expect(prettyNumber(1.0)).toEqual('1');
      expect(prettyNumber(1.00)).toEqual('1');
    });

    it ('should use correct suffix when called with ints between one thousand and one hundred trillion', () => {
      expect(prettyNumber(1000)).toEqual('1000');
      expect(prettyNumber(10000)).toEqual('10k');
      expect(prettyNumber(100000)).toEqual('100k');
      expect(prettyNumber(1000000)).toEqual('1M');
      expect(prettyNumber(10000000)).toEqual('10M');
      expect(prettyNumber(100000000)).toEqual('100M');
      expect(prettyNumber(1000000000)).toEqual('1B');
      expect(prettyNumber(10000000000)).toEqual('10B');
      expect(prettyNumber(100000000000)).toEqual('100B');
      expect(prettyNumber(1000000000000)).toEqual('1T');
      expect(prettyNumber(10000000000000)).toEqual('10T');
      expect(prettyNumber(100000000000000)).toEqual('100T');
    });

    it ('should use correct suffix when called with negative ints', () => {
      expect(prettyNumber(-1000)).toEqual('-1k');
      expect(prettyNumber(-10000)).toEqual('-10k');
      expect(prettyNumber(-100000)).toEqual('-100k');
      expect(prettyNumber(-1000000)).toEqual('-1M');
      expect(prettyNumber(-10000000)).toEqual('-10M');
      expect(prettyNumber(-100000000)).toEqual('-100M');
      expect(prettyNumber(-1000000000)).toEqual('-1B');
      expect(prettyNumber(-10000000000)).toEqual('-10B');
      expect(prettyNumber(-100000000000)).toEqual('-100B');
      expect(prettyNumber(-1000000000000)).toEqual('-1T');
      expect(prettyNumber(-10000000000000)).toEqual('-10T');
      expect(prettyNumber(-100000000000000)).toEqual('-100T');
    });

    it ('should use exponential notation when called with integers greater than or equal to quadrillion', () => {
      expect(prettyNumber(1000000000000000)).toEqual('1.00e+15');
      expect(prettyNumber(100000000000000000000)).toEqual('1.00e+20');
      expect(prettyNumber(10052361296322342964777)).toEqual('1.01e+22');
      expect(prettyNumber(10000000000000000000099999)).toEqual('1.00e+25');
      expect(prettyNumber(18642864286428642864286428)).toEqual('1.86e+25');
    });

    it ('should use exponential notation when called with integers less than or equal to negative quadrillion', () => {
      expect(prettyNumber(-1000000000000000)).toEqual('-1.00e+15');
      expect(prettyNumber(-100000000000000000000)).toEqual('-1.00e+20');
      expect(prettyNumber(-10052361296322342964777)).toEqual('-1.01e+22');
      expect(prettyNumber(-10000000000000000000099999)).toEqual('-1.00e+25');
      expect(prettyNumber(-18642864286428642864286428)).toEqual('-1.86e+25');
    });

    it ('should have three significant digits in formatted number', () => {
      expect(prettyNumber(1230)).toEqual('1230');
      expect(prettyNumber(12300)).toEqual('12.3k');
      expect(prettyNumber(12340)).toEqual('12.3k');
      expect(prettyNumber(123450)).toEqual('123k');
      expect(prettyNumber(15.92)).toEqual('15.9');
    });

  });

});
