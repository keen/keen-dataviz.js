module.exports = function (d, defaultTitleFormat, defaultValueFormat, color) {
  var $$ = this, config = $$.config,
      titleFormat = config.tooltip_format_title || defaultTitleFormat,
      nameFormat = config.tooltip_format_name || function (name) { return name; },
      valueFormat = config.tooltip_format_value || defaultValueFormat,
      text, i, title, value, name, bgcolor;
  for (i = 0; i < d.length; i++) {
      if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

      if (! text) {
          title = titleFormat ? titleFormat(d[i].x) : d[i].x;
          // if (title && title.length > 45) {
          //   console.log(title);
          //   title = title.substring(0, 42) + '...';
          // }
          text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
      }

      name = nameFormat(d[i].name);
      // if (name.length > 45) {
      //   name = name.substring(0, 42) + '...';
      // }
      value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
      bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

      text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
      text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
      text += "<td class='value'>" + value + "</td>";
      text += "</tr>";
  }
  return text + "</table>";
};
