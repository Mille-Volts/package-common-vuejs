var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var outputFile = 'package-common-vuejs';
var globalName = 'Common VueJS';

var config = require('../package.json');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract('css-loader'),
            less: ExtractTextPlugin.extract('css-loader!less-loader'),
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      moment: 'moment',
      picker: 'pickadate/lib/picker',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(config.version),
    }),
    new ExtractTextPlugin(outputFile + '.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      moment: 'moment',
      lodash: 'lodash',
    }),
  ],
};
