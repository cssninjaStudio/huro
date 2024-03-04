import gulp from 'gulp'

import sassCompiler from 'sass'
import gulpSass from 'gulp-sass'
import bc from 'browser-sync'
import bourbon from 'node-bourbon'
import concat from 'gulp-concat'
import replace from 'gulp-replace'
import { deleteSync } from 'del'
import panini from 'panini'
import uglify from 'gulp-uglify-es'
import sourcemaps from 'gulp-sourcemaps'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import prettyHtml from 'gulp-pretty-html'
import newer from 'gulp-newer'
import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'
import packageJson from './package.json' assert { type: 'json' }

const { src, dest, watch, series } = gulp
const browserSync = bc.create()
const sass = gulpSass(sassCompiler)
sass.compiler = sassCompiler

const nodepath = 'node_modules/'

const srcDir = process.env.SRC_DIR || "src/"

// ------------ SETUP TASKS -------------
// Copy Bulma filed into Bulma development folder
function setupBulma() {
  console.log('---------------COPYING BULMA FILES---------------');
  return src([nodepath + 'bulma/*.sass', nodepath + 'bulma/**/*.sass'])
    .pipe(dest(`${srcDir}assets/sass/`));
}

// ------------ DEVELOPMENT TASKS -------------

// COMPILE SCSS INTO CSS
function compileSCSS() {
  console.log('---------------COMPILING SCSS---------------');
  return src([`${srcDir}assets/scss/main.scss`])
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: true,
      sourceMap: true,
      includePaths: bourbon.includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// USING PANINI, TEMPLATE, PAGE AND PARTIAL FILES ARE COMBINED TO FORM HTML MARKUP
function compileHTML() {
  console.log('---------------COMPILING HTML WITH PANINI---------------');
  panini.refresh();
  return src(`${srcDir}pages/**/*.html`)
    .pipe(replace('{{PACKAGE_VERSION}}', packageJson.version))
    .pipe(panini({
      root: `${srcDir}pages/`,
      layouts: `${srcDir}layouts/`,
      /*pageLayouts: {
        //All pages inside src/pages/blog will use the blog.html layout
        'blog': 'blog'
      }*/
      partials: `${srcDir}partials/`,
      helpers: `${srcDir}helpers/`,
      data: `${srcDir}data/`,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// COPY CUSTOM JS
function compileJS() {
  console.log('---------------COMPILE CUSTOM JS---------------');
  return src([
    `${srcDir}assets/js/functions.js`,
    `${srcDir}assets/js/main.js`,
    `${srcDir}assets/js/popover.js`,
    `${srcDir}assets/js/touch.js`,
    `${srcDir}assets/js/widgets.js`,
    `${srcDir}assets/js/_demo/landing.js`,
    `${srcDir}assets/js/_demo/components.js`,
    `${srcDir}assets/js/_demo/syntax.js`,
    `${srcDir}assets/js/layouts/auth/auth.js`,
    `${srcDir}assets/js/dashboards/personal-1.js`,
    `${srcDir}assets/js/dashboards/personal-2.js`,
    `${srcDir}assets/js/dashboards/personal-3.js`,
    `${srcDir}assets/js/dashboards/finance-1.js`,
    `${srcDir}assets/js/dashboards/finance-2.js`,
    `${srcDir}assets/js/dashboards/finance-3.js`,
    `${srcDir}assets/js/dashboards/banking-1.js`,
    `${srcDir}assets/js/dashboards/banking-2.js`,
    `${srcDir}assets/js/dashboards/banking-3.js`,
    `${srcDir}assets/js/dashboards/business-1.js`,
    `${srcDir}assets/js/dashboards/business-2.js`,
    `${srcDir}assets/js/dashboards/lifestyle-1.js`,
    `${srcDir}assets/js/dashboards/lifestyle-2.js`,
    `${srcDir}assets/js/dashboards/lifestyle-3.js`,
    `${srcDir}assets/js/dashboards/ecommerce-1.js`,
    `${srcDir}assets/js/dashboards/apps-1.js`,
    `${srcDir}assets/js/dashboards/apps-2.js`,
    `${srcDir}assets/js/dashboards/map-1.js`,
    `${srcDir}assets/js/dashboards/charts/apex.js`,
    `${srcDir}assets/js/dashboards/charts/billboardjs.js`,
    `${srcDir}assets/js/dashboards/charts/apex-data.js`,
    `${srcDir}assets/js/forms/forms.js`,
    `${srcDir}assets/js/wizard/wizard-v1.js`,
    `${srcDir}assets/js/wizard/wizard-dropzone.js`,
    `${srcDir}assets/js/layouts/list-views/list-view.js`,
    `${srcDir}assets/js/layouts/flex-lists/flex-list.js`,
    `${srcDir}assets/js/layouts/datatables/datatables.js`,
    `${srcDir}assets/js/layouts/user-grids/user-grid.js`,
    `${srcDir}assets/js/layouts/card-grids/card-grid.js`,
    `${srcDir}assets/js/layouts/tile-grids/tile-grid.js`,
    `${srcDir}assets/js/layouts/user-pages/profile.js`,
    `${srcDir}assets/js/layouts/projects/project.js`,
    `${srcDir}assets/js/layouts/projects/board.js`,
    `${srcDir}assets/js/layouts/generic/saas-billing.js`,
    `${srcDir}assets/js/layouts/messaging/messaging.js`,
    `${srcDir}assets/js/layouts/messaging/messaging-webapp.js`,
  ], { 
    allowEmpty: true,
  })
    .pipe(babel())
    .pipe(uglify.default())
    .pipe(dest('dist/assets/js/'))
    .pipe(browserSync.stream());
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
  console.log('---------------CLEARING PANINI CACHE---------------');
  panini.refresh();
  done();
}

// WATCH FILES
function watchFiles() {
  watch(`${srcDir}**/*.html`, compileHTML);
  watch(`${srcDir}assets/scss/**/*.scss`, compileSCSS);
  watch(`${srcDir}assets/js/**/*.js`, compileJS);
  watch(`${srcDir}assets/img/**/*`, copyImages);
}


// BROWSER SYNC
function browserSyncInit(done) {
  console.log('---------------BROWSER SYNC---------------');
  browserSync.init({
    server: './dist',
    ui: false,
    open: false,
  });
  return done();
}

// ------------ OPTIMIZATION TASKS -------------

// COPIES AND MINIFY IMAGE TO DIST
function minifyImages() {
  console.log('---------------OPTIMIZING IMAGES---------------');
  return src(`${srcDir}assets/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|webm|ogg)`)
    .pipe(newer('dist/assets/img/'))
    .pipe(imagemin([
      gifsicle({ optimizationLevel: 3, interlaced: true }),
      mozjpeg({ quality: 85 }),
      optipng({ optimizationLevel: 3 }),
      svgo()
    ], {
      verbose: true
    }))
    .pipe(dest('dist/assets/img/'))
    .pipe(browserSync.stream());
}

function copyImages() {
  console.log('---------------COPY IMAGES---------------');
  return src(`${srcDir}assets/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|webm|ogg)`)
    .pipe(newer('dist/assets/img/'))
    .pipe(dest('dist/assets/img/'))
    .pipe(browserSync.stream());
}


// PLACES FONT FILES IN THE DIST FOLDER
function copyFont() {
  console.log('---------------COPYING FONTS INTO DIST FOLDER---------------');
  return src([
    `${srcDir}assets/font/*`,
  ])
    .pipe(dest('dist/assets/fonts'))
    .pipe(browserSync.stream());
}

// PLACES DATA FILES IN THE DIST FOLDER
function copyData() {
  console.log('---------------COPYING DATA INTO DIST FOLDER---------------');
  return src([
    `${srcDir}data/**/*`,
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
    `${srcDir}assets/vendor/js/*`,
  ])
    .pipe(concat('app.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify.default())
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
    `${srcDir}assets/vendor/css/*`,
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
    `${srcDir}assets/vendor/js/*`,
  ])
    .pipe(dest('dist/assets/vendor/js'))
    .pipe(browserSync.stream());
}

// COPY CSS VENDOR FILES
function cssVendor() {
  console.log('---------------COPY CSS VENDOR FILES INTO DIST---------------');
  return src([
    `${srcDir}assets/vendor/css/*`,

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
  deleteSync('dist');
  return done();
}

//SETUP
export const setup = series(setupBulma);

// DEV
export const dev = series(
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
export const build = series(
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

