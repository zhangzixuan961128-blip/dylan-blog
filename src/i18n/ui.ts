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
    'hero.tagline': 'AI产品经理 · AI产品设计、Agent安全与Skill生态运营',
    'hero.about': '关于我',
    'posts.title': '最新文章',
    'posts.empty': '博客建设中，敬请期待...',
    'posts.all': '全部文章',
    'footer.copy': '© {year} Dylan Zhang. All rights reserved.',
    'about.title': '关于我',
    'about.intro1': 'Hi，我是 Dylan Zhang（张子玄），AI产品经理。',
    'about.intro2': '目前在负责公司AI Skill产品线的C端产品与运营，把产品铺到10+个渠道，并主导可信工作台MCP的生态对接；同时深耕Agent安全防护。相信AI Agent是下一个大机会，致力于让可信的AI能力触达更多用户。',
    'about.focus': '我关注什么',
    'about.agent_security': 'AI Agent Security — 如何保护AI Agent免受prompt注入、越狱攻击',
    'about.ai_design': 'AI产品设计 — 从需求洞察到产品落地的全流程实践',
    'about.agent_arch': 'Agent架构与MCP — 工具调用、记忆系统、Agent生态集成',
    'about.skill_eco': 'Skill 生态运营 — 多渠道分发、自动化数据运营与生态合作',
    'about.find': '你可以在这里找到我',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'hero.tagline': 'AI Product Manager · AI product design, Agent security & Skill ecosystem operations',
    'hero.about': 'About me',
    'posts.title': 'Latest Posts',
    'posts.empty': 'Blog under construction, stay tuned...',
    'posts.all': 'All posts',
    'footer.copy': '© {year} Dylan Zhang. All rights reserved.',
    'about.title': 'About',
    'about.intro1': "Hi, I'm Dylan Zhang, an AI Product Manager.",
    'about.intro2': "I lead product and operations for our AI Skill product line in the C-end market, distributing skills across 10+ channels and driving our Trusted Workbench MCP ecosystem integration, while working deeply on Agent security. I believe AI Agents represent the next major opportunity — my mission is making trusted AI capabilities reach more users.",
    'about.focus': 'What I Focus On',
    'about.agent_security': 'AI Agent Security — Protecting AI Agents from prompt injection and jailbreak attacks',
    'about.ai_design': 'AI Product Design — Full-cycle practice from insight to delivery',
    'about.agent_arch': 'Agent Architecture & MCP — Tool calling, memory systems, agent ecosystem integration',
    'about.skill_eco': 'Skill Ecosystem — Multi-channel distribution, automated data ops & ecosystem partnerships',
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
