# keen-dataviz.js

A JavaScript data visualization library for [Keen](https://keen.io).

<a href="https://keen.io/"><img src="https://img.shields.io/github/release/keen/keen-dataviz.js.svg?style=flat-square&maxAge=600" alt=""></a>
<a href="https://github.com/keen/keen-dataviz.js/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/keen/keen-dataviz.js.svg" /></a>
<a href="https://github.com/keen/keen-dataviz.js/pulse" alt="Activity"><img src="https://img.shields.io/github/last-commit/keen/keen-dataviz.js.svg" /></a>
<a href="#" alt="License"><img src="https://img.shields.io/github/license/keen/keen-dataviz.js.svg" /></a>
<a href="http://slack.keen.io/"><img src="https://img.shields.io/badge/slack-keen-orange.svg?style=flat-square&maxAge=3600" alt="Slack"></a>
<a href="https://www.jsdelivr.com/package/npm/keen-dataviz"><img src="https://data.jsdelivr.com/v1/package/npm/keen-dataviz/badge" alt=""></a>
<a href="https://www.npmjs.com/package/keen-dataviz"><img src="https://img.shields.io/npm/dm/keen-dataviz.svg" alt=""></a>

## Install with NPM

```ssh
npm install keen-dataviz --save
```

## Live Demos

[Chart types](https://keen.io/docs/visualize/common-chart-examples/)

[Themes and Color Palettes](http://keen.github.io/keen-dataviz.js/)

## Example

```javascript
import KeenDataviz from 'keen-dataviz';
import KeenAnalysis from 'keen-analysis'; // API client

import 'keen-dataviz/dist/keen-dataviz.css';
/*
  Webpack users: to include CSS files in your project please install
  https://github.com/webpack-contrib/css-loader
  https://github.com/webpack-contrib/style-loader
  Here's an example: https://github.com/keen/keen-dataviz-webpack-boilerplate
*/

const chart = new KeenDataviz({
  // Required:
  container: '#my-chart-div', // querySelector

  // Optional:
  title: 'New Customers per Week'
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
    chart
      .render(results);
  })
  .catch(error => {
    chart
      .message(error.message);
  });
```

## React Component

https://github.com/keen/keen-react-charts

## Webpack boilerplate

https://github.com/keen/keen-dataviz-webpack-boilerplate

## Install with CDN

Include [keen-dataviz.js](dist/keen-dataviz.js) and [keen-dataviz.css](dist/keen-dataviz.css) within your page or project.

```html
<html>
  <head>
    <meta charset="utf-8">
    <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>
    <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
    <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.js"></script>
  </head>
  <body>
    <!-- DOM Element -->
    <div id="some_container"></div>
    
    <style>
      #some_container {
        width: 400px;
        height: 250px;
      }
    </style>

    <!-- Create and Render -->
    <script>
      const chart = new KeenDataviz({
        container: '#some_container',
        title: 'New Customers per Week'
      });

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
          chart
            .render(results);
        })
        .catch(function(error){
          chart
            .message(error.message);
        });
    </script>
  </body>
</html>
```

---

## Configuration

### Chart type

Specify the visualization type. **If no type is set, the library will automatically set the best option.**

[Full list of the supported chart types](./docs/README.md#chart-types)

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
      // or labelMapping RegExp
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
  title: false
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
    },

    // sort: (columns) => { return columns; } // custom sorting function
  }
});
```

### Legend sort

Default method of sorting is by column name ASC. You can use your own sorting function

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required

  // default values
  legend: {
    show: true,
    position: 'right', // top, bottom, left, right

    sort: function (columns) {
      const columnsSorted = [];
      columns.forEach(column => {
        if (column[0] !== 'x') {
          let sumOfValues = column.slice(1).reduce((acc = 0, item) => {
            return acc + item;
          });
          columnsSorted.push({ columnName: column[0], columnSum: sumOfValues});
        }
      });

      // let's sort by SUM, DESC
      columnsSorted.sort(function(a, b) {
        return b.columnSum - a.columnSum;
      });

      return columnsSorted.map(item => item.columnName);
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

### Color Palettes

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  palette: 'autocollector' // autocollector | modern | dracula
});
```

### Color mapping

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  colorMapping: {
    'some_label_1': '#c51111', // column - color
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

### Label mapping RegExp

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  labelMappingRegExp: [
    [/anytext/, 'Purchases'],
    [/lorem ipsum/gi, 'Visits']
  ]
});
```

### Label mapping dimensions: Column, Row, Both

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  labelMapping: {
    'long_complex_key_name': 'Human readable label',
  },
  labelMappingDimension: 'column' // column, row, both
});
```

### Error mapping

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  errorMapping: {
    'No data to display': 'my custom message 123'
  }
});
```

### Hide error messages

```javascript
const chart = new KeenDataviz({
  container: '#some_container', // required
  showErrorMessages: false
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
  stacking: 'normal' // 'normal' - stacked chart
                     // 'percent' - 100% stacked chart
});
 ```

 ### Sparkline chart

 Create chart without axis, grid and legend

```javascript
const chart = new KeenDataviz({
    container: '#some_container', // required
    sparkline: true
  })
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

### Mapping values of a table column

```javascript
const chart = new KeenDataviz({
    container: '#some_container', // required
    type: 'table',
    table: {
      mapValues: {
        'keen.timestamp': (value) => {
          return value.toUpperCase();
        }
      }
    }
  })
```

### Chart render only when visible

```javascript
const chart = new KeenDataviz({
    container: '#some_container', // required
    renderOnVisible: true
  })
```

### Partial interval visual indicator

By default, it's enabled for all charts with relative time frames starting with this_
eg. this_x_hours.
To hide it, use a configuration property:

```javascript
partialIntervalIndicator: false
```


### Deprecation warnings

You can turn off deprecation warnings with

```javascript
const chart = new Keen.Dataviz({
  container: '#container', // required
  showDeprecationWarnings: false
});
```

### Download results

You can add button to enable download results from chart.

```javascript
const chart = new Keen.Dataviz({
  container: '#container', // required
  ui: {
    buttons: {
      download: {
        label: 'Download as a JPG file', // optional - by default it's just "Download"
        type: 'jpg',  // optional - by default it's 'json', supported types ['jpg', 'jpeg', 'png', 'csv', 'json']
      }
    }
  }
});
```

### Save charts as JPG/PNG files

```javascript
// method by default generates PNG image
chart.exportImage();

// if quality provided then JPEG is generated
// quality - a number between 0 to 1 indicating image quality (quality = 0 generates PNG image)
// bgcolor - a string value for background color, any valid CSS color value (defaults to '#fff')
chart.exportImage({ quality: 1, bgcolor: 'blue' });
```

### Execution metadata

You can easily show execution metadata if it's available. By defualt this option is set to true.

```javascript
const chart = new Keen.Dataviz({
  container: '#container', // required
  ui: {
    executionMetadata: true // default
  }
});
```

### Copy to clipboard

By default this feature is switched on. When you click on a point on the chart the result's value is copied to clipboard. When you select a group of points then sum of their values are copied.

```javascript
const chart = new Keen.Dataviz({
  container: '#container', // required
  utils: {
    clickToCopyToClipboard: false, 
  }
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
