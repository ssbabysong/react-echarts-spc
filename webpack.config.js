
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
          { test: /\.js|\.jsx|\.es6$/, 
            exclude: /node_modules/,
            loader: 'babel',
            query:
            {
                presets:['es2015', 'react','stage-0']
            }
          },
          {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }
        ]
    }
};
module.exports = config;