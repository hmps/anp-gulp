(function() {
    'use strict';

    var gulp = require('gulp');

    require('require-dir')('src/tasks');

    gulp.task('default', function () {
        gulp.start('build');
    });

}());