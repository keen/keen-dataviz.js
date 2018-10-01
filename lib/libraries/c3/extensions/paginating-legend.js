import * as d3 from 'd3';

import isDateString from '../../../utils/assert-date-string';

export default function (options) {
  const cols = options.data.columns;
  const datavizInstance = this;
  const chart = this.view._artifacts.c3;
  let columns = [];
  const domNode = this.el().querySelector('.' + datavizInstance.config.theme + '-rendering');
  const legendConfig = datavizInstance.config.legend;

  const pagination = this.view._artifacts.pagination = {
    ...{
      hidden: [],
      labels: [],
      offset: 0,
      limit: Math.round((domNode.offsetHeight - 78) / 20),
      total: 0
    },
    ...legendConfig.pagination
  };

  if (options.legend.sort) {
    columns = options.legend.sort(cols);

    // update column order in the data, so tooltip will be the same order
    const columnsSorted = [];
    const dataColumnsSorted = [];
    if (cols[0][0] === 'x') {
      dataColumnsSorted.push(cols[0]);
    }
    columns.forEach(column => {
      let columnData = options.data.columns.find(item => item[0] === column);
      dataColumnsSorted.push(columnData);
    });
    options.data.columns = dataColumnsSorted;
  } else {
    for (let i = 0; i < cols.length; i++) {
      if (cols[i][0] !== 'x' && !isDateString(cols[i][1])) {
        columns.push(cols[i][0]);
      }
    }
  }

  const legendElement = this.el().querySelector('.keen-c3-legend');

  let align = 'vertical';
  if (legendConfig.position === 'top' || legendConfig.position === 'bottom') {
    align = 'horizontal';
  }

  const paginateHorizontalLeftElement = document.createElement('div');
  paginateHorizontalLeftElement.setAttribute('class', 'keen-c3-legend-pagination-icons keen-c3-legend-horizontal-pagination-left');
  if (align === 'horizontal') {
    legendElement.append(paginateHorizontalLeftElement);
  }

  const legendItemsElement = document.createElement('div');
  legendItemsElement.setAttribute('class', `keen-c3-legend-items keen-c3-legend-${align}-items`);
  legendElement.append(legendItemsElement);

  const paginateVerticalElement = document.createElement('div');
  paginateVerticalElement.setAttribute('class', 'keen-c3-legend-pagination keen-c3-legend-pagination-icons');
  if (align === 'vertical') {
    legendElement.append(paginateVerticalElement);
  }

  const paginateHorizontalRightElement = document.createElement('div');
  paginateHorizontalRightElement.setAttribute('class', 'keen-c3-legend-pagination-icons keen-c3-legend-horizontal-pagination-right');
  if (align === 'horizontal') {
    legendElement.append(paginateHorizontalRightElement);
  }

  paginateData();

  function paginateData(){
    pagination.labels = columns.slice(pagination.offset, pagination.offset + pagination.limit);
    pagination.total = columns.length;
    renderLegendComponent.call(datavizInstance, pagination.labels);
    if (pagination.total > pagination.limit) {
      renderPaginationComponent.call(datavizInstance);
    }
    if (options.onPaginated){
      options.onPaginated();
    }
  }

  function renderLegendComponent(){
    legendItemsElement.innerHTML = '';

    pagination.labels.forEach(label => {
      const labelShortened = legendConfig.label.textMaxLength ? label.slice(0, legendConfig.label.textMaxLength - 1) : label;
      const legendItem = document.createElement("div");
      legendItem.innerHTML = `<span class='legend-item-text'>${labelShortened}</span>`;
      legendItem.chartPartId = label;
      legendItem.setAttribute('class', 'legend-item');
      legendItemsElement.append(legendItem);

      const legendItemColorSample = document.createElement("span");
      legendItemColorSample.setAttribute('class', 'legend-item-color-sample');
      legendItemColorSample.style.backgroundColor = chart.color(legendItem.chartPartId);
      legendItem.prepend(legendItemColorSample);

      const tooltipElement = document.createElement("div");
      legendItem.addEventListener('mouseover', (event) => {
        chart.focus(legendItem.chartPartId);
        if (legendConfig.tooltip.show && legendItem.chartPartId.length > legendConfig.label.textMaxLength) {
          tooltipElement.setAttribute('class', `keen-c3-legend-label-overlay keen-c3-legend-position-${legendConfig.position}`);
          tooltipElement.innerHTML =
            `${
              options.legend.tooltip.pointer ? `<div class='overlay-pointer'></div>` : ``
            }${legendItem.chartPartId}`;
          legendItem.append(tooltipElement);
        }
      });
      legendItem.addEventListener('mouseout', (event) => {
        chart.revert();
        tooltipElement.remove();
      });
      legendItem.addEventListener('click', (event) => {
        let opacity = 1;
        const isHidden = pagination.hidden.indexOf(legendItem.chartPartId);
        if (isHidden < 0) {
          pagination.hidden.push(legendItem.chartPartId);
          opacity = .35;
        }
        else {
          pagination.hidden.splice(isHidden, 1);
          opacity = 1;
        }
        legendItem.style.opacity = opacity;
        chart.toggle(legendItem.chartPartId);
      });
  });

    if (options.onLegendRendered){
      options.onLegendRendered();
      options.onLegendRendered = null;
    }

  }

  function renderPaginationComponent(){
    paginateVerticalElement.innerHTML = '';
    paginateHorizontalLeftElement.innerHTML = '';
    paginateHorizontalRightElement.innerHTML = '';

    const arrowUp = document.createElement('i');
    const arrowDown = document.createElement('i');

    const paginate = (direction) => {
      if (direction === 'forward') {
        const diff = pagination.offset + pagination.limit;
        if (diff < pagination.total) {
          pagination.offset = diff;
          return;
        }
        pagination.offset = 0;
        return;
      }

      const diff = pagination.offset - pagination.limit;
      if (diff >= 0) {
        pagination.offset = diff;
        return;
      }

      pagination.offset = Math.floor(pagination.total/pagination.limit) * pagination.limit;
    };

    arrowDown.addEventListener('click', () => {
      paginate('forward');
      paginateData();
      clearSelectedText();
    });

    arrowUp.addEventListener('click', () => {
      paginate('backward');
      paginateData();
      clearSelectedText();
    });

    if (legendConfig.position === 'left' || legendConfig.position === 'right') {
      arrowUp.setAttribute('class', 'up');
      arrowDown.setAttribute('class', 'down');
      paginateVerticalElement.append(arrowDown);
      paginateVerticalElement.append(arrowUp);
    } else {
      // bottom top
      arrowUp.setAttribute('class', 'left');
      arrowDown.setAttribute('class', 'right');
      paginateHorizontalLeftElement.append(arrowUp);
      paginateHorizontalRightElement.append(arrowDown);
    }

  }

  function clearSelectedText() {
    let selection;
    if (document.selection && document.selection.empty) {
      selection = document.selection;
      selection.empty();
    }
    else if (window.getSelection) {
      selection = window.getSelection();
      selection.removeAllRanges();
    }
  }
}
