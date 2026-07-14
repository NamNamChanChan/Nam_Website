---
title: "怎樣令 AI agent 不再那麼善忘：新手指南"
description: "AI memory 不是魔法。這篇新手指南用簡單方法，教你透過 preferences、project space、一頁 notebook、handover 和精準 retrieval，令 AI agent 不再每次由零開始。"
pubDatetime: 2026-07-14T12:10:00+08:00
ogImage: ../../../assets/images/make-ai-agents-less-forgetful-banner.png
draft: false
tags:
  - ai
  - tech
---

![一個人用整理好的 notebook、project folder 和 archive，令 AI assistant 接續之前的工作](../../../assets/images/make-ai-agents-less-forgetful-banner.png)

用 AI 最令人沮喪的一句說話，可能是：「這件事我們昨天不是已經講過嗎？」

你解釋了目標、糾正三個錯誤、選好方案，亦定了下一步。第二日開一個新 conversation，AI 卻好像甚麼都沒有發生過。

感覺像 memory 壞了。但更簡單的解釋通常是：**那些有用資料，從來沒有被放到一個下次 session 可以可靠找到的地方。**

AI 不需要無限 memory 才可以不那麼善忘。它需要的是一本好 notebook。實際做法是：分開長期 preferences 和短期 project facts、保留一份精簡 source of truth、每次 session 結束時寫 handover，下一次只取回真正相關的 notes。

以下是一篇真正給新手看的指南。不論你使用 ChatGPT、Claude、其他 AI product，或者公司自己建立的 agent，都可以用同一套方法。

## 目錄

## 首先，AI memory 其實是甚麼？

想像 AI 有一張書枱和一個文件櫃。

**書枱**是它現在看得到的資料：你的最新 message、近期 conversation、instructions、相關 files，以及 tools 剛找回來的內容。AI engineer 通常稱它為 context。書枱可以很大，但不會無限大。

**文件櫃**是 conversation 外面保存的東西：saved preferences、舊 chats、project files、summaries、database 和 memory notes。只有當 system 找到正確資料，並在正確時間把它放回書枱，這些內容才真正有用。

所以 memory 其實有三份工作：

1. **保存**：把 fact 放在一個持久地方。
2. **找回**：需要時知道去哪裡找。
3. **更新**：資料變錯或過期時，修改或刪除。

Anthropic 的 [agent context engineering 指南](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) 用較 technical 的方式講同一件事：context 很有價值，但數量有限；長時間運作的 agent 需要 retrieval、compaction 和 structured notes。更多 chat history，不會自動變成更好的 memory。

![四個相連的 memory 空間：目前書枱、preference card、project binder 和可搜尋 archive](../../../assets/images/make-ai-agents-less-forgetful-memory-layers.png)

*好 memory 不是一份巨大 transcript，而是一張精簡工作枱，連接整理好的 storage。*

## 一、分開「長期適用」和「只在這個 project 適用」

第一個改善非常簡單：把不同 facts 放到不同地方。

**Stable preferences** 會在很多 conversation 都適用：

- 我喜歡簡潔答案，先給一個短 recommendation；
- 用繁體中文回覆，但 technical terms 保留英文；
- 我是 vegetarian；
- Send message 或購買之前要先問我。

