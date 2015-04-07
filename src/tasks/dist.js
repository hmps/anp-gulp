import gulp from 'gulp';
import bump from 'gulp-bump';

gulp.task('build', ['build:js', 'styles:min'], function gulpBuild() {});

gulp.task('bump', function() {
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

