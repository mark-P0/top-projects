const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /* Essentials */
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  /* Development Server */
  devServer: {
    static: './dist',
  },

  /* Plugins | Modules | Loaders */
  plugins: [new HtmlWebpackPlugin({ title: '13th Shawarma' })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