這些適合放在 product 的 saved memory 或 custom instructions。OpenAI 將 [custom instructions](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt) 定義為你主動提供的指引，例如 ChatGPT 應知道甚麼、應怎樣回覆；而 [saved memory](https://help.openai.com/en/articles/8983151-is-memory-different-from-custom-instructions) 則可保留 conversation 裡學到的有用資料。

**Project facts** 的壽命較短：

- 家庭旅行日期是 12 月 18 至 23 日；
- 目前 budget 是 HK$24,000；
- 因為小朋友太早起床，我們否決了 morning flight；
- 下一步是比較車站附近三間酒店。

不要把每個短期決定都放進 global memory。它應留在對應 project，否則半年前一次旅行的偏好，可能會靜靜影響一個完全不相關的 plan。

> [!tip] 一個簡單測試
> 問自己：「明年在一個完全不同的 conversation，這件事仍應影響答案嗎？」如果是，可能屬於 stable preference；如果不是，就留在 project 裡。

## 二、每個長期 task 都應有自己的房間

如果你每星期都會回到同一個 topic，就不要再把它當成一堆互不相干的 chats。為它建立一個 project 或 workspace。

一個實用 project 應包含：

- 一個清楚 goal；
- 幾份真正相關的 files 或 links；
- project-specific instructions；
- 目前最重要的 decisions；
- 最新 status 和 next action。

ChatGPT [Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) 可以把相關 chats、files、instructions 和 project memory 放在一起。Claude Projects 則提供 project knowledge base 和 instructions；Anthropic 亦提醒，如果想資料在不同 chats 之間使用，就要把它加入 knowledge base。Button 名稱不同，但原則一樣：**同一份長期工作，應留在同一個持續存在的 context space。**

不要建立一個巨型「Everything」project。「日本家庭旅行」很有用；旅行、報稅、健身、product launch 和二十份隨機 PDF 全塞在一起，只會變成另一個混亂文件櫃。

## 三、保留一頁 AI notebook

Product memory 很方便，但一份可以自己編輯的 note，會給你更重要的東西：一個看得見的 source of truth。

建立一份簡短文件，叫「AI notebook」、「project brief」或任何你喜歡的名稱。內容應該平實而容易 scan：

```text
PROJECT
我們想達成甚麼？

STABLE CONTEXT
涉及的人、preferences、constraints、日期、budget 和重要 source files。

DECISIONS
我們同意了甚麼？原因是甚麼？

CURRENT STATE
已完成哪些工作？

OPEN QUESTIONS
哪些仍未確定，或者正等待人去決定？

NEXT ACTION
下一個 session 最先應做甚麼？

LAST UPDATED
這份 note 的日期和負責人。
```

新 chat 開始時，attach 或 paste 這份 note，再說：

```text
把這份 notebook 當成目前 source of truth。如果我的新要求和它有衝突，請告訴我。
不要靜靜改寫舊 decision；先提出 update 建議。
```

最後一句很重要。Memory 不應變成一個隱藏 authority。新要求和舊 decision 衝突時，你應該看得到，並親自決定哪一個優先。

## 四、每次 session 都以 handover 結束

大部分 memory 都在最不起眼的時刻消失：工作停止時。

一段有成果的 conversation 完結前，要求 agent 準備 compact handover：

```text
為下一個 session 準備 handover，只包括：
1. 已作出的 decisions，以及每個 decision 的原因；
2. 已完成工作；
3. 未解決問題；
4. 下一步三個 actions；
5. 應更新到 project notebook 的 facts 或 preferences。

分開 confirmed facts 和 assumptions。不要加入完整 transcript。
```

儲存前先讀一次，立即修正錯誤。之後更新 notebook 對應 sections，而不是永遠把新 page 加在最後。

![每次都由零開始的 sessions，對比由 compact handover 串連起來的 sessions](../../../assets/images/make-ai-agents-less-forgetful-handover.png)

*Handover 保留 decisions 和 next steps；完整 transcript 連所有兜路和雜訊都會保留。*

這個習慣幾乎適用於任何事情：搵工、每星期 meal planning、裝修、長期 research、customer support，或者寫一個 article series。Agent 不需要記得每一句話，而是需要記得工作的 state。

## 五、精準 retrieval，亦要定期清理 memory

面對善忘，最直覺做法是把所有資料重新 paste。結果只會製造另一個問題：有用 fact 被埋在舊 drafts、重複討論、過期價格和已放棄 ideas 下面。

好的 retrieval 只取最小而足夠的資料：

```text
回答前，找回目前 project goal、最近兩個 confirmed decisions、最新 budget 和 next
action。忽略已被取代的 drafts，並列出你依據的 notes 和日期。
```

所以 search 和 retrieval 跟 storage 一樣重要。OpenAI 現時的 [Memory FAQ](https://help.openai.com/en/articles/8590148-memory-in-chatgpt-remembering-what-you-chat-about) 讓 users review 和修正 remembered information、在支援的 experience 查看 memory sources，亦可用 Temporary Chat，避免 conversation 使用或建立 memory。

每個月一次——或者 AI 突然給出很過時的答案時——問三個問題：

1. 你目前記得我或這個 project 的甚麼？
2. 每個重要 fact 來自哪個 source？
3. 哪些內容已過期、互相矛盾、太 sensitive，或者不再有用？

然後更新或刪除。只懂增加資料的 memory system，最後只會變成一堆很有自信的舊 assumptions。

> [!warning] 注意：不是所有事情都應被記住
> 除非 system 已明確獲准處理這類資料，否則不要儲存 passwords、authentication codes、payment details、medical records 或 confidential information。不想被重用的 conversation 應使用 temporary 或 memory-off mode，亦要檢查 product 的 data controls。

## 如果 agent 是你自己建立的

同一個新手 mental model，可以變成一個簡單 architecture：

- **Session history** 將目前 conversation 接起來；
- **Durable memory** 在 model 外儲存整理過的 preferences、facts、decisions 和 lessons；
- **Retrieval** 為這次 task 選出相關 items；
- **Compaction** 在 context 太擠之前，將長 conversation 變成較短的 state summary。

OpenAI 的 [Agents SDK sessions](https://openai.github.io/openai-agents-python/sessions/) 可以在多次 runs 之間保存 conversation history，並支援 persistent stores 和 compaction。較新的 sandbox-agent memory 亦清楚分開兩件事：conversation session 保存 messages，而 durable memory 將學到的 lessons 整理成可以重用的 files。即使你完全不用這個 SDK，這仍是一個好 design principle。

Model 不是 database。Memory 應放在一個你可以 inspect、控制 access、修正、設定 expiry 和 backup 的地方；每次只把目前 decision 需要的內容交給 model。

## 真正的重點

令 AI 不再那麼 memoryless，重點不是找一個 context window 最大的 model，而是在 model 周圍建立一個小而可靠的 memory habit。

永久 preferences 放在永久位置；project facts 留在 project；保留一份精簡 notebook；有成果的 session 以 handover 結束；精準取回資料；錯誤或太 sensitive 的內容則刪除。

我最短的版本是：**不要要求 AI 記住一切，而是有意識地幫它記住正確的事情。**

這沒有「完美 memory」那麼神奇，卻可靠得多。

*如果你的團隊正在設計一個需要跨日或跨人接續真實工作的 agent，我很樂意交流 memory patterns 和實際 trade-offs——[電郵我](mailto:nam@wistkey.com)。*

---

*想看更多建立實用 AI 習慣的筆記，可以[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk)，亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——很想知道你怎樣把 context 延續下去。*
