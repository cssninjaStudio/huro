'use strict';
const { src, dest, watch, series } = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const bourbon = require('node-bourbon').includePaths;
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const del = require('del');
const panini = require('panini');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const prettyHtml = require('gulp-pretty-html');
const sassLint = require('gulp-sass-lint');
const htmllint = require('gulp-htmllint');
const jshint = require('gulp-jshint');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const accessibility = require('gulp-accessibility');
const babel = require('gulp-babel');
const nodepath = 'node_modules/';
const packageJson = require('./package.json')

sass.compiler = require('sass');

// ------------ SETUP TASKS -------------
// Copy Bulma filed into Bulma development folder
function setupBulma() {
  console.log('---------------COPYING BULMA FILES---------------');
  return src([nodepath + 'bulma/*.sass', nodepath + 'bulma/**/*.sass'])
    .pipe(dest('src/assets/sass/'));
}

// ------------ DEVELOPMENT TASKS -------------

// COMPILE SCSS INTO CSS
function compileSCSS() {
  console.log('---------------COMPILING SCSS---------------');
  return src(['src/assets/scss/main.scss'])
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: true,
      sourceMap: true,
      includePaths: bourbon
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// USING PANINI, TEMPLATE, PAGE AND PARTIAL FILES ARE COMBINED TO FORM HTML MARKUP
function compileHTML() {
  console.log('---------------COMPILING HTML WITH PANINI---------------');
  panini.refresh();
  return src('src/pages/**/*.html')
    .pipe(replace('{{PACKAGE_VERSION}}', packageJson.version))
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      /*pageLayouts: {
        //All pages inside src/pages/blog will use the blog.html layout
        'blog': 'blog'
      }*/
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// COPY CUSTOM JS
function compileJS() {
  console.log('---------------COMPILE CUSTOM JS---------------');
  return src([
    'src/assets/js/functions.js',
    'src/assets/js/main.js',
    'src/assets/js/popover.js',
    'src/assets/js/touch.js',
    'src/assets/js/widgets.js',
    'src/assets/js/_demo/landing.js',
    'src/assets/js/_demo/components.js',
    'src/assets/js/_demo/syntax.js',
    'src/assets/js/layouts/auth/auth.js',
    'src/assets/js/dashboards/personal-1.js',
    'src/assets/js/dashboards/personal-2.js',
    'src/assets/js/dashboards/personal-3.js',
    'src/assets/js/dashboards/finance-1.js',
    'src/assets/js/dashboards/finance-2.js',
    'src/assets/js/dashboards/finance-3.js',
    'src/assets/js/dashboards/banking-1.js',
    'src/assets/js/dashboards/banking-2.js',
    'src/assets/js/dashboards/banking-3.js',
    'src/assets/js/dashboards/business-1.js',
    'src/assets/js/dashboards/business-2.js',
    'src/assets/js/dashboards/lifestyle-1.js',
    'src/assets/js/dashboards/lifestyle-2.js',
    'src/assets/js/dashboards/lifestyle-3.js',
    'src/assets/js/dashboards/ecommerce-1.js',
    'src/assets/js/dashboards/apps-1.js',
    'src/assets/js/dashboards/apps-2.js',
    'src/assets/js/dashboards/map-1.js',
    'src/assets/js/dashboards/charts/apex.js',
    'src/assets/js/dashboards/charts/billboardjs.js',
    'src/assets/js/dashboards/charts/apex-data.js',
    'src/assets/js/forms/forms.js',
    'src/assets/js/wizard/wizard-v1.js',
    'src/assets/js/wizard/wizard-dropzone.js',
    'src/assets/js/layouts/list-views/list-view.js',
    'src/assets/js/layouts/flex-lists/flex-list.js',
    'src/assets/js/layouts/datatables/datatables.js',
    'src/assets/js/layouts/user-grids/user-grid.js',
    'src/assets/js/layouts/card-grids/card-grid.js',
    'src/assets/js/layouts/tile-grids/tile-grid.js',
    'src/assets/js/layouts/user-pages/profile.js',
    'src/assets/js/layouts/projects/project.js',
    'src/assets/js/layouts/projects/board.js',
    'src/assets/js/layouts/generic/saas-billing.js',
    'src/assets/js/layouts/messaging/messaging.js',
    'src/assets/js/layouts/messaging/messaging-webapp.js',
  ])
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('dist/assets/js/'))
    .pipe(browserSync.stream());
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
  console.log('---------------CLEARING PANINI CACHE---------------');
  panini.refresh();
  done();
}

// SASS LINT
function scssLint() {
  console.log('---------------SASS LINTING---------------');
  return src('src/assets/scss/**/*.scss')
    .pipe(sassLint({
      configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

// HTML LINTER
function htmlLint() {
  console.log('---------------HTML LINTING---------------');
  return src('dist/*.html')
    .pipe(htmllint({}, htmllintReporter));
}

function htmllintReporter(filepath, issues) {
  if (issues.length > 0) {
    issues.forEach((issue) => {
      log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
    });
    process.exitCode = 1;
  } else {
    console.log('---------------NO HTML LINT ERROR---------------');
  }
}

// JS LINTER
function jsLint() {
  return src('src/assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

// WATCH FILES
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch('src/assets/scss/**/*.scss', compileSCSS);
  watch('src/assets/js/**/*.js', compileJS);
  watch('src/assets/img/**/*', copyImages);
}


// BROWSER SYNC
function browserSyncInit(done) {
  console.log('---------------BROWSER SYNC---------------');
  browserSync.init({
    server: './dist'
  });
  return done();
}

// ------------ OPTIMIZATION TASKS -------------

// COPIES AND MINIFY IMAGE TO DIST
function minifyImages() {
  console.log('---------------OPTIMIZING IMAGES---------------');
  return src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|webm|ogg)')
    .pipe(newer('dist/assets/img/'))
    .pipe(imagemin([
      imagemin.gifsicle({ optimizationLevel: 3, interlaced: true }),
      imagemin.mozjpeg({ quality: 85 }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ], {
      verbose: true
    }))
    .pipe(dest('dist/assets/img/'))
    .pipe(browserSync.stream());
}

function copyImages() {
  console.log('---------------COPY IMAGES---------------');
  return src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|webm|ogg)')
    .pipe(newer('dist/assets/img/'))
    .pipe(dest('dist/assets/img/'))
    .pipe(browserSync.stream());
}


// PLACES FONT FILES IN THE DIST FOLDER
function copyFont() {
  console.log('---------------COPYING FONTS INTO DIST FOLDER---------------');
  return src([
    'src/assets/font/*',
  ])
    .pipe(dest('dist/assets/fonts'))
    .pipe(browserSync.stream());
}

// PLACES DATA FILES IN THE DIST FOLDER
function copyData() {
  console.log('---------------COPYING DATA INTO DIST FOLDER---------------');
  return src([
    'src/data/**/*',
  ])
    .pipe(dest('dist/assets/data'))
    .pipe(browserSync.stream());
}

// CONCATENATE JS PLUGINS
function concatPlugins() {
  console.log('---------------CONCATENATE JS PLUGINS---------------');
  return src([
    nodepath + 'jquery/dist/jquery.min.js',
    nodepath + 'd3/dist/d3.min.js',
    nodepath + 'feather-icons/dist/feather.min.js',
    nodepath + 'lozad/dist/lozad.min.js',
    nodepath + 'slick-carousel/slick/slick.min.js',
    nodepath + 'webui-popover/dist/jquery.webui-popover.min.js',
    nodepath + 'easy-autocomplete/dist/jquery.easy-autocomplete.min.js',
    nodepath + 'dragula/dist/dragula.min.js',
    nodepath + 'vivus/dist/vivus.min.js',
    nodepath + 'imask/dist/imask.min.js',
    nodepath + 'numeral/min/numeral.min.js',
    nodepath + 'moment/min/moment.min.js',
    nodepath + 'peity/jquery.peity.min.js',
    nodepath + 'hammerjs/hammer.min.js',
    nodepath + 'alertifyjs/build/alertify.min.js',
    nodepath + 'notyf/notyf.min.js',
    nodepath + 'pikaday/pikaday.js',
    nodepath + 'simplebar/dist/simplebar.min.js',
    nodepath + 'nouislider/dist/nouislider.min.js',
    nodepath + 'suneditor/dist/suneditor.min.js',
    nodepath + 'plyr/dist/plyr.min.js',
    nodepath + 'mediaplayer/browser.js',
    nodepath + 'choices.js/public/assets/scripts/choices.min.js',
    nodepath + 'lightgallery.js/dist/js/lightgallery.min.js',
    nodepath + 'lg-thumbnail.js/dist/lg-thumbnail.min.js',
    nodepath + 'lg-video.js/dist/lg-video.min.js',
    nodepath + 'lg-zoom.js/dist/lg-zoom.min.js',
    nodepath + 'filepond/dist/filepond.min.js',
    nodepath + 'filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.min.js',
    nodepath + 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.min.js',
    nodepath + 'filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.min.js',
    nodepath + 'filepond-plugin-image-crop/dist/filepond-plugin-image-crop.min.js',
    nodepath + 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.js',
    nodepath + 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.js',
    nodepath + 'filepond-plugin-image-resize/dist/filepond-plugin-image-resize.min.js',
    nodepath + 'filepond-plugin-image-transform/dist/filepond-plugin-image-transform.min.js',
    nodepath + 'apexcharts/dist/apexcharts.min.js',
    nodepath + 'billboard.js/dist/billboard.min.js',
    nodepath + 'hopscotch/dist/js/hopscotch.min.js',
    'src/assets/vendor/js/*',
  ])
    .pipe(concat('app.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.stream());
}

// CONCATENATE CSS PLUGINS
function concatCssPlugins() {
  console.log('---------------CONCATENATE CSS PLUGINS---------------');
  return src([
    nodepath + 'webui-popover/dist/jquery.webui-popover.min.css',
    nodepath + 'easy-autocomplete/dist/easy-autocomplete.min.css',
    nodepath + 'dragula/dist/dragula.min.css',
    nodepath + 'alertifyjs/build/css/alertify.min.css',
    nodepath + 'alertifyjs/build/css/themes/default.min.css',
    nodepath + 'notyf/notyf.min.css',
    nodepath + 'pikaday/css/pikaday.css',
    nodepath + 'simplebar/dist/simplebar.min.css',
    nodepath + 'nouislider/dist/nouislider.min.css',
    nodepath + 'suneditor/dist/css/suneditor.min.css',
    nodepath + 'plyr/dist/plyr.css',
    nodepath + 'mediaplayer/browser.css',
    nodepath + 'choices.js/public/assets/styles/choices.min.css',
    nodepath + 'lightgallery.js/dist/css/lightgallery.min.css',
    nodepath + 'filepond/dist/filepond.min.css',
    nodepath + 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css',
    nodepath + 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css',
    nodepath + 'hopscotch/dist/css/hopscotch.min.css',
    nodepath + 'billboard.js/dist/billboard.min.css',
    'src/assets/vendor/css/*',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// COPY JS VENDOR FILES
function jsVendor() {
  console.log('---------------COPY JAVASCRIPT VENDOR FILES INTO DIST---------------');
  return src([
    'src/assets/vendor/js/*',
  ])
    .pipe(dest('dist/assets/vendor/js'))
    .pipe(browserSync.stream());
}

// COPY CSS VENDOR FILES
function cssVendor() {
  console.log('---------------COPY CSS VENDOR FILES INTO DIST---------------');
  return src([
    'src/assets/vendor/css/*',

  ])
    .pipe(dest('dist/assets/vendor/css'))
    .pipe(browserSync.stream());
}

// PRETTIFY HTML FILES
function prettyHTML() {
  console.log('---------------HTML PRETTIFY---------------');
  return src('dist/*.html')
    .pipe(prettyHtml({
      indent_size: 4,
      indent_char: ' ',
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
    }))
    .pipe(dest('dist'));
}

// DELETE DIST FOLDER
function cleanDist(done) {
  console.log('---------------REMOVING OLD FILES FROM DIST---------------');
  del.sync('dist');
  return done();
}

// ACCESSIBILITY CHECK
function HTMLAccessibility() {
  return src('dist/*.html')
    .pipe(accessibility({
      force: true
    }))
    .on('error', console.log)
    .pipe(accessibility.report({
      reportType: 'txt'
    }))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(dest('accessibility-reports'));
}

// RUN ALL LINTERS
exports.linters = series(htmlLint, scssLint, jsLint);

// RUN ACCESSIILITY CHECK
exports.accessibility = HTMLAccessibility;

//SETUP
exports.setup = series(setupBulma);

// DEV
exports.dev = series(
  cleanDist,
  copyFont,
  copyData,
  jsVendor,
  cssVendor,
  compileHTML,
  concatPlugins,
  concatCssPlugins,
  compileJS,
  copyImages,
  resetPages,
  prettyHTML,
  compileSCSS,
  browserSyncInit,
  watchFiles
);

// BUILD
exports.build = series(
  cleanDist,
  copyFont,
  copyData,
  jsVendor,
  cssVendor,
  compileHTML,
  concatPlugins,
  concatCssPlugins,
  compileJS,
  minifyImages,
  resetPages,
  prettyHTML,
  compileSCSS,
);

