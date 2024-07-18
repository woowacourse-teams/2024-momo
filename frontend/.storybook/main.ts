import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
      config.resolve.alias = {
        ...config.resolve.alias,
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
      };
    }
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@styles': path.resolve(__dirname, '../src/styles'),
    // };
    return config;
  },
};
export default config;
