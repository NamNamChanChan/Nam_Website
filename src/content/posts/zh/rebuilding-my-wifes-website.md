---
title: "她的網站把 85 場活動藏起了 76 場——於是我們用一個週末重建了它"
description: "太太的 WordPress 作品集網站 Lighthouse 只有 56 分、13.8 秒才畫出畫面，還靜靜地把她九成的工作藏了起來。與 AI agent 合作一個週末之後：102 頁手寫靜態 HTML、SEO 100、首次繪製 1.7 秒——同一個設計、同一批網址。"
pubDatetime: 2026-07-05T21:30:00+08:00
ogImage: ../../../assets/images/krystle-banner.png
draft: false
tags:
  - tech
  - ai
---

![WordPress 到靜態 HTML——太太的網站在一個週末重建：SEO 56 到 100、首次繪製 10.3 秒到 1.7 秒、可見活動 9 到 85](../../../assets/images/krystle-banner.png)

我太太 **Krystle（張可澄）** 是香港的專業雙語司儀——主持過五千多場活動，拿過香港司儀大賽冠軍。她的作品集網站，就是新客戶找到她的地方。

上個週末我終於認真看了它的引擎蓋底下。網站跑 WordPress + Elementor + 一個重型主題，Lighthouse **56 分**、最大內容繪製要 **13.8 秒**——而真正教人心痛的是：因為一個沒人發現壞掉的按鈕，它一直**把她 85 場活動中的 76 場，靜靜地藏了起來**，對每一位訪客。

與 Claude Code 合作一個星期日晚上之後：整個網站重建成 **102 頁零依賴的靜態 HTML**。同一個設計、同一批網址。**SEO 100 · 無障礙 100 · 最佳實踐 100**，首次繪製 **1.7 秒**，零死鏈。

先看前後對比——中間的故事在下面。

![原本的 WordPress 首頁（整頁）](../../../assets/images/krystle-01-before-home-fullpage.jpg)

*原本的 WordPress 首頁⋯⋯*

![重建後的靜態首頁——看上去是同一個網站](../../../assets/images/krystle-02-after-home-fullpage.jpg)

*⋯⋯以及重建版。看上去是同一個網站——這正是要求。底下的一切都換掉了。*

## 目錄

## 審計：網站實際在載入甚麼

第一步：爬完 sitemap，下載全部 101 頁和 2,186 個資源檔（223 MB），逐頁截圖，再跑一次節流的 Lighthouse 做基準。

單是首頁就載入 **20 個 CSS、70 個 JS——122 個請求、2.2 MB**。裡面包括每一頁都載入的 React、ReactDOM 和 lodash⋯⋯由 WooCommerce 帶進來，而這家「商店」有**零件商品**。還有 Contact Form 7——而全站有**零張表格**。沒有人選擇過這些；主題、頁面編輯器和十年的外掛，各自把朋友都帶來了，就成了這樣。

字體自成一場小災難：**17 個請求、872 KB**——Noto Sans TC、Montserrat、Roboto 的每一個字重，大部分根本沒用到。

### 沒有人發現的 bug

審計真正的收穫不是重量。用真實瀏覽器開著 network 面板逛網站時，有一個請求一直失敗：

`wp-json/cassia/v1/get-posts → 403`

主題的「Load More」按鈕透過一個 REST 請求載入活動，而請求需要一個**烤進頁面快取裡的 security nonce**。快取外掛保存頁面的時間，比 nonce 的壽命長。所以對真實訪客來說，nonce 永遠是過期的、端點永遠回 403——作品集就靜靜地停在頭 **9 場（共 85 場）**。

![原本的作品集——訪客永遠只看到頭九場活動](../../../assets/images/krystle-05-before-portfolio.jpg)

*每位訪客看到的：九場活動，和一個看起來正常、實際甚麼都不做的 Load More 按鈕。*

> [!warning] 靜默的故障最昂貴
> 按鈕照樣顯示，畫面沒有任何錯誤。它多半已經壞了很久——而她九成的作品一直是隱形的。如果你的網站靠按鈕或無限捲動載入內容，現在就開一個無痕視窗，親手按一下。

配角們：頁尾 logo 在每一頁都連到**主題廠商的示範網站**、兩個「Read More」按鈕的 href 是**空的**、全站沒有 meta description、沒有 Open Graph、沒有結構化資料，首頁標題只有一個字：「Krystle」。

## 計劃：同一個網站，百分之一的程式碼

