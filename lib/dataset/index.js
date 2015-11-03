var Emitter = require('component-emitter');

var each = require('../utils/each'),
    extend = require('../utils/extend');

function Dataset(){
  this.data = {
    input: {},
    output: [
      ['index']
    ]
  };
  this.meta = {
    schema: {},
    method: undefined
  };
}

extend(Dataset.prototype, require('./analyses'));
extend(Dataset.prototype, require('./append'));
extend(Dataset.prototype, require('./delete'));
extend(Dataset.prototype, require('./filter'));
extend(Dataset.prototype, require('./insert'));
extend(Dataset.prototype, require('./select'));
extend(Dataset.prototype, require('./set'));
extend(Dataset.prototype, require('./sort'));
extend(Dataset.prototype, require('./update'));

Dataset.prototype.input = function(obj){
  if (!arguments.length) return this['data']['input'];
  this['data']['input'] = (obj ? clone(obj) : null);
  return this;
};

Dataset.prototype.output = function(arr){
  if (!arguments.length) return this['data'].output;
  this['data'].output = (arr instanceof Array ? arr : null);
  return this;
};

Emitter(Dataset);
Emitter(Dataset.prototype);

module.exports = Dataset;
