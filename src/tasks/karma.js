import gulp from 'gulp';
import {server} from 'karma';

gulp.task('test', ['karma'], function() {});

gulp.task('karma', function karmaTask() {
    // We expect the config file to be in /test
    var configFile = process.cwd() + '/test/karma.conf.js';

    return new Promise((resolve) =>
        server.start({configFile}, resolve)
    );
});