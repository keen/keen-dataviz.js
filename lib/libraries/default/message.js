import { escapeHtml } from '../../utils/escape-html';
import renderDownloadButton from '../../utils/render-download-btn';

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

    if (this.config.title && this.config.showTitle) {
      outer.appendChild(titleContainer);
    }

    outer.appendChild(inner);

    if (this.config.notes) {
      outer.appendChild(notesContainer);
    }

    if (this.config.ui
      && this.config.ui.buttons
      && this.config.ui.buttons.download
      && this.config.ui.buttons.download.type) {
        renderDownloadButton({
          element: this.el(),
          data: escapeHtml(text) || '',
          type: this.config.ui.buttons.download.type,
          label: this.config.ui.buttons.download.label,
         })
      }

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
