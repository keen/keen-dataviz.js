import * as d3 from 'd3';

import isDateString from '../../../utils/assert-date-string';

export default function (options) {
  const cols = options.data.columns;
  const datavizInstance = this;
  const chart = this.view._artifacts.c3;
  const columns = [];
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

  for (let i = 0; i < cols.length; i++) {
    if (cols[i][0] !== 'x' && !isDateString(cols[i][1])) {
      columns.push(cols[i][0]);
    }
  }

  const legendElement = this.el().querySelector('.keen-c3-legend');

  const legendItemsElement = document.createElement('div');
  legendElement.append(legendItemsElement);

  const paginateElement = document.createElement('div');
  paginateElement.setAttribute('class', 'keen-c3-legend-pagination');
  legendElement.append(paginateElement);

  paginateData();

  function paginateData(){
    pagination.labels = columns.slice(pagination.offset, pagination.offset + pagination.limit);
    pagination.total = columns.length;
    renderLegendComponent.call(datavizInstance, pagination.labels);
    if (pagination.total > pagination.limit) {
      renderPaginationComponent.call(datavizInstance);
    }
    chart.resize();
  }

  function renderLegendComponent(){
    legendItemsElement.innerHTML = '';

    pagination.labels.forEach(label => {
      const legendItem = document.createElement("div");
      legendItem.innerHTML = `<span class='legend-item-text'>${label}</span>`;
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

  }

  function renderPaginationComponent(){
    paginateElement.innerHTML = '';

    const arrowUp = document.createElement('i');
    arrowUp.setAttribute('class', 'up');
    const arrowDown = document.createElement('i');
    arrowDown.setAttribute('class', 'down');

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

    paginateElement.append(arrowDown);
    paginateElement.append(arrowUp);

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
