var prettyNumber = require('../../utils/pretty-number');

module.exports = {
  render: function(){
    var color = this.colors()[0],
        theme = this.theme(),
        title = this.title(),
        value = this.data()[1][1] || '-',
        height = this.height() || 140,
        width = this.width(),
        opts = this.chartOptions(),
        html = '',
        prefix = '',
        suffix = '',
        formattedNum,
        valueEl;

    formattedNum = value;
    if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
      && !isNaN(parseInt(value)) ) {
        formattedNum = prettyNumber(value);
    }

    if (opts['prefix']) {
      prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
    }
    if (opts['suffix']) {
      suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
    }

    html += '<div class="' + theme + '">';
    html +=   '<div class="' + theme + '-metric" style="background-color: ' + color + '; width: ' + (width ? width + 'px' : 'auto') + ';" title="' + value + '">';
    html +=     '<span class="' + theme + '-metric-value">' + prefix + formattedNum + suffix + '</span>';
    if (title) {
      html +=   '<span class="' + theme + '-metric-title">' + title + '</span>';
    }
    html +=   '</div>';
    html += '</div>';

    this.el().innerHTML = html;
    valueEl = this.el().querySelector('.' + theme + '-metric-value');
    valueEl.style.paddingTop = ((height - this.el().offsetHeight) / 2) + 'px';
    this.el().querySelector('.' + theme + '-metric').style.height = height + 'px';
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    // no special clean-up
  }
};
