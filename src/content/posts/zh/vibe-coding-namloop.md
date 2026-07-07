---
title: "Vibe coding NamLoop：一個週末，做出一個無廣告的 YouTube 循環播放器"
description: "一個週末、剩低啲 token，加一個想咗好耐嘅念頭——我 vibe code 咗 NamLoop：把任何 YouTube 影片循環播放，整段或精準的 A–B 片段，無廣告。它做甚麼、循環是怎樣運作的，以及「vibe coding」真正改變了甚麼。"
pubDatetime: 2026-06-12T12:00:00+08:00
ogImage: ../../../assets/images/namloop-banner.png
draft: false
tags:
  - tech
  - ai
---

![NamLoop——一個無廣告的 YouTube 循環播放器，一個週末 vibe code 出來](../../../assets/images/namloop-banner.png)

上個週末，剩低啲 token、臨訓前得半個鐘，我隨手 vibe code 咗個小工具。它叫 **NamLoop**，只做一件事：把一條 YouTube 影片循環播放——整段，或者精準的 A–B 片段——透過 YouTube 自己的播放器，不用 ad blocker、不用下載。

你可以在 **[loop.nam-ai.uk](https://loop.nam-ai.uk)** 試玩，原始碼在 [GitHub](https://github.com/NamNamChanChan/NamLoop)。

![NamLoop 首頁——貼上連結，就能循環](../../../assets/images/namloop-home.png)

## 目錄

## 那個念頭

我經常需要把一段影片放到重複播放。練習時當背景的一小段音樂。一段要逐格研究的十秒片段。一首想一直播下去、不想它播完就跌進自動播放無底洞的歌。

現成的選擇都有點惱人。右鍵 →「循環播放」只能整段。那些「循環某段」的網站不是滿佈廣告，就是把影片經過一些來歷不明的播放器代理。瀏覽器擴充功能又要一堆權限——為了這麼小的東西，我不想給。

我只想要：貼上連結、選好起點終點、讓它跑。於是我就做了這個。

## NamLoop 做甚麼

- **整段或 A–B 循環**——拖兩個標記，只循環你在意的那一段。
- **變速**，0.25× 到 2×。
- **播放佇列與重複模式**——一條影片重複，或者一個小播放清單「全部重複」。
- **循環計數器**，顯示在介面和瀏覽器分頁上，讓你看到它轉了幾多次。
- **可分享的連結**——每個設定（影片、A、B、速度）都在連結裡，可以把一個現成的循環直接傳給別人。
- 深色模式，而且**輕量**——透過 YouTube 官方嵌入播放，沒有任何可疑的東西。

![NamLoop 播放器——Set A / Set B、速度、重複模式，還有即時循環計數器](../../../assets/images/namloop-player.png)

## 循環到底是怎樣運作的

訣竅是不要跟 YouTube 對著幹——讓它**官方的 IFrame Player API** 負責播放，你只在影片播完時*作出反應*。

載入 API，當播放器的狀態變成 `ENDED`，就把它送回開頭：

```js
// 載入 https://www.youtube.com/iframe_api，然後：
function onYouTubeIframeAPIReady() {
  new YT.Player("player", {
    videoId: "fJ9rUzIMcZQ",
    events: { onStateChange: onStateChange },
  });
}

function onStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    event.target.seekTo(0);     // 整段循環：回到開頭⋯
    event.target.playVideo();   // ⋯再來一次
  }
}
```

> [!tip] 讓播放器告訴你
> 對 `ENDED` 狀態作出反應，比不停查時間去「猜」影片播完了乾淨得多。播放器早就知道——你只需要聽。

**A–B 循環**是唯一一個你*真的*要盯著時間的地方：每秒查幾次目前時間，一旦超過 **B**，就跳回 **A**。

```js
// A–B 循環：一超過 B 就跳回 A
setInterval(() => {
  if (player.getCurrentTime() >= B) player.seekTo(A, true);
}, 250);
```

變速是一行——`player.setPlaybackRate(1.5)`（0.25×–2×，視乎影片支援）。其餘都是接駁工作：貼上連結、解析出 11 個字元的 video ID、路由到 `/loop/<id>`、從 YouTube 的 oEmbed 端點拉標題做個像樣的頁面，再掛上播放器。Next.js、React、TypeScript、Tailwind——但老實說，它的核心就是上面那幾個 event handler。

## 「Vibe coding」真正改變了甚麼

這部分值得講清楚。這個工具在我腦裡以一個模糊的「好想有⋯」存在了*好幾年*。我一直沒做，因為對這麼小、只有我自己會用的東西來說，那個摩擦力從來都不值得——一個晚上讀 API 文件、接駁狀態、跟 CSS 搏鬥。

改變的正是這條數。有 AI 在中間，沉悶的中段——讀文件、寫樣板、「這個到底怎樣置中」——縮短到幾分鐘。從*「好想有」*到*「它存在了」*的距離，塌縮成一個週末，而且大半是在睡前。

> [!caution] Vibe code 出來，不等於可以隨便上線
> 快，不代表沒人負責。你仍然要讀它寫出來的東西、處理邊界情況、誠實面對它是甚麼——NamLoop 透過 YouTube 官方嵌入播放，而且明確地**不作商業用途**。AI 寫程式碼，但那段程式碼你仍然要負責。

這才是「AI 導入」對我而言的真正故事，也是我跟企業講的同一個：重點不是 AI 幫你做艱難的思考，而是它把沉悶的部分清走，讓那些你一直擱著的小小好念頭，終於被做出來。

## 真正的重點

NamLoop 是個玩具。而這正是重點。有趣的不是這個工具——而是「想要它」和「擁有它」之間的距離，短到我真的跨了過去，在一個星期日，半夢半醒之間。

如果有件小事你一直沒做，只因為它不值得花一個晚上——現在它可能值得一個週末。做出來吧。

*到 [loop.nam-ai.uk](https://loop.nam-ai.uk) 試玩 NamLoop、看看[原始碼](https://github.com/NamNamChanChan/NamLoop)，或者告訴我你會循環甚麼——[電郵我](mailto:nam@wistkey.com)。*

---

**NamLoop 系列：**第一篇——你在這裡 · [第二篇——git push，就上線了：部署變得有多不可思議地容易](/zh/posts/namloop-part-2-cloudflare-cicd/)。
