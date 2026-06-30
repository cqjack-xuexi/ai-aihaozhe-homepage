---
title: <方案标题>
topic: <topic-slug>            # 串联 spec↔review↔raw↔thread 的主键
doc_type: spec
version: 1                     # 本文件自身修订号,每次实质修改 +1
date: YYYY-MM-DD
authored_by: <codex | claude-code | human | name>   # 内容生成者
generated_with: <codex-cli | claude-code@x.y.z>     # 工具及版本
committed_by: <git author>     # 执行 git commit 者(冗余声明,使文件自包含)
status: draft                  # draft|in-review|changes-requested|revised|approved|approved-by-both|superseded
reviewed_by: []                # 审过它的 agent 列表
source_raw: null               # Mode B 转录时指向 raw 存档;Mode A 直接写入则为 null
supersedes: null               # 若取代旧版,填旧版路径
superseded_by: null            # 若被新版取代,填新版路径
---

# <方案标题>

<!-- 正文从这里开始。spec 描述要做什么、边界、验收标准。 -->
