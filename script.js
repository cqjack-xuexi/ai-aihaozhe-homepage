const siteConfig = {
  defaultLanguage: "zh",
  stats: {
    toolSpend: {
      zh: "3000元+",
      en: "RMB 3,000+",
    },
  },
  platforms: [
    {
      id: "jike",
      name: {
        zh: "即刻",
        en: "Jike",
      },
      description: {
        zh: "日常实验和过程记录",
        en: "Daily experiments and build notes",
      },
      url: "",
    },
    {
      id: "xiaohongshu",
      name: {
        zh: "小红书",
        en: "Xiaohongshu",
      },
      description: {
        zh: "AI工具、内容创作和踩坑笔记",
        en: "AI tools, content creation, and lessons learned",
      },
      url: "",
    },
    {
      id: "zhihu",
      name: {
        zh: "知乎",
        en: "Zhihu",
      },
      description: {
        zh: "长文复盘和方法拆解",
        en: "Long-form reviews and method breakdowns",
      },
      url: "",
    },
    {
      id: "wechat",
      name: {
        zh: "公众号",
        en: "WeChat Official Account",
      },
      description: {
        zh: "Hub长文首发入口",
        en: "Primary home for long-form essays",
      },
      url: "",
    },
    {
      id: "twitter",
      name: {
        zh: "X / Twitter",
        en: "X / Twitter",
      },
      description: {
        zh: "英文短记录和公开构建",
        en: "Short English notes and public building",
      },
      url: "",
    },
  ],
  contentLinks: {
    featuredReview: "",
  },
};

const translations = {
  zh: {
    meta: {
      title: "AI爱好者 | AI副业实验记录",
      description: "记录一个普通AI爱好者从花钱买工具到找到变现闭环的真实过程：AI工具实测、内容创作、变现探索。",
      ogDescription: "不贩卖成功学，只分享可验证的AI工具投入、内容实验和变现复盘。",
    },
    header: { aria: "主页导航" },
    brand: { name: "AI爱好者", aria: "AI爱好者首页" },
    nav: { aria: "页面导航", record: "实验记录", topics: "内容方向", follow: "关注入口" },
    language: { aria: "语言切换" },
    hero: {
      eyebrow: "AI副业实验室",
      title: "一个普通 AI 爱好者的副业实验记录",
      lede:
        "我花了约3000元买 AI 工具，还没找到稳定变现闭环。这里记录从 <strong>AI消费者</strong> 到 <strong>AI生产者</strong> 的真实过程。",
      primary: "关注我的内容记录",
      secondary: "查看实验复盘",
      actionsAria: "主要操作",
      visualAria: "AI工具实验台主视觉",
      visualAlt: "由多个AI工具、实验数据和内容工作流组成的科技感个人工作台",
    },
    stats: {
      aria: "当前实验状态",
      spendLabel: "AI工具投入",
      toolsValue: "3类工具",
      goalValue: "1个目标",
      goalLabel: "找到第一个变现闭环",
    },
    record: {
      eyebrow: "最新复盘",
      title: "最新复盘",
      tag: "开篇记录",
      articleTitle: "我花了3000元买AI工具，3个月后的真实ROI复盘",
      summary: "不是讲成功案例，而是把账单、尝试、踩坑和下一步路径摊开。先算清楚钱花到哪里，再判断哪些工具真的值得继续投入。",
      link: "等平台发布后同步链接",
      linkReady: "阅读完整复盘",
    },
    topics: {
      eyebrow: "内容地图",
      title: "我会持续记录什么",
      toolTitle: "AI工具实测",
      toolCopy: "真实记录工具费用、使用频率、节省时间和实际产出，避免被AI焦虑绑架。",
      contentTitle: "AI内容创作",
      contentCopy: "用AI做写作、设计、视频和选题，记录人机协作中真正有效的工作流。",
      moneyTitle: "AI变现探索",
      moneyCopy: "尝试内容、服务、工具包和轻咨询，用数据复盘哪些路径靠谱，哪些浪费时间。",
    },
    follow: {
      eyebrow: "关注构建过程",
      title: "关注我的内容记录",
      copy: "第一版先同步内容账号。没有开通或未填写链接的平台，会显示为“即将同步”。",
      live: "打开平台",
      pending: "即将同步",
    },
    footer: {
      copy: "不贩卖成功学，只分享可验证的真实过程。",
    },
  },
  en: {
    meta: {
      title: "AI Enthusiast | AI Side Hustle Experiment Log",
      description:
        "A public log of one AI enthusiast moving from paid tools to a real monetization loop: AI tool tests, content experiments, and side-hustle reviews.",
      ogDescription: "No guru claims. Just verifiable AI tool spending, content experiments, and monetization reviews.",
    },
    header: { aria: "Homepage navigation" },
    brand: { name: "AI Enthusiast", aria: "AI Enthusiast homepage" },
    nav: { aria: "Page navigation", record: "Experiments", topics: "Topics", follow: "Follow" },
    language: { aria: "Language switcher" },
    hero: {
      eyebrow: "AI side hustle lab",
      title: "A real side-hustle log from an everyday AI enthusiast",
      lede:
        "I have spent about RMB 3,000 on AI tools and still have not found a stable monetization loop. This site documents the journey from <strong>AI consumer</strong> to <strong>AI producer</strong>.",
      primary: "Follow the content log",
      secondary: "Read experiment reviews",
      actionsAria: "Primary actions",
      visualAria: "AI tool experiment desk hero visual",
      visualAlt: "A tech-style personal desk showing AI tools, experiment data, and a content workflow",
    },
    stats: {
      aria: "Current experiment status",
      spendLabel: "Spent on AI tools",
      toolsValue: "3 tool types",
      goalValue: "1 goal",
      goalLabel: "Find the first monetization loop",
    },
    record: {
      eyebrow: "Latest review",
      title: "Latest review",
      tag: "Opening log",
      articleTitle: "I spent RMB 3,000 on AI tools. Here is the real ROI after three months.",
      summary:
        "This is not a success story. It is a transparent look at the bills, attempts, mistakes, and next steps, so I can decide which tools are still worth paying for.",
      link: "Link will be added after publication",
      linkReady: "Read the full review",
    },
    topics: {
      eyebrow: "Content map",
      title: "What I will keep documenting",
      toolTitle: "AI tool tests",
      toolCopy: "Real costs, usage frequency, saved time, and actual output, without giving in to AI anxiety.",
      contentTitle: "AI content creation",
      contentCopy: "Writing, design, video, and topic selection with AI, focused on workflows that actually hold up.",
      moneyTitle: "AI monetization experiments",
      moneyCopy: "Testing content, services, toolkits, and light consulting, then reviewing which paths work and which waste time.",
    },
    follow: {
      eyebrow: "Follow the build",
      title: "Follow my content log",
      copy: "Version one points to content accounts first. Platforms without a real link are marked as coming soon.",
      live: "Open platform",
      pending: "Coming soon",
    },
    footer: {
      copy: "No guru claims. Just verifiable experiments.",
    },
  },
};

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => (value ? value[key] : undefined), source);
}

function getCurrentLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested === "zh" || requested === "en") return requested;

  const saved = localStorage.getItem("preferredLanguage");
  if (saved === "zh" || saved === "en") return saved;
  return siteConfig.defaultLanguage;
}

function renderPlatforms(language) {
  const mount = document.querySelector("[data-platforms]");
  if (!mount) return;

  mount.innerHTML = "";

  siteConfig.platforms.forEach((platform) => {
    const hasUrl = Boolean(platform.url);
    const element = document.createElement(hasUrl ? "a" : "article");
    element.className = `platform-card${hasUrl ? " is-live" : ""}`;

    if (hasUrl) {
      element.href = platform.url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }

    const name = document.createElement("span");
    name.className = "platform-name";
    name.textContent = platform.name[language];

    const status = document.createElement("span");
    status.className = "platform-status";
    status.textContent = `${platform.description[language]} / ${
      hasUrl ? translations[language].follow.live : translations[language].follow.pending
    }`;

    element.append(name, status);
    mount.appendChild(element);
  });
}

function applyConfig(language) {
  document.querySelectorAll("[data-config='toolSpend']").forEach((node) => {
    node.textContent = siteConfig.stats.toolSpend[language];
  });

  const featured = document.querySelector("[data-config='featuredLink']");
  if (featured && siteConfig.contentLinks.featuredReview) {
    featured.href = siteConfig.contentLinks.featuredReview;
    featured.textContent = translations[language].record.linkReady;
    featured.target = "_blank";
    featured.rel = "noopener noreferrer";
  }
}

function applyTranslations(language) {
  const dictionary = translations[language];

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = dictionary.meta.title;

  const description = document.querySelector("meta[name='description']");
  if (description) description.setAttribute("content", dictionary.meta.description);

  const ogTitle = document.querySelector("meta[property='og:title']");
  if (ogTitle) ogTitle.setAttribute("content", dictionary.meta.title);

  const ogDescription = document.querySelector("meta[property='og:description']");
  if (ogDescription) ogDescription.setAttribute("content", dictionary.meta.ogDescription);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = getNestedValue(dictionary, node.dataset.i18n);
    if (value) node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const value = getNestedValue(dictionary, node.dataset.i18nHtml);
    if (value) node.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, path] = pair.split(":");
      const value = getNestedValue(dictionary, path);
      if (attribute && value) node.setAttribute(attribute, value);
    });
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  applyConfig(language);
  renderPlatforms(language);
}

function setLanguage(language) {
  localStorage.setItem("preferredLanguage", language);
  applyTranslations(language);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

applyTranslations(getCurrentLanguage());
