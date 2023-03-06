import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { presetAttributify, presetUno } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// import { viteExternalsPlugin } from 'vite-plugin-externals';

import path from 'path';
// chunksplit 在vite4有bug，先不用
// import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// legacy先默认不开启，如果有需要再打开
// import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  return {
    // root: path.join(__dirname, 'src'),
    server: {
      proxy: {
        '/liquidator/list': {
          target: 'http://35.220.222.252/aggregate-lending',
          changeOrigin: true
        },
        '/apr/calc': {
          target: 'http://35.220.222.252/aggregate-lending',
          changeOrigin: true
        },
        '/config/list': {
          target: 'http://35.220.222.252/aggregate-lending',
          changeOrigin: true
        }
      }
    },
    resolve: {
      // 别名配置
      alias: {
        '@': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@styles': path.join(__dirname, 'src/styles'),
        '@components': path.join(__dirname, 'src/components'),
        '@hooks': path.join(__dirname, 'src/hooks'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@api': path.join(__dirname, 'src/api'),
        '@constant': path.join(__dirname, 'src/constant'),
        '@types': path.join(__dirname, 'src/types'),
        '@locale': path.join(__dirname, 'src/locale'),
        '@containers': path.join(__dirname, 'src/containers'),
        '@stores': path.join(__dirname, 'src/stores')
      }
    },
    plugins: [
      react(),
      UnoCSS({
        presets: [
          presetAttributify({
            /* preset options */
          }),
          presetUno(),
          presetRemToPx()
        ]
      }),
      // 分析打包
      mode === 'analyze' ? visualizer({ open: true, gzipSize: true }) : []
      // // external plugin
      // viteExternalsPlugin(
      //   {
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //     // 'react-router-dom': 'ReactRouterDOM',
      //     // mobx: 'mobx',
      //     // 'mobx-react-lite': 'mobxReactLite',
      //     // ethers: 'ethers'
      //   },
      //  // 开发环境不external
      //   { disableInServe: true }
      // )
      // // split chunk
      // chunkSplitPlugin({
      //   customSplitting: {
      //     // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`react-vendor`的 chunk 里
      //     'react-vendor': ['react', 'react-dom'],
      //     'mobx-vendor': ['mobx', 'mobx-react-lite'],
      //     'react-router-vendor': ['react-router-dom']
      //     // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
      //     // 'components-util': [/src\/components/, /src\/utils/]
      //   }
      // })
      // // 设置js降级处理的目标浏览器
      // legacy({
      //   targets: [
      //     'Chrome >= 45',
      //     'Safari >= 10',
      //     'iOS >= 10',
      //     'Firefox >= 40',
      //     'Edge >= 15'
      //   ]
      // })
    ],
    css: {
      // css modules
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      postcss: {
        plugins: [
          // 设置css降级处理的目标浏览器
          autoprefixer({
            overrideBrowserslist: [
              'Chrome >= 45',
              'Safari >= 10',
              'iOS >= 10',
              'Firefox >= 40',
              'Edge >= 15'
            ]
          })
        ]
      }
    },
    // 这个配置是为了json的export default导出，json数据量大的时候可以优化性能。如果删除配置就是按名字导出export {version}。
    json: {
      stringify: true
    },
    build: {
      // 压缩代码配置。 boolean | 'esbuild' | 'terser'
      minify: 'esbuild',
      // 产物目标环。 modules、exnext、es2015/es6
      target: 'es2015',
      // 如果 minify 为 terser，可以通过下面的参数配置具体行为
      // terserOptions: {},
      // assets是处理base64还是分离。 >=5 KB是单独文件，否则是base64
      assetsInlineLimit: 5 * 1024
    }
  };
});
