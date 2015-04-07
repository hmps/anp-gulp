import gulp from 'gulp';
import size from 'gulp-size';

gulp.task('images:dist', () => {
    gulp.src([
            'src/images/**/*.png',
            'src/images/**/*.gif',
            'src/images/**/*.jpg',
            'src/images/**/*.jpeg',
            'src/images/**/*.webp',
            'src/images/**/*.svg'
        ])
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});