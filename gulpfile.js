var gulp = require('gulp');
var del = require('del');
var ftp = require('vinyl-ftp');
var inlinesource = require('gulp-inline-source');

var secret = require('./secret.json');

gulp.task('default', ['deploy'], function () {
  return del('build');
});

gulp.task('deploy', ['createfile'], function () {
  var conn = ftp.create({
    host: secret.host,
    user: secret.user,
    password: secret.password
  });

  return gulp.src('build/index.html')
    .pipe(conn.dest(secret.path));
});

gulp.task('createfile', function () {
  return gulp.src('src/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('build'));
});