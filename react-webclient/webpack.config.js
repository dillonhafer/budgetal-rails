var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', "css!sass!") },
      { test: /\.(png|gif|otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx', '.scss', '.css']
  }
};
