import { defineConfig } from '@umijs/max';
import define from './define';

export default defineConfig({
  mfsu: false,
  base: '/central/',
  publicPath: '/central/',
  define: {
    ...define,
    API_URL_PREFIX: '',
    API_URL: 'http://localhost:8888',
  },
});
