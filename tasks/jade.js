'use strict';

const fs = require('fs');
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


function concatModulesData() {
    let dataEntry;
    let readyModulesData;

    try {
        dataEntry = fs.readFileSync('./tmp/modulesData.js', 'utf8');
    } catch (er) {
        dataEntry = false;
    }

    if (dataEntry) {
        eval('readyModulesData = {' + dataEntry + '}');
    } else {
        readyModulesData = '{}';
    }

    return readyModulesData;
}


module.exports = function (options) {
	return function() {
	    return gulp.src(options.src)
	    	.pipe($.newer(options.dest))
	    	.pipe($.jade({
	            pretty: true,
	            locals: concatModulesData()
	        }))
	        .pipe(gulp.dest(options.dest));
	};
};