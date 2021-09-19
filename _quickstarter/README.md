# HURO - 1.6.0 Quickstarter

### Note

Changes should be commited to `src/` files only.

### How to use

The template is built with Sass and Gulp build system with these features:

-	Handlebars HTML templates with Panini– Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials, external Handlebars helpers, or external data as JSON.
-	Sass compilation, prefixing with Autoprefixer, and JavaScript concatenation
-	Built-in BrowserSync server - Will automatically reload your page when files are changed. It also live-injects CSS changes when you save a Sass file. This task runs continuously. Defaults to localhost.
-	For production builds - CSS compression, JavaScript compression, Image compression and more..


### Requirements

To use this template, your computer needs:

-	Node.js is used to run the build processes. https://nodejs.org/en/download/
-   Test: run ` node -v ` in the terminal
-	Npm (Node comes with npm installed so you should have a version of npm.) Used to manage development dependencies.
-   Test: run ` npm -v`  in the terminal
-	Gulp – task runner
	`npm install -g gulp`
-	Test: run `gulp -v ` in the terminal

### Installing:

- Install all node packages: `yarn install` or `npm install`
- Run `gulp dev`
- Your site is now viewable at this URL: http://localhost:3000
