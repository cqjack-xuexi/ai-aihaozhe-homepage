---
title: 内容来源标注规范与 Codex↔Claude 双向审核协议
topic: provenance-and-review-protocol
doc_type: spec
version: 2
date: 2026-06-30
authored_by: claude-code
generated_with: claude-code@2.1.196
committed_by: win11-01
status: in-review
reviewed_by: [codex]
source_raw: null
supersedes: null
superseded_by: null
---

# 内容来源标注规范与 Codex↔Claude 双向审核协议

> 本文件是「活标准」(living standard):常驻可引用,版本号走 frontmatter 的 `version`
> 字段,不进文件名。它本身是 **Mode A 直接产物**(由 claude-code 直接写入仓库),
> 故 `source_raw: null`。它正在按自己定义的流程接受审核。
>
> **v2 修订**(回应 codex R1 `changes-requested`):区分「声明」与「验证」并定义
> Mode A 最低佐证(§2.1);用确定性转移表重写状态机、纳入 `blocked`/`merged`、
> 明确 round 语义(§3.2);定义 raw 为无 frontmatter 附件并规定头部边界(§2.2);
> `generated_with` 强制 `工具@版本`(§2.1);补 push 原子性/并发/失败规则(§3.1);
> 修复 review 模板路径与附录 status↔verdict 矛盾(§4.2、§6)。

## 1. 为什么需要这套规范

某次协作中,一份审核报告(`docs/reviews/2026-06-30-claude-design-review.md`)的真实来源链是:

```
Codex 写方案 ──→ Claude CLI 只读审核(输出到终端)──→ Codex 转录为 .md ──→ Codex git commit
```

但 git 只记录了 `committed_by = win11-01`。**「内容由谁生成」(content provenance)与
「提交由谁执行」(commit provenance)之间没有任何线把它们连起来**。三个候选信息源都无法独立还原归属:

| 信息源 | 它能说什么 | 为什么不够 |
|--------|-----------|-----------|
| git 元数据 | 谁执行了 commit | 只有单一 author 字段,表达不了多 agent 协作 |
| 文件正文自述 | "本机 Claude Code 审核" | 不可验证的散文,谁都能打出来 |
| 会话上下文 | (空) | 终端输出从未存档,新会话读不到 |

根因:**流水线每一次交接都丢掉来源信息,且没有任何工具在交接时打"来源戳"。**
本规范用三大支柱补这个洞,并把往返审核固化成一条必须经 GitHub 对接的可追溯流程。

## 2. 三大支柱

> **声明 vs 验证(全规范前提)**:frontmatter 把来源变成**机器可读的声明**
> (machine-readable *declaration*),不等于**机器可验证的事实**(machine-verifiable *fact*)。
> 任何提交者都能填写任意 `authored_by`。本规范在没有可信身份机制(签名提交、
> 受控自动化 attestation)前,**只承诺可读声明 + 旁证降低伪造收益**,不声称已坐实来源。
> 验证强度分级见 §2.3。

### 支柱 1 — Frontmatter 来源 Schema(把两种来源分列)

所有 spec / review / thread 文档头部加 YAML frontmatter。核心是
**`authored_by`(内容来源)与 `committed_by`(提交来源)分开记录**:git 只能保证后者,
前者是一条**声明**,其可信度由 §2.3 的旁证决定。

字段语义见 §5 模板。关键字段:

- `topic`:串联 spec ↔ review ↔ raw ↔ thread 的主键(slug)。
- `doc_type`:`spec | review | thread`(`raw` 是无 frontmatter 附件,见 §2.2,不入此枚举)。
- `authored_by`:内容生成者(`codex | claude-code | human | <name>`)。
- `generated_with`:**强制 `工具@版本`** 格式,如 `claude-code@2.1.196`、`codex-cli@0.139.0`。
  版本确实不可得时,显式写 `<工具>@unknown`,**不得省略 `@` 段**。
