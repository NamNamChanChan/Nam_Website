---
title: "用 AI agent 處理日常工作的 5 個 prompt 習慣"
description: "不懂技術，也可以把工作交代給 AI agent。這 5 個 prompt 習慣，能將模糊的日常要求變成實用、安全、可以 review 的成果。"
pubDatetime: 2026-07-14T11:15:00+08:00
ogImage: ../../../assets/images/five-prompt-habits-everyday-ai-agents-banner.png
draft: false
tags:
  - ai
  - productivity
  - life
---

![一個人用 AI agent 整理旅行、買餸、產品比較、電郵和日程](../../../assets/images/five-prompt-habits-everyday-ai-agents-banner.png)

上一篇文章，我寫的是怎樣像 engineer 把工作交給另一個 engineer 一樣，向 Claude Code 和 Codex 寫 prompt。但同一套思維，放在 software 以外可能更有用。

AI agent 可以研究旅行行程、比較產品、根據一星期的安排設計 meal plan、準備 email，甚至協助籌備活動。最難的通常不是想出一句聰明的說話，而是交代足夠的意圖，讓 agent 可以作出合理判斷，同時不越過那些仍然應由你決定的界線。

你不需要 technical background，只需要 5 個實用習慣：**講清楚 outcome、提供會改變答案的 context、設定 boundaries、定義有用的成果，以及在有實際影響的 action 前先 review plan**。

