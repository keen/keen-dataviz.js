var Spinner = require('spin.js');

var defaults = {
  height: 140,          // Used if no height is provided
  lines: 10,            // The number of lines to draw
  length: 8,            // The length of each line
  width: 3,             // The line thickness
  radius: 10,           // The radius of the inner circle
  corners: 1,           // Corner roundness (0..1)
  rotate: 0,            // The rotation offset
  direction: 1,         // 1: clockwise, -1: counterclockwise
  color: '#4D4D4D',     // #rgb or #rrggbb or array of colors
  speed: 1.67,          // Rounds per second
  trail: 60,            // Afterglow percentage
  shadow: false,        // Whether to render a shadow
  hwaccel: false,       // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9,          // The z-index (defaults to 2000000000)
  top: '50%',           // Top position relative to parent
  left: '50%'           // Left position relative to parent
};

module.exports = {
  render: function(){
    var height = this.height() || defaults.height,
        outer = document.createElement('div'),
        spinner = document.createElement('div');

    outer.className = this.theme();
    spinner.className = this.theme() + '-spinner';
    spinner.style.height = String(height + 'px');
    spinner.style.position = 'relative';
    spinner.style.width = String(this.width() + 'px');

    outer.appendChild(spinner);
    this.el().innerHTML = '';
    this.el().appendChild(outer);
    this.view._artifacts['spinner'] = new Spinner(defaults).spin(spinner);
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    if (this.view._artifacts['spinner']) {
      this.view._artifacts['spinner'].stop();
      this.view._artifacts['spinner'] = null;
    }
  }
};
