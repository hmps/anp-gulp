'use strict';

var gulp = require('gulp');

gulp.task('watch', ['clean', 'styles', 'lint:all' ], function() {
    gulp.watch('src/stylesheets/**/*.scss', ['styles']);
    gulp.watch('src/javascript/*.js', ['lint:all']);
});