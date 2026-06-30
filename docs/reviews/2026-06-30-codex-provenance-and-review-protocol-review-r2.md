---
title: 内容来源标注规范与双向审核协议 R2 审核
topic: provenance-and-review-protocol
doc_type: review
version: 1
date: 2026-06-30
authored_by: codex
generated_with: codex-cli@0.139.0
committed_by: win11-01
status: changes-requested
reviewed_by: []
reviews_target: docs/superpowers/conventions/provenance-and-review-protocol.md
target_version: 2
review_round: 2
verdict: changes-requested
source_raw: null
source_raw_sha256: null
supersedes: null
superseded_by: null
---

# 内容来源标注规范与双向审核协议 R2 审核

## 总体结论

`changes-requested`。v2 已正确收窄“机器可验证”的承诺，修复了
`status`/`verdict`、`reviews_target` 和 `generated_with` 的模板矛盾，也补上了
raw 完整性字段及多数交接约束。但确定性转移表仍存在一对多后置态和不可达状态，
非快进恢复步骤无法按所写命令执行，raw 多行命令也没有无歧义语法，因此尚不能批准。

## 必须修改

### 1. [高] 转移表仍不是确定性的，且 `superseded` 没有进入路径

标准第 180-190 行声称每个三元组产生唯一后置态，但
`(blocked, 人工解除, human)` 同一行给出 `in-review` **或**
`changes-requested` 两个后置态。这正是 R1 要求消除的歧义。应拆成两个不同事件，
并分别明确 `turn`：恢复原审核应交给 reviewer，退回修订才交给 author；当前行无论
选择哪个后置态都固定 `turn: author`，与 `in-review` 应由 reviewer 行动的约束冲突。

此外，`superseded` 被列为终态和合法 status（第 177、192、246-247 行），但表中没有
任何事件进入它。需要补充唯一转移，或从本协议状态机中移除。建议同时把 `reviewed_by`
的更新时间写入 reviewer 转移，否则该必填字段仍依赖表外约定。

### 2. [高] push 冲突恢复流程会在本地已分叉时卡住

标准第 158-160 行要求 push 非快进被拒后先执行 `git pull --ff-only`。此时本地通常
已有未推送的交接 commit，而远程也已有新 commit，两者已经分叉；`--ff-only` 必然
拒绝，后续“重新核对 turn”和“rebase 自己的 commit”无法到达。

应给出可执行顺序，例如先 `git fetch`，从 `origin/<branch>` 读取 thread 并核对 turn；
turn 已变则废弃本地交接，仍未变才 rebase/cherry-pick 后重试。还需明确“作废”不得
用被禁止的 force push，且不得把已失效的 thread 翻转带入后续提交。

### 3. [中] raw 的多行 `command` 规则不可无歧义解析

标准第 97-100 行规定每个头部元数据行以 `#@ ` 开头，同时要求 `command` 中的换行
“按 shell 原样保留，不转义”。一旦命令包含换行，后续物理行既没有续行前缀或长度，
也可能长得像新的 `#@ key:`；解析器无法判断它属于 command、其他头字段还是非法行。
`raw.attachment.txt` 也只展示单行 command。

需要定义一种确定语法，例如限定 command 必须单行并规定转义，或采用带结束标记/长度
的多行块。还应明确解析器只把第一个独占行 `#@ ---` 当作正文边界。SHA-256 对整个文件
计算以及“头部不属于逐字正文”的定义本身是清楚的。

### 4. [中] L0 覆盖条件与“每份文档必须标注级别”尚未完全自洽

第 122、126-129 行只把 `committed_by != authored_by` 的 Mode A 明确定为 L0。
但二者相等并不等于可信身份：未签名的同名提交在没有 L2 机制时同样只有声明，当前
分级没有明确归属。L0 应覆盖所有既不满足 L1、也不满足 L2 的文档，而不是依赖两个
可自填名称是否相等。

第 117-118 行又要求每份文档诚实标注级别，却允许“正文或 `provenance_level` 字段”，
而字段速查和模板均没有该字段，无法稳定机器读取。应选择一种规范表示并同步 schema/
模板；若只要求正文说明，则应撤回“每份文档可机器读取级别”的暗示。

## R1 六项复核

| R1 项 | 结果 | R2 判断 |
|-------|------|---------|
| 1. 声明与验证 / Mode A | 部分闭合 | 已明确不声称机器验证；L0 覆盖和级别标注仍需修正 |
| 2. 确定性状态机 | 未闭合 | blocked 一对多，`turn` 冲突，superseded 无转移 |
| 3. status↔verdict / 任意路径 | 已闭合 | §4.2、review 模板和附录一致 |
| 4. raw 格式 / sha256 | 部分闭合 | 边界和摘要清楚；多行 command 语法仍歧义 |
| 5. generated_with 版本 | 已闭合 | 正文、spec/review/raw 模板均要求 `tool@version` |
| 6. 原子性 / 并发 | 部分闭合 | 原子 commit、禁 force、仲裁原则已补；失败恢复命令不可执行 |

## 未发现的新方向性问题

删除 `approved-by-both`、由 reviewer 单独触发 `approved`，使两个起草方向在角色上对称；
`approve` 后把 `turn` 交回 author 合并也与本线程约定一致。上述问题均可在 v3 内局部修正，
无需重构三大支柱。

