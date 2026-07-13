---
title: "Internet Archive：我非官方的 legacy system debugger"
description: "十年軟件開發生涯裡，Wayback Machine 一次又一次幫我找回消失的文件、重組舊網站，亦令 legacy system 變得可以理解。這篇文章，是向其中一個最有用的公共 web 工具說聲多謝。"
pubDatetime: 2026-07-13T23:45:00+08:00
ogImage: ../../../assets/images/internet-archive-web-archaeology-banner.png
draft: false
tags:
  - tech
  - it
---

![一排舊網站 browser window 從數碼檔案館延伸到現代開發者 laptop](../../../assets/images/internet-archive-web-archaeology-banner.png)

*做 web archaeology，很多時是理解 legacy system 最快的一條路。*

上一篇文章由一款救回來的 Facebook 遊戲開始。而那條線索，跟我很多次最有收穫的 web exploration 一樣，來自 [Internet Archive](https://archive.org/)。

寫完之後我才發現，原來一直欠這個網站一篇正式的多謝。

大約十年的軟件開發生涯裡，[Wayback Machine](https://web.archive.org/) 一次又一次替我補上 legacy system 缺失的一塊：公司消失後仍找得到的舊 manual、網站改版前的 page structure、被靜靜改寫的 documentation，或者一個當年沒有人想過要 screenshot 的 product 畫面。

它不在我的 IDE、monitoring stack 或 source control 裡，卻經常像一個非官方 debugger，專門 debug code 周圍那段已經消失的歷史。

## 目錄

## 不只是舊網站 screenshot

Internet Archive 是一個非牟利數碼圖書館，保存網站、書籍、聲音、影片、圖片和 software。單是 Wayback Machine，現在已經可以搜尋[超過一萬億個 web page](https://web.archive.org/)的歷史。

數量很震撼，但真正有用的是那個簡單動作：輸入 URL、揀一個日期，再走進原本擁有者已經不再提供的 web。

![較早期的 Wayback Machine 介面，紅圈標示 Save Page Now 功能](../../../assets/images/internet-archive-web-archaeology-save-page-now.png)

*介面一路改變，核心想法沒有變。Screenshot 來自 [Internet Archive Help Center](https://archivesupport.zendesk.com/hc/en-us/articles/360001513491-Save-Pages-in-the-Wayback-Machine)。*

普通瀏覽時，這叫懷舊；維護 legacy system 時，它可以是 evidence。

## 它替我回答過的問題

舊系統很少連同完整 handover 一起出現。你接到的，通常只是碎片：一個 repository、一個 database、一個 domain，或者一張提到某個早已消失功能的 ticket。

Archive 曾經幫我查清楚：

- 今次 redesign 之前，這個 page 原本做甚麼？
- dead link 以前連去哪份 download、script 或 support document？
- 這個 field 是最初 workflow 的一部分，還是後來才加？
- 寫這段 code 的年代，公司怎樣向用戶解釋產品？
- migration 出事之前，原有 asset 和 URL 是甚麼？

一個 capture 不會解釋 implementation，但它會把歷史 UI 和 business context 還給 code。很多時，這已經足夠令一條古怪 branch 或 database column 重新變得合理。

## 我現在的小習慣

我現在會很早就查 Wayback Machine，而不是到其他方法全部失敗才想起它。先用 exact URL，再比較 release 或 migration 前後的 capture；亦會沿 archived link 繼續行，不假設最新一次 capture 一定完整。

準備替換或關閉有用頁面前，我亦會用 [Save Page Now](https://archivesupport.zendesk.com/hc/en-us/articles/360001513491-Save-Pages-in-the-Wayback-Machine)。它保存的是一個 page，包括當時能取得的圖片和 CSS，並不是 whole-site crawl。但主動保存一頁，總好過期待將來有人替你做。

![Internet Archive 總部的 book scanner，打開的書本放在數碼化設備上](../../../assets/images/internet-archive-web-archaeology-book-scanner.jpg)

*保存不只是 software，也是實在的工作。相片由 [Dvortygirl](https://commons.wikimedia.org/wiki/File:Internet_Archive_book_scanner_1.jpg) 拍攝，以 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 授權。*

> [!warning] 注意：archive 不是 backup
> Internet Archive 自己也提醒，capture 可能欠圖片、JavaScript 壞掉，亦不會保存 server-side behaviour。需要密碼的頁面，以及依賴原本 server 的 workflow，可能從來沒有完整留下。Snapshot 是歷史 evidence，不是保證可以 restore 的 system。

上一篇遊戲文章也令我更清楚這個分別。Internet Archive 幫我找到救回的遊戲和背後貢獻者；但要讓它獨立生存，仍然要把可保存的 artifact、emulator 和 provenance 放回自己的 repository。Discovery 和 preservation 有關，但不是同一件事。

## 替私人歷史服務的公共工具

大部分 legacy maintenance 都不戲劇化。它只是耐心重組：以前有甚麼、為何存在、今天哪些部分仍然重要。

Internet Archive 在這些工作裡替我省下很多猜測。更重要的是，它留下了 commercial roadmap 沒有理由保存的 web 碎片。那些舊頁面今天可能很笨拙，裡面卻保留了決定、社群和解釋，讓我們仍然看得懂留下來的 system。

所以，真心多謝每一位建立、crawl、營運和支援 Internet Archive 的人。原來很多 modern software work，都要靠我們仍然有能力回頭看。

*你也在維護 legacy platform，或者重組一段已經消失的 web workflow？很樂意交流經驗——[電郵我](mailto:nam@wistkey.com)。*

---

*想繼續看新舊系統的實戰故事，可以[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk)，亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——沒有 hard sell，只是同樣喜歡 web archaeology 的人，隨時可以打開話題。*
