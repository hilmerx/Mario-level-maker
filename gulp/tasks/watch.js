const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()


gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
    notify: false,
    open: false
  })
})

// watch function

gulp.task('watch', ['browserSync'], () => {

  watch('./public/css/**/*.css', () => { gulp.start('cssInject') })
  watch('./public/js/**/*.js', () => {
    browserSync.reload()
  } )
  watch('./public/levels/**/*.json', () => {
    browserSync.reload()
  } )
  watch('./public/*.html', () => {
    browserSync.reload()
  } )

})

// cssInject function
gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})
