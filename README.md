ANP-GULP HELPERS
================

A set of Gulp tasks that are very specific in their nature. The individual tasks is probably not very useful to most developers, but the general workflow might be of interest.

# Purpose
We have several packages that require the same kind of gulp tasks, style compression, script linting, bundling etc, but that also need to be independent from each other, much like packages on NPM. To be able to maintain these tasks and keep the independence each package has a dependency on anp-gulp helpers, and the gulpfile in each package simply loads these tasks. When a task has been updated each package can simply update its dependency and have all bugfixes and new pulled in.

# Usage
The individual package only needs gulp to be able to run. Install it locally or keep it globally, whichever you prefer.

Place the snippet below in your gulpfile to make all tasks available to you at your CLI.

```javascript
require('anp-gulp');

global.MODULE_PKG = require('./package.json');

/** IF YOU NEED SPECIFIC GULP TASKS, DEFINE THEM HERE **/
```

# Tasks
These are the tasks available in anp-gulp helpers. The default task is <a href="#bs">bs</a>.

### clean
**Deps: clean:dist.**

noop

### clean:dist
Delete the dist-folder and all its content.

### watch
**Deps: <a href="#clean">clean</a>, <a href="#styles">styles</a>, <a href="#lintall">lint:all</a>.**

1. Runs a watch on `src/stylesheets/*.styl` and executes <a href="#styles">styles</a> on changes.
2. Runs a watch on `src/javascript/*.js` and executes <a href="#styles">lint:all</a> on changes.

### dist
**Deps: clean:dist, js:dist, styles:dist, images:dist, html:dist**

noop

### html
**Deps: html:dist**

noop

### html:dist
Copies *.html files from `src/templates/` to `dist/templates/`.

### images
**Deps: images:dist**.

noop

### images:dist
**Deps: images:svg**.

Copies *.png, *.gif, *.jpg, *.jpeg, *.webp from `src/images/` to `dist/images/`.

### images:svg
Minifies and combines all svg files in `src/images/` and copies the resulting file to `dist/images/`.

### test
**Deps: karma***.

noop

### karma
Runs karma with config file `test/karma.conf.js`.

### release
Adds a header with package information to `dist/*.module.js` and `dist/stylesheets/*.css`.

### bump (major, minor, patch)
Runs bump:patch

### bump:patch
Performs a patch bump of the version number in package.json.

### bump:minor
Performs a minor bump of the version number in package.json.

### bump:major
Performs a major bump of the version number in package.json.

### lint
**Deps: lint:all**

noop

### lint:all
**Deps: lint:jshint, lint:jscs**.

noop

### lint:jshint
Runs JSHint on *.js in `src/javascript/`.

### link:jscs
Runs JSCS on *.js in `src/javascript`.

### complexity
Runs [complexity report](https://github.com/philbooth/complexity-report) on *.js in `src/javascript/`.

### js:dist

1. Copies `src/*.module.js` to `dist/`
2. Copies `src/javascript/*.js` to `dist/javascript/`.

### bs
**Deps: watch**

Starts a browser-sync session, loading `demo/` as root.

### styles
Compiles `src/stylesheets/*.styl` to `src/stylesheets/*.css`.

Has a hard dependecy on *stylus-helpers*, which is available through JSPM. It uses *stylus-helpers* to load up helpers and Stylus modules to be available in the path once the stylus files are being compiled.

### styles:dist
**Deps: stylus**

Copies `src/stylesheets/*.css` to `dist/stylesheets/*.css`.

# ES6 / ES2015
TODO