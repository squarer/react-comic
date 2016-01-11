var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './public/scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: './built'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'public/scripts')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
