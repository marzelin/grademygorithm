var resolve = require('path').resolve
var HtmlWebpackPlugin = require('html-webpack-plugin')
var validate = require('webpack-validator')
var webpack = require('webpack')

var config = {
  entry: {
    script: resolve(__dirname, 'src', 'scripts', 'index.tsx'),
    prototype: resolve(__dirname, 'prototypes', 'prototype.ts')
  },
  output: {
    path: resolve(__dirname, 'www'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.css$/, loaders: ['style',
        'css?modules&importLoaders=1&localIdentName=[local]',
        'postcss']},
      { test: /\.tsx?$/, loader: 'ts'}
    ],
    preLoaders: [
      { test: /\.jsx?$/, loader: 'source-map' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      filename: '200.html',
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/index.html',
      template: 'prototypes/index.html',
      chunks: ['prototype']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/main-menu.html',
      template: 'prototypes/main-menu.html',
      chunks: ['prototype']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/add-solution.html',
      template: 'prototypes/add-solution.html',
      chunks: ['prototype']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/grades.html',
      template: 'prototypes/grades.html',
      chunks: ['prototype']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/challenges/1.html',
      template: 'prototypes/challenges/1.html',
      chunks: ['prototype']
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/assess.html',
      template: 'prototypes/assess.html',
      chunks: ['prototype']
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  devServer: {
    inline: true,
    contentBase: resolve(__dirname, 'www'),
    stats: 'errors-only',
    historyApiFallback: true
  },
  //devtool: "source-map"
}

module.exports = validate(config)