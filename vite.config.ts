import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  return {
    // root: path.join(__dirname, 'src'),
    resolve: {
      // 别名配置
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    plugins: [
      react(),
      UnoCSS({
        /* options */
      }),
      // 分析打包
      mode === 'analyze' ? visualizer({ open: true, gzipSize: true }) : [],
      // 分离资源
      chunkSplitPlugin({
        // 指定拆包策略
        customSplitting: {
          // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`react-vendor`的 chunk 里
          'react-vendor': ['react', 'react-dom'],
          'mobx-vendor': ['mobx', 'mobx-react-lite'],
          'react-router-vendor': ['react-router-dom']
          // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
          // 'components-util': [/src\/components/, /src\/utils/]
        }
      }),
      // 设置js降级处理的目标浏览器
      legacy({
        targets: [
          'Chrome >= 45',
          'Safari >= 10',
          'iOS >= 10',
          'Firefox >= 40',
          'Edge >= 15'
        ]
      })
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
      // 压缩代码配置。类型: boolean | 'esbuild' | 'terser'
      // 默认为 `esbuild`
      minify: 'esbuild',
      // 产物目标环境
      // 默认是modules，也就是['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
      // exnext 是最新语法
      // es2015/es6是比较稳妥的
      target: 'es2015',
      // 如果 minify 为 terser，可以通过下面的参数配置具体行为
      // https://terser.org/docs/api-reference#minify-options
      terserOptions: {},
      // assets是处理base64还是分离
      // >=5 KB是单独文件，否则是base64
      assetsInlineLimit: 5 * 1024
    }
  };
});
