import gulp from 'gulp';
import header from 'gulp-header';
import size from 'gulp-size';
import bump from 'gulp-bump';

// git tag
// git commit

gulp.task('release', () => {
    // Since this is dynamic we need to use a regular old require here
    var banner = getBannerText(require(process.cwd() + '/package.json'));

    gulp.src('dist/stylesheets/*.css')
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(size());

    gulp.src('dist/*.module.js')
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
        .pipe(size());

});

gulp.task('bump', function() {
    bumpHelper({});
});

    gulp.task('bump:patch', function() {
        bumpHelper({});
    });

    gulp.task('bump:minor', function() {
        bumpHelper({type: 'minor'});
    });

    gulp.task('bump:major', function() {
        bumpHelper({type: 'major'});
    });

    function bumpHelper(_options) {
        return gulp.src('./package.json')
          .pipe(bump(_options))
          .pipe(gulp.dest('./'));
    }


/**
 * Return a formatted string to put in the banner.
 * @return {[type]} [description]
 *
 * @todo Check that all params exist in package.json
 */
function getBannerText(pkg) {
    return `/**,
* <%= pkg.name %> - <%= pkg.description %>,
* @version v<%= pkg.version %>,
* @author  <%= pkg.author %>,
*/
`;
}
