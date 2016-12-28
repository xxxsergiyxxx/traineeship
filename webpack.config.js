const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/module/app.ts',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['','.ts','.js']
  },
  
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass',
        exclude: [/node_modules/]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?.+)?$/,
        loader: 'url-loader?name=[path][name].[ext]?[hash]',
        limit: 10000
      },
      {
        test: /\.(eot,ttf)(\?.+)?$/,
        loader: 'file-loader?name=[path][name].[ext]?[hash]'
      }
    ],
    noParse: /angular\/angular.js/
  },
  devServer: {
    contentBase: __dirname + '\\src'
  }
};
