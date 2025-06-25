const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.jsx',
  mode: 'development',
  target: 'web',
  devServer: {
    port: 3001,
    historyApiFallback: true
  },
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        '@mtbs/shared-lib': {
          singleton: true,
          requiredVersion: '^1.0.0'
        }
      }
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
  ignoreWarnings: [
    {
      module: /@mtbs\/shared-lib\/dist\/mocks\.js/,
      message: /Critical dependency: require function/
    }
  ]
};