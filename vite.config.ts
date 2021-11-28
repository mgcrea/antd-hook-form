import typescript from '@rollup/plugin-typescript';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {defineConfig} from 'vite';
import packageJson from './package.json';

const sourcemap = true;

module.exports = defineConfig({
  build: {
    outDir: './lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: packageJson.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      plugins: [peerDepsExternal(), typescript()],
      output: [
        {
          exports: 'named',
          file: `${packageJson.main}`,
          format: 'umd',
          name: 'antd-extended',
          sourcemap,
        },
        {
          exports: 'named',
          dir: path.dirname(packageJson.module),
          format: 'esm',
          sourcemap,
          preserveModules: true,
          preserveModulesRoot: 'src/',
        },
      ],
    },
  },
});
