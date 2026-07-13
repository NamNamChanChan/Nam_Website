---
title: "救回一款 2009 年 Facebook 遊戲——還要讓它捱得過下一次關站"
description: "這個小型保存項目，把 Who Has The Biggest Brain? 變成網站裡一個完整、自給自足的部分：遊戲、模擬器、預覽圖與貢獻者歷史，全部都在 repository 內。"
pubDatetime: 2026-07-13T15:20:00+08:00
ogImage: ../../../assets/images/recovering-who-has-the-biggest-brain-banner.png
draft: false
tags:
  - tech
  - it
---

![完成後的 Good Old Games 頁面，已救回的 Who Has The Biggest Brain 遊戲等待開始](../../../assets/images/recovering-who-has-the-biggest-brain-banner.png)

*完成後的頁面：一款舊 Facebook 遊戲、一個現代瀏覽器，而且不再依賴外部 runtime。*

讓一款舊遊戲「玩得到」，跟真正把它**保存下來**，是兩回事。

我把 2009 年 Playfish 的 Facebook 遊戲 *Who Has The Biggest Brain?* 加到個人網站時，再一次體會到這個分別。我最初在 [Internet Archive](https://archive.org/details/whtbb) 找到一份可以運行的版本。把它 embed 到頁面只需幾分鐘；但如果日後 Archive 上的項目、player 或網絡路徑消失，我這個所謂「已保存」的遊戲也會一同消失。

於是，一個原本很小的週末功能，變成了一個認真的 mini project：把 SWF、Flash 模擬器、預覽圖和貢獻者歷史全部放進 repository；由自己的靜態網站運行遊戲；同時把真正令它重見天日的人逐一寫清楚。

## 目錄

## 一款屬於平台的遊戲

*Who Has The Biggest Brain?* 出生於 social game 最樂觀的年代。當時 Facebook account 不只是登入方法，而是遊戲的一部分。Playfish 把分數、挑戰和朋友都編進體驗裡。EA 在 2009 年收購 Playfish；EA 當年的公告把這款遊戲列為 Playfish 的熱門作品之一，亦形容這家公司每月觸及數以千萬計玩家（[EA 收購公告](https://ir.ea.com/press-releases/press-release-details/2009/Electronic-Arts-Acquires-Playfish/default.aspx)）。

如此規模，仍然沒有令軟件變得長久。服務停止之後，client 仍然是一個 Flash 檔案，但體驗的一部分依賴早已消失的 Facebook 年代伺服器。即使找到正確的 `.swf`，原本的統計、挑戰和排行榜也不會憑空回來。

這就是「所有東西都叫 cloud software」之前，cloud software 已經存在的尷尬：有時 executable 留下來了，產品本身卻沒有。

## 是誰把它帶回來？

[Internet Archive 保存項目](https://archive.org/details/whtbb)的價值，不只在於有一個檔案。它的描述記錄了整條修復接力：

- **PandaFake⚡** 保存遊戲、修改成離線可運行版本，並上載整個保存項目。
- **BattleAncient（Rachid）** 提供最重要的遊戲主檔案。
- **floydian（Alejandro）** 協助修復多個 glitch。
- **Ruffle 貢獻者**持續維護開源模擬器，令 Flash 內容可以在現代瀏覽器運行。

保存項目亦記錄了一次標示為 `9/8/25` 的更新：修正 Car Path 的符號問題、參考 iPhone 版本為 Hexagon Path 加入重設程序，並移除兩個已失效的分數介面。

> [!important] 重要：保存是一條接力鏈
> 找到檔案只是其中一步。有人要留下主檔案，有人要把死掉的伺服器依賴拆走，有人要修復壞掉的路徑，亦有人要開發模擬器。mirror 保存這些名字，應該跟保存 bytes 一樣認真。

![救回的 Who Has The Biggest Brain 主選單，顯示 Play、Challenge、Invite、Trophies 和 Profile](../../../assets/images/recovering-who-has-the-biggest-brain-menu.png)

*救回的主選單。離線版本可以遊玩，但依賴伺服器的社交功能不可能完整回來。*

## 「玩得到」不等於「保存了」

我的第一版用了 Archive embed。它的確能運行，外觀也合理，但 dependency graph 是錯的：

**我的頁面 → Archive iframe → Archive 託管的模擬器 → Archive 託管的遊戲**

這叫 access，不叫獨立保存。

最後我定下更嚴格的要求：部署完成之後，訪客只需要我的網站。沒有 iframe、沒有 emulator CDN、遊戲運行時不向 Internet Archive 發 request。Archive 頁面仍然保留為來源與歷史記錄，但已經不再是玩遊戲的必要條件。

這個分別不只適用於遊戲。如果有價值的 asset 只是 embed 自它目前的家，我們只是做了另一個 bookmark。當 artifact、runtime 和 provenance 一起搬走，我們才真正做了一份可以捱得過來源消失的副本。

## 把整個 runtime 放進 repository

保存下來的 SWF 只有 1,771,296 bytes。我從 Archive 項目下載那份已修復的離線檔案，並在旁邊記錄 checksum：

```bash
curl -fsSL "https://archive.org/download/whtbb/brain_game_2_6_7_translated_v1.swf" \
  -o public/games/whtbb/brain_game_2_6_7_translated_v1.swf

openssl dgst -sha256 \
  public/games/whtbb/brain_game_2_6_7_translated_v1.swf
```

預期的 SHA-256 是 `a2bc047379274cc0f1556749c326b47d971849aa4a87c70a88da80aca448af96`。這不是 security theatre；下一個接手的人，可以很快確認手上的檔案是否同一個保存版本。

模擬器使用 [Ruffle 的 self-hosted web package](https://ruffle.rs/downloads)，本站固定在 0.3.0。我把 JavaScript、兩個 WebAssembly variant、package metadata，以及 MIT／Apache licence 全部保留在 `public/vendor/ruffle/`。

Astro 很適合做這件事，因為 `public/` 裡的檔案會原封不動複製到靜態 build（[Astro project structure](https://docs.astro.build/en/basics/project-structure/)）。SWF 不需要經過 image optimizer 或 JavaScript bundler；它只需要一條穩定路徑和正確的 web server response。

![本地保存流程圖，從 SWF 與 provenance 經 Astro 頁面連到本地託管的 Ruffle runtime](../../../assets/images/recovering-who-has-the-biggest-brain-local-stack.png)

*保存架構：asset、頁面和 runtime 從同一個 repository 一起部署。*

最後的目錄結構刻意保持沉悶：

- `public/games/whtbb/` 放 SWF、預覽圖和 provenance 記錄。
- `public/vendor/ruffle/` 放固定版本的模擬器和 licence。
- 一個 Astro component 負責 player UI 和本地 URL。
- 英文與繁體中文頁面共用同一套保存 asset。

沉悶在這裡是好事。保存副本應該容易檢查、容易搬、容易重新 build。

## 一次 click，從預覽變成真正遊戲

Ruffle 預設的 click-to-play 畫面，只能證明模擬器已經載入，完全看不出後面是哪款遊戲。我把那個 generic idle state 換成從救回版本主選單截取的畫面。圖片本身也是 repository asset；訪客 click 之後，才建立真正 player，並把預覽換走。

整個 integration 最重要的部分其實很小：

```js
const player = window.RufflePlayer.newest().createPlayer();
container.replaceChildren(player);

await player.ruffle().load({
  url: "/games/whtbb/brain_game_2_6_7_translated_v1.swf",
  autoplay: "on",
  unmuteOverlay: "hidden",
  splashScreen: false,
});
```

這些值全部來自 Ruffle 官方 [`URLLoadOptions`](https://ruffle.rs/js-docs/master/interfaces/Config.URLLoadOptions.html)。由於 load 在訪客 click 時開始，自訂預覽會變成一個清楚、單一步驟的操作，而不是先 click 預覽，再面對第二個 emulator play screen。

![按下 repository 自有預覽圖後，救回的遊戲以 Ruffle live canvas 形式運行](../../../assets/images/recovering-who-has-the-biggest-brain-live-player.png)

*click 之後：同一個主選單已經變成真正可操作的 Flash 遊戲，由本地 Ruffle render。*

## 我刻意沒有「修好」甚麼

離線版本無法重建原本的 Facebook service。統計、社交挑戰和排行榜所依賴的 infrastructure 與 data 已經消失。保存版本移除或繞過部分死掉的介面，但不會假裝重建整個 2009 年網絡。

> [!caution] 小心：可以 self-host，不代表 ownership 被改寫
> self-hosting 令技術保存更完整，但不會抹走原有權利。Playfish 仍然是遊戲創作者，修復者應該得到 credit，Archive 項目亦仍然是來源記錄。本地 `PROVENANCE.md` 的作用，就是避免這些事實與 binary 分開。

這亦是我沒有「改善」遊戲的原因。目標不是 remaster、加新排行榜或重新設計玩法；目標是為這份已救回的版本，提供一個忠實而可用的入口。

## 驗證：它真的可以獨立生存嗎？

第一道 gate 是正常 production build：

```bash
npm run build
```

之後，我在一個封鎖外部 host、但仍可連 localhost 的 Chrome session 打開 build 後頁面。遊戲仍然進入主選單。request log 顯示頁面只從本地路徑載入 SWF、Ruffle JavaScript 和 WebAssembly；game runtime 沒有向 Archive 發 request。

最後我沒有停在一張 screenshot，而是實際測試 interaction：click 自訂預覽、等待 Ruffle 初始化、確認 live canvas 存在，再確認遊戲處於 playing 狀態。檔案存在 Git 裡，並不代表保存完成；從檔案走到人的整條路仍然運作，才算完成。

## 這個小項目的 lesson

這不是大型系統，只是一款遊戲、一個靜態頁面和幾十 MB 的模擬器檔案。但它包含了大型 digital preservation 項目一樣會遇到的問題：

1. **我們是否真的擁有 artifact？**
2. **離開目前 host 之後，仍然可以運行嗎？**
3. **有沒有把它周圍的人和歷史一起保存？**
4. **普通訪客不用 specialist setup，也可以接觸到嗎？**

code 是最容易的部分。真正有用的成果，是把一個脆弱的 external embed，變成小型、可檢查的保存 package——同時讓真正完成修復的人被看見，而不是悄悄把他們的功勞當成自己的。

你可以在網站的 [Good Old Games](/zh/good-old-games/) 頁面直接玩。

*你也在處理 legacy web experience，或者想保存一個快要消失的小項目嗎？很樂意交流做法——[電郵我](mailto:nam@wistkey.com)。*

---

*如果你喜歡這類實際 rebuild 記錄，可以[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk) 等下一篇，亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——舊系統背後的故事，通常比 error message 精彩。*
