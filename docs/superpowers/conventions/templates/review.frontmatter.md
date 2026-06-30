---
title: <审核标题>
topic: <topic-slug>            # 与所审 spec 的 topic 相同
doc_type: review
version: 1
date: YYYY-MM-DD
authored_by: <claude-code | codex | human | name>   # 审核内容生成者
generated_with: <claude-code@x.y.z | codex-cli>      # 工具及版本
committed_by: <git author>     # 执行 git commit 者
status: in-review
reviewed_by: []
reviews_target: docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md  # 审的哪份及其路径
target_version: 1              # 所审 spec 的 version
review_round: 1                # 第几轮审核
verdict: changes-requested     # approve | changes-requested | block
source_raw: docs/reviews/raw/YYYY-MM-DD-<reviewer>-<topic>-rN.txt  # Mode B 必填;Mode A 为 null
supersedes: null
superseded_by: null
---

# <审核标题>

<!-- 正文:总体结论 / 阻塞问题 / 建议改进 / 已合理无需调整 / 处理结论。 -->
