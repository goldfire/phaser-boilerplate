const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Add support for Phaser webpack build.
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/dist/');
const phaser = path.join(phaserModule, 'phaser.js');
const pixi = path.join(phaserModule, 'pixi.js');

module.exports = {
  devtool: '#source-map',
  watch: true,
  performance: {
    hints: false,
  },
  entry: {
    app: [
      'pixi',
      'phaser',
      './src/index.js',
    ],
    vendor: [
      'pixi',
      'phaser',
      'howler',
    ],
    style: './src/assets/css/index.css',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      phaser,
      pixi,
    },
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign',
        },
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI'],
      },
      {
        test: /phaser\.js$/,
        use: ['expose-loader?Phaser'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!postcss-loader',
        }),
      },
    ],
  },
  plugins: [
    // Pass environment variables to bundle.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    // Extract vendor chunks for better caching.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // Extract the CSS file.
    new ExtractTextPlugin('styles.css'),
    // Generate output HTML.
    new HTMLPlugin({
      template: './src/index.template.html',
    }),
    // Run the bundle through Uglify.
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    // Setup live-reloading in the browser with BrowserSync.
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 7777,
      server: {
        baseDir: ['./', './dist'],
      },
    }),
  ],
};