這個 pattern 亦符合 OpenAI 現時的 [prompting guide](https://learn.chatgpt.com/docs/prompting)、它對工作模式提出的 [outcome、context、constraints 和 review criteria](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)，以及 Anthropic 對 [清晰 instructions 和 relevant context](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) 的建議。以下就是它在日常生活的樣子。

## 目錄

## 一、先講 outcome，不要只講 topic

「幫我 plan 旅行」只講了主題，沒有講成功的結果。由哪裡出發？誰一起去？你喜歡怎樣過一天？目標是休息、盡量多看景點，還是嚴格控制 budget？

較弱：

```text
幫我 plan 四日京都旅行。
```

較好：

```text
為兩個由新加坡出發、11 月下旬去京都的成人，設計一個輕鬆的四日行程。
我們重視食物、在 neighbourhood 散步，以及每日一間真正值得去的寺廟，
不需要趕着看完所有景點。
```

第二個版本給了 agent 一個真正的目的地。它仍然可以自己決定怎樣 research 和編排行程，但已知道一個好旅行應該有甚麼感覺。

小 task 也一樣。不要只說「幫我煮晚飯」，可以要求「設計 5 個 30 分鐘內完成的平日晚餐，並合併成一張 shopping list」。先講清楚 task 完成後，甚麼事情應該變成真實。

## 二、加入會改變答案的 context

Agent 不知道你腦裡那些沒有說出口的細節。一份技術上完美的 plan，如果忽略小朋友的睡覺時間、食物敏感、長者可以步行的距離，或者你願意花多少錢，仍然可以完全沒有用。

寫一星期 meal plan 時，有用的 context 可以包括：

- 3 個人食飯，其中一個是 vegetarian；
- 星期二和四會很夜收工；
- 家裡已有米、蛋、菠菜和雞肉；
- 買餸 budget 是 HK$700；
- 晚餐 leftovers 應變成第二日午餐。

```text
為三個人設計五日晚餐。其中一個人是 vegetarian，所以每餐都要有容易轉換的
無肉版本。星期二和四要在 20 分鐘內完成。先用家裡已有的材料，新買食材控制
在 HK$700 內，並將 leftovers 變成第二日午餐。
```

重點不是把 prompt 寫得很長，而是加入那些會改變一個 human assistant 選擇的事實。

![五張 visual cards，分別代表 outcome、個人 context、approval boundary、檢查和 plan](../../../assets/images/five-prompt-habits-everyday-ai-agents-anatomy.png)

*一個有用的日常 prompt，是一份精簡 handover；每一部分都消除一種不同的估估下。*

## 三、清楚劃分「準備」和「執行」

這是向 AI 問問題和把工作交給 AI agent 的最大分別。Agent 可能有能力填 form、把產品放進 cart、修改 calendar，或者準備 message。這些 action 會影響其他人、金錢和私人資料。

所以要講清楚它在哪裡停：

```text
為媽媽的生日找三間合適餐廳，準備一份 booking recommendation。檢查無障礙設施、
噪音程度、menu 選擇、地點，以及六個人的預計總價。不要 booking、打電話或 send
message。列出 final options 後，等待我批准。
```

寫 communication 時，「draft but do not send」是最有價值的一句。Shopping task 可以寫「比較後把建議選項放入 cart，但不要購買」。Calendar task 則寫「修改任何 event 前，先提出建議 changes」。

OpenAI 現時的 agent 指引明確提醒，不要使用「check my email and handle everything」這類模糊要求，亦會在有實際後果的 action 前要求 confirmation。你的 prompt 應加強同一個分工：讓 agent 做耐心的準備，把不可逆轉的決定留給自己。

> [!warning] Access 也是 prompt 的一部分
> 只連接這次 task 真正需要的 account 和資料。寫清楚 boundary 很重要，但最後檢查 permission 和 action，仍然是你的責任。

## 四、定義想要的成果，以及怎樣檢查

「比較這三部洗衣機」很容易得到三段由 marketing page 抄回來的文字。真正可以幫你決定的 comparison，需要 criteria、最新 evidence，以及一眼看見 trade-off 的 format。

```text
為四人家庭比較這三部洗衣機。優先考慮總成本、可靠性、能源用量、噪音、保養和
本地維修支援。使用目前的 manufacturer specifications 和最少兩個 independent
review sources。用 table 顯示結果，寫明檢查日期，標出缺失或互相衝突的資料，
最後提出 recommendation 和它最大的 downside。不要購買任何產品。
```

現在「done」已經可以觀察。Agent 知道要調查甚麼、資料需要多新、哪些 uncertainty 要顯示，以及你希望怎樣作決定。

不同 task 應有不同 check：

- 旅行 research → 日期、休息日、交通時間和 source links；
- 家庭用品 → 價格、保養、退貨政策和已知 trade-offs；
- meal planning → 飲食要求、總份量、budget 和食材重用；
- email draft → 姓名、日期、語氣和不能 send；
- event planning → 人數、無障礙需要、總成本、取消條款，以及 booking 前批准。

![一個混亂而模糊的旅行要求，對比一個清楚、仍需批准的旅行 plan](../../../assets/images/five-prompt-habits-everyday-ai-agents-before-after.png)

*真正的分界不是短 prompt 對長 prompt，而是無法 review 的結果，對可以用來作決定的結果。*

## 五、大 task 先批准 plan，再批准 action

有些日常 task 藏着很多決定。籌備生日晚餐，包括日期、guest list、飲食需要、交通距離、venue、budget、invitation，甚至 deposit。叫 agent 「organize everything」，就會跳過你本來應檢查這些假設的時刻。

將工作分成兩段：

```text
幫我籌備下個月八個人的生日晚餐。第一步，列出需要我決定的事情，並提出一個
短 plan。之後才 research venues 和 draft invitation。在聯絡任何人、修改 calendar、
booking 或支付 deposit 前停下來。
```

先 review plan，修正日期、budget 或 priority，再批准下一階段。OpenAI 將 agent work 形容為 iterative 和可以隨時 steer：你可以中途打斷、clarify 和改方向，同時保留已完成的進度。這不是 prompt 失敗，而是正常 delegation。

## 一個可以重用的日常 template

```text
Outcome
<Task 完成時，甚麼成果應該已準備好？>

Context
<涉及甚麼人？哪些 preferences、日期、budget、files 或 facts 重要？>

Boundaries
<甚麼不能發生？哪些 action 需要我批准？>

Useful result
<我應看到甚麼 format、options、sources、checks 和 uncertainty？>

Process
<複雜 task 先顯示 plan 和未解決 decisions，再開始 action。>
```

不是每次都需要 5 個 headings。簡單 request 可以只有兩句。當 task 有幾個 steps、涉及另一個人的 inbox 或 calendar、金錢、私人資料，或者是一個之後要由你承擔的選擇，這個 template 就最有用。

## 真正的重點

寫好的日常 prompt，不是要令自己聽起來很 technical，而是做一個體貼的 delegator。

告訴 agent 好結果是甚麼樣子；分享真正重要的個人細節；在有實際後果的 action 外圍加一條 fence；要求可以 review 的 evidence；大 task 則在開始走之前先批准路線。

我最短的版本是：**廣泛準備，清楚決定，得到批准才行動。**

這樣 AI agent 才會在日常生活真正有用，同時不會靜靜接管那些仍然應屬於你的部分。

*如果你也在試用 AI agent 處理每星期最花時間的瑣事，很想知道哪一種 handover 最能幫你節省時間——[電郵我](mailto:nam@wistkey.com)。*

---

*想看更多實用 AI 筆記，可以[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk)，亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——很樂意交流哪些方法在真實生活最有效。*
