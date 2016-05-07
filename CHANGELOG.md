<a name="1.0.0"></a>
# 1.0.0 Paginating legend + performance improvements

**CHANGED:**
* Legends are right-aligned by default (#22)

**NEW:**
* C3.js and D3.js are now bundled with the library (#34)
* Legends now paginate through large datasets
* Legend items are truncated and display a small popup on hover
* Tooltips only show data displayed in the legend
* Color is only applied to data displayed in the legend (#41)
* `.dateFormat()` has been ported over from keen-js (#23)

<a name="0.0.8"></a>
# 0.0.8 Bug fixes and improvements

**FIXED:**
* Allow `Dataviz` instances to be destroyed without a `type` being required (#33)
* Properly destroy and dispose of `table` instances
* Allow the `update()` method to return correctly


<a name="0.0.7"></a>
# 0.0.7 Saved funnel parsing and style update

**FIXED:**
* Correctly parse responses of saved funnel queries (#18)
* Hide legend for single-series charts (#25)


<a name="0.0.6"></a>
# 0.0.6 Bug fixes and improvements

**FIXED:**
* Improve utils/assert-date-string.js helper (#24)
* Improve handling of incorrect chart type (#28)

**NEW:**
* Expose CSS file in package.json (#21)
* Delete unused utils files (#29)
* Use postcss/cssnext instead of less (#30)


<a name="0.0.5"></a>
# 0.0.5 C3.js improvements

**FIXED:**
* Fix `Dataset.parser` for funnels to allow for handling steps from the same collection
* Improve C3.js option construction to allow for greater flexibility and customization via `chartOptions`

**NEW:**
* Remove C3.js `window.onresize` handler and manually update charts in a more resource-conscious way with a custom resize handler


<a name="0.0.4"></a>
# 0.0.4 Restore label/group handling

**NEW:**
* Re-connected `.labels(array)` and `.labelMapping(object)` methods, added tests
* Improved C3.js default settings and styling


<a name="0.0.3"></a>
# 0.0.3 Dataset types, parser identification

**NEW:**
* Exposed a `.type(string)` accessor for identifying the type of data represented. Each `Dataset.parser()` function will set this type on `Dataset` instances when used.


<a name="0.0.2"></a>
# 0.0.2 Better dates and colors

**NEW:**
* Re-connected `.colorMapping()` within the default (c3js) chart types (#2)
* Improved default date formatting for various intervals (#5)


<a name="0.0.1"></a>
# 0.0.1 Hello, world!

**NEW:**
* [Everything](./README.md) :)
