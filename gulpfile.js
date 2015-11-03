var gulp = require('gulp'),
    pkg = require('./package.json');

// aws = require('gulp-awspublish'),

var browserify = require('browserify'),
    connect = require('gulp-connect'),
    compress = require('gulp-yuicompressor'),
    del = require('del'),
    karma = require('karma').server,
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    // moment = require('moment'),
    rename = require('gulp-rename'),
    squash = require('gulp-remove-empty-lines'),
    strip = require('gulp-strip-comments'),
    transform = require('vinyl-transform');

// gulp.task('build', ['build:browserify', 'build:minify']);

gulp.task('default', ['test:unit']);

gulp.task('test:unit', ['test-with-mocha']);

// gulp.task('test:clean', function (callback) {
//   del(['./test/unit/build'], callback);
// });
//
// gulp.task('test:build', ['test:clean'], function () {
//   return gulp.src('./test/unit/index.js')
//     .pipe(transform(function(filename) {
//       var b = browserify(filename);
//       return b.bundle();
//     }))
//     .pipe(rename('browserified-tests.js'))
//     .pipe(gulp.dest('./test/unit/build'));
// });

gulp.task('test-with-mocha', function () {
  return gulp.src('./test/unit/server.js', { read: false })
  .pipe(mocha({ reporter: 'nyan' }));
});

// gulp.task('test-with-phantom', ['build', 'test:prepare'], function () {
//   return gulp.src('./test/unit/index.html')
//     .pipe(mochaPhantomJS());
// });
//
// gulp.task('test-with-karma', ['build', 'test:prepare'], function (done){
//   karma.start({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done);
// });
