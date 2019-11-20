/**
 * Created 2019/11/18 14:57 By lvmingyin
 */
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';
import pkg from 'package';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      name: 'version',
    },
    {
      file: pkg.module,
      format: 'es',
      name: 'version',
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    url(),
    postcss({ extract: `dist/index.css` }),
    commonjs(),
    typescript({
      clean: true,
    }),
  ],
};
