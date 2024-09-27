const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const FontPreloadPlugin = require('webpack-font-preload-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const bundleAnalyzer =
  process.env.USE_BUNDLE_ANALYZER === 'true' ? new BundleAnalyzerPlugin() : null;

module.exports = () => ({
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@stores': path.resolve(__dirname, 'src/stores'),
    },
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/assets/favicons', to: 'assets/favicons' }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DotenvWebpackPlugin(),
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'momo2024', // TODO: org, project 네이밍 변경 + 모모 구글 계정으로 이동(@해리)
      project: 'momo-harry-test',
      sourcemaps: {
        filesToDeleteAfterUpload: '**/*.js.map',
        // ! sourcemap 파일을 업로드 한 후, 삭제하기 위한 설정(@해리)
        // ? hidden-source-map을 사용해야 삭제가 되는 것인지는 아직 모름.
      },
    }),
    new FontPreloadPlugin({
      index: 'index.html',
      extensions: ['woff2'],
    }),
    bundleAnalyzer,
  ].filter(Boolean),

  devtool: 'source-map',

  performance: {
    hints: false,
    maxEntrypointSize: 400000,
    maxAssetSize: 400000,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
