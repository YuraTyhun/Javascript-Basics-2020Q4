const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }, 
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,  
      template: './src/index.html',
      filename: './index.html' 
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
  })
  ]
}