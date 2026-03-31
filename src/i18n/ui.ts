export const languages = {
  zh: '中文',
  en: 'English',
};

export const defaultLang = 'zh';

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.blog': '文章',
    'nav.about': '关于',
    'hero.tagline': 'AI产品经理 · 探索AI产品设计、Agent架构与行业趋势',
    'hero.about': '关于我',
    'posts.title': '最新文章',
    'posts.empty': '博客建设中，敬请期待...',
    'posts.all': '全部文章',
    'footer.copy': '© {year} Dylan Zhang. All rights reserved.',
    'about.title': '关于我',
    'about.intro1': 'Hi，我是 Dylan Zhang（张子玄），AI产品经理。',
    'about.intro2': '目前在探索AI产品设计、Agent架构与安全防护。相信AI Agent是下一个大机会，致力于让AI更安全、更可控地服务于人。',
    'about.focus': '我关注什么',
    'about.agent_security': 'AI Agent Security — 如何保护AI Agent免受prompt注入、越狱攻击',
    'about.ai_design': 'AI产品设计 — 从需求洞察到产品落地的全流程实践',
    'about.agent_arch': 'Agent架构 — 工具调用、记忆系统、多Agent协作',
    'about.opensource': '开源生态 — OpenClaw、Dify、Claude Code等工具的深度使用',
    'about.find': '你可以在这里找到我',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'hero.tagline': 'AI Product Manager · Exploring AI product design, Agent architecture & industry trends',
    'hero.about': 'About me',
    'posts.title': 'Latest Posts',
    'posts.empty': 'Blog under construction, stay tuned...',
    'posts.all': 'All posts',
    'footer.copy': '© {year} Dylan Zhang. All rights reserved.',
    'about.title': 'About',
    'about.intro1': "Hi, I'm Dylan Zhang, an AI Product Manager.",
    'about.intro2': "Currently exploring AI product design, Agent architecture, and security. I believe AI Agents represent the next major opportunity, and I'm dedicated to making AI safer and more controllable.",
    'about.focus': 'What I Focus On',
    'about.agent_security': 'AI Agent Security — Protecting AI Agents from prompt injection and jailbreak attacks',
    'about.ai_design': 'AI Product Design — Full-cycle practice from insight to delivery',
    'about.agent_arch': 'Agent Architecture — Tool calling, memory systems, multi-agent collaboration',
    'about.opensource': 'Open Source Ecosystem — Deep usage of OpenClaw, Dify, Claude Code, and more',
    'about.find': 'Find me here',
  },
} as const;

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  let pathname = url.pathname;

  // Remove current language prefix if not default
  if (currentLang !== defaultLang) {
    pathname = pathname.replace(`/${currentLang}`, '') || '/';
  }

  // Add target language prefix if not default
  if (targetLang !== defaultLang) {
    pathname = `/${targetLang}${pathname === '/' ? '' : pathname}`;
  }

  return pathname;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function formatDate(date: Date, lang: Lang): string {
  if (lang === 'zh') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
