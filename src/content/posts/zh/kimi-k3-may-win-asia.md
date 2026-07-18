---
title: "Kimi K3 未必打贏 GPT 或 Claude，卻可能先贏得亞洲"
description: "Moonshot 的 Kimi K3 不需要登上 benchmark 王座，也足以改變亞洲 AI 市場。它真正的優勢，是前沿能力、地區產品契合、開放權重與較低價格同時出現。"
pubDatetime: 2026-07-18T11:35:15+08:00
ogImage: ../../../assets/images/kimi-k3-may-win-asia-banner.png
draft: false
tags:
  - ai
  - tech
  - business
---

![一個發光的新月形 AI 網絡在互相連接的亞洲城市上升起，遠處兩道光柱代表既有競爭者](../../../assets/images/kimi-k3-may-win-asia-banner.png)

_亞洲 AI 市場逐漸變成三方競賽的編輯插畫。圖片為本文生成，並非市場佔有率地圖。_

Kimi K3 最值得留意的，不是它「打贏 GPT」或者「打贏 Claude」。它沒有——至少不是全面勝出，而 Moonshot AI 自己也沒有這樣聲稱。

真正有趣的是：**它可能根本不需要全面勝出。**

Kimi K3 在 2026 年 7 月 16 日推出。它的能力已經貼近前沿，價格足以改變採購討論，開放程度足以讓它成為基建，而產品又相當貼近我在香港與倫敦之間每天遇到的中英雙語、文件密集型工作。對亞洲市場來說，這個組合可能比某一項 benchmark 贏幾分更重要。

我的論點不是 Kimi 已經贏了亞洲。亞洲從來不是單一市場，而 Kimi 甚至不是中國最大型的 AI app。我的意思是：K3 已經具備條件，在**未成為全球第一模型之前**，先贏得區內一個很有份量的位置。

## 目錄

## 先看誠實版成績表

Moonshot 稱 K3 為旗下最強模型：一個 **2.8 萬億參數的 mixture-of-experts 模型**，896 個 experts 裡每次啟用 16 個，原生支援視覺，context window 達 **100 萬 tokens**。公司預告完整模型權重會在 7 月 27 日公開。這些數字非常進取，但參數量本身不是產品成果。

