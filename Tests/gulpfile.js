var gulp = require('gulp');
var ncp = require('child_process');

gulp.task('unittest', () => {
  return new Promise(function (resolve, reject) {
    var options = {
      stdio: 'inherit',
    };
    ncp.exec('npm test unit_tests/*.js', options);
    resolve();
  });
});

gulp.task('functionaltest', () => {
  return new Promise(function (resolve, reject) {
    var webAppUrl,
      indexOfWebAppUrlOption = process.argv.indexOf('--webAppUrl');
    if (indexOfWebAppUrlOption > -1) {
      webAppUrl = process.argv[indexOfWebAppUrlOption + 1];
    }

    process.env['webAppUrl'] = webAppUrl;
    var options = {
      stdio: 'inherit',
    };
    ncp.exec('npm test functional_tests/*.js', options);
    resolve();
  });
});
