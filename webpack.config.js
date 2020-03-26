const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  context: path.resolve(__dirname),
  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/assets/styles/variables.scss', './src/assets/styles/bootscwatch.scss'],
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: '/',
    port: 8181,
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/images/',
        to: './images',
      },
    ]),
  ],
};
