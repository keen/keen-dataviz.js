import { Dataviz, Dataset } from './index';

const env = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};

export const extendKeenGlobalObject = function(env) {
  env.KeenDataviz = Dataviz;
  env.KeenDataset = Dataset;

  // just for backward compatibility
  env.Keen = env.Keen || {};
  env.Keen.Dataset = Dataset;
  env.Keen.Dataviz = Dataviz;
};

if (typeof KEEN_GLOBAL_OBJECT !== 'undefined'
  && KEEN_GLOBAL_OBJECT) {
  extendKeenGlobalObject(env);
}

export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export { Dataviz, Dataset } from './index';
export default Dataviz;
