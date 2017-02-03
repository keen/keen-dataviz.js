<a name="1.1.3"></a>
# 1.1.3 Variable Declaration Bug Fix 

FIXED:
* A variable declaration has been added to `Dataviz.message`, preventing failure when called in strict mode. (#71)

<a name="1.1.2"></a>
# 1.1.2 Variable Declaration Bug Fix 

FIXED:
* A variable declaration has been added to create-null-list.js, preventing failure in strict mode. (#70)

<a name="1.1.1"></a>
# 1.1.1 Scientific Notation for Big Numbers

**FIXED:**
* This resolves an issue with the `prettyNumber` function returning `undefined` when it runs out of suffixes for large numbers. Now these numbers will be displayed in exponential/scientific notation. (#67)


<a name="1.1.0"></a>
# 1.1.0 Global Namespace Fix

**FIXED:**
* This library will now coalesce into a shared global `Keen` namespace, rather than colliding and overwriting other modular SDKs. Check out [keen-core.js@0.1.0](https://github.com/keen/keen-core.js/blob/master/CHANGELOG.md#010-manage-modular-namespace) for details about this fix that impact our other modular SDKs.
* Charts now include their title and footnotes when displaying messages, such as errors.
* Node Engine is no longer fixed at v4.0 in `package.json`.

<a name="1.0.4"></a>
# 1.0.4 Bugfixes

**FIXED:**
* HTML and JS characters are escaped in strings before being presented in charts. This protects against XSS attacks.

<a name="1.0.3"></a>
# 1.0.3 Bugfixes

**FIXED:**
* Queries with an interval but a timeframe where only one interval will be present in the query results no longer break with certain chart types.

<a name="1.0.2"></a>
# 1.0.2 Data points

**NEW:**
* Data points are now visible, with disabled active-state animations


<a name="1.0.1"></a>
# 1.0.1 Bug fixes

**FIXED:**
* Metrics now display `0` values correctly, rather than `-` (#45)
* Resolved error `Cannot read property 'getTime' of null` (#47)
* Sorting and formatting now works correctly with numeric label values (#48)

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
