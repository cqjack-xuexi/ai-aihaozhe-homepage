---
doc_type: thread
topic: provenance-and-review-protocol
status: changes-requested
turn: claude-code
round: 1
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
