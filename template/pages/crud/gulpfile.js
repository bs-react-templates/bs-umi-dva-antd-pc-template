const gulp = require('gulp');
var gulp_rename = require('gulp-rename');
var gulp_ejs = require('gulp-ejs');
const exec = require('child_process').exec;
var clean = require('gulp-clean');
const path = require('path');
const src = path.join(__dirname);
gulp.task('gulptask', (cb) => {
  return exec(`genercode --config ${__dirname}/config.json`, (err, stdout, stderr) => {
    if (err) {return err}
    if(!stdout){
      return;
    }
    var stdoutObj = JSON.parse(stdout);
    gulp
    .src([src + '/**/*.ejs','!node_modules/**/*'])
    .pipe(gulp_ejs(stdoutObj))
    .pipe(clean({force: true}))
    .pipe(
			gulp_rename(path => {
				path.extname = '.js';
			})
    )
    .pipe(gulp.dest(src))
  })
})
gulp.task('default', ['gulptask'])