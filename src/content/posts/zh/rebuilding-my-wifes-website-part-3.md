---
title: "重建太太的網站（三）：SEO 的故事——和一個 Google 找不到的名字"
description: "沒有 meta description、沒有結構化資料、垃圾頁面被索引——連她自己的中文名字都不在網站上。krystle.hk 的重建如何把每一頁的 Lighthouse SEO 從 85 帶到 100。"
pubDatetime: 2026-06-21T00:25:00+08:00
ogImage: ../../../assets/images/krystle-seo-banner.png
draft: false
tags:
  - tech
  - ai
---

![第三篇，SEO 的故事——Lighthouse SEO 85 到 100、有 JSON-LD 的頁面 0 到 102、meta description 0 到 102](../../../assets/images/krystle-seo-banner.png)

在[第一篇](/zh/posts/rebuilding-my-wifes-website-part-1/)，我們把太太 Krystle 的網站 **[krystle.hk](https://krystle.hk)** 重建成靜態 HTML；在[第二篇](/zh/posts/rebuilding-my-wifes-website-part-2/)，我們修好了介面——包括那個一直把她 85 場活動中的 **76 場**藏起來的壞按鈕。按鈕對人藏起的東西，對爬蟲同樣是藏起的。

但就算是 Google *看得到*的頁面，也幾乎甚麼都沒告訴它。這一篇是故事的搜尋面：網站一直沒說的話、重建如何讓每一頁自動說清楚，以及 Lighthouse SEO 如何在**全部 102 頁**從 **85 去到 100**。

## 目錄

## 網站一直沒告訴 Google 的事

審計裡的 SEO 清單又長又平凡：

- **任何一頁都沒有 meta description。** 每一條搜尋摘要都由 Google 即興發揮。
- **沒有 Open Graph、沒有 Twitter cards**——分享出去的連結是一條光禿禿的網址。
- **完全沒有結構化資料**——沒有 `Person`、沒有 `LocalBusiness`。而這盤生意的全部前提，就是*一個人提供本地服務*。
- 首頁標題只有 **「Krystle」**。
- 頁尾 logo 在**每一頁**都連到主題廠商的示範網站——全站向一家模板公司漏出連結權重。
- 示範文章 `hello-world` 仍然在線、可被索引，連同一家沒有商品的商店的購物車和結帳頁。
- 還有名字的事：任何人搜 **「張可澄 司儀」**——她的真名加職業——都找不到她，因為「張可澄」三個字不在網站上。標題沒有、內文沒有、程式碼裡也沒有。

沒有一項是罕見的。這正是重點——一個沒被審計過的網站，積累的就是這些。

## 逐項修好

### 同樣的網址，讓索引活下來

重建的第一條規則：**每一條現有網址照常運作**。Google 對這個網站的索引原封不動地接了過來——沒有 404、沒有搬家式的排名輪盤。不該被索引的垃圾（`hello-world`、購物車、結帳）全部 **301** 到合理的目的地。

第二篇的修正在這裡同樣關鍵：因為全部 85 場活動現在**預先渲染在 HTML 裡**，爬蟲不用點任何按鈕、不用執行任何脆弱的 API，就能看到整個作品集。Google 的渲染器以前從未到達的內容，現在就⋯⋯在原始碼裡。

### 每一頁都向 Google 自我介紹

建置腳本為 102 頁中的每一頁蓋上獨一無二的標題、**雙語 meta description**、Open Graph + Twitter cards 和 canonical。結構化資料放在每個有意義的地方：

- **`Person`**——帶 `alternateName: 張可澄`，把她的中英文身份連起來
- **`LocalBusiness`**——她本來就是
- **`BreadcrumbList`**——每個層級頁面
- **`ImageGallery`**——每個活動頁一個，描述裡面的照片

![85 個生成的活動頁之一，附燈箱相冊](../../../assets/images/krystle-07-after-event-page.jpg)

*85 個活動頁，每一頁：獨立標題、描述、canonical，和自己的 ImageGallery 標記。*

因為頁面是由一個腳本從資料蓋出來的，這些元資料**不可能走樣**：在 JSON 加一場新活動，以上全部自動生成。（這就是第一篇講的批量編輯優勢，換上了 SEO 的帽子。）

還有基本功：一個真正的 `sitemap.xml`、一個正常的 `robots.txt`、一個不再 404 的 favicon，以及那個頁尾連結終於指向她自己的首頁，而不是模板公司的示範站。

### 名字

「張可澄」現在在標題裡、meta description 裡、關於頁、頁尾和 JSON-LD 裡。搜她中文名字的人，終於會落在[**她自己的網站**](https://krystle.hk)上——而不是一無所獲。

![重建後的關於頁——簡介、資歷，以及終於出現在網站上的中文名字](../../../assets/images/krystle-08-after-about.jpg)

*關於頁——「張可澄」終於在網站上。*

## 記分板

| | WordPress | 靜態重建 |
| :--- | :--- | :--- |
| Lighthouse SEO | 85 | **100**（每一個模板） |
| 有 meta description 的頁面 | 0 | **102** |
| 有結構化資料的頁面 | 0 | **102** |
| 社交分享卡 | 無 | **全部頁面** |
| 爬蟲不用 JS 就到得了的活動 | 9 / 85 | **85 / 85** |
| 「張可澄」在網站上找得到 | 否 | **是** |
| 被索引的垃圾網址（購物車、hello-world） | 有 | **已 301** |

上線後獨立驗證——切換前幾小時對舊站的最後一次 PSI，和重建版的：

![舊 WordPress 網站的 PageSpeed Insights：效能 57、無障礙 94、最佳實踐 100、SEO 85](../../../assets/images/krystle-11-psi-before.jpg)

*舊站，DNS 切換前幾小時的實地測量：SEO 85。*

![已上線重建版的 PageSpeed Insights（桌面）：全部類別 100](../../../assets/images/krystle-13-psi-after-desktop.png)

*重建版，已在 krystle.hk 上線：SEO 100——其餘類別同樣全 100。*

> [!note] 剩下的是耐性
> 排名不會一夜改變。索引裡是同樣的網址、好得多的訊號；接下來是 Search Console，和等待——順便看著「張可澄 司儀」會不會開始浮出她。那會是本系列未來的一篇。

## 真正的重點

這篇文章裡沒有任何高深的 SEO。沒有技巧、沒有「秘技」——只是一個終於*把內容展示出來*、並在每一頁*準確自我描述*的網站，而且是自動的。大部分小生意的網站沒有「SEO 策略」問題；它們有的是「Google 根本看不到好東西」的問題。

先修可見性。策略可以慢慢來。

---

**本系列：**[第一篇——WordPress → 靜態 HTML，以及誠實的利弊](/zh/posts/rebuilding-my-wifes-website-part-1/) · [第二篇——介面](/zh/posts/rebuilding-my-wifes-website-part-2/) · 第三篇——你在這裡 · [第四篇——網站上線了，然後是教訓](/zh/posts/rebuilding-my-wifes-website-part-4/)。

*懷疑你的網站也對 Google 藏著東西？歡迎找我看看——[電郵我](mailto:nam@wistkey.com)。*
