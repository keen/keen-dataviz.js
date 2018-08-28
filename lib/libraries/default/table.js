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

let currentPage;
function _generateTableRows(datavizInstance, dataset) {
  let html = '';
  const defaultConfig = {
    page: 1,
    limit: 0,
    arrows: true
  };
  let customConfig = {};
  if (datavizInstance.config.table && datavizInstance.config.table.pagination) {
    customConfig = datavizInstance.config.table.pagination;
  }
  const config = {
    ...defaultConfig,
    ...customConfig
  };

  if (!currentPage){
    currentPage = config.page;
  }

  let datasetPaginated;
  let pages = 0;
  if (config.limit === 0) {
    datasetPaginated = dataset.slice(1); // remove header
  } else {
    const start = config.limit * (currentPage - 1) + 1;
    const end = start + config.limit;
    datasetPaginated = dataset.slice(start, end);
    pages = Math.ceil((dataset.length - 1) / config.limit);
  }

  for (let row of datasetPaginated) {
    html +=   '<tr class="table-data-row">';
    for (let rowCol of row) {
      html +=   `<td>${rowCol}</td>`;
    }
    html +=   '</tr>';
  }

  if (pages > 1){
    html += `<tr class="table-pagination"><td colspan="999">`;
    let pageNumber = 1;
    const prevPage = (currentPage === 1) ? 1 : (currentPage - 1);
    const nextPage = (currentPage === pages) ? pages : (currentPage + 1);
    if (config.arrows){
      html += `<a class="arrow btn" data-page="${prevPage}"><</a>`;
    }
    while (pageNumber <= pages){
      html += `<a class="btn ${
        pageNumber === currentPage ? 'active' : ''
      }" data-page="${pageNumber}">${pageNumber}</a>`;
      pageNumber++;
    }
    if (config.arrows){
      html += `<a class="arrow btn" data-page="${nextPage}">></a>`;
    }
    html += '</td></tr>';
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
      const msg = 'No data to display';
      const mappedMsg = this.config.errorMapping[msg] || msg;
      this.message(mappedMsg);
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
    html +=     _generateTableRows(datavizInstance, dataset);
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
             _generateTableRows(datavizInstance, dataset);
          attachBtnEventListeners();
        });
      });


    const attachBtnEventListeners = () => {
      el.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
          currentPage = parseInt(event.target.getAttribute('data-page'));
          el.querySelector(`.${theme}-rendering tbody`).innerHTML =
             _generateTableRows(datavizInstance, dataset);
             attachBtnEventListeners();
          }, true);
      });
    };

    attachBtnEventListeners(datavizInstance, el, theme);

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
