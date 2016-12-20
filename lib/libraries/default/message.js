var escapeHtml = require('../../utils/escape-html');

module.exports = {
  render: function(text){
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var msg = document.createElement('span');
    var height = this.height() || 140;

    var titleContainer = document.createElement('div');
    var notesContainer = document.createElement('div');

    outer.className = this.theme();
    inner.className = this.theme() + '-message';
    inner.style.width = this.width() + 'px';

    // Create title and notes for message
    titleContainer.className = this.theme() + '-title';
    titleContainer.innerHTML = escapeHtml(this.title() || '');
    notesContainer.className = this.theme() + '-notes';
    notesContainer.innerHTML = escapeHtml(this.notes() || '');

    msg.innerHTML = escapeHtml(text) || '';
    inner.appendChild(msg);
    outer.appendChild(titleContainer);
    outer.appendChild(inner);
    outer.appendChild(notesContainer);

    this.el().innerHTML = '';
    this.el().appendChild(outer);

    var actualInnerHeight = height - titleContainer.offsetHeight - notesContainer.offsetHeight;
    inner.style.height = actualInnerHeight + 'px';
    inner.style.paddingTop = (actualInnerHeight / 2 - 12) + 'px';
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    // no special clean-up
  }
};
