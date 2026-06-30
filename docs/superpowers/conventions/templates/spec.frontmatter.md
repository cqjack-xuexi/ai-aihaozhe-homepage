---
title: <方案标题>
topic: <topic-slug>            # 串联 spec↔review↔raw↔thread 的主键
doc_type: spec
version: 1                     # 本文件自身修订号,每次实质修改 +1
date: YYYY-MM-DD
authored_by: <codex | claude-code | human | name>   # 内容生成者
generated_with: <tool@version>  # 强制 工具@版本,如 claude-code@2.1.196;不可得用 <tool>@unknown
committed_by: <git author>     # 执行 git commit 者(冗余声明,使文件自包含)
status: draft                  # draft|in-review|changes-requested|approved|merged|blocked|superseded
reviewed_by: []                # 审过它的 agent 列表
source_raw: null               # Mode B 转录时指向 raw 存档;Mode A 直接写入则为 null
source_raw_sha256: null        # Mode B 时为 raw 文件的 sha256;Mode A 为 null
provenance_level: L0           # L0|L1|L2,本文档来源验证强度(见标准 §2.3);缺省按 L0
supersedes: null               # 若取代旧版,填旧版路径
superseded_by: null            # 若被新版取代,填新版路径
---

# <方案标题>

<!-- 正文从这里开始。spec 描述要做什么、边界、验收标准。 -->
