# keen-dataviz.js

This project contains the most advanced data visualization functionality available for Keen IO, and will soon be built directly into [keen-js](https://github.com/keen/keen-js), replacing and upgrading the current visualization capabilities of that library.

**What's new:**

* Visualizations are powered by [C3.js](http://c3js.org/); a [D3.js](http://d3js.org/)-based reusable chart library: [check out what's available!](./docs/README.md#chart-types)
* Breaking changes from [keen-js](https://github.com/keen/keen-js): [learn more about upgrading](#upgrading-from-keen-js)
* Lightweight and blazing fast, with dramatic performance improvements
* [Create custom cohort analysis and visualizations](https://github.com/keen/cohorts)

**Upgrading from keen-js?** [Read this](#upgrading-from-keen-js).

This [example setup](#create-a-dataviz-instance) demonstrates how to put this library to work.

**Getting started:**

If you haven't done so already, login to Keen IO to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

* [Install the library and dependencies](#install-the-library)
* [Create and configure a new Dataviz instance](#create-a-dataviz-instance)
* [Load and parse data](./docs/README.md#data)
* [Render into the page](./docs/README.md#render)

**Advanced usage:**

* [Create custom cohort visualizations](https://github.com/keen/cohorts)
* [Create and visualize custom Dataset instances](./docs/dataset/parsers.md#data-parsers)
* [Create custom themes](./docs/themes.md#custom-themes)
* [Create custom visualizations](./docs/types-and-libraries.md#custom-types-and-libraries)

<a name="upgrading-from-keen-js"></a>
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

<a name="additional-resources"></a>
**Additional resources:**

* [Example setup](#create-a-dataviz-instance) demonstrates how to put all of this to work
* [Contributing](#contributing) is awesome and we hope you do!
* [Custom builds](#custom-builds) are encouraged as well - have fun!

<a name="support"></a>
**Support:**

Need a hand with something? Shoot us an email at [team@keen.io](mailto:team@keen.io). We're always happy to help, or just hear what you're building! Here are a few other resources worth checking out:

* [API status](http://status.keen.io/)
* [API reference](https://keen.io/docs/api)
* [How-to guides](https://keen.io/guides)
* [Data modeling guide](https://keen.io/guides/data-modeling-guide/)
* [Slack (public)](http://slack.keen.io/)


## Install the library

Include [keen-dataviz.js](dist/keen-dataviz.js) and [keen-dataviz.css](dist/keen-dataviz.css) within your page or project. Visualizations are powered by the C3.js library, which itself requires D3.js. These dependencies are already included.

```html
<html>
  <head>
    <meta charset="utf-8">
    <!-- Use keen-analysis.js to fetch query results -->
    <script src="//d26b395fwzu5fz.cloudfront.net/keen-analysis-1.2.2.js"></script>

    <!-- Dataviz dependencies -->
    <link href="//d26b395fwzu5fz.cloudfront.net/keen-dataviz-1.1.3.css" rel="stylesheet" />
    <script src="//d26b395fwzu5fz.cloudfront.net/keen-dataviz-1.1.3.js"></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id='my-chart-div'></div>

    <!-- Create and Render -->
    <script>
      var chart = new Keen.Dataviz()
        .el('#my-chart-div')
        .colors(['red', 'orange', 'green'])
        .height(500)
        .title('New Customers per Week')
        .type('metric')
        .prepare();


      // Use keen-analysis.js to run a query
      // and pass the result into your chart:
      var client = new Keen({
        projectId: 'YOUR_PROJECT_ID',
        readKey: 'YOUR_READ_KEY'
      });

      client
        .query('count', {
          event_collection: 'pageviews',
          timeframe: 'this_14_days',
          interval: 'daily'
        })
        .then(function(res){
          // Handle the result
          chart
            .data(res)
            .render();
        })
        .catch(function(err){
          // Handle the error
          chart
            .message(err.message);
        });
    </script>
  </body>
</html>
```

This library can also be installed via npm or bower:

```ssh
# via npm
$ npm install keen-dataviz

# or bower
$ bower install keen-dataviz
```

## Create a Dataviz instance

Create a new `Dataviz` instance. This `chart` variable will be used throughout this guide as a reference to a `Dataviz` instance.

```javascript
var chart = new Keen.Dataviz()
  .el('#dom-selector')
  .height(280)
  .title('Signups this week')
  .type('metric')
  .prepare();

// Fetch data from the API:
//  Imaginary callback ...
chart
  .data({ result: 621 })
  .render();
```

**[Learn more about the Dataviz API](./docs/)**


## Contributing

This is an open source project and we love involvement from the community! Hit us up with pull requests and issues. The more contributions the better!

[Learn about contributing to this project](./CONTRIBUTING.md).


## Custom builds

Run the following commands to install and build this project:

```ssh
# Clone the repo
$ git clone https://github.com/keen/keen-dataviz.js.git && cd keen-dataviz.js

# Install project dependencies
$ npm install

# Build project with gulp
# npm install -g gulp
$ gulp

# Build and launch to view demo page
$ gulp
$ open http://localhost:9002/demo
```
