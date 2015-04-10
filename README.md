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
