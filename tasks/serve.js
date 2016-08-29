'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync');


module.exports = function(options) {
	return function() {
		browserSync.init({
			server: options.dest
		});

		browserSync.watch(options.watch).on('change', browserSync.reload);
	};
};