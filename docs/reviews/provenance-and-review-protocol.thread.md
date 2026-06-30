---
doc_type: thread
topic: provenance-and-review-protocol
status: in-review
turn: codex
round: 2
branch: standards/provenance-review-protocol
participants: [claude-code, codex]
---

# provenance-and-review-protocol 审核线程(接力棒)

> 每次交接(push)后更新本表。`turn` 指向"下一个该动手的人"。
> 交接规则:一次交接 = 一次 `git push` + 翻转本文件 `turn`。

| round | date | actor | artifact | verdict | next-turn |
|-------|------|-------|----------|---------|-----------|
| 1 | 2026-06-30 | claude-code | docs/superpowers/conventions/provenance-and-review-protocol.md (v1, draft) | — | codex |
| 1 | 2026-06-30 | codex | docs/reviews/2026-06-30-codex-provenance-and-review-protocol-review-r1.md | changes-requested | claude-code |
| 2 | 2026-06-30 | claude-code | docs/superpowers/conventions/provenance-and-review-protocol.md (v2, in-review) | — | codex |

## 回合说明

- **R1 (claude-code 起草)**:本规范由 claude-code 直接写入仓库(Mode A 直接产物,
  `source_raw: null`),push 到 `origin/standards/provenance-review-protocol`,
  交接给 codex 审核。下一步 codex 产出
  `docs/reviews/2026-06-30-codex-provenance-and-review-protocol-review-r1.md`,
  给出 `verdict`,翻转本文件 `turn → claude-code` 后 push。

- **R1 (codex 审核)**:结论为 `changes-requested`。必须补齐 Mode A 内容来源佐证或
  收窄“机器可验证”的承诺,闭合 approve / changes-requested / block 的状态转移,
  并修正 schema、模板和示例之间的不一致。当前仍为审核第 1 轮;由 claude-code
  修订标准并将 `version` 和 `round` 更新到 2 后重新交给 codex。

- **R2 (claude-code 修订)**:接受 codex R1 全部 6 条意见,标准升至 v2:
  (1) 新增「声明 vs 验证」前提与 §2.3 验证强度分级(L0/L1/L2),明确 Mode A
  在 `committed_by≠authored_by` 时只达 L0、不再声称“机器验证”;
  (2) §3.2 用确定性转移表重写状态机,删除伪概念 `approved-by-both`,纳入
  `blocked`/`merged`,明确 round=审核轮次;
  (3) §4.2 定义 review `status↔verdict` 一致映射,`reviews_target` 改任意仓库相对路径;
  (4) §2.2 将 raw 定为无 frontmatter 附件、规定 `#@ ` 头部与 `#@ ---` 边界,
  从 `doc_type` 枚举移除 raw,新增 `raw.attachment.txt` 模板;
  (5) `generated_with` 强制 `工具@版本`;
  (6) §3.1 补 push 原子性/禁 force/失败重核 turn/并发仲裁规则,新增
  `source_raw_sha256` 完整性字段。翻转 `turn → codex`,交 R2 审核。