更重要的一句，其實寫在 Moonshot 自己的 [Kimi K3 發佈文章](https://www.kimi.com/blog/kimi-k3) 開頭：整體表現仍然落後於 Claude Fable 5 和 GPT-5.6 Sol。文章後段亦承認，K3 的使用者體驗與兩者仍有明顯差距。

這份坦白很重要。K3 不需要我們替它虛構一場還未贏到的勝仗。

它在 coding、agentic 工作、長 context 研究、試算表、視覺推理和幾項專門工程測試中，的確做出前沿級成績。不過 benchmark 的註腳跟柱狀圖一樣重要：不同模型用了不同 agent harness；部分數據來自內部評估；而「最大推理力度」亦不等於日常快速對話的產品體驗。

> [!warning] 注意
> Benchmark 是證據，不是採購決定。它只告訴你模型在某一套 harness、prompt、budget 和評分方法下做過甚麼，卻不會告訴你它能否處理你的廣東話英文客服 ticket、300 頁董事會文件，或者 production repository。要測，就測你真正要做的工作。

## 價差是真的，但不只是「中國 AI 比較平」

推出當日，三個前沿模型每 100 萬 tokens 的官方 API 價格如下：

| 前沿模型       | 未命中快取輸入 | 命中快取輸入 |   輸出 |
| -------------- | -------------: | -----------: | -----: |
| Kimi K3        |          $3.00 |        $0.30 | $15.00 |
| GPT-5.6 Sol    |          $5.00 |        $0.50 | $30.00 |
| Claude Fable 5 |         $10.00 |        $1.00 | $50.00 |

資料來源：[Kimi K3 發佈與定價](https://www.kimi.com/blog/kimi-k3)、[GPT-5.6 Sol 模型頁](https://developers.openai.com/api/docs/models/gpt-5.6-sol)、[Claude Fable 5 模型頁](https://www.anthropic.com/claude/fable)。

K3 的輸出價是 GPT-5.6 Sol 的一半，比 Claude Fable 5 低 70%。對 agent 來說，這差距很實際，因為 agent 會產生大量中間文字，同一工作亦可能重試幾次。

但 K3 已經不是「平價入門模型」。它的未快取輸入比 GPT-5.6 Terra 更貴，而輸出價跟 Terra 一樣；OpenAI 亦有更便宜的 Luna。只比較三個旗艦型號，會隱藏正常團隊本來就應該做的 routing 選擇。

真正要算的不是每 token 成本，而是**每個獲接納成果的成本**：

- 一項工作要試幾次才成功？
- 人要花多少時間覆核？
- 模型有多常自行做了意料之外的決定？
- 較小模型是否已能處理八成工作？
- 你的 workload 是否真的能命中快取？

Moonshot 表示官方 API 在 coding 工作中，cache hit rate 超過 90%。這很吸引——但仍然是供應商提供的數字，應該由你自己的 logs 再驗證。

![流動入口、成本、多語工作與 office 或 coding workflow 四項產品優勢，連到一個實用 AI 工作台](../../../assets/images/kimi-k3-may-win-asia-ecosystem.png)

_模型只是系統中心；distribution、經濟效益、語言契合與 workflow 整合，才決定使用者會否留下。AI 生成編輯圖片。_

## 為甚麼 K3 可能特別適合亞洲

### 一、它是一整套產品，不只是一個 API demo

K3 同時進入 Kimi app 和網站、Kimi Work、Kimi Code 與 API。整套助手已涵蓋文件、試算表、簡報、網站、研究、coding 和 multi-agent 工作。手機端包括 iOS、Android 和 HarmonyOS；Kimi Work 則支援 Windows 與 Apple silicon Mac。

這種 distribution 在亞洲很重要。很多公司所謂「買 AI」，實際上要解決的是手機、desktop、office 文件、訊息和 developer workflow 混在一起的一團亂，而不是在排行榜揀一個模型名稱。

### 二、中文優先是真優勢，但不等於「通殺亞洲」

Kimi 從全球最大的中文市場出發，天生比較貼近本地語言與文化。對要在簡體中文、繁體中文和英文之間來回工作的團隊，這可能減少大量 prompt 轉彎和編輯修正——而這些隱形工序，正正會令一個表面便宜的模型變貴。

但要說清楚：**中國不等於亞洲**。日文、韓文、泰文、越南文、印尼文、印地語，以及區內大量混合語言商業場景，全部都要分開測試。中文體驗好，令 Kimi 有一個灘頭堡；不代表整個亞洲自動屬於它。

### 三、開放權重改變「誰擁有整套 stack」

Moonshot 預告 7 月 27 日公開 K3 完整權重。如果屆時的 licence、文件與 inference 支援都實用，區內雲端供應商、大學、政府和受監管企業，就能以 closed frontier API 做不到的方式適配或部署它。

這對我們 Wistkey 所做的 private、on-premises AI 很有意義。但它**不代表一般公司應該自行架設 2.8T 模型**：Moonshot 建議用 64 個或以上 accelerators 的 supernode 配置。現實價值在於更廣的 serving ecosystem、distilled variants、專門部署和更大的議價能力，而不是每間辦公室突然多一個巨型機櫃。

### 四、使用模式正在變深

Moonshot 表示 Kimi 每月有數千萬專業使用者。中國獨立研究機構 QuestMobile 則指出，2026 年 6 月有 **26.1% Kimi 使用者單次使用超過十分鐘**，按年增加 8.4 個百分點。這不等於亞洲市場領導地位，卻顯示 Kimi 正由新奇 chat box 變成真正的工作介面。

同一份 [QuestMobile 報告](https://www.questmobile.com.cn/research/report/2076954943839809537/) 亦說得很清楚：流量正集中到最大型的 AI-native apps，而豆包與 DeepSeek 主導了不少市場節奏。Kimi 有 momentum，但它仍然在搶市場，不是已經捧盃。

## GPT 與 Claude 仍然領先的地方

美國領先者沒有停下來。GPT-5.6 Sol 的 context window 稍大，達 105 萬 tokens，全球 API 與 tools 平台已相當成熟，而且擁有 Moonshot 自己也承認 K3 尚未做到的完整產品質感。Claude Fable 5 很貴，但它專為高難度、長時間的知識與 coding 工作而設，而 Anthropic 已累積多年 developer 團隊信任。

企業採購還要問很多 benchmark 回答不到的問題：

- 地區供應與 latency；
- data retention、audit controls 與合約條款；
- security certifications 與事故應變；
- 模型穩定性與版本鎖定；
- ecosystem 支援與團隊熟悉程度；
- 地緣政治與供應鏈風險。

開放的中國模型可以減少一種依賴，同時增加另一種。美國 API 對某個受監管買家最方便，對另一個卻可能完全不可用。世上沒有中立供應商，只有你量度過的風險，以及你沒有留意的風險。

> [!important] 重要
> 策略上的勝利，不是把所有 GPT 或 Claude workload 一口氣搬去 Kimi，而是設計一個 model portfolio，令任何單一供應商的 outage、加價、政策或地區限制，都不能停掉你的業務。

![三位同事在香港辦公室比較 AI 處理文件、試算表與程式碼的結果](../../../assets/images/kimi-k3-may-win-asia-evaluation.png)

_真正有用的比較，要用你自己的工作、覆核者、語言和失敗成本，而不是排行榜截圖。AI 生成編輯照片。_

## 我會怎樣在真實亞洲企業測試 K3

我不會由全公司搬遷開始。我會做一個兩星期 bake-off，準備 30 至 50 項具代表性的任務，盡量隱藏模型名稱，再把 K3 與現有模型比較。

任務分四類：

1. **雙語知識工作：**英文、繁體中文、簡體中文，以及多種語言混合的 source pack。
2. **長文件：**合約、標書、董事會材料、研究報告和大量試算表分析。
3. **Agentic delivery：**一項範圍清楚的 coding 改動或文件 workflow，配合明確權限與 acceptance tests。
4. **本地判斷：**香港、中國內地、東南亞或行業專門語言——單純「文法流利」並不足夠。

評分要包括成果接納率、覆核分鐘、latency、總 tokens、重試次數、tool errors，以及任何超出 brief 的行動，最後計算每項獲接納工作的成本。

我亦會刻意要求模型在缺乏證據時明說。不自然的文字可以修改；自信地虛構本地細節，危險得多。

上 production 時，按風險 routing：

- 分類與 formatting 交給便宜模型；
- 長 context、雙語工作或開放部署有優勢時用 K3；
- GPT 或 Claude 在你測試中判斷、tooling 或企業控制較好，就繼續用它們；
- 任何有後果的操作，無論用哪個模型都要有人把關。

## 我的判斷：Kimi 不做第一，也可以贏

K3 對 GPT 和 Claude 真正的威脅，不是「看，這一條 benchmark 柱高一點」，而是另一種完整方案：**足夠接近前沿的智能，加上一套可以直接工作的產品，再用價格與部署模式，讓亞洲買家多一個可信的重心。**

這足以逼 API 減價、加快 open-model 基建、改善中文產品，並令 multi-model architecture 變成常態。就算最難任務仍由 GPT-5.6 Sol 或 Claude Fable 5 做得更好，這些一樣是改變市場的成果。

所以，我今天不會寫「Kimi 已經贏了亞洲」。證據未到。

我會寫一句更有用的：**Kimi K3 已經令亞洲 AI 市場變成真正可以競爭，而最後勝出的，可能是最貼合工作的一方，不是最懂得贏 headline 的模型。**

_正在為雙語或 private AI workflow 測試 Kimi、GPT 與 Claude？我很樂意一起比較架構和評估方法——[電郵我](mailto:nam@wistkey.com)。_

---

_如果這篇文章令你暫時放下 benchmark 競賽，可以[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk) 看新文章，亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——隨時交流 production 裡真正有用的做法。_
