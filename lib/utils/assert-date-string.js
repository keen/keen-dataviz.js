module.exports = function(str){
  var split;
  if (!isNaN(new Date(str).getTime()) && typeof str === 'string') {
    split = str.split('-');
    return !isNaN(split[0]) && split[0].length === 4;
  }
  return false;
};
