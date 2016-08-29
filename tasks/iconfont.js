'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const runTimestamp = Math.round(Date.now()/1000);


module.exports = function(options) {
	return function() {
	    return gulp.src(options.src)
			.pipe($.iconfontCss({
				fontName: 'iconfont',
				path: options.tpl,
				targetPath: options.css,
				fontPath: options.dest
			}))
			.pipe($.iconfont({
				fontName: 'iconfont',
				normalize: true,
				prependUnicode: true,
				formats: ['ttf', 'eot', 'woff', 'svg'],
				timestamp: runTimestamp
			 }))
			.pipe(gulp.dest(options.dest));
	};
};