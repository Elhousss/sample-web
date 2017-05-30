'use strict';
var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');

gulp.task('settings_mock', function(){
  gulp.src('settings_mock')
    .pipe(rename({ basename: 'settings.constant.js'}))
    .pipe(gulp.dest('src/app/common'));
});

gulp.task('nodemon', ['settings_mock'], function(callback) {
  var started = false;
  return nodemon({
    script : 'server/server.js',
    ext    : 'html js',
    env    : {
      NODE_ENV    : 'development',
      SERVER_PORT : 3010
    },
    watch  : 'server/**/*'
  })
    .on('start', function() {
      if (!started) {
        callback();
        started = true;
        console.log('Server started!');
      }
    })
    .on('restart', function() {
      console.log('Server restarted!');
    });
});
