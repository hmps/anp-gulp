import gulp from 'gulp';

gulp.task('watch', ['clean', 'styles', 'lint:all' ], function() {
    gulp.watch('src/stylesheets/**/*.styl', ['styles']);
    gulp.watch('src/javascript/*.js', ['lint:all']);
});