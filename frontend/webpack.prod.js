const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common(), {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    port: 8081,
    historyApiFallback: true,
    hot: true,
  },
});
