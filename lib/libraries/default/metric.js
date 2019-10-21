import { prettyNumber } from '../../utils/pretty-number';
import { escapeHtml } from '../../utils/escape-html';
import copyToClipboard from '../../utils/copy-to-clipboard';

function formatExtractionData(res, prop) {
  const { query, result } = res;
  const formattedResult = [];
  if (query.analysis_type !== 'extraction') throw new Error('Analysis type is not an extraction!');
  if (Array.isArray(result)) {
    result.forEach((item) => {
      const obj = {
        query,
        result: item[prop],
      };
      formattedResult.push(obj);
    });
  }
  return formattedResult;
}

export default {
  render: function(){
    let color = this.config.colors[0];
    const theme = this.config.theme;
    const title = this.config.title;
    const subtitle = this.config.subtitle;
    const opts = this.config;
    let value = '-';
    let prevValue= '';
    let html = '';
    let prefix = '';
    let suffix = '';
    let formattedNum;
    let flexDifferenceStyle = '';
    let resultDifference = '';
    let differenceStyle = '';
    let smallerValue = '';
    const { results, previousResults, isExtraction, comparedProp } = this.config;
    if(results && previousResults){
      flexDifferenceStyle = previousResults ? ' metric-comparison' : '';
      smallerValue = previousResults && title ? '-smaller' : '';
      resultDifference = results.result - previousResults.result;
      differenceStyle = (resultDifference > 0) ? '-green' : '-red';
      resultDifference = Math.abs(resultDifference);
      color = '';
    }

    if (this.data() && this.data()[1] && this.data()[1][1] && typeof this.data()[1][1] === 'number') {
      value = this.data()[1][1];
    }

    if (isExtraction && comparedProp) {
      const formattedResult = formatExtractionData(results, comparedProp);
      
      value = formattedResult[0].result;
      prevValue = formattedResult[1].result;

      flexDifferenceStyle = prevValue ? ' metric-comparison' : '';
      smallerValue = prevValue && title ? '-smaller' : '';
      resultDifference = value - prevValue;
      differenceStyle = (resultDifference > 0) ? '-green' : '-red';
      resultDifference = Math.abs(resultDifference);
      color = '';
    }

    formattedNum = value;
    if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
      && !isNaN(parseInt(value)) ) {
        formattedNum = prettyNumber(value);
        if(results && previousResults){
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
    html +=   '<div class="' + theme + '-metric keen-dataviz-box' + flexDifferenceStyle + '" title="' + escapeHtml(value) + '" style="background-color:' + color + '">';
    if (results && previousResults) {
      html +=   '<div class="' + theme + '-metric' + differenceStyle + '"><div class="arrow' + differenceStyle + '"> </div>' + escapeHtml(resultDifference) + '</div>';
    }
    if (isExtraction && comparedProp) {
      if (value && prevValue) {
        html +=   '<div class="' + theme + '-metric' + differenceStyle + '"><div class="arrow' + differenceStyle + '"> </div>' + escapeHtml(resultDifference) + '</div>';
        html += '<small>' + prevValue + '</small>';
      } else {
        html += '<p>No data to display</p>';
      }
    }
    html +=     '<div class="' + theme + '-metric-value' + smallerValue + '">' + prefix + escapeHtml(formattedNum) + suffix + '</div>';
    if (title) {
      html +=   '<div class="' + theme + '-metric-title">' + escapeHtml(title) + '</div>';
    }
    if (subtitle) {
      html +=   '<div class="' + theme + '-metric-subtitle">' + escapeHtml(subtitle) + '</div>';
    }
    html +=   '</div>';
    html += '</div>';

    this.el().innerHTML = html;

    if (this.config.onrendered) {
      this.config.onrendered();
    }

    if (this.config.utils && this.config.utils.clickToCopyToClipboard) {
      const resultClassName = `.${theme}-metric-value${smallerValue}`;
      document.querySelector(resultClassName).addEventListener('click', e => copyToClipboard(e.target.innerText, e));

      if (results && previousResults) {
        const previousResultsClassName = `.${theme}-metric${differenceStyle}`;
        document.querySelector(previousResultsClassName).addEventListener('click', e => copyToClipboard(e.target.innerText, e));
      }
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
