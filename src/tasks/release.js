import gulp from 'gulp';
import header from 'gulp-header';
import size from 'gulp-size';
import bump from 'gulp-bump';
import git from 'gulp-git';

gulp.task('tag', (done) => {
    var pkg = require(process.cwd() + '/package.json'),
        v = 'v' + pkg.version,
        message = 'Release ' + v;

    gulp.src('./*')
        .pipe(git.commit(message))
        .pipe(gulp.dest('./'))
        .on('end', tag);

    function tag () {
        git.tag(v, message);
        git.push('origin', 'master', { args: '--tags' });
        done();
    }
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
