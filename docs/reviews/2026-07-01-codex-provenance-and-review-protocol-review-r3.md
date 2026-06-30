---
title: 内容来源标注规范与双向审核协议 R3 审核
topic: provenance-and-review-protocol
doc_type: review
version: 1
date: 2026-07-01
authored_by: codex
generated_with: codex-desktop@26.623.70822
committed_by: win11-01
status: changes-requested
reviewed_by: []
reviews_target: docs/superpowers/conventions/provenance-and-review-protocol.md
target_version: 3
review_round: 3
verdict: changes-requested
source_raw: null
source_raw_sha256: null
provenance_level: L0
supersedes: null
superseded_by: null
---

# 内容来源标注规范与双向审核协议 R3 审核

## 总体结论

`changes-requested`。R2 指出的四个方向均得到实质回应：状态转移已经确定，
`superseded` 有进入路径，reviewer 转移更新 `reviewed_by`；Git 恢复绕开了分叉时
不可执行的 `pull --ff-only`；L0 成为兜底，`provenance_level` 的写入与兼容读取规则
也一致。剩余问题是 v3 新写入的恢复命令可能误删无关工作，以及 raw 转义缺少唯一的
解码算法。这两项都影响协议能否安全、无歧义执行。

## 必须修改

### 1. [高] `reset --hard` 恢复步骤会无条件销毁无关工作

标准第 177-190 行在远程 turn 已变化时要求执行
`git reset --hard origin/<branch>`。这能丢弃失效的本地交接 commit，也确实没有使用
force push；但它同时会删除工作树和暂存区中与本次交接无关的未提交修改。协议没有在
动手前要求工作树干净，也没有在 reset 前检查或保存这些修改，因此一个遵循协议的
agent 仍可能造成数据丢失。

需要把恢复限定为可验证安全的操作：开始交接前要求并检查 clean worktree；冲突恢复时
再次检查，若存在未提交修改则停止并人工处理。对失效 commit 应先创建备份 ref/branch，
或明确使用只丢弃该交接提交且不覆盖工作树改动的步骤。只有确认没有其他本地工作后，
才能允许 `reset --hard`。禁 force、读取远程 thread 后再仲裁、失效翻转不得 rebase 的
其余规则已经闭合。

### 2. [中] raw 转义有唯一编码，却没有唯一解码规则

标准第 107-111 行规定真实换行编码为字面 `\n`、真实反斜杠编码为 `\\`，但只说
“由读者反转义”，没有规定单遍扫描及匹配优先级。编码文本 `\\n` 是关键反例：它应
表示原始的字面 `\n`，但若实现用两次字符串替换，不同顺序可能得到“反斜杠 + 换行”
或直接得到换行。模板也没有给出解码算法。

应明确采用单遍、从左到右解码：`\\` 映射为一个反斜杠，`\n` 映射为换行，其他
反斜杠序列是原样保留还是报错也需固定；并给出至少覆盖“真实换行”“字面 `\n`”和
“行尾反斜杠”的例子。这样 command 才能往返还原且与物理行边界无歧义。

## R2 四项复核

| R2 项 | 结果 | R3 判断 |
|-------|------|---------|
| 1. 确定性转移表 | 已闭合 | blocked 两事件各有唯一 turn/后置态；superseded 有进入路径；reviewer 转移写 reviewed_by |
| 2. push 失败恢复 | 部分闭合 | fetch/show/rebase 顺序可执行且杜绝 force；`reset --hard` 缺少数据保护前置条件 |
| 3. raw command 语法 | 部分闭合 | 单物理行与边界已确定；转义解码次序仍不唯一 |
| 4. L0 与兼容读取 | 已闭合 | L0 是 L1/L2 之外的兜底；新文档必填，旧 R1/R2 缺省按 L0 |

## 状态机补充判断

表中每个 `(前置态, 事件, 操作者)` 都有唯一后置态。`approved` 下的“弃用”和
`any(非终态)` 下的“被新主题取代”是不同事件，不构成同一三元组冲突；`merged` 与
`superseded` 均置空 turn。未发现 v3 新引入的状态死锁或双向不对称。
