var expect = require('chai').expect;
var prettyNumber = require('../../../lib/utils/pretty-number');

describe('Utils', function(){

  describe('prettyNumber', function(){

    it ('should return a string', function(){
      expect(prettyNumber(-45.009)).to.be.a('string');
      expect(prettyNumber(.000005)).to.be.a('string');
      expect(prettyNumber(0)).to.be.a('string');
      expect(prettyNumber(123456)).to.be.a('string');
      expect(prettyNumber(1800000000000000000000)).to.be.a('string');
    });

    it ('should correctly format ints and floats between -1 and 1', function() {
      expect(prettyNumber(-1)).to.eql('-1');
      expect(prettyNumber(-1.0)).to.eql('-1');
      expect(prettyNumber(-1.00)).to.eql('-1');
      expect(prettyNumber(-.00000000000000005)).to.eql('-5.00e-17');
      expect(prettyNumber(-.0070304020)).to.eql('-0.00703');
      expect(prettyNumber(0)).to.eql('0');
      expect(prettyNumber(.0000000000001)).to.eql('1.00e-13');
      expect(prettyNumber(.0000560002)).to.eql('0.0000560');
      expect(prettyNumber(.098768)).to.eql('0.0988');
      expect(prettyNumber(1)).to.eql('1');
      expect(prettyNumber(1.0)).to.eql('1');
      expect(prettyNumber(1.00)).to.eql('1');
    });

    it ('should use correct suffix when called with ints between one thousand and one hundred trillion', function(){
      expect(prettyNumber(1000)).to.eql('1000');
      expect(prettyNumber(10000)).to.eql('10k');
      expect(prettyNumber(100000)).to.eql('100k');
      expect(prettyNumber(1000000)).to.eql('1M');
      expect(prettyNumber(10000000)).to.eql('10M');
      expect(prettyNumber(100000000)).to.eql('100M');
      expect(prettyNumber(1000000000)).to.eql('1B');
      expect(prettyNumber(10000000000)).to.eql('10B');
      expect(prettyNumber(100000000000)).to.eql('100B');
      expect(prettyNumber(1000000000000)).to.eql('1T');
      expect(prettyNumber(10000000000000)).to.eql('10T');
      expect(prettyNumber(100000000000000)).to.eql('100T');
    });

    it ('should use correct suffix when called with negative ints', function(){
      expect(prettyNumber(-1000)).to.eql('-1k');
      expect(prettyNumber(-10000)).to.eql('-10k');
      expect(prettyNumber(-100000)).to.eql('-100k');
      expect(prettyNumber(-1000000)).to.eql('-1M');
      expect(prettyNumber(-10000000)).to.eql('-10M');
      expect(prettyNumber(-100000000)).to.eql('-100M');
      expect(prettyNumber(-1000000000)).to.eql('-1B');
      expect(prettyNumber(-10000000000)).to.eql('-10B');
      expect(prettyNumber(-100000000000)).to.eql('-100B');
      expect(prettyNumber(-1000000000000)).to.eql('-1T');
      expect(prettyNumber(-10000000000000)).to.eql('-10T');
      expect(prettyNumber(-100000000000000)).to.eql('-1.00e+14');
    });

    it ('should use exponential notation when called with integers greater than 100T', function(){
      expect(prettyNumber(1000000000000000)).to.eql('1.00e+15');
      expect(prettyNumber(100000000000000000000)).to.eql('1.00e+20');
      expect(prettyNumber(10052361296322342964777)).to.eql('1.01e+22');
      expect(prettyNumber(18642864286428642864286428)).to.eql('1.86e+25');
    });

    it ('should have three significant digits in formatted number', function(){
      expect(prettyNumber(1230)).to.eql('1230');
      expect(prettyNumber(12300)).to.eql('12.3k');
      expect(prettyNumber(12340)).to.eql('12.3k');
      expect(prettyNumber(123450)).to.eql('123k');
      expect(prettyNumber(15.92)).to.eql('15.9');
    });

  });
  
});