import c3 from 'c3';

import { each } from '../utils/each';
import { extend } from '../utils/extend';
import { extendDeep } from '../utils/extend-deep';
import isDateString from '../utils/assert-date-string';
import c3DefaultDateFormat from './c3/extensions/default-date-format';
import c3PaginatingLegend from './c3/extensions/paginating-legend';
import c3TooltipContents from './c3/extensions/tooltip-contents';

import message from './default/message';
import metric from './default/metric';
import table from './default/table';
import spinner from './default/spinner';
import Funnel from './default/funnel';
import Funnel3d from './default/funnel-3d';
import HorizontalFunnel from './default/horizontal-funnel';
import HorizontalFunnel3d from './default/horizontal-funnel-3d';
import MetricCombo from './default/metric-combo';

export default function(lib) {
  let timer;
  bindResizeListener(function(){
    if (timer) {
      clearTimeout(timer);
    }
    const delay = (lib.visuals.length > 12) ? 1000 : 250;
    timer = setTimeout(function(){
      each(lib.visuals, function(chart){
        if (chart.view._artifacts.c3) {
          chart.view._artifacts.c3.resize();
        }
      });
    }, delay);
  });

  // FIX for c3 tooltip bug - REMOVE when https://github.com/c3js/c3/pull/2476 is merged
  if (c3.chart && c3.chart.internal && c3.chart.internal.fn) {
    c3.chart.internal.fn.horizontalDistance = function(data, pos) {
      var $$ = this,
          config = $$.config,
          xIndex = config.axis_rotated ? 1 : 0,
          x = $$.x(data.x);
          return Math.abs(x - pos[xIndex]);
    };
    c3.chart.internal.fn.findClosest = function (values, pos) {
      const CLASS = c3.chart.internal.fn.CLASS;
      var $$ = this,
          minDist = $$.config.point_sensitivity,
          minDist = Infinity,
          closest;
      // find mouseovering bar
      values.filter(function (v) {
          return v && $$.isBarType(v.id);
      }).forEach(function (v) {
          var shape = $$.main.select('.' + CLASS.bars + $$.getTargetSelectorSuffix(v.id) + ' .' + CLASS.bar + '-' + v.index).node();
          if (!closest && $$.isWithinBar($$.d3.mouse(shape), shape)) {
              closest = v;
          }
      });
      // find closest point from non-bar
      values.filter(function (v) {
          return v && !$$.isBarType(v.id);
      }).forEach(function (v) {
          var d = $$.dist(v, pos);
          var d = $$.horizontalDistance(v, pos);
          if (d < minDist) {
              minDist = d;
              closest = v;
          }
      });
      return closest;
    };
  }

  return defineC3();
};

