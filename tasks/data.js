'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function (options) {
	return function() {
	    return gulp.src(options.src)
            .pipe($.concat('modulesData.js', { newLine: ',\n\n' }))
            .pipe(gulp.dest(options.dest));
	};
};