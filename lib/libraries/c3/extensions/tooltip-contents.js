var escapeHtml = require('../../../utils/escape-html');

module.exports = function (d, defaultTitleFormat, defaultValueFormat, color) {
  var bgcolor,
      name,
      nameFormat,
      text,
      title,
      titleFormat,
      value,
      valueFormat;

  // Set config options or defaults
  nameFormat = this.config.tooltip_format_name || function (name) { return name; };
  titleFormat = this.config.tooltip_format_title || defaultTitleFormat;
  valueFormat = this.config.tooltip_format_value || defaultValueFormat;

  // Reverse list to match legend
  for (var i = 0; i < d.length; i++) {
    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }
    if (! text) {
      title = titleFormat ? titleFormat(d[i].x) : d[i].x;
      text = "<table class='" + this.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + escapeHtml(title) + "</th></tr>" : "");
    }
    name = nameFormat(d[i].name);
    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
    bgcolor = this.levelColor ? this.levelColor(d[i].value) : color(d[i].id);
    if (value) {
      text += "<tr class='" + this.CLASS.tooltipName + "-" + d[i].id + "'>";
      text +=   "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + escapeHtml(name) + "</td>";
      text +=   "<td class='value'>" + escapeHtml(value) + "</td>";
      text += "</tr>";
    }
  }
  return text + "</table>";
};
