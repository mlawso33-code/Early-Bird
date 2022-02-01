var path = require('path');
const HtmlWebPackPlug = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/frontend/src');
var DIST_DIR = path.join(__dirname, '/frontend/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
  test: /\.(js|jsx)?/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ]
    }
  }
      }
    ]
  }
};