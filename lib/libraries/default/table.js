import { each } from '../../utils/each';

const defaults = {
  height: undefined,
  width: undefined,
  stickyHeader: false,
  stickyFooter: false
};

function _generateTableRows(dataset) {
  let html = '';
  let i = 0;
  for (let row of dataset) {
    if (i > 0) {
      html +=   '<tr>';
      for (let rowCol of row) {
        html +=   `<td>${rowCol}</td>`;
      }
      html +=   '</tr>';
    }
    i = 1;
  }
  return html;
}

export default {
  render: function() {
    const dataset = this.data();
    const el = this.el();
    const theme = this.theme();

    let html = '';
    let fixedHeader;

    const isEmpty = dataset.length === 1 && dataset[0].length === 0;
    if (isEmpty) {
      this.message('No data to display');
      return;
    }

    // Open wrapper
    html += `<div class="${theme}-table">`;

    // Static, scrollable table
    html +=   `<table class="${theme}-table-dataset">`;
    html +=     '<thead>';
    html +=       '<tr>';
    for (let colName of dataset[0]) {
      html +=       `<th>${colName}</th>`;
    }
    html +=       '</tr>';
    html +=     '</thead>';
    // Table data
    html +=     '<tbody>';
    html +=     _generateTableRows.call(this, dataset);
    html +=     '</tbody>';
    html +=   '</table>';
/*
    // Fixed table (header)
    html +=   `<table class="${theme}-table-fixed-header">`;
    html +=     '<thead>';
    html +=       '<tr>';
    for (let colName of dataset[0]) {
      html +=       `<th>${colName}</th>`;
    }
    html +=       '</tr>';
    html +=     '</thead>';
    html +=   '</table>';
*/
    // Close wrapper
    html += '</div>';

    // Inject HTML string
    el.querySelector('.' + theme + '-rendering').innerHTML = html;

    fixedHeader = el.querySelector('.' + theme + '-table-fixed-header');
    el.querySelector('.' + theme + '-table').onscroll = function(e){
      fixedHeader.style.top = e.target.scrollTop + 'px';
    };

    if (this.config.onrendered) {
      this.config.onrendered();
    }
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    var el = this.el().querySelector('.' + this.theme() + '-table')
    if (el && el.onscroll) {
      el.onscroll = undefined;
    }
  }
};
