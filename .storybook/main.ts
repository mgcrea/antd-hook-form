// @ts-nocheck

const vitePluginImp = require('vite-plugin-imp');
const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-ant-design'],
  framework: '@storybook/react',
  // core: {
  //   builder: 'storybook-builder-vite',
  // },
  async webpackFinal(config) {
    config.resolve.alias['src'] = `${path.resolve(__dirname, '../src')}/`;
    config.resolve.alias['stories'] = `${path.resolve(__dirname, '../stories')}/`;
    return config;
  },
  async viteFinal(config, {configType}) {
    config.resolve.alias['src/'] = `${path.resolve(__dirname, '../src')}/`;
    config.plugins.push(
      vitePluginImp.default({
        libList: [
          {
            libName: 'antd',
            style: (name) => {
              if (name === 'col' || name === 'row') {
                return 'antd/lib/style/index.less';
              }
              return `antd/es/${name}/style/index.less`;
            },
          },
        ],
      }),
    );
    config.css = {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // modifyVars,
        },
      },
    };

    return config;
  },
};
