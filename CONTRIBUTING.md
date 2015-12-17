# We <3 Contributions!

This is an open source project and we love involvement from the community! Hit us up with pull requests and issues. The more contributions the better!

**TODO:**

* [ ] Rebuild `.colorMapping()` color palette transform
* [ ] Rebuild `.labels()` Dataset transform
* [ ] Rebuild `.labelMapping()` Dataset transform
* [ ] Rebuild `.sortGroups()` Dataset transform
* [ ] Move `google` and `chartjs` adapters from [keen-js](https://github.com/keen/keen-js) into `/lib/libraries`
* [ ] Design and build debugging tools

Run the following commands to install and build this project:

```ssh
# Clone the repo
$ git clone https://github.com/keen/keen-dataviz.js.git && cd keen-tracking.js

# Install project dependencies
$ npm install

# Build project with gulp
# npm install -g gulp
$ gulp

# Build and launch to view demo page
$ gulp
$ open http://localhost:9002/demo
```

## Pull Request Template

Please use the PR template below.

*****

**What does this PR do?**

* added the coolest feature ever
* refactored [Dustin's](https://github.com/dustinlarimer) gross code
* added tests (hooray! thank you!!)

**How should this be tested? (if appropriate)**

* run `gulp test:unit`
* confirm tests pass

**Are there any related issues open?**

*****
