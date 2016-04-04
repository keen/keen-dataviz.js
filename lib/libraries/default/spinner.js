module.exports = {
  render: function(){
    var html = '',
        artifacts = this.view._artifacts.spinner = {},
        height = this.height() || 35,
        offsetPadding = (height - 35) / 2,
        styles = [
          'transform',
          'MozTransform',
          'msTransform',
          'webkitTransform'
        ],
        spinner;

    // Build DOM element
    html += '<div class="' + this.theme() + '">';
    html +=   '<div class="keen-spinner-container" style="height: ' + height + 'px; padding-top: ' + offsetPadding + 'px;">';
    html +=     '<div class="keen-spinner-indicator"></div>';
    html +=   '</div>';
    html += '</div>';
    this.el().innerHTML = html;

    // Rotate indicator element
    spinner = this.el().querySelector('.keen-spinner-indicator');
    artifacts.radius = 0;
    artifacts.interval = setInterval(function(){
      artifacts.radius = (artifacts.radius === 350) ? 0 : artifacts.radius + 10;
      for (var i = 0; i < styles.length; i++) {
        spinner.style[styles[i]] = 'rotate(' + artifacts.radius + 'deg)';
      }
    }, 15);
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    if (this.view._artifacts.spinner) {
      clearInterval(this.view._artifacts.spinner.interval);
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
