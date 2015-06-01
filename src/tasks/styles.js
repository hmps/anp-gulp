import autoprefixer from 'gulp-autoprefixer';
import chalk from 'chalk';
import glob from 'glob';
import gulp from 'gulp';
import nib from 'nib';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import lost from 'lost';
import postcss from 'gulp-postcss';


var uiComponentsPath = getStyleImportPath(),
    importPaths = ['nib', uiComponentsPath + '/helpers/*.styl', uiComponentsPath + '/settings/*.styl'];


/**
 * Compile stylus source to CSS
 */
gulp.task('styles', function gulpStylus() {

    return gulp
        .src('src/stylesheets/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: nib(),
            import: importPaths,
            include: uiComponentsPath,
            compress: false
        }))
        .pipe(postcss([
          lost()
        ]))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/stylesheets'))
        .pipe(size());
});


/**
 * Compile stylus source to minified CSS in dist/
 */
gulp.task('styles:dist', function gulpStylusMin() {

    return gulp
        .src('src/stylesheets/*.styl')
        .pipe(stylus({
            use: nib(),
            import: importPaths,
            include: uiComponentsPath,
            compress: true
        }))
        .pipe(postcss([
          lost(),
          autoprefixer('last 2 versions')
        ]))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(size());
});



/**
 * [getStyleImportPath description]
 * @return {[type]} [description]
 */
function getStyleImportPath() {
    var packageDir = getPackageDir(require(process.cwd() + '/package.json')),
        dir = glob.sync(process.cwd() + '/' + packageDir + '/apsis/UI-components*/');

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
