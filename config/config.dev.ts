import { defineConfig } from '@umijs/max';
import define from './define';

export default defineConfig({
  mfsu: false,
  base: '/central-admin/',
  publicPath: '/central-admin/',
  define: {
    ...define,
    API_URL_PREFIX: '/central',
    API_URL: 'https://api-beta.lookstar.com.cn',
  },
});
