---
doc_type: thread
topic: provenance-and-review-protocol
status: in-review
turn: codex
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

## 回合说明

- **R1 (claude-code 起草)**:本规范由 claude-code 直接写入仓库(Mode A 直接产物,
  `source_raw: null`),push 到 `origin/standards/provenance-review-protocol`,
  交接给 codex 审核。下一步 codex 产出
  `docs/reviews/2026-06-30-codex-provenance-and-review-protocol-review-r1.md`,
  给出 `verdict`,翻转本文件 `turn → claude-code` 后 push。
