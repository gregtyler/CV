var gulp = require('gulp');
var del = require('del');
var inlinesource = require('gulp-inline-source');

// Error handling
function handleError(err) {
  console.error(err.message);
  this.emit('end');
}

gulp.task('clean', function () {
  return del('public');
});

gulp.task('build', function () {
  return gulp.src('src/index.html')
    .pipe(inlinesource().on('error', handleError))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
