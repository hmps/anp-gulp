import autoprefixer from 'gulp-autoprefixer';
import chalk from 'chalk';
import glob from 'glob';
import gulp from 'gulp';
import nib from 'nib';
import rename from 'gulp-rename';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';



/**
 * Compile stylus source to CSS
 */
gulp.task('styles', function gulpStylus() {

    var path = getStyleImportPath();

    return gulp
        .src('src/stylesheets/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: nib(),
            import: ['nib', path + '/helpers/*.styl'],
            include: path,
            compress: false
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/stylesheets'))
        .pipe(size());
});



/**
 * Compile stylus source to minified CSS
 */
gulp.task('styles:min', function gulpStylusMin() {

    var path = getStyleImportPath();

    return gulp
        .src('src/stylesheets/*.styl')
        .pipe(stylus({
            use: nib(),
            import: ['nib', path + '/helpers/*.styl'],
            include: path,
            compress: false
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename(function rename(path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('src/stylesheets'))
        .pipe(size());
});


/**
 * Compile stylus source to minified CSS in dist/
 */
gulp.task('styles:dist', function gulpStylusMin() {

    var path = getStyleImportPath();

    return gulp
        .src('src/stylesheets/*.styl')
        .pipe(stylus({
            use: nib(),
            import: ['nib', path + '/helpers/*.styl'],
            include: path,
            compress: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(size());
});



/**
 * [getStyleImportPath description]
 * @return {[type]} [description]
 */
function getStyleImportPath() {
    var dir = glob.sync(process.cwd() + '/jspm_packages/apsis/stylus-helpers*');

    if ( !dir.length ) {
        console.log('');
        console.log(chalk.bold.red('>>>>> You have not installed Apsis stylus helpers. <<<<<<'));
        console.log(chalk.yellow('If you need them, run jspm install apsis:styles.'));
        console.log('');
    }

    return dir;
}

/**
 * [getStyleImportPath description]
 * @return {[type]} [description]
 */
function getStyleImportPath() {
    var packageDir = getPackageDir(require(process.cwd() + '/package.json')),
        dir = glob.sync(process.cwd() + '/' + packageDir + '/apsis/stylus-helpers*');

    if (!dir.length) {
        console.log('');
        console.log(chalk.bold.red('>>>>> You have not installed Apsis stylus helpers. <<<<<<'));
        console.log(chalk.yellow('If you need them, run jspm install apsis:styles.'));
        console.log('');
    }

    return dir;
}



function getPackageDir(pkgInfo) {
    var packageDir = 'jspm_packages';

    if ( !!pkgInfo.jspm ) {
        if ( !!pkgInfo.jspm.directories && !!pkgInfo.jspm.directories.packages ) {
            packageDir = pkgInfo.jspm.directories.packages;
        }
    } else if ( !!pkgInfo.directories && !!pkgInfo.directories.packages ) {
        packageDir = pkgInfo.directories.packages;
    } else {
        throw new Error('Can\t find package.json');
    }

    return packageDir;
}
