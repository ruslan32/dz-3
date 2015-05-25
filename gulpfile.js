var gulp = require("gulp"),
	connect = require("gulp-connect"),
	jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	opn = require("opn");

// Запуск сервера
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true,
		port: 8888
	});
	opn('http://localhost:8888');
});
// Работа с html
gulp.task('html', function () {
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

// Работа с css
gulp.task('css', function () {
	gulp.src('app/css/*.css')
	.pipe(connect.reload());
});

// Работа с js
gulp.task('js', function () {
	gulp.src('app/js/*.js')
	.pipe(connect.reload());
});

// Работа с jade
gulp.task('jade', function() {
    gulp.src('app/jade/page/*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log)
        .pipe(gulp.dest('app/'))
        .pipe(connect.reload());
});

//Работа с sass
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/./css'));
});

// Слежка
gulp.task('watch', function () {
	gulp.watch(['app/*.html'], ['html']);
	gulp.watch(['app/css/*.css'], ['css']);
	gulp.watch(['app/js/*.js'], ['js']);
	gulp.watch(['app/jade/page/*.jade'], ['jade']);
	gulp.watch('sass/*.scss', ['sass']);
});


// Задача по-умолчанию 
gulp.task('default', ['connect', 'watch']);