const vitePluginImp = require('vite-plugin-imp');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, {configType}) {
    // customize the Vite config here
    config.resolve.alias.foo = 'bar';
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

    // return the customized config
    return config;
  },
};
