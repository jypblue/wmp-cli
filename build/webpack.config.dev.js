
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const base = require('./webpack.config.base.js')
;

const mode = process.env.ENV;
const isDev = mode !== 'production';
module.exports = merge(base, {
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': mode,
      '__DEV__': isDev
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
