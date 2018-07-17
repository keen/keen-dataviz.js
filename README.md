# keen-dataviz.js

The most advanced data visualization library for [Keen IO](https://keen.io).


## Install

```ssh
npm install keen-dataviz --save
```

## Example

```javascript
import KeenAnalysis from 'keen-analysis';
import KeenDataviz from 'keen-dataviz';

const chart = new KeenDataviz({
  container: '#my-chart-div' // querySelector,
  colors: ['red', 'orange', 'green'],
  title: 'New Customers per Week',
  type: 'area'
});

// Use keen-analysis.js to run a query
// and pass the result into your chart:
const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

client
  .query('count', {
    event_collection: 'pageviews',
    timeframe: 'this_7_days',
    interval: 'daily'
  })
  .then(function(result){
    // Handle the result
    chart
      .render(result);
  })
  .catch(function(error){
    // Handle the error
    chart
      .message(error.message);
  });
```

## Install the library (CDN)

Include [keen-dataviz.js](dist/keen-dataviz.js) and [keen-dataviz.css](dist/keen-dataviz.css) within your page or project. Visualizations are powered by the C3.js library, which itself requires D3.js. These dependencies are already included.

```html
<html>
  <head>
    <meta charset="utf-8">
    <!-- Use keen-analysis.js to fetch query results -->
    <script src="https://cdn.jsdelivr.net/npm/keen-analysis@2"></script>

    <!-- Dataviz dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/keen-dataviz@3"></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id="my-chart-div"></div>

    <!-- Create and Render -->
    <script>
      const chart = new KeenDataviz({
        container: '#my-chart-div' // querySelector,
        colors: ['red', 'orange', 'green'],
        title: 'New Customers per Week',
        type: 'area'
      });

      // Use keen-analysis.js to run a query
      // and pass the result into your chart:
      const client = new KeenAnalysis({
        projectId: 'YOUR_PROJECT_ID',
        readKey: 'YOUR_READ_KEY'
      });

      client
        .query('count', {
          event_collection: 'pageviews',
          timeframe: 'this_14_days',
          interval: 'daily'
        })
        .then(function(result){
          // Handle the result
          chart
            .render(result);
        })
        .catch(function(error){
          // Handle the error
          chart
            .message(error.message);
        });
    </script>
  </body>
</html>
```

**Advanced usage:**

* [Create custom cohort visualizations](https://github.com/keen/cohorts)
* [Create and visualize custom Dataset instances](./docs/dataset/parsers.md#data-parsers)
* [Create custom themes](./docs/themes.md#custom-themes)
* [Create custom visualizations](./docs/types-and-libraries.md#custom-types-and-libraries)

<a name="additional-resources"></a>
**Additional resources:**

* [Upgrading from keen-js](./docs/upgrading-from-keen-js.md)
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

# Build project with webpack
$ npm run build

# Build and launch to view demo page
$ npm run start

# Run Jest tests
$ npm run test
```
