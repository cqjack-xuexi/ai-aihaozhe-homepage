# Claude 设计方案审核

审核日期：2026-06-30  
审核方式：本机 Claude Code 2.1.183，只读访问 `Read`、`Glob`、`Grep`  
审核范围：

- `docs/superpowers/specs/2026-06-30-noomo-inspired-homepage-design.md`
- `index.html`
- `styles.css`
- `script.js`

## 总体结论

方案可以在当前无构建系统的 GitHub Pages 静态站中实施，但现有页面仍是静态图片与常规区块布局，尚无 WebGL、滚动场景或 `data-scene` 骨架。

实施可靠性的关键是保持内容层与 WebGL 层解耦：现有语言切换、平台渲染和正文不能依赖 Three.js、GSAP 或任何外部 CDN 成功加载。

## 阻塞问题

### 1. 外部依赖不能与核心内容脚本耦合

`index.html` 当前以经典脚本方式加载 `script.js`，而 `script.js` 同时负责：

- `siteConfig`
- `applyTranslations`
- `renderPlatforms`
- `setLanguage`
- 文章与平台链接配置

如果直接将 `script.js` 改为 ESM，并在顶层导入 CDN 上的 Three.js 或 GSAP，CDN 加载失败会导致整个模块停止执行，语言切换、平台入口和内容配置也会失效。

**最小修改建议：**

- 保持 `script.js` 为零外部依赖的经典脚本。
- 新增独立 `scene.js`，通过 `type="module"` 加载。
- 在 `scene.js` 内使用带超时和错误捕获的动态 `import()`。
- 场景初始化失败时只切换到静态主视觉，不影响正文和链接。

### 2. 当前 Hero 结构与全屏场景目标冲突

`index.html` 的 `.hero` 当前是文案和 `figure.hero-visual` 的两栏布局；`styles.css` 又将主视觉处理成带边框、阴影和圆角的图片容器。

这与设计方案要求的“全视口 WebGL 背景、文案覆盖其上、不放入卡片容器”相冲突。

**最小修改建议：**

- 将 Hero 改成全视口层叠结构。
- 底层放置装饰性 Canvas 和静态降级图片。
- 上层放置品牌定位、实验状态和行动入口。
- 将现有 `assets/ai-lab-dashboard.png` 用作降级图片，而非最终主视觉。

### 3. 缺少场景接口骨架

设计方案约定用 `data-scene` 表示形成、分流、聚焦和回流四个阶段，但当前 HTML 中没有对应属性，也没有 Canvas 或滚动进度控制器。

**最小修改建议：**

- 在 Hero、内容方向、最新复盘和关注入口上增加明确的 `data-scene` 标识。
- 场景模块只接收滚动进度、视口、指针位置和性能等级。
- 不允许场景模块读取或重建业务文案。

### 4. 移动端视口和滚动行为需要提前约束

`styles.css` 当前使用 `100vh` 计算 Hero 高度。iOS Safari 的动态地址栏会使其在滚动时变化；如果再叠加 ScrollTrigger pin 或滚动接管，容易产生布局跳动和阅读中断。

**最小修改建议：**

- 使用 `100svh` 或 `100dvh`，并保留 `100vh` 回退。
- 场景只读取原生滚动进度，不进行 scroll-jacking。
- 不固定正文区块，不阻止浏览器原生滚动。

## 建议改进

1. 固定 Three.js、GSAP 和 ScrollTrigger 的精确版本，不使用 `latest`，也不混用 ESM 与 UMD 加载方式。
2. 增加 `prefers-reduced-motion` CSS，关闭平滑滚动、持续旋转、镜头穿越和明显位移动画。
3. Canvas 使用 `aria-hidden="true"` 且不可聚焦；首屏降级图使用 `decoding="async"`，不使用懒加载。
4. 场景模块限制设备像素比，移动端减少粒子与灯光，并在页面隐藏时暂停渲染。
5. 场景只初始化一次，不进入 `applyTranslations` 或 `setLanguage` 生命周期。
6. `featuredLink` 未配置时应显示明确的不可用状态，避免链接看似指向文章，实际跳到关注区域。

## 已合理，无需调整

- `script.js` 中的 `data-i18n`、`data-i18n-html` 和 `data-i18n-attr` 结构清晰，可以继续使用。
- `siteConfig` 已集中管理金额、文章、平台和默认语言，符合后续维护需要。
- `renderPlatforms` 已正确区分可用链接和“即将同步”，并为外链添加安全属性。
- `index.html` 的标题层级、区域标签、导航标签和语言按钮状态具备良好的无障碍基础。
- `.nojekyll` 和当前纯静态文件结构适合 GitHub Pages。
- `assets/ai-lab-dashboard.png` 可以直接承担本地降级主视觉。
- 现有断点和 `clamp()` 字号可作为桌面与移动适配的基础。

## 推荐实施顺序

1. 隔离 `script.js` 内容层与新增 `scene.js` 场景层。
2. 将 Hero 重构为全视口场景与文案层叠结构。
3. 添加四段 `data-scene` 骨架。
4. 完成静态降级、动态视口单位和减少动态效果模式。
5. 接入固定版本依赖，实现不劫持滚动的四阶段场景。
6. 增加设备降配、DPR 限制和页面可见性生命周期。
7. 使用 Playwright、Canvas 像素检查、键盘走查和 Lighthouse 验证设计方案中的验收标准。

## 处理结论

以上意见将作为后续实施计划的前置约束。其中四项阻塞问题必须在实现初期处理；建议改进应随对应模块一起完成；已合理部分应保留，避免无关重构。
