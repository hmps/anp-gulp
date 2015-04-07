import gulp from 'gulp';
import del from 'del';

gulp.task('clean', ['clean:dist']);

gulp.task('clean:dist', function (cb) {
    return del(['dist'], cb);
});