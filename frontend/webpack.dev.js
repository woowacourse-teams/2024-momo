const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common(), {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: 9901,
    historyApiFallback: true,
    hot: true,
  },
});