要求刻意訂得很嚴。同樣的外觀。同樣的頁面。**同樣的網址**——不能有 404，Google 索引要活著。不重新設計。只是把 WordPress 用外掛做的每一件事，改用幾乎「甚麼都沒有」來做：

| WordPress（重） | 重建（輕） |
| :--- | :--- |
| Slider Revolution 大圖輪播（~700 KB JS） | 一張合成圖 + CSS 定位的文字層 |
| jQuery + GSAP 捲動動畫 | 約 30 行 IntersectionObserver + CSS transition |
| Isotope 篩選 + AJAX「Load More」（壞掉那個） | 85 張卡全部在 DOM；篩選＝顯示／隱藏——零網絡請求 |
| Magnific Popup 燈箱 | 原生 `<dialog>` + 約 40 行 JS |
| Google Fonts：17 個請求、872 KB | 自家托管子集：5 個檔、392 KB |
| WooCommerce / CF7 / Instagram 外掛 | 刪除；垃圾網址 301 |

![大圖區：左為 WordPress 原版，右為靜態重建](../../../assets/images/krystle-03-hero-before-after.jpg)

*還原度檢查——左原版，右重建。*

## 建造

架構就一個念頭：**手寫模板 + 一個小小的 Node 建置腳本 + JSON 資料檔**。Python 腳本把下載回來的 WordPress HTML 解析成乾淨的 JSON——導航、大圖、推薦語、84 個客戶 logo 牆、每場活動的資料。（一個不錯的諷刺：主題自己的 REST 端點，用 curl 配新鮮 nonce 重放，爽快地交出全部 85 筆——正是那個對每位真實訪客都失敗的 API。）

