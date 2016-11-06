const gulp = require('gulp');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const postcssModules = require('postcss-modules');
const babel = require('gulp-babel');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const CSS_MAP_FILE_NAME = 'buildCssMap';

const src = {
    componentsStyl:   '../app/components/*/*.styl',
    cssMap: `../app/components/**/${CSS_MAP_FILE_NAME}.js`,
    common: '../app/components/common.styl',
    variables: '../app/components/variables.json',
    build: '../build',
    base: '../app'
};

gulp.task('components-styl', () => {
    return gulp
        .src(src.componentsStyl, {base: src.base})
        .pipe(stylus())
        .on('error', handleError)
        .pipe(postcss([
            postcssModules({
                getJSON: getJSON,
                generateScopedName: config.isDevMode ? '[name]__[local]' : '[hash:base64:8]'
            })
        ]))
        .on('error', handleError)
        .pipe(gulp.dest(src.build))
});

gulp.task('css-map', () => {
    return gulp
        .src(src.cssMap, {base: src.base})
        .pipe(babel({
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .on('error', handleError)
        .pipe(gulp.dest(src.build))
});

gulp.task('common', () => {
    return gulp
        .src(src.common, {base: src.base})
        .pipe(stylus())
        .on('error', handleError)
        .pipe(postcss([
            postcssModules({
                getJSON: getJSON,
                scopeBehaviour: 'global'
            })
        ]))
        .on('error', handleError)
        .pipe(gulp.dest(src.build))
});

gulp.task('variables', () => {
    return gulp
        .src(src.variables, {base: src.base})
        .pipe(gulp.dest(src.build))
});

gulp.task('components', gulp.series('components-styl', 'css-map'));

gulp.task('styles', gulp.parallel('components', 'common', 'variables'));

gulp.task('watch-styles', () => {
    gulp.watch(src.componentsStyl, gulp.parallel('components'));
    gulp.watch(src.common, gulp.parallel('common'));
    gulp.watch(src.variables, gulp.parallel('variables'));
});


function handleError(err) {
    console.error(err);
    this.end();
}

function getJSON (cssFilePath, json) {
    const baseName = path.basename(cssFilePath, '.css');
    const dirName = path.dirname(cssFilePath);
    const cssMapPath = path.join(dirName, CSS_MAP_FILE_NAME + '.js');
    const fileContent = getCssMapFileContent(baseName, json);
    fs.writeFileSync(cssMapPath, fileContent);
}

function getCssMapFileContent(baseName, map) {
    return `if (typeof window !== 'undefined') {
    require('./${ baseName }.css');
}

export default ${ JSON.stringify(map) };`;
}
