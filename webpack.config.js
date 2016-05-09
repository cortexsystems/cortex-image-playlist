var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = path.resolve(__dirname, 'src');
var appAssetsDir = path.resolve(__dirname, 'app_assets');
var htmlDir = path.resolve(__dirname, 'html');
var outDir = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(srcDir, 'main.js'),
  output: {
    path: outDir,
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: htmlDir },
      { from: appAssetsDir, to: 'app_assets' },
      { from: 'manifest.json', to: 'manifest.json' },
      { from: 'README.md', to: 'README.md' },
      { from: 'CHANGELOG.md', to: 'CHANGELOG.md' }
    ]),
    new webpack.NoErrorsPlugin(),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
   */
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: srcDir,
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
