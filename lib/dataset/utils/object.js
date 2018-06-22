export function valueAtDeepKey(obj, is, value) {
  if (typeof is == 'string')
    return valueAtDeepKey(obj, is.split('.'), value);
  else if (is.length==1 && value!==undefined && obj !== null &&
    typeof obj[is[0]] !== 'undefined')
    return obj[is[0]] = value;
  else if (is.length==0)
    return obj;
  else if (typeof is === 'undefined' || typeof obj === 'undefined'
    || is === null || obj === null
    || typeof obj[is[0]] === 'undefined')
    return null;
  else
    return valueAtDeepKey(obj[is[0]], is.slice(1), value);
}
