require('./styles');
require('./js');

const gulp = require('gulp');


gulp.task('default', gulp.parallel('js', 'styles'));

gulp.task('watch', gulp.parallel('watch-js', 'watch-styles'));
