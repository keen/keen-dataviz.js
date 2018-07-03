export default {
  render: function(){
    let html = '';
    const artifacts = this.view._artifacts.spinner = {};

    // Build DOM element
    html += '<div class="' + this.config.theme + '">';
    html +=   '<div class="keen-spinner-container keen-dataviz-box">';
    html +=     '<div class="keen-spinner-indicator"></div>';
    html +=   '</div>';
    html += '</div>';
    this.el().innerHTML = html;
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    if (this.view._artifacts.spinner) {
      if (this.view._artifacts.spinner.interval) {
        clearInterval(this.view._artifacts.spinner.interval);
      }
      this.view._artifacts.spinner.radius = 0;
      try {
        delete this.view._artifacts.spinner;
      }
      catch (e) {
        this.view._artifacts.spinner = undefined;
      }
    }
    this.el().innerHTML = '';
  }
};
