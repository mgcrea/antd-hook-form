import typescript from '@rollup/plugin-typescript';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json';

const sourcemap = true;

const config = {
  input: 'src/index.ts',
  output: [
    {
      exports: 'named',
      file: `${packageJson.main}`,
      format: 'umd',
      name: 'antd-hook-form',
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
  plugins: [peerDepsExternal(), typescript({outDir: path.dirname(packageJson.module), declaration: true})],
};

export default config;
