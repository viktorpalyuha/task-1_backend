const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const frontConfig = {
  mode: 'development',
  target: 'web',
  entry: {
    app: ['./front-end/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle-front.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    port: 3000
  },
  devtool: 'inline-source-map',
  plugins: [
    new HTMLPlugin({
      template: './front-end/index.html',
      filename: 'index.html'
    })
  ]
};

const backConfig = {
  mode: 'development',
  target: 'node',
  entry: {
    app: ['./index.js']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle-back.js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'cars.json'), to: path.resolve(__dirname, 'build') }
      ]
    })
  ]
};

module.exports = [frontConfig, backConfig];
