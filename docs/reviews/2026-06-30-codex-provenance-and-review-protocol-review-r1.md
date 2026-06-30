---
title: 内容来源标注规范与双向审核协议 R1 审核
topic: provenance-and-review-protocol
doc_type: review
version: 1
date: 2026-06-30
authored_by: codex
generated_with: codex-desktop@26.623.70822
committed_by: win11-01
status: changes-requested
reviewed_by: []
reviews_target: docs/superpowers/conventions/provenance-and-review-protocol.md
target_version: 1
review_round: 1
verdict: changes-requested
source_raw: null
supersedes: null
superseded_by: null
---

# 内容来源标注规范与双向审核协议 R1 审核

## 总体结论

`changes-requested`。三大支柱已经覆盖来源声明、转录留档和协作状态三个必要层面，
双向角色命名也基本对称；但当前 schema 仍只能记录来源声明，不能按正文所称
“机器可验证”地坐实 Mode A 的内容来源。状态机也缺少可唯一执行的转移定义，
模板与正文存在会直接产生矛盾数据的不一致。

## 必须修改

### 1. [高] Mode A 无法佐证 `authored_by`，不足以坐实“内容来源 ≠ 提交来源”

标准第 45-58、64-72 行把 `authored_by` 与 `committed_by` 分列，但明确承认
`authored_by` 靠字段自证；Mode B 尚有 raw 原文作为旁证，Mode A 在
`committed_by` 不同于 agent 时没有任何独立证据。任何提交者都能填写任意
`authored_by`，因此目前只能机器读取来源声明，不能机器验证内容来源。

需要收窄承诺或补足机制：明确区分“声明”与“验证”，并定义 Mode A 的最低佐证
（例如由 agent 直接提交的可核对身份、受控自动化 attestation，或同样保留带工具
元数据的生成记录）。若不引入可信身份机制，正文不得声称该链路已被机器验证。
raw 本身也应有完整性关联，例如在 review 中记录 raw 的摘要，避免路径存在但内容
被替换后仍被视为同一来源。

### 2. [高] 状态机没有闭合 approve、changes-requested 和 block 的唯一转移

标准第 108-134 行要求“双方都 approve”，但没有定义 author 如何产生第二个
approve、记录在哪里、approve 后 `turn` 指向谁，以及何时由谁设置
`approved-by-both`。`reviewed_by` 只是列表，不能表达角色、轮次和 verdict。

`changes-requested` 的顺序也有歧义：图中把“author 修订、round+1、turn 回 author”
写在同一条转移上，但 reviewer 交接给 author 时修订尚未发生。本次 thread 只能靠
人工解释为“审核后仍是 round 1，author 修订时再进入 round 2”。

`block` 更不闭合：它是合法 verdict，却不在 status 枚举中；正文说“人工介入”，
但没有规定 `turn: human`、解除阻塞的动作或恢复后的状态。正文还使用 `thread done`，
模板和枚举均没有 `done`。

需要给每个事件定义确定的前置状态、操作者、写入字段、`turn`、`round` 和后置状态，
并明确 round 是“审核轮次”还是“每次交接序号”。终态应有一致的 status/turn 表示。

### 3. [高] review 模板与活标准路径不兼容，示例产生互相矛盾的状态

`templates/review.frontmatter.md` 第 12 行把 `reviews_target` 固定为
`docs/superpowers/specs/...-design.md`，但本标准自身位于
`docs/superpowers/conventions/`。模板应允许任意仓库相对路径，否则无法按模板审核
活标准。

标准第 168-187 行的示例同时写 `status: approved` 和
`verdict: changes-requested`。这两个值表达相反结论，会使自动化和接手者无法判断
真实状态。需要定义 review `status` 与 `verdict` 的关系，并修正示例及模板默认值。

### 4. [中] raw 被列为 `doc_type`，却没有对应 schema 或可解析模板

标准第 47、54 行把 `raw` 列入文档类型，第 71 行却规定 `.txt` 仅以“注释行”记录
上下文；第 149-160 行没有 raw 的必填字段，templates 下也没有 raw 模板。
此外，纯文本“注释行”的语法、正文起始边界、捕获时间格式和命令转义均未定义。

需要二选一：把 raw 明确定义为不使用 frontmatter 的附件并从 `doc_type` 枚举中移除，
或补充 raw schema/template 和逐字正文边界。还应说明顶部元数据不属于“逐字原文”，
避免“逐字”要求与人工添加头部互相冲突。

### 5. [中] `generated_with` 的版本要求和模板值不一致

标准第 56 行称该字段记录“工具及版本”，但示例值和两个模板允许裸
`codex-cli`，无法满足版本追溯。应统一为带版本的规范格式，例如
`codex-cli@0.139.0`，并说明版本不可得时使用什么显式值，而不是省略版本。

### 6. [中] “交接 = push”仍缺少共享分支并发与失败规则

标准第 89-105 行没有禁止 force push，也没有规定 push 被拒绝、pull 非快进、
thread 与产物不在同一 commit、或两方基于旧 turn 并发提交时如何处理。
Git 的普通非快进保护能挡住部分竞争，但协议没有把它列为前提。

需要规定交接 commit 必须同时包含产物和 thread 更新、共享分支禁止 force push，
push 失败不算交接且必须重新 pull/核对 turn；如允许多 commit，则应定义 thread
如何引用完成交接的 commit。

## 对称性判断

角色层面是对称的：`authored_by` 可取两种 agent，reviewer 由对方承担，命名也没有
偏向某一方向。但流程层面的对称性尚未成立，因为任一方向在首个 reviewer approve
之后都会遇到相同的“第二个 approve 由谁产生”问题；Mode A 由 agent 写、由人提交时，
两个方向也同样缺少内容来源佐证。修复上述状态转移和 Mode A 证据模型后，双向流程
才能真正等价。

## 已合理部分

- spec、review、thread 以同一 `topic` 串联，路径命名总体清晰。
- Mode B 强制保留逐字原文，能显著降低终端转录造成的来源丢失。
- `turn` 放入版本化 thread，并要求动手前 pull 和核对，能恢复跨会话协作上下文。
- `authored_by` 与 `committed_by` 分列是必要基础，只需避免把声明强度夸大为验证。
