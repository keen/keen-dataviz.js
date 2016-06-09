module.exports = function(input){
  if (typeof input === 'object') {
    return testObject(input);
  }
  else if (typeof input === 'string') {
    return testString(input);
  }
  return false;
};

function testObject(input) {
  if (input !== null && typeof input.getTime === 'function' && !isNaN(input.getTime())) {
    return true;
  }
  return false;
}

function testString(input) {
  var ISO_8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
  return ISO_8601.test(input);
}
