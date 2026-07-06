---
title: "重建太太的網站（二）：SEO 的故事——76 場被藏起的活動，和一個 Google 找不到的名字"
description: "她的網站把九成作品靜靜藏在一個壞掉的按鈕後面、沒有 meta description、沒有結構化資料——連她自己的中文名字都不在網站上。重建如何把每一頁的 SEO 從 85 帶到 100。"
pubDatetime: 2026-07-06T00:20:00+08:00
ogImage: ../../../assets/images/krystle-seo-banner.png
draft: false
tags:
  - tech
  - ai
---

![第二篇，SEO 的故事——可見活動 9 到 85、有 JSON-LD 的頁面 0 到 102、Lighthouse SEO 85 到 100](../../../assets/images/krystle-seo-banner.png)

在[第一篇](/zh/posts/rebuilding-my-wifes-website-part-1/)，我們把太太 Krystle 的 WordPress 作品集重建成 102 頁靜態 HTML——首次繪製從 10.3 秒變成 1.7 秒。但速度從來不是審計裡最痛的部分。

最痛的是：她的網站一直**把 85 場活動中的 76 場靜靜地藏起來**——對每一位訪客，也對每一個要靠 JavaScript 渲染的搜尋引擎。而就算是 Google *看得到*的頁面，也幾乎甚麼都沒告訴它：沒有 meta description、沒有結構化資料、首頁標題只有一個字「Krystle」——而她的中文名字 **張可澄**，在網站上完全不存在。

這是第二篇：甚麼是隱形的、為甚麼，以及重建如何把 **102 頁、每一頁**的 Lighthouse SEO 從 **85 帶到 100**。

## 目錄

## 隱形的作品集

用真實瀏覽器開著 network 面板逛網站時，有一個請求一直失敗：

`wp-json/cassia/v1/get-posts → 403`

主題的「Load More」按鈕透過一個 REST 請求載入活動，而請求需要一個**烤進頁面快取裡的 security nonce**。快取外掛保存頁面的時間，比 nonce 的壽命長。所以對真實訪客來說，nonce 永遠是過期的、端點永遠回 403——作品集就靜靜地停在頭 **9 場（共 85 場）**。

![原本的作品集——訪客永遠只看到頭九場活動](../../../assets/images/krystle-05-before-portfolio.jpg)

*每位訪客看到的：九場活動，和一個看起來正常、實際甚麼都不做的 Load More 按鈕。*

> [!warning] 靜默的故障最昂貴
> 按鈕照樣顯示，畫面沒有任何錯誤。它多半已經壞了很久——而她九成的作品一直是隱形的。如果你的網站靠按鈕或無限捲動載入內容，今天就開一個無痕視窗，親手按一下。

對一位司儀來說，作品集*就是*銷售簡報。搜「婚禮司儀」「企業活動司儀」的客戶，只看到九分之一。

## 網站還有甚麼沒告訴 Google

被藏起的活動是最戲劇性的發現，但審計裡的 SEO 清單又長又平凡：

- **任何一頁都沒有 meta description。** 每一條搜尋摘要都由 Google 即興發揮。
- **沒有 Open Graph、沒有 Twitter cards**——分享出去的連結是一條光禿禿的網址。
- **完全沒有結構化資料**——沒有 `Person`、沒有 `LocalBusiness`。而這盤生意的全部前提，就是*一個人提供本地服務*。
- 首頁標題只有 **「Krystle」**。
- 頁尾 logo 在**每一頁**都連到主題廠商的示範網站——全站向一家模板公司漏出連結權重。
- 兩個「Read More」按鈕的 href 是**空的**。
- 示範文章 `hello-world` 仍然在線、可被索引，連同一家沒有商品的商店的購物車和結帳頁。
- 還有名字的事：任何人搜 **「張可澄 司儀」**——她的真名加職業——都找不到她，因為「張可澄」三個字不在網站上。標題沒有、內文沒有、程式碼裡也沒有。

沒有一項是罕見的。這正是重點——一個沒被審計過的網站，積累的就是這些。

## 逐項修好

### 同樣的網址，讓索引活下來

重建的第一條規則：**每一條現有網址照常運作**。Google 對這個網站的索引原封不動地接了過來——沒有 404、沒有搬家式的排名輪盤。不該被索引的垃圾（`hello-world`、購物車、結帳）全部 **301** 到合理的目的地。

