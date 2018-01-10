var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();



/*
-- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/


// its open the browsersync in the default browser 
gulp.task('bsync', function(){
   browserSync.init({
        server: "./dist"
    });
});


// Copy All HTML files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')    // thats going to copy all the file ends with .html
      .pipe(gulp.dest('dist'))  // and copy to dist folder
      .pipe(browserSync.stream()); 
});

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

/*
// Minify JS
gulp.task('minify', function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});
*/

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
      browsers: ['last 2 versions']
       }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream()); 
      
});

// Scripts
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream()); 
});


gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});

gulp.task('default', ['copyHtml', 'imageMin', 'sass', 'watch', 'bsync', 'scripts']);


