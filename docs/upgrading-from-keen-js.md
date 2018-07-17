**Upgrading from keen-js:**

There are several breaking changes and deprecations from [keen-js](https://github.com/keen/keen-js).

* **client.draw() is not part of this SDK – check out [keen-analysis.js](https://github.com/keen/keen-analysis.js) for fetching query results**
* **Method removal:** the following methods are no longer necessary, and so they have been removed entirely:
    * `.parseRequest()`: this is now handled by `.data()` (learn more)
    * `.dataType()`
    * `.adapter()`
    * `.initialize()`
* **Method deprecations:** the following method names have been changed, but are still available as aliases:
    * `.parseRawData()` is now handled by `.data()`
    * `.chartType()` is now `.type()` (new)
    * `.error()` is now `.message()` (new)
* **Internal architecture:** the internals for each `Dataviz` instance have changed dramatically. Please review the source if you have built something referencing these properties directly.
* **Dataset:** the `Dataset` instance prototype and internal architecture have been heavily refactored:
    * `.input()` has been removed, as instances no longer maintain the original raw input data
    * `.output()` has been renamed to `.data()` (no alias)
    * `Dataset.parser()` returns parsing functions for all standard API response types. These functions will correctly parse a given response and return a new Dataset instance. [Learn more about these parsers](./docs/dataset/parsers.md#data-parsers)
