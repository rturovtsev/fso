'use strict';

const gulp = require('gulp');
const path = require('./config_path');


function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}


lazyRequireTask('html', './tasks/html.js', {
    src: path.src.html,
    dest: path.build.html
});

lazyRequireTask('jade', './tasks/jade.js', {
    src: path.src.jade,
    dest: path.build.html
});

lazyRequireTask('js', './tasks/js.js', {
    src: path.src.js,
    dest: path.build.js
});

lazyRequireTask('iconfont', './tasks/iconfont.js', {
    src: path.src.svg_icons,
    tpl: path.src.svg_css_tpl,
    css: path.src.svg_css,
    dest: path.build.svg_font
});

lazyRequireTask('stylus', './tasks/stylus.js', {
    src: path.src.styleStylus,
    vend: path.src.styleStylusVendor,
    dest: path.build.css
});

lazyRequireTask('stylus:all', './tasks/stylus_all.js', {
    src: path.src.styleStylus,
    vend: path.src.styleStylusVendor,
    dest: path.build.css
});

lazyRequireTask('svg', './tasks/svg.js', {
    src: path.src.svg,
    dest: path.build.svg
});

lazyRequireTask('fonts', './tasks/fonts.js', {
    src: path.src.fonts,
    dest: path.build.fonts
});

lazyRequireTask('img', './tasks/img.js', {
    src: path.src.img,
    dest: path.build.img
});

lazyRequireTask('assets:js', './tasks/assets.js', {
    src: path.assets.js.src,
    dest: path.assets.js.dest
});

lazyRequireTask('assets:fonts', './tasks/assets.js', {
    src: path.assets.fonts.src,
    dest: path.assets.fonts.dest
});

lazyRequireTask('del', './tasks/del.js', {
    dest: path.clean
});

lazyRequireTask('serve', './tasks/serve.js', {
    dest: path.server.dest,
    watch: path.watch.server
});

lazyRequireTask('zip', './tasks/zip.js', {
    src: path.zip.src,
    dest: path.zip.dest
});

lazyRequireTask('ssh', './tasks/ssh.js', {
    src: path.ssh.src,
    host: path.ssh.host,
    user: path.ssh.user,
    pass: path.ssh.pass,
    remotePath: path.ssh.remotePath
});

lazyRequireTask('data', './tasks/data.js', {
    src: path.src.data,
    dest: path.build.data
});

gulp.task('watch', function() {
	gulp.watch(path.watch.styleStylus, gulp.series('stylus'));
	gulp.watch(path.watch.svg, gulp.series('svg'));
	gulp.watch(path.watch.fonts, gulp.series('fonts'));
	gulp.watch(path.watch.img, gulp.series('img'));
	gulp.watch(path.watch.html, gulp.series('html'));
	gulp.watch(path.watch.jade, gulp.series('jade'));
	gulp.watch(path.watch.js, gulp.series('js'));
	gulp.watch(path.assets.js.src, gulp.series('assets:js'));
	gulp.watch(path.assets.fonts.src, gulp.series('assets:fonts'));
    gulp.watch(path.watch.svg_icons, gulp.series('iconfont', 'stylus:all'));
	gulp.watch(path.watch.data, gulp.series('data', 'jade'));
});


gulp.task('build', gulp.series('del', 'data', gulp.parallel('html', 'jade', 'stylus', 'assets:js', 'js', 'svg', 'assets:fonts', 'fonts', 'img')));

gulp.task('archive', gulp.series('build', 'zip'));

gulp.task('deploy', gulp.series('build', 'ssh'));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));