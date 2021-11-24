import typescript from '@rollup/plugin-typescript';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {defineConfig} from 'vite';
import packageJson from './package.json';

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
      // output: {
      //   exports: 'named',
      //   globals: {
      //     react: 'React',
      //   },
      // },
      output: [
        // {
        //   dir: './lib/es',
        //   format: 'cjs',
        //   sourcemap: true,
        // },
        {
          dir: './lib',
          format: 'esm',
          sourcemap: true,
        },
      ],
    },
  },
});
