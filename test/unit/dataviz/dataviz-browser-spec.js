/* globals: sinon */
var chai = require('chai');
var chaiDom = require('chai-dom');
var expect = chai.expect;

chai.use(chaiDom);

var Dataset = require('../../../lib/dataset'),
    Dataviz = require('../../../lib/');

describe('Dataviz', () => {

  beforeEach(() => {
    Dataviz.register('demo', {
      'chart': {
        render: () => {},
        update: () => {},
        destroy: () => {}
      }
    });
    this.dataviz = new Dataviz()
      .library('demo')
      .el('#chart-test')
      .type('chart');
  });

  afterEach(() => {
    this.dataviz.el('#chart-test').destroy();
    this.dataviz = null;
    Dataviz.visuals = [];
  });

  describe('.el()', () => {

    beforeEach(() => {
      var elDiv = document.createElement('div');
      elDiv.id = 'chart-test';
      document.body.appendChild(elDiv);
    });

    it('should return undefined by default', () => {
      expect(new Dataviz().el()).to.be.an('undefined');
    });
    it('should set and get a new el', () => {
      this.dataviz.el(document.getElementById('chart-test'));
      expect(this.dataviz.el()).to.contain(document.getElementById('chart-test'));
      if (this.dataviz.el().nodeName) {
        expect(this.dataviz.el().nodeName).to.be.a('string')
          .and.to.eql('DIV');
      }
    });
    it('should unset el by passing null', () => {
      this.dataviz.el(document.getElementById('chart-test'));
      this.dataviz.el(null);
      expect(this.dataviz.el()).to.not.exist;
    });
  });

  describe('.prepare()', () => {
    it('should set the view._prepared flag to true', () => {
      expect(this.dataviz.view._prepared).to.be.false;
      this.dataviz
        .el(document.getElementById('chart-test'))
        .prepare();
      expect(this.dataviz.view._prepared).to.be.true;
    });
  });

  // describe('.message()', () => {
  //   it('should call the #message method', () => {
  //     this.dataviz.message();
  //     // expect(Dataviz.libraries.demo.chart.message.called).to.be.ok;
  //   });
  // });

  describe('.render()', () => {
    it('should set the view._rendered flag to true', () => {
      expect(this.dataviz.view._rendered).to.be.false;
      this.dataviz.el(document.getElementById('chart-test')).render();
      expect(this.dataviz.view._rendered).to.be.true;
    });
  });

  describe('.destroy()', () => {
    it('should call the #destroy method of a given adapter', () => {
      this.dataviz.destroy();
      // expect(this.dataviz.el().innerHTML).to.eql('');
      // expect(Dataviz.libraries.demo.chart.destroy.called).to.be.ok;
    });
  });

});
