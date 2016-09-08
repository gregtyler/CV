var gulp = require('gulp');
var del = require('del');
var ftp = require('vinyl-ftp');
var inlinesource = require('gulp-inline-source');

var secret = require('./secret.json');

// Error handling
function handleError(err) {
  console.error(err.message);
  this.emit('end');
}

gulp.task('clean', function () {
  return del('build');
});

gulp.task('deploy', ['build'], function () {
  var conn = ftp.create({
    host: secret.host,
    user: secret.user,
    password: secret.password
  });

  return gulp.src('build/index.html')
    .pipe(conn.dest(secret.path));
});

gulp.task('build', function () {
  return gulp.src('src/index.html')
    .pipe(inlinesource().on('error', handleError))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);