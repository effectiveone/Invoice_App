/* eslint-disable no-lone-blocks */
/* eslint-disable no-labels */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-label-var */

module.exports = {
  // Inne ustawienia webpack...
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /chart.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Dodaj tylko rozszerzenie '.js'
  },
  devServer: {
    port: 3001,
    host: '0.0.0.0',
    client: {
      webSocketURL: 'ws://localhost:3001/ws',
    },
  },
};
