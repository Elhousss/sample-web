'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var rename = require('gulp-rename');
var print = require('gulp-print');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }).on('error', gutil.log))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'sample',
      root: 'app'
    }).on('error', gutil.log))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions).on('error', gutil.log))
    .pipe($.useref().on('error', gutil.log))
    .pipe(jsFilter.on('error', gutil.log))
    .pipe($.sourcemaps.init().on('error', gutil.log))
    .pipe($.ngAnnotate().on('error', gutil.log))
    .pipe($.uglify({ mangle: false, compress:true, output: { beautify: false }, preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev().on('error', gutil.log))
    .pipe($.sourcemaps.write('maps').on('error', gutil.log))
    .pipe(jsFilter.restore.on('error', gutil.log))
    .pipe(cssFilter.on('error', gutil.log))
    // .pipe($.sourcemaps.init())
    .pipe($.cssnano().on('error', gutil.log))
    .pipe($.rev().on('error', gutil.log))
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore.on('error', gutil.log))
    .pipe($.revReplace().on('error', gutil.log))
    .pipe(htmlFilter.on('error', gutil.log))
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }).on('error', gutil.log))
    .pipe(htmlFilter.restore.on('error', gutil.log))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }).on('error', gutil.log));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}').on('error', gutil.log))
    .pipe($.flatten().on('error', gutil.log))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js}')
  ])
    .pipe(fileFilter.on('error', gutil.log))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('settings_build', function(){
  gulp.src('settings_web_project')
    .pipe(rename({ basename: 'settings.constant.js'}).on('error', gutil.log))
    .pipe(gulp.dest(conf.paths.src+'/app/common'));
});

gulp.task('clean', ['settings_build'], function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other']);
