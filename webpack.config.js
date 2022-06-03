/* eslint-env node */

const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const BUILD_FOLDER = path.resolve(__dirname, 'build')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: BUILD_FOLDER,
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html' }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.glsl$/,
        type: 'asset/source'
      }
    ]
  },
  devtool: 'source-map'
}
