const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    server: path.resolve(__dirname, 'src/server/server.js'),
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'build/server'),
    publicPath: "/",
    filename: "[name].js"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/server/db',
          to: 'db/[name][ext]',
          toType: 'template'
        }
      ]
    })
  ]
};
