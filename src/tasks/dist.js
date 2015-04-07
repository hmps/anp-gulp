import gulp from 'gulp';

gulp.task('dist', ['clean:dist', 'js:dist', 'styles:dist', 'images:dist', 'html:dist'], () => {});
