# Changelog

本仓库版本级变更记录。约定见全局 CLAUDE.md。

## [provenance-protocol v4] - 2026-07-01
### Features
- 新增「内容来源标注规范 + Codex↔Claude 双向审核协议」活标准
  (`docs/superpowers/conventions/provenance-and-review-protocol.md`),经 Claude 起草、
  Codex 四轮往返审核(v1→v4)approve 后合并 `main`。
- 配套模板 `docs/superpowers/conventions/templates/`:`spec/review/thread.frontmatter.md`、
  `raw.attachment.txt`、`reviewer-instructions.md`(可复用审核指令)。
- 四轮审核报告 + 接力棒线程归档于 `docs/reviews/`。

### Design Rationale
- **要解决的断点**:git 只记录 `committed_by`(谁提交),无法表达 `authored_by`(内容由谁生成);
  多 agent 协作里"内容来源"与"提交来源"之间无机器可读的线。
- **三大支柱**:① frontmatter 把两种来源分列 + `generated_with` 强制带版本 +
  `provenance_level`(L0/L1/L2);② Mode B 转录产物存逐字 `raw` 附件 + sha256;
  ③ 接力棒 `<topic>.thread.md` 表达 git 无法表达的 `turn`,交接 = 一次 `git push` + 翻转 turn。
- **声明 vs 验证**:frontmatter 是机器可读"声明",非"验证";引入可信身份(L2)前不声称已机器验证。
- **规范自证**:该规范本身走它自己定义的流程通过审核,全程来源链落仓库,clone 即可还原,
  不依赖任何一方会话记忆。

### Notes & Caveats
- 远程分支 `standards/provenance-review-protocol` 保留(历史已并入 main)。
- 审核工具默认 **Codex Desktop**(`generated_with: codex-desktop@26.623.70822`),非 CLI;
  曾误填 `codex-cli@0.139.0`,已在 R4 由来源方修正——确认工具存在 ≠ 确认它生成了内容。
- 协议规定共享分支禁 force push;`reset --hard` 仅在工作树干净且已建 backup ref 时允许。
