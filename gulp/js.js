const gulp = require('gulp');
const babel = require('gulp-babel');


const src = {
    js: [
        '../app/**/*.js',
        '!../app/**/build*.js'
    ],
    build: '../build',
    base: '../app/'
};

gulp.task('js', () =>
    gulp
        .src(src.js, {base: src.base})
        .pipe(babel({
            presets: ['react'],
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .on('error', handleError)
        .pipe(gulp.dest(src.build))
);

gulp.task('watch-js', () =>
    gulp.watch(src.js, gulp.parallel('js'))
);


function handleError(err) {
    console.error(err);
    this.end();
}
