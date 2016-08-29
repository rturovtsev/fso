'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const now = new Date;
const date = now.getDate().toString() + '_' + (now.getMonth() + 1).toString() + '_' +  now.getFullYear();


module.exports = function (options) {
	return function() {
	    return gulp.src(options.src)
		.pipe($.zip(date + '.zip'))
		.pipe(gulp.dest(options.dest));
	};
};