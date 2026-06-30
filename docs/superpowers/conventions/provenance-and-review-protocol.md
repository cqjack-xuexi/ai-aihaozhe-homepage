---
title: 内容来源标注规范与 Codex↔Claude 双向审核协议
topic: provenance-and-review-protocol
doc_type: spec
version: 1
date: 2026-06-30
authored_by: claude-code
generated_with: claude-code@2.1.196
committed_by: win11-01
status: in-review
reviewed_by: []
source_raw: null
supersedes: null
superseded_by: null
---

# 内容来源标注规范与 Codex↔Claude 双向审核协议

> 本文件是「活标准」(living standard):常驻可引用,版本号走 frontmatter 的 `version`
> 字段,不进文件名。它本身是 **Mode A 直接产物**(由 claude-code 直接写入仓库),
> 故 `source_raw: null`。它正在按自己定义的流程接受审核。

## 1. 为什么需要这套规范

某次协作中,一份审核报告(`docs/reviews/2026-06-30-claude-design-review.md`)的真实来源链是:

```
Codex 写方案 ──→ Claude CLI 只读审核(输出到终端)──→ Codex 转录为 .md ──→ Codex git commit
```

但 git 只记录了 `committed_by = win11-01`。**「内容由谁生成」(content provenance)与
「提交由谁执行」(commit provenance)之间没有任何机器可验证的线**。三个候选信息源都无法独立坐实归属:

| 信息源 | 它能说什么 | 为什么不够 |
|--------|-----------|-----------|
| git 元数据 | 谁执行了 commit | 只有单一 author 字段,表达不了多 agent 协作 |
| 文件正文自述 | "本机 Claude Code 审核" | 不可验证的散文,谁都能打出来 |
| 会话上下文 | (空) | 终端输出从未存档,新会话读不到 |

根因:**流水线每一次交接都丢掉来源信息,且没有任何工具在交接时打"来源戳"。**
本规范用三大支柱补这个洞,并把往返审核固化成一条必须经 GitHub 对接的可追溯流程。

## 2. 三大支柱

### 支柱 1 — Frontmatter 来源 Schema(把两种来源分列)

所有 spec / review / thread 文档头部加 YAML frontmatter。核心是
**`authored_by`(内容来源)与 `committed_by`(提交来源)分开记录**:git 只能保证后者,
前者靠本字段自证,并在 Mode B 下由 raw 归档佐证。

字段语义见 §5 模板。关键字段:

- `topic`:串联 spec ↔ review ↔ raw ↔ thread 的主键(slug)。
- `doc_type`:`spec | review | raw | thread`。
- `authored_by`:内容生成者(`codex | claude-code | human | <name>`)。
- `generated_with`:工具及版本,如 `claude-code@2.1.196`、`codex-cli`。
- `committed_by`:执行 `git commit` 者(冗余声明,使文件自包含,不依赖 `git log`)。
- `source_raw`:Mode B 时指向逐字原文存档;Mode A 为 `null`。

### 支柱 2 — Raw 归档(转录类产物的逐字原文)

规范区分两种产出模式 —— 这是修复原始断点的关键:

- **Mode A 直接产物**:agent 有仓库写权限,直接写 `.md`。该 `.md` 即权威原件,
  `source_raw: null`,`authored_by` = 该 agent,`committed_by` 可与之相同或为执行推送的人。
- **Mode B 转录产物**:agent 只读 / 仅输出到终端,由人或另一 agent 转录(如上文首页审核)。
  此时**必须**把逐字原文存到
  `docs/reviews/raw/<date>-<reviewer>-<topic>-rN.txt`(**永不编辑**),
  整理版 `.md` 的 `source_raw` 指向它;`authored_by` = 原 agent,`committed_by` = 转录者。

`raw/*.txt` 顶部用注释行记录捕获上下文:时间、工具及版本、命令、开放的工具集。
原文一旦提交不再修改;若需更正,在整理版 `.md` 中说明,不动 raw。

### 支柱 3 — 接力棒文件(表达 git 无法表达的"轮到谁")

每个主题一个线程索引(接力棒):`docs/reviews/<topic>.thread.md`。
它承载 git author 字段表达不了的协作状态:**当前轮到谁、第几轮、整体状态**。

frontmatter 见 §5;正文是按时间排列的回合表:

```
round | date | actor | artifact 路径 | verdict | next-turn
```

每次交接都更新它,使任何读仓库的人/agent 无需依赖会话记忆即可还原完整协作链。

## 3. 协议:状态机与交接规则

