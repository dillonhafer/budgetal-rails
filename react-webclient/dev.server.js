var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

var port      = process.env.NODE_PORT    || 9999;
var address   = process.env.NODE_ADDRESS || 'localhost';
var full_path = 'http://'+address+':'+port;

new WebpackDevServer(webpack(config), {
  hot: false,
  publicPath: config.output.publicPath,
  historyApiFallback: {
    index: './templates/dev/index.html'
  },
  stats: {
    colors: true,
    exclude: [
      /.*-dev-server/,
      /buildin/,
      /hot/,
      /babel/,
      /node_modules[\\\/]react(-router)?[\\\/]/
    ]
  },
  proxy: {
    '/fonts/OpenSans-400.woff': full_path+'/static',
    '/fonts/OpenSans-700.woff': full_path+'/static'
  }
}).listen(port, address, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at '+full_path);
});