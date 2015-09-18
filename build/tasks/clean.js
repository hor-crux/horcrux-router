var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');

/**
 * Delete all files in output folder
 */
gulp.task('clean', function() {
  return del([paths.output]);
});
