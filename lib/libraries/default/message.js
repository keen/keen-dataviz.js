import { escapeHtml } from '../../utils/escape-html';

export default {
  render: function(text){
    const outer = document.createElement('div');
    const inner = document.createElement('div');
    const msg = document.createElement('span');

    const titleContainer = document.createElement('div');
    const notesContainer = document.createElement('div');

    outer.className = this.config.theme + ' keen-dataviz-box';
    inner.className = this.config.theme + '-message';

    // Create title and notes for message
    titleContainer.className = this.config.theme + '-title';
    titleContainer.innerHTML = escapeHtml(this.config.title || '');
    notesContainer.className = this.config.theme + '-notes';
    notesContainer.innerHTML = escapeHtml(this.config.notes || '');

    msg.innerHTML = escapeHtml(text) || '';
    inner.appendChild(msg);
    outer.appendChild(titleContainer);
    outer.appendChild(inner);
    outer.appendChild(notesContainer);

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
