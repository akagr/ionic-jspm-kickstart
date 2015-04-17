var gulp = require('gulp');
var fs = require('fs');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

/* Installs cordova plugins and jspm packages */
gulp.task('install', function(done) {
    if(!sh.which('cordova')) return done(new Error('No \'cordova\' found in path.'));
    if(!sh.which('jspm')) return done(new Error('No \'jspm\' found in path.'));

    /* Install all cordova plugins */
    console.log('Installing cordova plugins..');
    var packageJSON  = require('./package.json');
    packageJSON.cordovaPlugins.forEach(function(plugin) {
        var pluginCmd = '';
        if(typeof plugin === 'string') {
            pluginCmd += plugin;
        } else {
            pluginCmd += plugin.locator + ' ';
            if(plugin.variables) {
                Object.keys(plugin.variables).forEach(function(variable){
                    pluginCmd += '--variable ' + variable + '="' + plugin.variables[variable] + '" ';
                });
            }
        }
        sh.exec('cordova plugin add ' + pluginCmd);
    });
    console.log('Finshed installing cordova plugins.');

    /* Install jspm packages */
    sh.exec('jspm install');

    done();
});
