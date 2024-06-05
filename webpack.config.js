
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ],
    
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/public'),
    },
    compress: true,
    port: 3001,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      }
    ],
    historyApiFallback: true
  }
};
