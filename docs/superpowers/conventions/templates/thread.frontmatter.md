---
doc_type: thread
topic: <topic-slug>
status: in-review              # draft|in-review|changes-requested|approved|merged|blocked|superseded
turn: <claude-code | codex | human | "—">   # 下一步该谁动手;merged 后置空/—
round: 1                       # 审核轮次:author 据 changes-requested 修订并 push 后 +1
branch: <分支名>
participants: [claude-code, codex]
---

# <topic> 审核线程(接力棒)

> 每次交接(push)后更新本表。`turn` 指向"下一个该动手的人"。
> 交接规则:一次交接 = 一次 `git push`(产物+thread 同一 commit)+ 翻转本文件 `turn`。

| round | date | actor | artifact (+commit) | verdict | next-turn |
|-------|------|-------|--------------------|---------|-----------|
| 1 | YYYY-MM-DD | <author> | <产物路径> (<短哈希>) | — | <reviewer> |
