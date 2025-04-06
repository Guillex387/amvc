import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'amvc - Abstract MVC',
  description: 'API Reference',
  base: '/amvc',
  themeConfig: {
    nav: [{ text: 'Guide', link: '/' }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/guillex387/amvc' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Model', link: '/model' },
          { text: 'View', link: '/view' },
          { text: 'Controller', link: '/controller' },
        ],
      },
    ],
  },
});
