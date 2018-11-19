const path     = require('path');
const srcPath  = path.join(__dirname, '/src');
const distPath = path.join(__dirname, '/dist');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: srcPath + '/js/index.js',
    output: {
        filename: 'main.js',
        path: distPath
    },
    module: {
      rules: [
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
          }
      ]
    },
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 8080
  }
};