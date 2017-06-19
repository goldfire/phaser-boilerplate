const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Add support for Phaser webpack build.
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/dist/');
const phaser = path.join(phaserModule, 'phaser.js');
const pixi = path.join(phaserModule, 'pixi.js');

// Determine if this is a production build or not.
const isProd = process.env.NODE_ENV === 'production';

// Define the Webpack config.
const config = {
  devtool: isProd ? false : '#source-map',
  watch: !isProd,
  performance: {
    hints: false,
  },
  entry: {
    app: [
      './src/index.js',
    ],
    vendor: [
      'pixi',
      'phaser',
      'howler',
      'webfontloader',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js?[chunkhash]',
  },
  resolve: {
    alias: {
      phaser,
      pixi,
      assets: path.join(__dirname, '../src/assets'),
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
        exclude: /node_modules\/(?!phaser-webpack-loader)/,
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
        test: /\.(png|jpg|gif|svg|pvr|pkm)$/,
        use: ['file-loader?name=assets/[name].[ext]?[hash]'],
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
    // Use hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Pass environment variables to bundle.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    // Extract vendor chunks for better caching.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // Extract the CSS file.
    new ExtractTextPlugin('styles.css?[contenthash]'),
    // Generate output HTML.
    new HTMLPlugin({
      template: './src/index.template.html',
    }),
  ],
};

// Define production-only plugins.
if (isProd) {
  // Run the bundle through Uglify.
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
  }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
    },
  }));
}

// Define development-only plugins.
if (!isProd) {
  // Setup live-reloading in the browser with BrowserSync.
  config.plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    port: 7777,
    server: {
      baseDir: ['./', './dist'],
    },
  }));
}

module.exports = config;
