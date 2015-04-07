import chalk from 'chalk';
import complexity from 'complexity';
import gulp from 'gulp';
import jscs from 'jscs';
import jshint from 'jshint';
import notify from 'notify';
import rename from 'rename';
import size from 'size';
import uglify from 'uglify';

    // To get to the root package.json we have to go three steps back up.
    // TODO: Fix the pattern glob here.
    // moduleName = global.MODULE_PKG.name.match(/ng-(.*)/)[1];


/**
 * Lint all files in src/javascript using JSHint and JSCS.
 *
 * Config for both are found in .jshintrc and .jscsrc respectively.
 */
gulp.task('lint:all', ['lint:jshint', 'lint:jscs'], function gulpLint() {
    return gulp.src([
            'src/javascript/**/*.js'
        ])
        .pipe(size());
});



/**
 * Lint all files in src/javascript using JSHint.
 *
 * Config for both are found in .jshintrc and .jscsrc respectively.
 */
gulp.task('lint:jshint', function gulpJshint() {
    return gulp.src([
            'modules/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError(function onError(error) {
            return error.message;
        }));
});



/**
 * Lint all files in src/javascript using JSCS.
 *
 * Config for both are found in .jshintrc and .jscsrc respectively.
 */
gulp.task('lint:jscs', function gulpJscs() {
    return gulp.src([
            'modules/**/*.js'
        ])
        .pipe(jscs())
        .on('error', notify.onError(function onError(error) {
            return error.message;
        }));
});


/**
 * Complexity analysis of Javascript, using complexity report.
 *
 * Read more: https://github.com/philbooth/complexityReport.js
 */
gulp.task('complexity', function gulpComplexity() {
    console.log(chalk.yellow('Maintainability index: 171 is perfect, below 65 is unmaintainable.'));
    console.log(chalk.blue('Read more: jscomplexity.org/complexity'));

    return gulp.src('src/javascript/**/*.js')
        .pipe(complexity());
});



/**
 * Build a package file of javascript in src/javascript
 */
gulp.task('build:js', function gulpPackageJs() {

    gulp.src('src/*.module.js')
        .pipe(gulp.dest('dist'));

    return gulp.src([
            'src/javascript/**/*.js',
        ])
        .pipe(gulp.dest('dist/javascript'))
        .pipe(size());
});



/**
 * Build a minified version of the source.
 *
 * This makes a minified copy of the file that is built by task build:js.
 */
gulp.task('build:jsmin', ['build:js'], function gulpPackageJs() {
    return gulp.src('dist/javascript/**/*.js')
        .pipe(size())
        .pipe(uglify())
        .pipe(rename(function rename(path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('build/javascript'))
        .pipe(size());
});

