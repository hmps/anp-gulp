import gulp from 'gulp';
import {server} from 'karma';

// We expect the config file to be in /test
var configFile = process.cwd() + '/test/karma.conf.js';

gulp.task('karma', function karmaTask() {
    return new Promise((resolve) =>
        server.start({configFile}, resolve)
    );
});