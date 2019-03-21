import { escapeHtml } from '../../../utils/escape-html';

export default function (d, defaultTitleFormat, defaultValueFormat, color) {
  let text;
  let title;
  // Set config options or defaults
  const nameFormat = this.config.tooltip_format_name || function (name) { return name; };
  const titleFormat = this.config.tooltip_format_title || defaultTitleFormat;
  const valueFormat = this.config.tooltip_format_value || defaultValueFormat;

  // Reverse list to match legend
  for (let i = 0; i < d.length; i++) {
    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }
    if (!text) {
      title = titleFormat ? titleFormat(d[i].x) : d[i].x;
      text = "<table class='" + this.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + escapeHtml(title) + "</th></tr>" : "");
    }
    let name = nameFormat(d[i].name);
    let value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
    let bgcolor = this.levelColor ? this.levelColor(d[i].value) : color(d[i].id);
    if (value && !isNaN(value)) {
      text += "<tr class='" + this.CLASS.tooltipName + "-" + d[i].id + "'>";
      if (name.indexOf('__tooltip_ignore_name_field__') === -1) {
        text +=   "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + escapeHtml(name) + "</td>";
      }
      text +=   "<td class='value'>" + escapeHtml(value) + "</td>";
      text += "</tr>";
    }
  }
  return text + "</table>";
}
