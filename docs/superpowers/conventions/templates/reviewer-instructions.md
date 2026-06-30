# Reviewer 角色操作指令(可复用模板)

> 配合 `provenance-and-review-protocol.md` 使用。把本文件内容连同三个占位符的实际值
> 一起喂给审核方 agent(如 Codex Desktop),即可免去每轮手写长指令。
>
> **占位符**(每轮只改这三个):
> - `<TOPIC>`:主题 slug,如 `provenance-and-review-protocol`
> - `<N>`:本轮审核轮次,如 `4`
> - `<VERSION>`:被审 spec 的 version,如 `4`
> - `<BRANCH>`:协作分支,如 `standards/<TOPIC>`

---

## 指令正文(复制以下整段,替换占位符后发给 reviewer)

```
你是审核方(reviewer)。仓库分支 <BRANCH>,主题 <TOPIC>。

【进入前置检查】
1. git status --porcelain 必须为空(工作树干净,协议规则 0)
2. git fetch origin
3. git show origin/<BRANCH>:docs/reviews/<TOPIC>.thread.md
   确认 turn=codex(或你的具名)、round=<N>。turn 不是你 → 停,不要动手。
4. git pull --ff-only

【审核】复审 reviews_target 指向的 spec(target_version=<VERSION>)。逐条核对:
   - 上一轮你提的 changes-requested 是否都已闭合
   - 是否引入新的矛盾、死锁、不可执行步骤、来源声明夸大
   按需求覆盖完整性/一致性/清晰度/YAGNI/安全性。

【产出审核报告】docs/reviews/<日期>-<你的名字>-<TOPIC>-review-r<N>.md
   frontmatter 按 review.frontmatter.md 模板填:
   - authored_by=<你>、generated_with=<工具@版本>(强制带版本)、committed_by=<git author>
   - reviews_target 指向 spec、target_version=<VERSION>、review_round=<N>
   - verdict=approve|changes-requested|block
   - status 按 §4.2 与 verdict 一致(approve→approved / changes-requested→changes-requested / block→blocked)
   - provenance_level:Mode A 直接产物=L0;Mode B 有逐字 raw+sha256=L1
   - Mode B 时另存 raw 附件(§2.2 格式),source_raw / source_raw_sha256 指向并记摘要

【更新接力棒】docs/reviews/<TOPIC>.thread.md,按 §3.2 转移表:
   - approve → status:approved、turn:author(由 author 合并 main 后置 merged)
   - changes-requested → turn:author(author 修订,push 下一版时 round+1)
   - block → turn:human
   回合表加一行;若同时修正了自己旧产物的来源字段,可放同一 commit。

【完成交接】git add + git commit + git push,产物与 thread 更新必须在同一 commit
   (协议规则 1 原子性)。push 成功 = 交接完成。若被拒,按 §3.1 规则 3 恢复
   (git fetch + show origin:thread 核对 turn,建 backup ref,条件化 reset,禁 force)。
```

---

## Author 侧对应动作(参考,非喂给 reviewer)

- 收到 `changes-requested`:`git pull` → 确认 turn 是自己 → 逐条修订 spec
  (`version+1`)→ 更新 thread(`round+1`、翻转 turn)→ 原子 commit + push。
- 收到 `approve`:spec `status:approved` → 合并 `<BRANCH>` → `main`(ff)→
  thread `status:merged`、`turn:—` → push。往返闭环。
