# Phaser ES6 Boilerplate

This is an ES6-based boilerplate for creating a multiplayer game using Phaser and Webpack. It is very opinionated as it strips out various unneeded components from Phaser and uses howler.js rather than Phaser Audio.

The purpose of this repo is to be a starting point for creating a game. The idea is to copy the contents and then modify from there. Look at the usage below for instructions on how it all works.

## Features
* [Phaser-CE](https://github.com/photonstorm/phaser-ce) through npm (automatic custom build).
* Boilerplate written in ES6 class structure.
* Heavily commented and stripped down for most minimal build.
* [Webpack](https://webpack.js.org/) + [Bublé](https://buble.surge.sh/guide/) + [PostCSS](http://postcss.org/).
* [BrowserSync](https://browsersync.io/) for livereload during development.
* [Stats.js](https://github.com/mrdoob/stats.js/) for displaying FPS/MS.
* [phaser-manifest-loader](https://github.com/mattcolman/phaser-manifest-loader) for easy asset loading.
* Separate builds for production and development.

## Usage

Clone the git repo.

`git@github.com:goldfire/phaser-boilerplate.git`

Install the dependencies.

`npm i`

Start the development web server.

`npm run dev`

Access your project in the browser.

`locahost:7777`

Then start building your game!