- `committed_by`:执行 `git commit` 者(冗余声明,使文件自包含,不依赖 `git log`)。
- `source_raw`:Mode B 时指向逐字原文存档;Mode A 为 `null`。
- `source_raw_sha256`:Mode B 时为 raw 文件的 SHA-256(完整性关联,见 §2.2),
  使"路径存在但内容被换"可被检出;Mode A 为 `null`。

### 支柱 2 — Raw 归档(转录类产物的逐字原文)

规范区分两种产出模式 —— 这是修复原始断点的关键:

- **Mode A 直接产物**:agent 有仓库写权限,直接写 `.md`。该 `.md` 即权威原件,
  `source_raw: null`,`authored_by` = 该 agent,`committed_by` 可与之相同或为执行推送的人。
- **Mode B 转录产物**:agent 只读 / 仅输出到终端,由人或另一 agent 转录(如上文首页审核)。
  此时**必须**把逐字原文存到
  `docs/reviews/raw/<date>-<reviewer>-<topic>-rN.txt`(**永不编辑**),
  整理版 `.md` 的 `source_raw` 指向它、`source_raw_sha256` 记录其摘要;
  `authored_by` = 原 agent,`committed_by` = 转录者。

**raw 文件格式**(无 YAML frontmatter,纯文本附件):

```
#@ captured_at: 2026-06-30T22:10:00+08:00
#@ generated_with: claude-code@2.1.183
#@ command: claude -p "审核..." (开放工具: Read,Glob,Grep)
#@ ---                       <- 此分隔行以下是逐字原文,一字不改
<agent 终端输出原样粘贴,直至文件结束>
```

- 头部元数据每行以 `#@ ` 起始;`#@ ---` 单独成行,标记逐字正文的起始边界。
- 头部**不属于**"逐字原文",是人工添加的捕获上下文;边界行以下才是不可改动的原文。
- `captured_at` 用 ISO-8601 带时区;`command` 内的引号/换行按 shell 原样保留,不转义。
- `source_raw_sha256` 对**整个 raw 文件**(含头部)计算,锁定提交时的完整内容。

### 支柱 3 — 接力棒文件(表达 git 无法表达的"轮到谁")

每个主题一个线程索引(接力棒):`docs/reviews/<topic>.thread.md`。
它承载 git author 字段表达不了的协作状态:**当前轮到谁、第几轮、整体状态**。

frontmatter 见 §5;正文是按时间排列的回合表:

```
round | date | actor | artifact 路径 | verdict | next-turn
```

每次交接都更新它,使任何读仓库的人/agent 无需依赖会话记忆即可还原完整协作链。

### 2.3 来源验证强度分级(回应「声明 vs 验证」)

来源声明的可信度不是布尔值,而是分级的。本规范要求每份文档**诚实标注自己达到的级别**
(可在正文或 `provenance_level` 字段注明),不得把低级别说成高级别:

| 级别 | 名称 | 条件 | 可信度 |
|------|------|------|--------|
| L0 | declared | 仅 frontmatter 声明,无任何旁证(Mode A 且 `committed_by ≠ authored_by`) | 最低,等同散文自述 |
| L1 | raw-attested | Mode B:有逐字 raw + `source_raw_sha256`,内容被换可检出 | 中,伪造需同时改原文与摘要 |
| L2 | identity-attested | 由可信身份直接提交(签名 commit / 受控自动化 attestation) | 高,本规范暂未强制,留作演进 |

**Mode A 的最低佐证要求**:当 `committed_by ≠ authored_by`(agent 写、人代提交)时,
该文档默认只能达到 **L0**。要提升到 L1,转录者应保留一份生成记录(如带工具元数据的
会话导出或终端日志)作为 raw 附件并按 §2.2 记 sha256——此时 Mode A 实质退化为 Mode B。
**在引入 L2 身份机制前,本规范任何文字均不得声称内容来源已被"机器验证"。**

## 3. 协议:状态机与交接规则

### 3.1 交接规则(修洞核心)

> **一次交接 = 一次 `git push` 到共享远程分支 + 翻转 `thread.turn`。**

