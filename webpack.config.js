/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

// webpack.config.js

module.exports = {
  name: 'sample-pj',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  entry: './src/index.tsx', // 번들링 시작 위치
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/, // .js 를 babel-loader 사용 transpiling
        exclude: /node_module/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.tsx?$/, //  .ts 를 ts-loader 사용 transpiling
        exclude: /node_module/,
        use: 'ts-loader',
      },
      {
        test: /\.(css)?$/,
        exclude: /node_module/,
        use: ['style-loader', 'css-loader'], // 오른쪽 로더부터 실행
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, '/dist'), // 번들 결과물 위치
    publicPath: '/',
    filename: 'index.js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    proxy: [
      {
        context: ['/api'], // 여기에는 프록시할 요청의 경로를 지정합니다.
        target: 'http://localhost:3001', // 여기에는 프록시할 대상 서버의 주소를 지정합니다.
      },
      // 다른 프록시 설정을 필요에 따라 추가할 수 있습니다.
    ],
  },
};
