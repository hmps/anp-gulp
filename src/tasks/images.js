import gulp from 'gulp';
import size from 'gulp-size';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

gulp.task('images', ['images:dist'], function() {});

gulp.task('images:dist', ['images:svg'], () => {
    return gulp.src([
            'src/images/**/*.png',
            'src/images/**/*.gif',
            'src/images/**/*.jpg',
            'src/images/**/*.jpeg',
            'src/images/**/*.webp'
        ])
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});


gulp.task('images:svg', function svg() {
    return gulp
        .src('src/images/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('dist/images'));
});