终端输出不算交接;只有 push 到 `origin`、对方能 `git pull` 到,才算完成。
这条规则把"易失的终端输出"换成"持久、带版本、双方可见的远程产物"。

每个 agent 动手前的固定动作:

```
git pull --ff-only                    # 取回对方最新产物;非快进则停下核对
读 docs/reviews/<topic>.thread.md      # 确认 turn 是不是自己
  └─ 不是 → 停,不要动手
  └─ 是   → 继续
做产物(spec / review / 修订)
更新 thread(翻转 turn / round±1 / status)
git commit + git push                 # 完成交接
```

**原子性、并发与失败规则:**

1. **交接 commit 必须原子**:产物文件与 `thread` 的更新写进**同一个 commit**。
   不允许"先提交产物、后单独改 thread"的两次提交——读者看到产物时 `turn` 必须已翻转。
2. **共享分支禁止 force push**:`standards/*`、`design/*` 等协作分支永不 `--force` /
   `--force-with-lease`。历史只追加。
3. **push 被拒 = 交接未完成**:若 push 因非快进被拒,说明对方已先 push。必须
   `git pull --ff-only` → **重新核对 `thread.turn` 是否仍是自己** → 若 turn 已变则你的
   这一步作废,按新状态重走;若 turn 未变则 rebase 自己的 commit 后重 push。
4. **turn 是并发仲裁器**:两方基于同一 `turn` 并发动手时,先 push 成功者翻转 turn,
   后者的 push 必被拒(规则 3 兜底),从而串行化。普通非快进保护是本协议的前提,不是可选项。
5. **thread 引用交接 commit**:回合表的每一行可在 `artifact` 或备注中附上完成该交接的
   commit 短哈希,使"哪个 commit 完成了第 N 次交接"可追溯。

### 3.2 状态机(确定性转移表)

**角色与终态定义(消除歧义):**

- 本协议是**单评审方**模型:author 起草,reviewer 审。**终态由 reviewer 的
  `approve` 唯一触发**,不存在"双方都 approve"——author 不对自己的产物出 verdict。
  (此前 v1 的 `approved-by-both` 是伪概念,已删除。)
- `round` 语义固定为**审核轮次**:reviewer 每产出一份 review 即该 round 的结论;
  author 据 `changes-requested` 修订并 push 后,`round+1`,进入下一审核轮。
  审核未发生时 round 不变(故 reviewer 交接回 author 时 round 不动,author 修订 push 时才 +1)。

**状态枚举**:`draft | in-review | changes-requested | approved | merged | blocked | superseded`
(每个 review 也有自己的 `status`,必须与其 `verdict` 一致,见 §4.2)。

**确定性转移表**——每行给出唯一的 (前置状态, 事件, 操作者) → (写入, turn, round, 后置状态):

| 前置状态 | 事件 | 操作者 | 写入字段 | 交接后 turn | round | 后置状态(thread) |
|----------|------|--------|----------|-------------|-------|-------------------|
| (无) | 起草并 push | author | spec `status:draft→in-review` | reviewer | 1 | `in-review` |
| in-review | verdict=approve | reviewer | review `verdict:approve, status:approved` | author | 不变 | `approved` |
| in-review | verdict=changes-requested | reviewer | review `verdict:changes-requested, status:changes-requested` | author | 不变 | `changes-requested` |
| in-review | verdict=block | reviewer | review `verdict:block, status:blocked` | human | 不变 | `blocked` |
| changes-requested | 修订并 push | author | spec `version+1, status:in-review` | reviewer | +1 | `in-review` |
| approved | 合并 main 并 push | author | spec `status:approved`(不变) | — (done) | 不变 | `merged` |
| blocked | 人工解除 | human | thread 记说明 | author | 不变 | `in-review` 或 `changes-requested` |

**终态**:`merged`(成功完成,thread `turn` 置空或 `—`)、`superseded`(被新主题取代)。
`blocked` 是**暂停态**而非终态:必须由 human 解除并写明动作,恢复到 `in-review`/`changes-requested`。

### 3.3 双向对称

