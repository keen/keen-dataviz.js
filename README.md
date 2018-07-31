# keen-dataviz.js

The most advanced data visualization library for [Keen Analytics](https://keen.io).

## Install with NPM

```ssh
npm install keen-dataviz --save
```

## Example

```javascript
import KeenDataviz from 'keen-dataviz';
import KeenAnalysis from 'keen-analysis'; // API client

const chart = new KeenDataviz({
  // Required:
  container: '#my-chart-div' // querySelector,

  // Optional:
  title: 'New Customers per Week',
  showLoadingSpinner: true
});

// use keen-analysis.js to run a query
const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

client
  .query({
    analysis_type: 'count',
    event_collection: 'pageviews',
    timeframe: 'this_7_days',
    interval: 'daily'
  })
  .then(results => {
    // Handle the result
    chart
      .render(results);
  })
  .catch(error => {
    // Handle the error
    chart
      .message(error.message);
  });
```

## Install with CDN

Include [keen-dataviz.js](dist/keen-dataviz.js) and [keen-dataviz.css](dist/keen-dataviz.css) within your page or project. Visualizations are powered by the C3.js and D3.js libraries, already included in our bundle js file.

```html
<html>
  <head>
    <meta charset="utf-8">
    <!-- Use keen-analysis.js to fetch query results -->
    <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>

    <!-- Dataviz dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
    <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-dataviz@3"></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id="some_container"></div>

    <!-- Create and Render -->
    <script>
      const chart = new KeenDataviz({
        container: '#some_container' // querySelector,
        title: 'New Customers per Week'
      });

      // Use keen-analysis.js to run a query
      const client = new KeenAnalysis({
        projectId: 'YOUR_PROJECT_ID',
        readKey: 'YOUR_READ_KEY'
      });

      client
        .query({
          analysis_type: 'count',
          event_collection: 'pageviews',
          timeframe: 'this_14_days',
          interval: 'daily'
        })
        .then(function(results){
          // pass the result to the chart
          chart
            .render(results);
        })
        .catch(function(error){
          // on error
          chart
            .message(error.message);
        });
    </script>
  </body>
</html>
```

## Configuration

### Chart type

Specify the visualization type. **If no type is set, the library will automatically set the best option.**
[Full list of chart types](./docs/README.md#chart-types).

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  type: 'area'
});
```

### Date Format

Date formatting is possible by passing either a string or function to `dateFormat`. In either case, this value will be set as the `axis.x.tick.format` configuration property. As a built-in feature of C3.js, functions are used as an iterator, receiving the date for each interval in milliseconds.

```javascript
// Use a string template
const chart = new KeenDataviz({
  container: '#some_container', // required
  dateFormat: '%Y-%m'
});

// .. or a function
const chart = new KeenDataviz({
  container: '#some_container', // required
  dateFormat: function(ms){
    const date = new Date(ms);
    return date.getFullYear();
  }
});
```

**Date Localization:** Dates will be localized to the browser's timezone by default. This is generally desirable, but there are some instances where you may wish to retain the timezones that are returned by the API. You can [disable this behavior](http://c3js.org/reference.html#axis-x-localtime) in any C3.js-based visualization by setting `axis.x.localtime` to `false`:

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  dateFormat: function(ms){
    const date = new Date(ms);
    return date.getFullYear();
  },
  axis: {
    x: {
      localtime: false
    }
  }
});
```

### Multiple query results on one chart

```javascript
const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

const queryPageviews = client
  .query({
    analysis_type: 'count',
    event_collection: 'pageviews',
    timeframe: 'this_30_days',
    interval: 'daily'
  });

const queryFormSubmissions = client
  .query({
    analysis_type: 'count',
    event_collection: 'form_submissions',
    timeframe: 'this_30_days',
    interval: 'daily'
  });

client
  .run([queryPageviews, queryFormSubmissions])
  .then(results => {
    const chart = new KeenDataviz({
      container: '#some_container',
      results,
      // optional
      labelMapping: {
        'pageviews count': 'Pageviews',
        'form_submissions count': 'Forms collected'
      }
    });
  })
  .catch(err => {
    // Handle errors
    console.error(err);
  });
```

### Refresh every 1 minute

```javascript
const chart = new KeenDataviz({
  container: '#some_container',
  clearOnRender: true, // clear c3
  transition: {
    duration: 0 // to avoid animation during re-render
  }
});

const fetchResultsAndRender = () => {
  client
    .query({
      analysis_type: 'count',
      event_collection: 'pageviews',
      timeframe: 'previous_60_minutes',
      interval: 'minutely'
    })
    .then(results => {
      chart.render(results);
    });
};

const intervalTime = 60 * 1000; // every minute, because query interval is "minutely"

setInterval( () => {
  fetchResultsAndRender();
}, intervalTime);

fetchResultsAndRender(); // initial fetch and render
```

### C3 options

