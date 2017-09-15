var gulp = require('gulp'),
    pkg = require('./package.json');

var aws = require('gulp-awspublish'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    karma = require('karma').Server,
    minifyCss = require('gulp-minify-css'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    rename = require('gulp-rename'),
    squash = require('gulp-remove-empty-lines'),
    strip = require('gulp-strip-comments'),
    through2 = require('through2'),
    uglify = require('gulp-uglify');

// Style
var postcss = require('gulp-postcss'),
    postcss_cssnext = require('postcss-cssnext'),
    postcss_import = require('postcss-import'),
    postcss_reporter = require('postcss-reporter');

gulp.task('default', ['build', 'connect', 'watch']);

gulp.task('connect', ['build',], function () {
  return connect.server({
      root: [ __dirname, 'test', 'test/unit', 'test/demo' ],
      port: 9002
    });
});

gulp.task('build', [
  'build:script', 'build:minify-script',
  'build:styles', 'build:minify-styles'
]);

gulp.task('watch', ['build', 'test:browserify'], function() {
  gulp.watch([
      'lib/**/*.js',
      'gulpfile.js'
    ], ['build:minify-script', 'test:browserify']);
  gulp.watch([
      'style/*.css',
      'gulpfile.js'
    ], ['build:minify-styles']);
});

gulp.task('build:script', function(){
  return gulp.src('./lib/index.js')
    .pipe(through2.obj(function(file, enc, next){
      browserify(file.path)
        .bundle(function(err, res){
            if(err) { console.log(err.message); }
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(strip({ line: true }))
    .pipe(squash())
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:minify-script', ['build:script'], function(){
  return gulp.src('./dist/' + pkg.name + '.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:styles', function(){
  gulp.src('./style/index.css')
    .pipe(postcss([
      postcss_import(),
      postcss_cssnext(),
      postcss_reporter()
    ]))
    .pipe(rename(pkg.name + '.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:minify-styles', ['build:styles'], function(){
  gulp.src('./dist/' + pkg.name + '.css')
    .pipe(minifyCss({ compatibility: 'ie9' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

// ---------------------

gulp.task('test:unit', ['test:phantom', 'test:mocha']);

gulp.task('test:browserify', function(){
  return gulp.src('./test/unit/index.js')
    .pipe(through2.obj(function(file, enc, next){
      browserify(file.path)
        .bundle(function(err, res){
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(strip({ line: true }))
    .pipe(squash())
    .pipe(rename('browserified-tests.js'))
    .pipe(gulp.dest('./test/unit/build'));
});

gulp.task('test:mocha', ['test:browserify'], function () {
  return gulp.src('./test/unit/server.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 300 * 1000
    }));
});

gulp.task('test:phantom', ['test:browserify'], function () {
  return gulp.src('./test/unit/index.html')
    .pipe(mochaPhantomJS({
      mocha: {
        reporter: 'nyan',
        timeout: 300 * 1000
      }
    }))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test:karma', ['build', 'test:browserify'], function (done){
  new karma({
    configFile: __dirname + '/config-karma.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:sauce', ['build', 'test:browserify'], function(done){
  new karma({
    configFile: __dirname + '/config-sauce.js',
    singleRun: true
  }, done).start();
});

// ---------------------

gulp.task('deploy', ['build', 'test:mocha', 'test:karma', 'aws']);

gulp.task('aws', ['build'], function() {
  var cacheLife, publisher, headers;
  if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
    throw 'AWS credentials are required!';
  }
  cacheLife = (1000 * 60 * 60); // 1 hour (* 24 * 365)
  headers = {
    'Cache-Control': 'max-age=' + cacheLife + ', public'
  };
  publisher = aws.create({
    'accessKeyId': process.env.AWS_KEY,
    'secretAccessKey': process.env.AWS_SECRET,
    'params': {
      'Bucket': 'keen-js',
      'Expires': new Date(Date.now() + cacheLife)
    }
  });

  var jsHeaders = Object.assign({}, headers, {
    'Content-Type': 'application/javascript;charset=UTF-8'
  });

  var cssHeaders = Object.assign({}, headers, {
    'Content-Type': 'text/css'
  });

  gulp
    .src([
      './dist/' + pkg.name + '.js',
      './dist/' + pkg.name + '.min.js'
    ])
    .pipe(rename(function(path) {
      path.dirname += '/';
      var name = pkg.name + '-' + pkg.version;
      path.basename = (path.basename.indexOf('min') > -1) ? name + '.min' : name;
    }))
    .pipe(aws.gzip())
    .pipe(publisher.publish(jsHeaders, { force: true }))
    .pipe(publisher.cache())
    .pipe(aws.reporter());

  return gulp.src([
      './dist/' + pkg.name + '.css',
      './dist/' + pkg.name + '.min.css'
    ])
    .pipe(rename(function(path) {
      path.dirname += '/';
      var name = pkg.name + '-' + pkg.version;
      path.basename = (path.basename.indexOf('min') > -1) ? name + '.min' : name;
    }))
    .pipe(aws.gzip())
    .pipe(publisher.publish(cssHeaders, { force: true }))
    .pipe(publisher.cache())
    .pipe(aws.reporter());

});
