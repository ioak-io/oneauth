const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
  let envFile = '.env';
  if (env.target) {
    envFile = `.env.${env.target}`;
  }
  const envParsed = dotenv.config({
    path: path.join(__dirname, envFile),
  }).parsed;
  return {
    entry: './src/app.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(png|jp(e*)g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      static: path.join(__dirname, 'build'),
      historyApiFallback: true,
      host: '0.0.0.0',
      compress: true,
      hot: true,
      port: 3000,
      devMiddleware: {
        publicPath: '/',
      }
    },
    devtool: 'source-map',
    output: {
      filename: '[name].bundle.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
        favicon: './src/static/favicon.ico',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envParsed), // it will automatically pick up key values from .env file
        // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     NODE_ENV: JSON.stringify('production'),
      //   },
      // }),
    ],
  };
};
