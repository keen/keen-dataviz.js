module.exports = function(input){
  if (typeof input === 'object'
    && typeof input.getTime === 'function'
      && !isNaN(input.getTime())) {
        return true;
  }
  else if (typeof input === 'string'
    && !isNaN(input.split('-')[0])
      && !isNaN(new Date(input).getTime())) {
        return true;
  }
  return false;
};
