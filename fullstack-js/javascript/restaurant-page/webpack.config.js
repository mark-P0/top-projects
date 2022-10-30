/*  Use ES6 syntax
 *  So simple in hindsight...
 *  https://stackoverflow.com/a/71626398/
 */

import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  /* Essentials */
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    /*  The official docs also uses `process.cwd()`
     *  in lieu of CommonJS global `__dirname`
     *  https://webpack.js.org/configuration/output/#outputpath
     */
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },

  /* Development Server */
  devServer: {
    static: './dist',
    host: '0.0.0.0',
  },

  /* Plugins | Modules | Loaders */
  plugins: [
    new HtmlWebpackPlugin({ title: '13th Shawarma' }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      /*  For ES6 Modules (ESM). Allows...
       *  - Importing without specifying the file extension
       *  - Importing of "directories" (automatically resolves to inner `index.js`)
       *    - This behavior can be customized with the `resolve.mainFiles` setting
       *    - https://webpack.js.org/configuration/resolve/#resolvemainfiles
       *
       *  https://webpack.js.org/configuration/module/#resolvefullyspecified
       */
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
    ],
  },
};
