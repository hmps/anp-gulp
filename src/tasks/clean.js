import gulp from 'gulp';
import del from 'del';

gulp.task('clean', ['clean:build']);

gulp.task('clean:build', function (cb) {
    del(['dist/build/**'], cb);
});