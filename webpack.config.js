const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devServer: {
    static: './dist'
  },
  module: {
    rules : [
      {
        test: /\.html/,
        type: 'assets/',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      }
    ]
  }
};