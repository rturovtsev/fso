'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function (options) {
	return function() {
	    return gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
	    	.pipe($.newer(options.dest))
	        .pipe($.rigger())
	        .pipe(gulp.dest(options.dest));
	};
};