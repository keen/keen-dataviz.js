# We <3 Contributions!

This is an open source project and we love involvement from the community! Hit us up with pull requests and issues. The more contributions the better!

**TODO:**

* [ ] Rebuild `google` and `chartjs` adapters from [keen-js](https://github.com/keen/keen-js) into `/lib/libraries`
* [ ] Design and build debugging tools

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

## Submitting a Pull Request

Use the template below. If certain testing steps are not relevant, specify that in the PR. If additional checks are needed, add 'em! Please run through all testing steps before asking for a review.

```
## What does this PR do? How does it affect users?

## How should this be tested?

Step through the code line by line. Things to keep in mind as you review:
 - Are there any edge cases not covered by this code?
 - Does this code follow conventions (naming, formatting, modularization, etc) where applicable?

Fetch the branch and/or deploy to staging to test the following:

- [ ] Does the code compile without warnings (check shell, console)?
- [ ] Do all tests pass?
- [ ] Does the UI, pixel by pixel, look exactly as expected (check various screen sizes, including mobile)?
- [ ] If the feature makes requests from the browser, inspect them in the Web Inspector. Do they look as expected (parameters, headers, etc)?
- [ ] If the feature sends data to Keen, is the data visible in the project if you run an extraction (include link to collection/query)?
- [ ] If the feature saves data to a database, can you confirm the data is indeed created in the database?

## Related tickets?
```

This PR template can be viewed rendered in Markdown [here](./.github/PULL_REQUEST_TEMPLATE.md).
