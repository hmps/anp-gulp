import chalk from 'chalk';
import gulp from 'gulp';
import complexity from 'gulp-complexity';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import size from 'gulp-size';
import uglify from 'gulp-uglify';

    // To get to the root package.json we have to go three steps back up.
    // TODO: Fix the pattern glob here.
    // moduleName = global.MODULE_PKG.name.match(/ng-(.*)/)[1];


gulp.task('lint', ['lint:all'], function() {});


/**
 * Lint all files in src/javascript using JSHint and JSCS.
 *
 * Config for both are found in .jshintrc and .jscsrc respectively.
 */
gulp.task('lint:all', ['lint:jshint', 'lint:jscs'], function gulpLint() {});



/**
 * Lint all files in src/javascript using ESLint.
 *
 * Config is found in .eslint.
 */
gulp.task('lint:eslint', () => {
    return gulp.src([
        'src/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
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
gulp.task('js:dist', function gulpPackageJs() {

    gulp.src('src/*.module.js')
        .pipe(gulp.dest('dist'));

    return gulp.src([
            'src/javascript/**/*.js',
        ])
        .pipe(gulp.dest('dist/javascript'))
        .pipe(size());
});
