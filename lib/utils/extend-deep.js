var each = require('./each');

module.exports = extendDeep;

function extendDeep(target){
  for (var i = 1; i < arguments.length; i++) {
    each(arguments[i], function(prop, key){
      if (( typeof target[key] !== 'undefined' && typeof prop !== 'undefined' ) &&
          ( typeof target[key] === 'object'    && typeof prop === 'object' ) &&
          ( target[key] !== null               && prop !== null )) {
            extendDeep(target[key], prop);
      }
      else {
        target[key] = prop;
      }
    });
  }
  return target;
}
