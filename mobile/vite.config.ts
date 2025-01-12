import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'
import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'
import UniRoot from '@uni-ku/root'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      Components({
      dts: true,
      resolvers: [WotResolver()]
    }),
      // https://github.com/uni-helper/vite-plugin-uni-pages
    UniPages(),
      // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-platform
    UniPlatform(),
      // https://github.com/uni-helper/vite-plugin-uni-platform-modifier
    UniPlatformModifier(),
      // https://github.com/uni-helper/vite-plugin-uni-middleware
    UniMiddleware(),
      // https://github.com/uni-ku/root
    UniRoot(),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniLayouts(),
      uni(),
      UnoCSS(),
    ],
    build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  optimizeDeps: {
    exclude: [
      'vue-demi',
    ],
  },  }
})



