---
title: <审核标题>
topic: <topic-slug>            # 与所审文档的 topic 相同
doc_type: review
version: 1
date: YYYY-MM-DD
authored_by: <claude-code | codex | human | name>   # 审核内容生成者
generated_with: <tool@version>  # 强制 工具@版本,如 codex-cli@0.139.0;不可得用 <tool>@unknown
committed_by: <git author>     # 执行 git commit 者
status: <approved | changes-requested | blocked>   # 必须与 verdict 一致(见标准 §4.2)
reviewed_by: []
reviews_target: <仓库相对路径>  # 被审文档真实路径,任意目录(如 docs/superpowers/conventions/...)
target_version: 1              # 所审文档的 version
review_round: 1                # 第几轮审核
verdict: changes-requested     # approve→status:approved | changes-requested→changes-requested | block→blocked
source_raw: null               # Mode B 必填 raw 路径;Mode A 为 null
source_raw_sha256: null        # Mode B 时为 raw 文件 sha256;Mode A 为 null
provenance_level: L0           # L0|L1|L2,本审核来源验证强度(见标准 §2.3);缺省按 L0
supersedes: null
superseded_by: null
---

# <审核标题>

<!-- 正文:总体结论 / 必须修改 / 建议改进 / 已合理无需调整 / 处理结论。 -->
