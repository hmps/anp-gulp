import gulp from 'gulp';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

gulp.task('svgstore', function svg() {
    return gulp
        .src('src/images/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('build/images'));
});
