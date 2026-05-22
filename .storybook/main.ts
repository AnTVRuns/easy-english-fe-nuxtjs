import { StorybookConfig } from '@storybook/vue3'
import path from 'path'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|ts|jsx|tsx|mdx)',
    '../pages/**/*.stories.@(js|ts|mdx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: { name: '@storybook/vue3-vite', options: {} },
  docs: { autodocs: true },
  async viteFinal(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '..'),
    }
    config.plugins = [...(config.plugins || []), vue()]
    return config
  },
}

export default config