然後 `build.mjs` 蓋出全部 **102 頁**：每一頁都有獨一無二的標題、雙語 meta description、Open Graph，和 JSON-LD——`Person`、`LocalBusiness`、`BreadcrumbList`、每場活動一個 `ImageGallery`。[sharp](https://sharp.pixelplumbing.com/) 管線從 397 張原圖生成 **805 個影像衍生檔**（WebP 方格圖、兩個燈箱尺寸、og:image）。

![重建後的大圖區——用一張合成圖加 HTML 文字層，取代 700 KB 的輪播外掛](../../../assets/images/krystle-04-after-hero.jpg)

*700 KB 的輪播外掛，換成一張圖和幾行絕對定位的文字。*

新的「Load More」是我最喜歡的部分，因為它*不可能*以舊的方式壞掉。85 張卡早已在 DOM 裡；按鈕只是多顯示九張。以下是實際上線的程式碼（稍作精簡）：

```js
// 作品集篩選 + load-more（所有卡片都在 DOM；零網絡請求）
var PAGE = 9, shown = PAGE, active = '*';

function apply() {
  var vis = 0;
  cards.forEach(function (c) {
    var match = active === '*' ||
      (' ' + c.getAttribute('data-cats') + ' ').indexOf(' ' + active + ' ') > -1;
    c.classList.toggle('hide', !(match && vis < shown));
    if (match) vis++;
  });
}

more.addEventListener('click', function () { shown += PAGE; apply(); });
```

沒有 nonce、沒有快取、沒有端點。沒有東西可以 403。

![重建後的作品集——85 場活動全部預先渲染，篩選和 load-more 純客戶端](../../../assets/images/krystle-06-after-portfolio.jpg)

*85 場活動，終於全部到得了。*

![85 個生成的活動頁之一，附燈箱相冊](../../../assets/images/krystle-07-after-event-page.jpg)

*85 個生成活動頁的其中一頁——原生 `<dialog>` 燈箱、ImageGallery JSON-LD。*

整個網站現在只載 **約 19 KB CSS 和約 5 KB JavaScript**——比舊網站*最小的一個外掛檔案*還要少。

有一個 SEO 修正，我在乎的程度超過所有分數：舊網站上**完全沒有出現過她的中文名字「張可澄」**。有人搜「張可澄 司儀」，是找不到她的。現在它在標題、meta、關於頁和 JSON-LD 的 `alternateName` 裡。

![重建後的關於頁——簡介、資歷，以及終於出現在網站上的中文名字](../../../assets/images/krystle-08-after-about.jpg)

*關於頁——「張可澄」終於在網站上。*

## 兩個 debug 戰爭故事

**幽靈般的 6.5 秒 LCP。** 重建之後，Lighthouse 的模擬節流模式堅稱 LCP 是 6.5 秒，有五秒的「render delay」。但它**自己的 filmstrip 顯示大圖在 1.9 秒已完整畫出**，而真實的 DevTools 節流 trace（4× CPU、Slow 4G）量到的 LCP 是 **207 毫秒**。幾小時的變因測試——關動畫、inline CSS、換測試伺服器（冷知識：Python 的 `http.server` 說的是 HTTP/1.0、沒有 keep-alive，會進一步扭曲模擬器）——證明那是量度的假象。

> [!tip] 未經盤問的數字，不要急著優化
> 模擬器說 6.5 秒。Filmstrip 說 1.9 秒。真實 trace 說 0.2 秒。當一個指標跟像素打架，先看 filmstrip 和真實 trace 再動手「修」——說謊的是分數，不是頁面。

**CHŒUNG 事件。** 最後審稿時，Krystle 的姓氏顯示成「CHŒUNG」——H 和 E 黏成一團。第一個猜想：OpenType 連字。關掉連字——照樣黏。在瀏覽器裡做了一個五行測試矩陣，真相水落石出：**字體檔本身有一對錯誤的負值 kerning**，把 E 拉進了 H 裡。而 letter-spacing 並不會中和 kerning——kerning 在它底下照常生效。

![Debug CHŒUNG：一個測試矩陣，鎖定字體本身一對錯誤的 kerning](../../../assets/images/krystle-10-cheung-kerning-debug.jpg)

*找到元兇的五行矩陣：預設 / 關連字 / 大寫 / 關全部特性 / 加字距。*

修正，來自實際上線的 CSS：

```css
.hero-text h1 {
  font-kerning: none;   /* 字體的 kern pair 有錯——H 和 E 相撞 */
}
```

字體也是資料，而資料會有 bug。

## 結果

| 指標（節流手機） | WordPress | 靜態重建 |
| :--- | :--- | :--- |
| Lighthouse SEO | 85 | **100**（每一個模板） |
| 無障礙 | 94 | **100** |
| 最佳實踐 | 96 | **100** |
| 首次內容繪製 | 10.3 秒 | **1.7 秒** |
| Speed Index | 10.3 秒 | **2.5 秒** |
| 真實 trace LCP（4× CPU、Slow 4G） | — | **約 0.2 秒** |
| 首頁請求數 | 122 | 約 44 |
| 字體 | 872 KB · 17 請求 · 第三方 | **392 KB · 5 請求 · 自家托管** |
| 載入的 JavaScript | 約 700 KB（含 React + jQuery） | **約 5 KB 原生** |
| 訪客實際看得到的活動 | 9 / 85 | **85 / 85** |

收工前的 QA：102 頁裡全部 **815 條站內連結**逐一檢查——零死鏈；篩選、load-more、燈箱在真實瀏覽器裡逐一操作過；桌面和手機截圖跟原站逐頁比對。

![手機版：左為原站，右為重建](../../../assets/images/krystle-09-mobile-before-after.jpg)

*手機版，前後對比。*

最後一步是無聊但緊張的那種——完整備份 WordPress，把 DNS 切到 Cloudflare，然後盯著 Search Console 看索引慢慢消化。

## 這件事真正說明了甚麼

這跟我平時對客戶講的 AI 導入故事一模一樣，只是這次發生在自己家。Agent 做了那些因為太沉悶而永遠沒人做的部分：爬完每一頁、盯著每一個網絡請求（403 就是這樣現形的）、重放 API、生成 805 個影像檔、蓋出 102 頁、檢查 815 條連結。我做需要品味和判斷的部分：留甚麼、刪甚麼、哪個 bug 重要、甚麼時候該說「這個分數在說謊」——以及對太太公開門面的最終話事權。

單靠我們任何一方，都不可能在一個週末交出這個。這正是重點。

> [!note] 誠實的前提
> 靜態重建適合這個網站，因為內容一年只改幾次，而新增一場活動只是一筆 JSON 加一句建置指令。如果她需要每天自助改內容，答案會不一樣。合適的工具，配這一份工作。

而我真正在乎的指標不在表格裡：想請司儀的人，現在可以看到**全部八十五場活動**，在一個兩秒內畫好的網站上——而搜「張可澄」，終於找得到她。

*你的網站是不是也比應有的更慢——或者更安靜？歡迎找我看看——[電郵我](mailto:nam@wistkey.com)。*
