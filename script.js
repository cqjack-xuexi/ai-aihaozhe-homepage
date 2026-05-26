const siteConfig = {
  siteName: "AI爱好者",
  tagline: "一个普通AI爱好者的副业实验记录",
  stats: {
    toolSpend: "3000元+",
  },
  platforms: [
    {
      name: "即刻",
      description: "日常实验和过程记录",
      url: "",
    },
    {
      name: "小红书",
      description: "AI工具、内容创作和踩坑笔记",
      url: "",
    },
    {
      name: "知乎",
      description: "长文复盘和方法拆解",
      url: "",
    },
    {
      name: "公众号",
      description: "Hub长文首发入口",
      url: "",
    },
    {
      name: "X / Twitter",
      description: "英文短记录和公开构建",
      url: "",
    },
  ],
  contentLinks: {
    featuredReview: "",
  },
};

function renderPlatforms() {
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

    const status = hasUrl ? "打开平台" : "即将同步";
    element.innerHTML = `
      <span class="platform-name">${platform.name}</span>
      <span class="platform-status">${platform.description}<br>${status}</span>
    `;
    mount.appendChild(element);
  });
}

function applyConfig() {
  document.querySelectorAll("[data-config='toolSpend']").forEach((node) => {
    node.textContent = siteConfig.stats.toolSpend;
  });

  const featured = document.querySelector("[data-config='featuredLink']");
  if (featured && siteConfig.contentLinks.featuredReview) {
    featured.href = siteConfig.contentLinks.featuredReview;
    featured.textContent = "阅读完整复盘";
    featured.target = "_blank";
    featured.rel = "noopener noreferrer";
  }
}

applyConfig();
renderPlatforms();
