const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat')

/*Top level functions
gulp.task - define task
gulp.scr - point to files to use
gulp.dest - points to folder to ouput
gulp.watch - watch files and folders for changes

*/

//logs message
gulp.task('message', function(done) {
    console.log("yeah gulp is running");
    done();
});
//  gulp.task('default', function(done) {
//     console.log("yeah gulp is running");
//     done();
// });

//copy all html files
gulp.task('copyHtml', function(done) {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

//optimize image
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

//minify js
gulp.task('minify',function(done) {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done()
});

//compile sass
gulp.task('sass',function(done) {
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    done();
})

//all task together
gulp.task('default',
gulp.series('message','copyHtml','imageMin', 'sass', ));

// 
//scripts
gulp.task('new', function(done) {
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
})

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/images/*', ['imageMin']);
})
