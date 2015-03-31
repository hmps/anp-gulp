import gulp from 'gulp';
import svgstore from 'svgstore';
import svgmin from 'svgmin';

gulp.task('svgstore', function svg() {
    return gulp
        .src('src/images/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('build/images'));
});
