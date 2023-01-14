import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
// import path from 'path'

export default defineConfig(({ mode }) => {
  return {
    // root: path.join(__dirname, 'src'),
    plugins: [
      react(),
      UnoCSS({
        /* options */
      }),
      mode === 'analyze' ? visualizer({ open: true, gzipSize: true }) : []
    ],
    css: {
      // css modules
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      postcss: {
        plugins: [
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
    }
  };
});