### 一個不可能失敗的 Load More

重建版的作品集把**全部 85 場活動預先渲染在 HTML 裡**。篩選是顯示和隱藏；按鈕只是多顯示九張。以下是實際上線的程式碼（稍作精簡）：

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

沒有 nonce、沒有快取、沒有端點——沒有東西可以 403。而且因為內容就在 HTML 裡，爬蟲不用點任何按鈕就能看到全部 85 場。

![重建後的作品集——85 場活動全部預先渲染，篩選和 load-more 純客戶端](../../../assets/images/krystle-06-after-portfolio.jpg)

*85 場活動，終於全部到得了——人和爬蟲都是。*

### 每一頁都向 Google 自我介紹

建置腳本為 102 頁中的每一頁蓋上獨一無二的標題、**雙語 meta description**、Open Graph + Twitter cards 和 canonical。結構化資料放在每個有意義的地方：

- **`Person`**——帶 `alternateName: 張可澄`，把她的中英文身份連起來
- **`LocalBusiness`**——她本來就是
- **`BreadcrumbList`**——每個層級頁面
- **`ImageGallery`**——每個活動頁一個，描述裡面的照片

![85 個生成的活動頁之一，附燈箱相冊](../../../assets/images/krystle-07-after-event-page.jpg)

*85 個活動頁，每一頁：獨立標題、描述、canonical，和自己的 ImageGallery 標記。*

因為頁面是由一個腳本從資料蓋出來的，這些元資料**不可能走樣**：在 JSON 加一場新活動，以上全部自動生成。（這就是第一篇講的批量編輯優勢，換上了 SEO 的帽子。）

### 名字

「張可澄」現在在標題裡、meta description 裡、關於頁、頁尾和 JSON-LD 裡。搜她中文名字的人，終於會落在她自己的網站上——而不是一無所獲。

![重建後的關於頁——簡介、資歷，以及終於出現在網站上的中文名字](../../../assets/images/krystle-08-after-about.jpg)

*關於頁——「張可澄」終於在網站上。*

## 記分板

| | WordPress | 靜態重建 |
| :--- | :--- | :--- |
| Lighthouse SEO | 85 | **100**（每一個模板） |
| 訪客——或爬蟲——看得到的活動 | 9 / 85 | **85 / 85** |
| 有 meta description 的頁面 | 0 | **102** |
| 有結構化資料的頁面 | 0 | **102** |
| 社交分享卡 | 無 | **全部頁面** |
| 「張可澄」在網站上找得到 | 否 | **是** |
| 被索引的垃圾網址（購物車、hello-world） | 有 | **已 301** |

上線後獨立驗證——切換前幾小時對舊站的最後一次 PSI，和重建版的：

![舊 WordPress 網站的 PageSpeed Insights：效能 57、無障礙 94、最佳實踐 100、SEO 85](../../../assets/images/krystle-11-psi-before.jpg)

*舊站，DNS 切換前幾小時的實地測量：SEO 85。*

![已上線重建版的 PageSpeed Insights（桌面）：全部類別 100](../../../assets/images/krystle-13-psi-after-desktop.png)

*重建版，上線後：SEO 100——其餘類別同樣全 100。*

> [!note] 剩下的是耐性
> 排名不會一夜改變。索引裡是同樣的網址、好得多的訊號；接下來是 Search Console，和等待——順便看著「張可澄 司儀」會不會開始浮出她。那會是本系列未來的一篇。

## 真正的重點

這篇文章裡沒有任何高深的 SEO。沒有技巧、沒有「秘技」——只是一個終於*把內容展示出來*、並在每一頁*準確自我描述*的網站，而且是自動的。大部分小生意的網站沒有「SEO 策略」問題；它們有的是「Google 根本看不到好東西」的問題。

先修可見性。策略可以慢慢來。

---

**本系列：**[第一篇——WordPress → 靜態 HTML，以及誠實的利弊](/zh/posts/rebuilding-my-wifes-website-part-1/) · 第二篇——你在這裡 · 第三、四篇即將推出。

*懷疑你的網站也對 Google 藏著東西？歡迎找我看看——[電郵我](mailto:nam@wistkey.com)。*
