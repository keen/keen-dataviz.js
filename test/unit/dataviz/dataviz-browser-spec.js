/* globals: sinon */
var expect = require('chai').expect;

var Dataset = require('../../../lib/dataset'),
    Dataviz = require('../../../lib/');

describe('Dataviz', function(){

  beforeEach(function(){
    Dataviz.register('demo', {
      'chart': {
        render: sinon.spy(),
        update: sinon.spy(),
        destroy: sinon.spy()
      }
    });
    this.dataviz = new Dataviz()
      .library('demo')
      .type('chart');
  });

  afterEach(function(){
    this.dataviz = null;
    Dataviz.visuals = new Array();
  });

  describe('.el()', function(){

    beforeEach(function(){
      var elDiv = document.createElement('div');
      elDiv.id = 'chart-test';
      document.body.appendChild(elDiv);
    });

    it('should return undefined by default', function(){
      expect(this.dataviz.el()).to.be.an('undefined');
    });
    it('should set and get a new el', function(){
      this.dataviz.el(document.getElementById('chart-test'));
      expect(this.dataviz.el()).to.be.an('object');
      if (this.dataviz.el().nodeName) {
        expect(this.dataviz.el().nodeName).to.be.a('string')
          .and.to.eql('DIV');
      }
    });
    it('should unset el by passing null', function(){
      this.dataviz.el(null);
      expect(this.dataviz.el()).to.not.exist;
    });
  });

  describe('.prepare()', function(){
    it('should set the view._prepared flag to true', function(){
      expect(this.dataviz.view._prepared).to.be.false;
      this.dataviz
        .el(document.getElementById('chart-test'))
        .prepare();
      expect(this.dataviz.view._prepared).to.be.true;
      // terminate the spinner instance
      this.dataviz.destroy();
    });
  });

  describe('.message()', function(){
    it('should call the #message method', function(){
      this.dataviz.message();
      expect(Dataviz.libraries.demo.chart.message.called).to.be.ok;
    });
  });

  describe('.render()', function(){
    it('should call the #initialize method of a given adapter', function(){
      this.dataviz.initialize();
      expect(Dataviz.libraries.demo.chart.initialize.called).to.be.ok;
    });
    it('should call the #render method of a given adapter', function(){
      this.dataviz.el(document.getElementById('chart-test')).render();
      expect(Dataviz.libraries.demo.chart.render.called).to.be.ok;
    });
    it('should NOT call the #render method if el is NOT set', function(){
      this.dataviz.render();
      expect(Dataviz.libraries.demo.chart.render.called).to.not.be.ok;
    });
    it('should set the view._rendered flag to true', function(){
      expect(this.dataviz.view._rendered).to.be.false;
      this.dataviz.el(document.getElementById('chart-test')).render();
      expect(this.dataviz.view._rendered).to.be.true;
    });
  });

  describe('.update()', function(){
    it('should call the #update method of a given adapter if available', function(){
      this.dataviz.update();
      expect(Dataviz.libraries.demo.chart.update.called).to.be.ok;
    });
    it('should call the #render method of a given adapter if NOT available', function(){
      Dataviz.libraries.demo.chart.update = void 0;
      this.dataviz.el(document.getElementById('chart-test')).update();
      expect(Dataviz.libraries.demo.chart.render.called).to.be.ok;
    });
  });

  describe('.destroy()', function(){
    it('should call the #destroy method of a given adapter', function(){
      this.dataviz.destroy();
      expect(Dataviz.libraries.demo.chart.destroy.called).to.be.ok;
    });
  });

});
