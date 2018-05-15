var gulp = require('gulp'),
    pkg = require('./package.json');

var aws = require('gulp-awspublish'),
    browserify = require('browserify'),
    karma = require('karma').Server,
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    squash = require('gulp-remove-empty-lines'),
    strip = require('gulp-strip-comments'),
    through2 = require('through2');

// ---------------------

gulp.task('test:unit', ['test:mocha']);

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

gulp.task('aws', function() {
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
