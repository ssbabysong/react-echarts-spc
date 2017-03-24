
var path = require('path');
var webpack = require('webpack');
var config = {
  entry: path.resolve(__dirname, 'public/javascripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
          { test: /\.js|\.jsx|\.es6$/, exclude: /node_modules/, loader: "babel?presets[]=react,presets[]=es2015"}
        ]
    }
};
module.exports = config;