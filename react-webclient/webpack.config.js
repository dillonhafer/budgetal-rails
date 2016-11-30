var ExtractTextPlugin = require('extract-text-webpack-plugin');
var theme = require('./src/assets/stylesheets/theme.js');

module.exports = {
  babel: {
    plugins: [
      ['import', {libraryName: 'antd', style: true}]
    ]
  },
  entry: {
    main: ['./src/index.js']
  },
  output: {
    path: __dirname + '/public/assets',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        key: 'jsx',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot', 'babel-loader?'+JSON.stringify({presets:['react']})],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader?'+theme},
      { test: /\.(scss|sass)$/, loader: ExtractTextPlugin.extract('style-loader', "css!sass!") },
      { test: /\.(png|gif|otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx', '.scss', '.css']
  }
};
