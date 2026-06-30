---
title: 内容来源标注规范与双向审核协议 R4 审核
topic: provenance-and-review-protocol
doc_type: review
version: 1
date: 2026-07-01
authored_by: codex
generated_with: codex-desktop@26.623.70822
committed_by: win11-01
status: approved
reviewed_by: []
reviews_target: docs/superpowers/conventions/provenance-and-review-protocol.md
target_version: 4
review_round: 4
verdict: approve
source_raw: null
source_raw_sha256: null
provenance_level: L0
supersedes: null
superseded_by: null
---

# 内容来源标注规范与双向审核协议 R4 审核

## 总体结论

`approve`。v4 已闭合 R3 的两项修改要求：Git 冲突恢复在进入流程和 reset 前均检查
clean worktree，并在丢弃失效交接前建立 backup ref；raw command 的转义已定义为
单遍、从左到右、消费输入字符的唯一解码算法。结合 v3 已闭合的状态机、来源分级和
模板一致性问题，本标准现已具备可执行、可追溯且双向对称的审核流程。

## R3 两项复核

### 1. Git 恢复流程已闭合

标准第 168-204 行要求开始交接前 `git status --porcelain` 为空，push 冲突后再次
检查；非空即停止并人工处理。远程仲裁仍按 `fetch`、读取 origin thread、核对 turn
执行，绕开分叉时必失败的 `pull --ff-only`。在 turn 已变化时，只有工作树干净且已用
`git branch backup/... HEAD` 保存失效 commit 后才允许 `reset --hard`，并继续明确禁止
force push。该顺序可执行，也不会无条件销毁未提交工作或失去失效交接的恢复入口。

### 2. raw 转义已无歧义

标准第 110-120 行把 command 限定为单物理行，并定义单遍左到右解码：遇反斜杠只检查
下一个字符，`\\` 解码为反斜杠，`\n` 解码为换行，消费后不再扫描输出，其他转义
报错。`\\n`、`a\nb` 和行尾反斜杠三个例子分别覆盖字面 `\n`、真实换行和末尾
反斜杠，编码与解码可以唯一往返。

## 全量复核

- §3.2 每个 `(前置态, 事件, 操作者)` 都有唯一后置态；blocked 的两条恢复与 turn
  一致，superseded 有进入路径，reviewer 转移写入 `reviewed_by`。
- §2.3 的 L0 是不满足 L1/L2 的兜底；v3 起写入必填、旧文档读取缺省 L0，兼容
  R1/R2 等历史报告。
- review 的 `status: approved` 与 `verdict: approve` 符合 §4.2；spec、review、
  thread 和 raw 模板与正文约定一致。
- Claude 起草/Codex 审核与 Codex 起草/Claude 审核仅交换角色，状态转移保持对称。

## 来源声明修正

R1、R2、R3 审核实际由 Codex Desktop 生成。本次由来源方将三份报告的
`generated_with` 从 `codex-cli@0.139.0` 修正为
`codex-desktop@26.623.70822`；审核正文和历史 verdict 未改动。