谁起草谁就是 author,对方即 reviewer。方向由 `thread.turn` 驱动交替,因此同一套流程
天然支持两个方向,且支持多轮往返:

- **Claude 起草 → Codex 审**:`authored_by: claude-code`,reviewer = codex。
- **Codex 起草 → Claude 审**:`authored_by: codex`,reviewer = claude-code。

转移表对两个方向完全相同(只是 author/reviewer 的具名互换),故流程层面对称。
唯一不对称残留是 §2.3 的来源验证强度:无论哪个方向,当 agent 写、人代提交时都只能达 L0,
需按 §2.3 退化为 Mode B 才能升到 L1——这对两个方向一视同仁。

## 4. 命名约定

### 4.1 路径

| 用途 | 路径 |
|------|------|
| 活标准(常驻、可引用,版本走 frontmatter) | `docs/superpowers/conventions/provenance-and-review-protocol.md` |
| 主题 spec | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| 审核报告 | `docs/reviews/YYYY-MM-DD-<reviewer>-<topic>-review-rN.md` |
| raw 逐字原文(无 frontmatter 附件) | `docs/reviews/raw/YYYY-MM-DD-<reviewer>-<topic>-rN.txt` |
| 接力棒(线程索引) | `docs/reviews/<topic>.thread.md` |

模板见 `docs/superpowers/conventions/templates/`:`spec.frontmatter.md`、
`review.frontmatter.md`、`thread.frontmatter.md`。

### 4.2 review 的 `status` ↔ `verdict` 关系(消除矛盾)

review 文档的 `status` 与 `verdict` 不是独立字段,**必须一致映射**:

| `verdict` | 必须的 `status` | thread 后置状态 |
|-----------|----------------|-----------------|
| approve | approved | approved |
| changes-requested | changes-requested | changes-requested |
| block | blocked | blocked |

`reviews_target` 必须是**任意仓库相对路径**(指向被审文档的真实位置),不固定到
`specs/` —— 审核活标准时它就指向 `conventions/...`。模板默认值用占位符,不写死目录。

## 5. 字段速查

完整可复制模板在 `templates/` 下。各 `doc_type` 必填字段:

- **spec**:`title, topic, doc_type, version, date, authored_by, generated_with,
  committed_by, status, reviewed_by, source_raw, source_raw_sha256, supersedes, superseded_by`
- **review**:spec 全部字段 + `reviews_target, target_version, review_round, verdict`
  (`status` 必须按 §4.2 与 `verdict` 一致)
- **thread**:`doc_type, topic, status, turn, round, branch, participants`
- **raw**:**无 frontmatter**;改用 §2.2 的 `#@ ` 头部 + `#@ ---` 边界行。不属于 `doc_type` 枚举。

`status` 取值(spec/thread):`draft | in-review | changes-requested | approved | merged |
blocked | superseded`。
`verdict` 取值(review):`approve | changes-requested | block`。
`generated_with`:强制 `工具@版本`;不可得时 `工具@unknown`。

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
status: changes-requested           # 必须与 verdict 一致(§4.2)
reviewed_by: []
reviews_target: docs/superpowers/specs/2026-06-30-noomo-inspired-homepage-design.md
target_version: 1
review_round: 1
verdict: changes-requested          # 该审核当时给出的结论
source_raw: docs/reviews/raw/2026-06-30-claude-noomo-inspired-homepage-r1.txt
source_raw_sha256: <raw 文件的 sha256>
supersedes: null
superseded_by: null
---
```

> 注:本附录仅为**示例**。实际回填该文件(并补建其 raw 原文)应在它所在的
> `design/noomo-inspired-homepage` 分支上单独进行,不在本标准分支修改。
> 该审核是 Mode B(Claude 只读、win11-01 转录),若当时终端原文已不可得,只能达
> **L0**(§2.3):`source_raw` 标注为 `docs/reviews/raw/...-UNAVAILABLE.txt`、
> `source_raw_sha256: null`,并在其中说明原文未留存——这正是本规范要消除的情形。

