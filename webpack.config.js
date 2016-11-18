var resolve = require('path').resolve
var HtmlWebpackPlugin = require('html-webpack-plugin')
var validate = require('webpack-validator')

var config = {
  entry: {
    script: resolve(__dirname, 'js', 'index.js'),
    prototype: resolve(__dirname, 'js', 'prototype.js')
  },
  output: {
    path: resolve(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'prototypes/index.html',
      template: 'prototypes/index.html',
      chunk: 'prototype'
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/main-menu.html',
      template: 'prototypes/main-menu.html',
      chunk: 'prototype'
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/add-solution.html',
      template: 'prototypes/add-solution.html',
      chunk: 'prototype'
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/grades.html',
      template: 'prototypes/grades.html',
      chunk: 'prototype'
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/challenges/1.html',
      template: 'prototypes/challenges/1.html',
      chunk: 'prototype'
    }),
    new HtmlWebpackPlugin({
      filename: 'prototypes/assess.html',
      template: 'prototypes/assess.html',
      chunk: 'prototype'
    })
  ],
  devServer: {
    inline: true,
    contentBase: resolve(__dirname, 'www'),
    stats: 'errors-only'
  }
}

module.exports = validate(config)