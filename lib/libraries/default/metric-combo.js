/* eslint-env browser */
import c3 from 'c3';
import { each } from '../../utils/each';
import { prettyNumber } from '../../utils/pretty-number';

export default class MetricCombo {
  render() {
    const {
      container,
      colors,
      metricResults,
      title,
      tooltip,
    } = this.config;

    const columns = [];
    columns[0] = [];
    each(this.dataset.selectColumn(0), (c, i) => {
      let cell;
      if (i > 0) {
        cell = new Date(c);
      }
      columns[0][i] = cell;
    });
    columns[0][0] = 'x';

    each(this.data()[0], (c, i) => {
      if (i > 0) {
        columns.push(this.dataset.selectColumn(i));
      }
    });

    const prevResult = (metricResults && metricResults.previous && metricResults.previous.result)
      || 0;
    const currResult = (metricResults && metricResults.current && metricResults.current.result)
      || 0;
    const count = currResult - prevResult;
    const percentDifference = prevResult === 0 ? 'Not defined' : Math.round((count / prevResult) * 100);
    let labelClass = 'keen-dataviz-metric-green';
    let iconClass = 'arrow-green';

    if (percentDifference < 0) {
      labelClass = 'keen-dataviz-metric-red';
      iconClass = 'arrow-red';
    }

    const containerTitle = (this.config.showTitle && title) ? `<div class="keen-dataviz-title">${title}</div>` : '';
    const containerElement = document.querySelector(container);
    containerElement.innerHTML = `
      <div class="keen-dataviz">
        <div class="keen-dataviz-metric-combo">
          <div class="metric-combo-data">
            ${containerTitle} 
            <div class="percent-difference ${labelClass}"><div class="${iconClass}"></div> ${prettyNumber(percentDifference)} %</div>
            <div class="current-count ${labelClass}"> ${prettyNumber(count)} </div>
          </div>
          <div class="keen-dataviz-rendering">
            <div class="c3-chart"></div>
          </div>
        </div>
      </div>`;
    const chartRoot = containerElement.querySelector('.c3-chart');
    const chart = c3.generate({
      bindto: chartRoot,
      color: {
        pattern: colors,
      },
      title,
      legend: {
        show: false,
      },
      data: {
        x: 'x',
        columns,
        type: 'area-spline',
        selection: {
          draggable: true,
          enabled: true,
          multiple: true,
        },
      },
      point: {
        r: 0,
        focus: {
          expand: {
            r: 5,
            enabled: true,
          },
        },
        select: {
          r: 5,
          enabled: true,
        },
      },
      axis: {
        y: {
          show: false,
        },
        x: {
          show: false,
        },
      },
      grid: {
        x: {
          show: false,
        },
        y: {
          show: false,
        },
      },
      padding: {
        left: 0,
        right: 0,
      },
      tooltip,
    });
  }

  update() {
    this.destroy();
    this.render();
  }

  destroy() {
    const { container } = this.config;
    const containerElement = document.querySelector(container);
    const chartContainer = containerElement.querySelector('.c3-chart');
    chartContainer.remove();
  }
}
