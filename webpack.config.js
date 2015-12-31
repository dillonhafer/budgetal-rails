var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: ['./app/react/index.js']
  },
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: 'react_bundle.js'
  },
  module: {
    loaders: [
      {
        key: 'jsx',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', "css!sass!") },
      { test: /\.(png|otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx', '.scss', '.css']
  }
};
