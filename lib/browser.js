import { Dataviz, Dataset } from './index';

const env = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};

export const extendKeenGlobalObject = function(env) {
  env.Keen = env.Keen || {};
  env.Keen.Dataset = Dataset;
  env.Keen.Dataviz = Dataviz;
};

if (
     (typeof KEEN_GLOBAL_OBJECT !== 'undefined'
      && KEEN_GLOBAL_OBJECT)
     || typeof KEEN_EXPOSE_AS_GLOBAL_OBJECT !== 'undefined'
   ) {
  extendKeenGlobalObject(env);
}

export { Dataviz, Dataset } from './index';
export default Dataviz;