function defineC3(){
  const types = {
    message,
    metric,
    table,
    spinner,
    'funnel': new Funnel,
    'funnel-3d': new Funnel3d,
    'horizontal-funnel': new HorizontalFunnel,
    'horizontal-funnel-3d': new HorizontalFunnel3d,
    'metric-combo': new MetricCombo,
  };

  const c3Types = [
    // Standard types
    'area',
    'area-spline',
    'area-step',
    'bar',
    'donut',
    'gauge',
    'line',
    'pie',
    'step',
    'spline',

    // Horizontal variant types
    'horizontal-area',
    'horizontal-area-spline',
    'horizontal-area-step',
    'horizontal-bar',
    'horizontal-line',
    'horizontal-step',
    'horizontal-spline',
  ];

  const getPaddings = (element, paddingName) => {
    return parseInt(window.getComputedStyle(element)[`padding${paddingName}`].replace('px', ''));
  }

  function getDefaultOptions(){

    const ENFORCED_OPTIONS = {
      bindto: this.el().querySelector('.' + this.config.theme + '-rendering .c3-chart'),
      color: {
        pattern: this.config.colors
      },
      data: {
        colors: { ...this.config.colorMapping },
        columns: [],
        type: this.config.type.replace('horizontal-', '')
      },
    };

    const renderingElement = this.el();
//      .querySelector('.' + this.config.theme + '-rendering');

    let height = renderingElement.offsetHeight;

    height -= (getPaddings(renderingElement, 'Top') + getPaddings(renderingElement, 'Bottom'));

    if (this.config.showTitle) {
      const titleElement = this.el().querySelector('.keen-dataviz-title');
      if (titleElement) {
        height -= titleElement.offsetHeight;
      } else {
        height -= parseInt(
          window
            .getComputedStyle(this.el(), null)
            ['font-size'].replace('px','')
          );
      }
    }

    if (this.config.notes) {
      const notesElement = this.el().querySelector('.keen-dataviz-notes');
      if (notesElement) {
        height -= notesElement.offsetHeight;
      } else {
        height -= parseInt(
          window
            .getComputedStyle(this.el(), null)
            ['font-size'].replace('px','')
          );
      }
    }

    let width = this.el().querySelector('.c3-chart').offsetWidth
      - (getPaddings(renderingElement, 'Left') + getPaddings(renderingElement, 'Right'));
    if (width < 0) {
      width = 0;
    }

    const DEFAULT_OPTIONS = {
      size: {
        width,
        height:
          height > 0 ?
            height
            : undefined,
      }
    };

    return extendDeep({}, DEFAULT_OPTIONS, this.config, ENFORCED_OPTIONS);
  }

  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        const options = getDefaultOptions.call(this);

        // 100% for charts
        const sumArray = calculateSumForPercents(this.dataset.matrix);
        let oldMatrix = [];
        if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' || type === 'area-step' || type === 'area-spline')) {
          oldMatrix = this.dataset.matrix;
          this.dataset.matrix = [this.dataset.matrix[0], ...calculatePercents(this.dataset.matrix, sumArray)];
          options.axis = {
            y: {
              padding: {
                top: 0,
              },
              tick: {
                format: d => `${d}%`,
              },
            },
          };
        }

        if (!!this.config.clearOnRender && options.data.columns.length > 0) {
          options.data.columns.splice(1);
        }

        if (this.data()[0].length === 1 || this.data().length === 1) {
          const msg = 'No data to display';
          const mappedMsg = this.config.errorMapping[msg] || msg;
          if (this.config.showErrorMessages) {
            this.message(mappedMsg);
          }
          return;
        }

        let removeLegend = false;

        if (type === 'gauge') {
          // Accommodate a neat bug:
          options.legend.show = false;
          options.data.columns = [[
            this.config.title || this.data()[1][0],
            this.data()[1][1]
          ]];
          removeLegend = true;
        }
        else if (type === 'pie' || type === 'donut') {
          options.data.columns = this.data().slice(1);
        }
        else {

          // Apply formatting for horizontal variant types
          if (type.indexOf('horizontal-') > -1) {
            options.axis.rotated = type.indexOf('horizontal-') > -1;
          }

          if (isDateString(this.data()[1][0])) {
            // TIMESERIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'timeseries';
            options.axis.x.tick = options.axis.x.tick || {
              format: this.config.dateFormat || c3DefaultDateFormat(this.data()[1][0], this.data()[2] ? this.data()[2][0] : this.data()[1][0]),
              culling: { max: 5 }
            };

            options.data.columns[0] = [];
            each(this.dataset.selectColumn(0), function(cell, i){
              if (i > 0) {
                cell = new Date(cell);
              }
              options.data.columns[0][i] = cell;
            });
            options.data.columns[0][0] = 'x';
            options.data.x = 'x';
            if (this.config.stacked && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }
          else {
            // CATEGORIES
            options.axis.x = options.axis.x || {};
            options.axis.x.type = 'category';
            options.axis.x.categories = this.dataset.selectColumn(0).slice(1);
            if (this.config.stacked && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }

          if (this.data()[0].length === 2) {
            options.legend.show = false;
            removeLegend = true;
          }

          each(this.data()[0], function(cell, i){
            if (i > 0) {
              options.data.columns.push(this.dataset.selectColumn(i));
            }
          }.bind(this));
        }

        if (removeLegend){
          const legendElement = this.el().querySelector('.keen-c3-legend');
          if (legendElement) {
            legendElement.remove();
            options.size.width = this.el().querySelector('.c3-chart').offsetWidth;
          }
          options.legend.show = false;
        }

        const chartTypesWithPartialIntervalIndicator = ['area', 'area-spline', 'area-step', 'line', 'spline', 'step'];

        if (options.partialIntervalIndicator
          && options.partialIntervalIndicator.show
          && chartTypesWithPartialIntervalIndicator.indexOf(options.type) > -1
        ) {
          const results = options.data.columns && options.data.columns[0];
          if (results && results.length > 1) {
            const partialResultsRegion = {
              axis: 'x',
              start: new Date(results[results.length - 2]),
              class: options.partialIntervalIndicator.className
            };
            options.regions = [...(options.regions || []), partialResultsRegion];
          }
        }
        
        if (
          !(options.tooltip && options.tooltip.show === false)
          &&
          (options.legend.show === true ||
          (options.legend
            && options.legend.tooltip
            && options.legend.tooltip.show)
          )) {
            
          // Apply custom tooltip
          options.tooltip = {
            contents: c3TooltipContents,
            format: {
              title: this.config.tooltip.format.title,
              value: (value, ratio, id, index) => {
                let valueFormatted = c3CustomTooltipFiltering.call(this, value, ratio, id, index);
                if (this.config.tooltip && this.config.tooltip.format && this.config.tooltip.format.value)
                {
                  valueFormatted = this.config.tooltip.format.value.call(this, valueFormatted, ratio, id, index);
                  // Restore value from percents calculation for stacking 100% charts
                  if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' 
                  || type === 'area-step' || type === 'area-spline')) {
                    valueFormatted = parseFloat(((valueFormatted / 100) * sumArray[index]).toFixed(2));
                  }
                  return valueFormatted;
                }
                // Restore value from percents calculation for stacking 100% charts
                if (options.stacking === 'percent' && (type === 'bar' || type === 'horizontal-bar' || type === 'area' 
                || type === 'area-step' || type === 'area-spline')) {
                  valueFormatted = ((valueFormatted / 100) * sumArray[index]).toFixed(2);
                  return parseFloat(valueFormatted);
                }
                return valueFormatted;
              }
            }
          };
        }

        if (options.legend.show === true) {
            const c3options = { ...options };
                // Apply custom color handling
            c3options.data.color = c3CustomDataMapping.bind(this);

            c3options.legend.hide = true; // hide default c3 legend

            // Render artifacts
            this.view._artifacts['c3'] = c3.generate(c3options);

            c3PaginatingLegend.call(this, {...options, onLegendRendered: () => {
              const legendElement = this.el().querySelector('.keen-c3-legend');
              if (legendElement) {
                if (
                    options.legend.position === 'top' ||
                    options.legend.position === 'bottom'
                ) {
                  c3options.size.height -= legendElement.offsetHeight;
                  this.view._artifacts['c3'].resize({ height: c3options.size.height });
                } else {
                  if (c3options.size.width === 0) {
                    c3options.size.width = this.el().offsetWidth
                      - getPaddings(this.el(), 'Left')
                      - getPaddings(this.el(), 'Right');
                  }
                  c3options.size.width -= legendElement.offsetWidth;
                  this.view._artifacts['c3'].resize({ width: c3options.size.width });
                }
              }
            },
            onPaginated: () => {
              this.view._artifacts['c3'].flush();
            }
          });
        }
        else {
          this.view._artifacts['c3'] = c3.generate(options);
        }

      },
      update: function(){
        // no special update handling
        this.render();
      },
      destroy: function(){
        if (this.view._artifacts['c3']) {
          this.view._artifacts['c3'].destroy();
          this.view._artifacts['c3'] = null;
        }
      }
    };
  });

  return types;
}

