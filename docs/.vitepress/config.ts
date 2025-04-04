import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'amvc - Abstract MVC',
  description: 'API Reference',
  base: '/amvc',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Model', link: '/model' },
      { text: 'View', link: '/view' },
      { text: 'Controller', link: '/controller' },
    ],
  },
});
