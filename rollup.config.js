/**
 * Created 2019/11/18 14:57 By lvmingyin
 */
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'version',
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    serve({
      contentBase: ['dist', 'examples']
    }),
    url(),
    postcss({
      extensions: ['.less', '.css'],
      modules: true,
    }),
    commonjs(),
    typescript({
      clean: true,
    }),
  ],
};