function c3CustomDataMapping(color, d) {
  const type = this.config.type;
  if (this.view._artifacts.pagination
    && type !== 'gauge'
      /*&& this.type() !== 'pie'
        && this.type() !== 'donut'*/) {
          const scope = this.view._artifacts.pagination.labels;
          if ((d.id && scope.indexOf(d.id) > -1)
            || (d && !d.id && scope.indexOf(d) > -1)) {
              return color;
          }
          else {
            if (type === 'donut' || type === 'pie') {
              return 'rgba(0,0,0,.1)';
            }
            else {
              return 'rgba(0,0,0,.07)';
            }
          }
  }
  else {
    return color;
  }
}

function c3CustomTooltipFiltering(value, ratio, id, index) {
  const type = this.config.type;

  if (this.view._artifacts.pagination
    && type !== 'gauge'
      /*&& this.type() !== 'pie'
        && this.type() !== 'donut'*/) {
          const scope = this.view._artifacts.pagination.labels;
          if (scope.indexOf(id) > -1) {
            return value;
          }
  }
  else {
    return value;
  }
}

function bindResizeListener(fn){
  if (typeof window === 'undefined') return;
  window.onresize = window.resize = function(){};
  if (window.addEventListener) {
    window.addEventListener('resize', fn, true);
  }
  else if (window.attachEvent) {
    window.attachEvent('onresize', fn);
  }
}

function calculateSumForPercents(matrix) {
  const sumArray = [];
  matrix.slice(1).forEach((d, i) => {
    d.forEach((e) => {
      if (typeof e === 'number') {
        if (!sumArray[i]) {
          sumArray[i] = e;
          return sumArray[i];
        }
        sumArray[i] += e;
      }
      return sumArray[i];
    });
  });
  return sumArray;
}

function calculatePercents(matrix, sumArray) {
  const newValues = matrix.slice(1).map((d, i) => d.map((e) => {
    if (typeof e === 'number') {
      return (e / sumArray[i]) * 100;
    }
    return e;
  }));
  return newValues;
}
