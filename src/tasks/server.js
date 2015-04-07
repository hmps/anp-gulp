import gulp from 'gulp';
import browserSync from 'browserSync';

gulp.task('bs', ['watch'], function () {
    browserSync({
        server: {
            baseDir: './'
        },
        startPath: 'demo/',
        files: [
            'demo/*.html',
            'demo/*.js',
            'src/javascript/*.js',
            'src/images/**/*',
            'src/templates/*.html',
            'src/stylesheets/*.css'
        ],
        browser: ['google chrome canary']
    });
});
