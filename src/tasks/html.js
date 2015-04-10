import gulp from 'gulp';
import size from 'gulp-size';

gulp.task('html', ['html:dist'], function() {});

gulp.task('html:dist', () => {
    gulp.src([
            'src/templates/**/*.html'
        ])
        .pipe(gulp.dest('dist/templates'))
        .pipe(size());
});