/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// import nodeResolve from 'rollup-plugin-node-resolve';
// import typescript from 'rollup-plugin-typescript2';

//export default {
//  input: '../../dist/worker-es2017/main.js',
//  dest: '../../dist/shell/ngsw-worker.js',
//  format: 'iife',
//  plugins: [
//    nodeResolve({
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
//      jsnext: true
//    })
//  ],
//  sourceMap: true
//};

// from here
// https://github.com/rollup/rollup-plugin-node-resolve

// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: '../../dist/worker-es2017/main.js',
  output: {
    file: '../../dist/shell/ngsw-worker.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false,  // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: [ 'conditional-runtime-dependency' ]
    })
  ]
};