### 3.1 交接规则(修洞核心)

> **一次交接 = 一次 `git push` 到共享远程分支 + 翻转 `thread.turn`。**

终端输出不算交接;只有 push 到 `origin`、对方能 `git pull` 到,才算完成。
这条规则把"易失的终端输出"换成"持久、带版本、双方可见的远程产物"。

每个 agent 动手前的固定动作:

```
git pull                              # 取回对方最新产物
读 docs/reviews/<topic>.thread.md      # 确认 turn 是不是自己
  └─ 不是 → 停,不要动手
  └─ 是   → 继续
做产物(spec / review / 修订)
更新 thread(翻转 turn / round±1 / status)
git commit + git push                 # 完成交接
```

### 3.2 状态机

```
draft
  │  (push, turn→reviewer)
  ▼
in-review ──reviewer verdict──┐
  │                           │
  ├─ approve ───────────► 若双方都已 approve → approved-by-both → 合并 main, thread done
  │
  ├─ changes-requested ─► author 修订(version+1), round+1,
  │                        turn 回 author → 再 push 回 reviewer → in-review(循环)
  │
  └─ block ─────────────► 停, 人工介入
```

### 3.3 双向对称

谁起草谁就是 author,对方即 reviewer。方向由 `thread.turn` 驱动交替,因此同一套流程
天然支持两个方向,且支持多轮往返:

- **Claude 起草 → Codex 审**:`authored_by: claude-code`,reviewer = codex。
- **Codex 起草 → Claude 审**:`authored_by: codex`,reviewer = claude-code。

`review` 文档的 `verdict` 为 `changes-requested` 时,author 修订后 `version+1`、
thread `round+1`,再次交给 reviewer,直到 `verdict: approve`。双方都 approve 才进
`approved-by-both` 并合并 `main`。

## 4. 命名约定

| 用途 | 路径 |
|------|------|
| 活标准(常驻、可引用,版本走 frontmatter) | `docs/superpowers/conventions/provenance-and-review-protocol.md` |
| 主题 spec | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| 审核报告 | `docs/reviews/YYYY-MM-DD-<reviewer>-<topic>-review-rN.md` |
| raw 逐字原文 | `docs/reviews/raw/YYYY-MM-DD-<reviewer>-<topic>-rN.txt` |
| 接力棒(线程索引) | `docs/reviews/<topic>.thread.md` |

模板见 `docs/superpowers/conventions/templates/`:`spec.frontmatter.md`、
`review.frontmatter.md`、`thread.frontmatter.md`。

## 5. 字段速查

完整可复制模板在 `templates/` 下。各 `doc_type` 必填字段:

- **spec**:`title, topic, doc_type, version, date, authored_by, generated_with,
  committed_by, status, reviewed_by, source_raw, supersedes, superseded_by`
- **review**:spec 全部字段 + `reviews_target, target_version, review_round, verdict`
- **thread**:`doc_type, topic, status, turn, round, branch, participants`

`status` 取值:`draft | in-review | changes-requested | revised | approved |
approved-by-both | superseded`。
`verdict` 取值:`approve | changes-requested | block`。

## 6. 附录:回填示例(闭合原始问题)

下例展示如何给催生本规范的那份首页审核
(`docs/reviews/2026-06-30-claude-design-review.md`)补上正确的来源标注。
它是 **Mode B 转录产物**的典型:内容由 claude-code 生成、输出到终端,由 win11-01 转录提交。

```yaml
---
title: Claude 设计方案审核
topic: noomo-inspired-homepage
doc_type: review
version: 1
date: 2026-06-30
authored_by: claude-code            # 内容是 Claude 审核生成的
generated_with: claude-code@2.1.183 # 当时调用的 CLI 版本
committed_by: win11-01              # git author —— 只代表"谁执行了提交"
status: approved
reviewed_by: []
reviews_target: docs/superpowers/specs/2026-06-30-noomo-inspired-homepage-design.md
target_version: 1
review_round: 1
verdict: changes-requested
source_raw: docs/reviews/raw/2026-06-30-claude-noomo-inspired-homepage-r1.txt
supersedes: null
superseded_by: null
---
```

> 注:本附录仅为**示例**。实际回填该文件(并补建其 raw 原文)应在它所在的
> `design/noomo-inspired-homepage` 分支上单独进行,不在本标准分支修改。
> 若当时的终端原文已不可得,`source_raw` 应标注为
> `docs/reviews/raw/...-UNAVAILABLE.txt` 并在其中说明原文未留存——
> 这本身就是本规范要消除的情形。

