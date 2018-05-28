import Dataviz, { Dataset } from '../../../lib/browser';

describe('Dataviz', () => {
  let dataviz1;

  beforeEach(() => {
    Dataviz.register('demo', {
      'chart': {
        render: () => {},
        update: () => {},
        destroy: () => {}
      }
    });
    dataviz1 = new Dataviz()
      .library('demo')
      .el('#chart-test')
      .type('chart');
  });

  afterEach(() => {
    dataviz1.el('#chart-test').destroy();
    dataviz1 = null;
    Dataviz.visuals = [];
  });

  describe('.el()', () => {

    beforeEach(() => {
      var elDiv = document.createElement('div');
      elDiv.id = 'chart-test';
      document.body.appendChild(elDiv);
    });

    it('should return undefined by default', () => {
      expect(new Dataviz().el()).toBe(undefined);
    });

    it('should set and get a new el', () => {
      const element = document.getElementById('chart-test');
      dataviz1.el(element);
      expect(dataviz1.el()).toEqual(element);
      if (dataviz1.el().nodeName) {
        expect(dataviz1.el().nodeName)
          .toEqual('DIV');
      }
    });

    it('should unset el by passing null', () => {
      dataviz1.el(document.getElementById('chart-test'));
      dataviz1.el(null);
      expect(dataviz1.el()).toBe(undefined);
    });
  });

  describe('.prepare()', () => {
    it('should set the view._prepared flag to true', () => {
      expect(dataviz1.view._prepared).toBe(false);
      dataviz1
        .el(document.getElementById('chart-test'))
        .prepare();
      expect(dataviz1.view._prepared).toBe(true);
    });
  });

  describe('.render()', () => {
    it('should set the view._rendered flag to true', () => {
      expect(dataviz1.view._rendered).toBe(false);
      dataviz1.el(document.getElementById('chart-test')).render();
      expect(dataviz1.view._rendered).toBe(true);
    });
  });

  describe('.destroy()', () => {
    it('should call the #destroy method of a given adapter', () => {
      dataviz1.destroy();
      expect(dataviz1.el().innerHTML).toEqual('');
    });
  });

});
