import { prettyNumber } from '../../utils/pretty-number';
import { escapeHtml } from '../../utils/escape-html';

export default {
  render: function(){
    const color = this.config.colors[0];
    const theme = this.config.theme;
    const title = this.config.title;
    const opts = this.config;
    let value = '-';
    let html = '';
    let prefix = '';
    let suffix = '';
    let formattedNum;
    let valueEl;
    let flexDifferenceStyle = '';
    let resultDifference = '';
    let differenceStyle = '';
    if(this.config.results && this.config.previousResults){
      flexDifferenceStyle = this.config.previousResults ? ' reverse' : '';
      resultDifference = this.config.results.result - this.config.previousResults.result;
      differenceStyle = (resultDifference > 0) ? '-green' : '-red';
      resultDifference = Math.abs(resultDifference);
    }

    if (typeof this.data()[1][1] === 'number') {
      value = this.data()[1][1];
    }

    formattedNum = value;
    if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
      && !isNaN(parseInt(value)) ) {
        formattedNum = prettyNumber(value);
        if(this.config.results && this.config.previousResults){
          resultDifference = prettyNumber(resultDifference);
        }
    }

    if (opts['prefix']) {
      prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
    }
    if (opts['suffix']) {
      suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
    }
    html += '<div class="' + theme + '">';
    html +=   '<div class="' + theme + '-metric keen-dataviz-box' + flexDifferenceStyle + '" title="' + escapeHtml(value) + '">';
    if (this.config.results && this.config.previousResults) {
      html +=   '<div class="' + theme + '-metric' + differenceStyle + '"><div class="' + differenceStyle + '-arrow"> </div>' + escapeHtml(resultDifference) + '</div>';
    }
    html +=     '<div class="' + theme + '-metric-value">' + prefix + escapeHtml(formattedNum) + suffix + '</div>';
    if (title) {
      html +=   '<div class="' + theme + '-metric-title">' + escapeHtml(title) + '</div>';
    }
    html +=   '</div>';
    html += '</div>';

    this.el().innerHTML = html;

    if (this.config.onrendered) {
      this.config.onrendered();
    }
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    // no special clean-up
  }
};
