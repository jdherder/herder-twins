const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const root = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
};

var options = {
  devtool: 'source-map',
  entry: {
    app_us: './src/app/app.js',
  },
  output: {
    path: root('dist'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css-loader!sass-loader'
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'public' }
    ])
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      children: false,
    },
  }
};

if (process.env['NODE_ENV'] === 'prod') {
  options.devtool = '';
  options.plugins.push(
    // new NgAnnotatePlugin({
    //   add: true,
    //   single_quotes: true,
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,
      comments: false
    })
  );
}

module.exports = options;
