import gulp from 'gulp';
import header from 'header';
import size from 'size';
import pkg from 'pkg';

gulp.task('release', ['build:js', 'styles:min'], function gulpBuild() {
    var banner = getBannerText();

    gulp.src('build/*.js')
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
        .pipe(size());

    gulp.src('build/javascript/*.js')
        .pipe(gulp.dest('dist/javascript'))
        .pipe(size());

    gulp.src('build/stylesheets/*.min.css')
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(size());

    gulp.src('src/templates/*.html')
        .pipe(gulp.dest('dist/templates'))
        .pipe(size());

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

function getBannerText() {
    return `/**,
* <%= pkg.name %> - <%= pkg.description %>,
* @version v<%= pkg.version %>,
* @author  <%= pkg.author %>,
*/`;
}
