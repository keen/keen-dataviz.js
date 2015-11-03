var Emitter = require('component-emitter');

var each = require('../utils/each'),
    extend = require('../utils/extend');

function Dataset(){
  this.matrix = [
    ['Index']
  ];
}

Dataset.prototype.data = function(arr){
  if (!arguments.length) return this.matrix;
  this.matrix = (arr instanceof Array ? arr : null);
  return this;
};

extend(Dataset.prototype, require('./analyses'));
extend(Dataset.prototype, require('./append'));
extend(Dataset.prototype, require('./delete'));
extend(Dataset.prototype, require('./filter'));
extend(Dataset.prototype, require('./insert'));
extend(Dataset.prototype, require('./select'));
extend(Dataset.prototype, require('./set'));
extend(Dataset.prototype, require('./sort'));
extend(Dataset.prototype, require('./update'));

Dataset.parsers = require('./parsers');

Emitter(Dataset);
Emitter(Dataset.prototype);

module.exports = Dataset;
