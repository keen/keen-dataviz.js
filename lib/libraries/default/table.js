import { each } from '../../utils/each';

const defaults = {
  /*
  DEPRECATED - use CSS styles

  height: undefined,
  width: undefined,
  stickyHeader: false,
  stickyFooter: false
  */
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

function _generateTableHeader(datavizInstance, dataset) {
  let html = '';
  let fieldNumber = -1;
  let columnNames =
    (datavizInstance.config.table && datavizInstance.config.table.columns)
    || dataset[0];
  for (let colName of columnNames) {
    fieldNumber +=1;
    html +=  `<th fieldNumber="${fieldNumber}">${colName}</th>`;
  }
  return html;
}


  const render = function() {
    const dataset = this.dataset.matrix;

    const el = this.el();
    const theme = this.config.theme;
    const datavizInstance = this;

    let html = '';

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
    html +=       _generateTableHeader(datavizInstance, dataset);
    html +=       '</tr>';
    html +=     '</thead>';
    // Table data
    html +=     '<tbody>';
    html +=     _generateTableRows.call(this, dataset);
    html +=     '</tbody>';
    html +=   '</table>';
/* */
    // Close wrapper
    html += '</div>';

    // Inject HTML string
    el.querySelector(`.${theme}-rendering`).innerHTML = html;

    el
      .querySelectorAll(`.${theme}-rendering th`)
      .forEach((item) => {
        item.addEventListener('click', (event) => {
          let sortOrder = event.target.getAttribute('order') || 'asc';
          let fieldNumber =  event.target.getAttribute('fieldNumber');
          let checker = function (a, b) {
            let sortOrderNumber = (sortOrder === 'asc') ? 1 : -1;

            if (typeof a[fieldNumber] === 'string') {
              let nameA = a[fieldNumber].toUpperCase(); // ignore upper and lowercase
              let nameB = b[fieldNumber].toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1 * sortOrderNumber;
              }
              if (nameA > nameB) {
                return 1* sortOrderNumber;
              }

              // names must be equal
              return 0;
            }
            return (a[fieldNumber] - b[fieldNumber]) * sortOrderNumber;
          };

          if (sortOrder === 'asc') {
            sortOrder = 'desc';
          } else {
            sortOrder = 'asc'
          }
          event.target.setAttribute('order', sortOrder);

          const first = this.dataset.matrix.shift();
          this.dataset.matrix.sort(checker);
          this.dataset.matrix.unshift(first);

          el.querySelector(`.${theme}-rendering tbody`).innerHTML =
             _generateTableRows.call(this, dataset);
        });
      });

    if (this.config.onrendered) {
      this.config.onrendered();
    }
  };

const update = function(){
    // no special update handling
    this.render();
  };

const destroy=  function(){};

export default { render, update, destroy };
