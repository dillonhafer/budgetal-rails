var config = require('./webpack.dev.config');

var jsxLoader = config.module.loaders.filter(function(loader) { return loader.key === 'jsx' })[0]
jsxLoader.loaders.unshift('react-hot');

config.output.publicPath = 'http://localhost:8080/assets/'
config.entry.main.push(
  'webpack/hot/only-dev-server',
  'webpack-dev-server/client?http://localhost:8080'
)
config.cache = true;

module.exports = config;
