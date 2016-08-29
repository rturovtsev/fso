'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');


module.exports = function (options) {
	return function () {
		return multipipe(
			gulp.src(options.src),
			$.sourcemaps.init(),
			$.stylus({
				'include css': true
			}),
			$.autoprefixer({
	            browsers: [
	                '> 1%',
	                'last 2 versions',
	                'IE 8',
	                'IE 9',
	                'IE 10',
	                'IE 11'
	                ]
	        }),
			$.sourcemaps.write(),
			gulp.dest(options.dest)
		).on('error', $.notify.onError());
	};
};