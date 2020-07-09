const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

const compiler = webpack(webpackConfig);
const chalk = require('chalk');

console.log(chalk.cyan('Starting the development server...\n'));

require('webpack-dev-middleware-hard-disk')(compiler, {
  quiet: true,
  watchOptions: {
    ignored: /dist|manifest/,
    aggregateTimeout: 500,
    poll: true
  },
  stats: {
    colors: true
  },
});
