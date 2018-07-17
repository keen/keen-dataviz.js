# Custom Themes

Themes allow for better control and reuse of visualization styles.

```javascript
const chart = new KeenDataviz({
  type: 'metric',
  theme: 'my-custom-theme'
});
```

```css
/* Dataviz wrapper */
.my-custom-theme {
  /**/
}
.my-custom-theme .my-custom-theme-title {
  /**/
}
.my-custom-theme .my-custom-theme-stage {
  /**/
}
.my-custom-theme .my-custom-theme-notes {
  /**/
}
/* Metrics */
.my-custom-theme .my-custom-theme-metric {}
.my-custom-theme .my-custom-theme-metric .my-custom-theme-metric-value {}
.my-custom-theme .my-custom-theme-metric .my-custom-theme-metric-title {}
.my-custom-theme .my-custom-theme-metric .my-custom-theme-metric-prefix {}
.my-custom-theme .my-custom-theme-metric .my-custom-theme-metric-suffix {}
```

```javascript
/*

  New: Build a themed/styled wrapper within target node
  Why?
    - Title/footnotes are important, but are not
      universally supported by charting libraries
    - A simple theme/style switch formats this
      wrapper for dashboard use case (less > more)

  New: Applying a custom theme removes all default styling
  Why?
    - Prefer full CSS control over fighting inheritance

  // HTML:
  <div class='keen-dataviz'>
    <div class='keen-dataviz-title'>
      Pageviews (last 24 hours)
    </div>
    <div class='keen-dataviz-stage'>
      {{visualization}}
    </div>
    <div class='keen-dataviz-notes'>
      Last updated: 43 minutes ago (cached)
    </div>
  </div>

  // CSS (theming):
  .my-custom-theme {}
  .my-custom-theme .keen-dataviz-title {}
  .my-custom-theme .keen-dataviz-stage {}
  .my-custom-theme .keen-dataviz-notes {}
*/
```
