var escapeHtml = require('../../utils/escape-html');

module.exports = {
  render: function(text){
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var msg = document.createElement('span');
    var height = this.height() || 140;
    var titleContainer = document.createElement('div');

    outer.className = this.theme();
    inner.className = this.theme() + '-message';
    inner.style.height = height + 'px';
    inner.style.paddingTop = (height / 2 - 12) + 'px';
    inner.style.width = this.width() + 'px';

    // Create title for message
    titleContainer.className = 'keen-dataviz-title';
    titleContainer.innerHTML = escapeHtml(this.title() || '');
    msg.innerHTML = escapeHtml(text) || '';
    inner.appendChild(msg);
    outer.appendChild(titleContainer);
    outer.appendChild(inner);

    this.el().innerHTML = '';
    this.el().appendChild(outer);
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    // no special clean-up
  }
};
