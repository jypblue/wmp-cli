
const path = require('path');

const config = require(`${process.cwd()}/config`);

const resolve = function(dir) {
  return path.join(process.cwd(), dir);
};

const srcDir = resolve('src');

exports.resolve = resolve;

exports.fileLoader = name => ({
  loader: 'file-loader',
  options: {
    publicPath: '',
    context: resolve(srcDir),
    name
  }
});

exports.parseAlias = () => {
  const alias = {
    '@': srcDir,
  };
  for (const k in config.alias) {
    if(config.alias.hasOwnProperty(k)) {
      alias[k] = resolve(config.alias[k]);
    }
  }
  return alias;
};

exports.copyPatterns = [
  {
    from: resolve('static'),
    to: resolve('dist/static')
  }
]
  .concat(config.copyWebpack || [])
  .map(
    (pattern) =>
      typeof pattern === 'string' ? { from: pattern, to: pattern } : pattern,
  );

exports.srcDir = srcDir;
