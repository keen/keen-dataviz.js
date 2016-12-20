var each = require('../../utils/each');
var escapeHtml = require('../../utils/escape-html');

var defaults = {
  height: undefined,
  width: undefined,
  stickyHeader: true,
  stickyFooter: false
};

function _generateTableRows(dataset, colWidths, colAligns) {
  var html = '';
  for (var i = 0; i < dataset.length; i++) {
    if (i > 0) {
      html +=   '<tr>';
      for (var j = 0; j < dataset[i].length; j++) {
        html +=   '<td style="min-width: '+ (10 * colWidths[j]) +'px; text-align: ' + colAligns[j] + ';">' + escapeHtml(dataset[i][j]) + '</td>';
      }
      html +=   '</tr>';
    }
  }
  return html;
}

module.exports = {
  render: function(){
    var dataset = this.data(),
        el = this.el(),
        height = (this.height() || defaults.height) - this.el().offsetHeight,
        theme = this.theme(),
        width = this.width() || defaults.width;

    var html = '',
        colAligns = new Array(dataset[0].length),
        colWidths = new Array(dataset[0].length),
        fixedHeader;

    var isEmpty = dataset.length === 1 && dataset[0].length === 0;
    if (isEmpty) {
      this.message('No data to display');
      return;
    }

    // Calculate max column widths
    each(dataset, function(row){
      each(row, function(cell, i){
        if (!colWidths[i]) {
          colWidths[i] = 0;
        }
        colAligns[i] = (typeof cell === 'number') ? 'right' : 'left';
        colWidths[i] = (String(cell).length > colWidths[i]) ? String(cell).length : colWidths[i];
      });
    });

    // Open wrapper
    html += '<div class="' + theme + '-table" style="height: '+(height ? height+'px' : 'auto')+'; width: '+(width ? width+'px' : 'auto')+';">';

    // Static, scrollable table
    html +=   '<table class="' + theme + '-table-dataset">';
    html +=     '<thead>';
    html +=       '<tr>';
    for (var i = 0; i < dataset[0].length; i++) {
      html +=       '<th style="width: '+ (10 * colWidths[i]) +'px; text-align: ' + colAligns[i] + ';">' + escapeHtml(dataset[0][i]) + '</th>';
    }
    html +=       '</tr>';
    html +=     '</thead>';
    // Table data
    html +=     '<tbody>';
    html +=     _generateTableRows.bind(this, dataset, colWidths, colAligns)();
    html +=     '</tbody>';
    html +=   '</table>';

    // Fixed table (header)
    html +=   '<table class="' + theme + '-table-fixed-header">';
    html +=     '<thead>';
    html +=       '<tr>';
    for (var i = 0; i < dataset[0].length; i++) {
      html +=       '<th style="min-width: '+ (10 * colWidths[i]) +'px; text-align: ' + colAligns[i] + ';">' + escapeHtml(dataset[0][i]) + '</th>';
    }
    html +=       '</tr>';
    html +=     '</thead>';
    html +=   '</table>';

    // Close wrapper
    html += '</div>';

    // Inject HTML string
    el.querySelector('.' + theme + '-rendering').innerHTML = html;

    fixedHeader = el.querySelector('.' + theme + '-table-fixed-header');
    el.querySelector('.' + theme + '-table').onscroll = function(e){
      fixedHeader.style.top = e.target.scrollTop + 'px';
    };
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