All of the options are passed to C3. See [https://c3js.org/reference.html](https://c3js.org/reference.html#axis-rotated)

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required

  // c3 options example, read more https://c3js.org/reference.html
  axis: {
    x: {
      localtime: false
    }
  },
  transition: {
    duration: 3000
  },
  zoom: {
    enabled: true
  },
  grid: {
    x: {
      show: true
    },
    y: {
      show: true
    }
  },
  size: {
    // https://c3js.org/reference.html#size-width
    // It's better to control the size using the CSS of the container HTML element
  },
  onrendered: () => {
    // do something when the chart is ready... https://c3js.org/reference.html#onrendered
  }
});
```

### Hide the Title

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  showTitle: false
});
```

### Legend

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required

  // default values
  legend: {
    show: true,
    position: 'right', // top, bottom, left, right
    label: {
      textMaxLength: 12
    },
    pagination: {
      offset: 0, // start from
      limit: 5 // items per page
    },
    tooltip: {
      show: true,
      pointer: true
    }
  }
});
```

### Custom colors

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  colors: ['#1167c5', 'green', '#000000']
});
```

### Color mapping

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  colorMapping: {
    'some_label_1': '#c51111',
    'some_label_2': '#11c53b'
  }
});
```

### Label mapping

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  labelMapping: {
    'long_complex_key_name': 'Human readable label',
  }
});
```

### Custom labels for funnels

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  labels: [
    'Step 1',
    'Step 2',
    'Step 3'
  ]
});
```

### Render results

By default you can pass results with a configuration object

```javascript
const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

// execute some query
client
  .query({
    analysis_type: 'count',
    event_collection: 'pageviews',
    timeframe: 'this_160_days'
  })
  .then(results => {
    const chart = new KeenDataviz({
      container: '#some_container', // required
      results
    });
  })
  .catch(err => {
    // Handle errors
  });
```

The same, but with render function:

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  showLoadingSpinner: true
});

const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

// execute some query
client
  .query({
    analysis_type: 'count',
    event_collection: 'pageviews',
    timeframe: 'this_30_days'
  })
  .then(results => {
    // Handle results
    chart.render(results);
  })
  .catch(err => {
    // Handle errors
  });
```

### Render as a Promise

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  renderAsPromise: true
});

chart
  .render(results)
  .then({
    // do something after rendering is complete
  })
  .catch(err => {
    // handle render error
  });
```

### Loading spinner animation (aka prepare())

Long query response time? Use a loading spinner to let users know, that data is loading.

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  showLoadingSpinner: true
});

const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});

// execute some query
client
  .query({
    analysis_type: 'count',
    event_collection: 'pageviews',
    timeframe: 'this_160_days'
  })
  .then(results => {
    // Handle results
    chart.render(results);
  })
  .catch(err => {
    // Handle errors
  });
```

### Sort groups

Determine how groupBy results are sorted (`asc` for ascending, `desc` for descending).

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  sortGroups: 'asc'
});
```

### Sort intervals

Determine how interval results are sorted (`asc` for ascending, `desc` for descending).

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  sortIntervals: 'desc'
});
```

### Stacked chart

Create a stacked chart, used to break down and compare parts of a whole.

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  stacked: true
});
 ```

 ### Extraction Table Columns Order

 ```javascript
 /*
  dummy event model
  {
    user: {
      email: 'john@doe.com'
    },
    favourite_fruit: 'Avocado'
  }
 */
 const chart = new KeenDataviz({
   container: '#some_container', // required
   table: {
     columns: ['favourite_fruit', 'user.email', 'keen.created_at'] // custom order of the columns
   }
 });
```

### Extraction Table Pagination

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  table: {
    pagination: {
      limit: 10 // items per page
    }
  }
});
```

### Custom data parser

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
});

// dummy result
const result = {
  'clicks': [3, 14, 7, 22, 11, 55, 11, 22],
  'views': [14, 58, 11, 32, 11, 23, 45, 66]
};

function customParser(data){
    const ds = new KeenDataset();
    Object.keys(data).forEach(dataKey => {
      ds.appendColumn(dataKey);
      data[dataKey].forEach((item, itemIndex) => {
        ds.set([dataKey, itemIndex+1], item);
      });
    });
    return ds;
}

chart
  .render(customParser(result));
```

### Depracation warnings

You can turn off deprecation warnings with

```javascript
const chart = new Keen.Dataviz({
  container: '#container', // required
  showDeprecationWarnings: false
});
```

**Advanced usage:**

* [Chart types](./docs/README.md#chart-types)
* [Create custom cohort visualizations](https://github.com/keen/cohorts)
* [Create and visualize custom Dataset instances](./docs/dataset/parsers.md#data-parsers)
* [Create custom themes](./docs/themes.md#custom-themes)

<a name="additional-resources"></a>
**Additional resources:**

* [Dataviz Methods](./docs/README.md#prototype-methods)
* [Upgrading from keen-js](./docs/upgrading-from-keen-js.md)

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

# Build project with Webpack
$ npm run build

# Build and launch to view demo page
$ npm run start

# Run Jest tests
$ npm run test
```
