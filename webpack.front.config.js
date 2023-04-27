const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, './src/frontend/index.ts'),
  output: {
    clean: true,
    environment: {
      arrowFunction: false,
    },
    path: path.resolve(__dirname, './build/frontend'),
    filename: '[name].bundle.[contenthash].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  target: 'web',
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      src: path.resolve(__dirname, 'src/frontend'),
      types: path.resolve(__dirname, 'src/frontend/types'),
      images: path.resolve(__dirname, 'public/images')
    },
    extensions: ['.js', '.ts']
  },
  devtool:
    process.env.NODE_ENV === 'production'
    ? 'hidden-source-map'
    : 'eval-source-map',
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.ts?$/,
        loader: "ts-loader"
      },
      { 
        exclude: /\.module\.s?css$/i,
        test: /\.s?css$/i,
        use: [
          isDev ? 'style-loader': MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[hash:base64:5]',
                mode: 'icss',
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.module\.s?css$/i,
        use: [
          isDev ? 'style-loader': MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[hash:base64:5]',
                mode: 'local',
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ]
  },
  optimization: {
    minimizer: [
      '...', new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      excludeChunks: ['server']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/images/products',
          to: 'images/products/[name][ext]',
        }
      ]
    }),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   port: 8888,
  // }
}