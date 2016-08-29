'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function (options) {
    if (isDevelopment) {
        return function () {
            return multipipe(
                gulp.src([options.src, options.vend]),
                $.if('**/main.styl', $.sourcemaps.init()),
                $.stylus({
                    'include css': true
                }),
                $.if('**/main.css', $.sourcemaps.write()),
                gulp.dest(options.dest)
            ).on('error', $.notify.onError());
        };
    } else {
        return function () {
            return multipipe(
                gulp.src([options.src, options.vend]),
                $.stylus({
                    'include css': true
                }),
                $.if('**/main.css', $.autoprefixer({
                    browsers: [
                        'last 6 versions',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ]
                })),
                gulp.dest(options.dest)
            ).on('error', $.notify.onError());
        };
    }
};