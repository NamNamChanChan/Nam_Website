---
title: "幾分鐘部署一個網站,$0 免費——GitHub + Cloudflare 食譜"
description: "Star 一個 repo、連上免費的 Cloudflare 帳戶、設定一條 build 指令,之後每次 git push 都會把你的網站送上全球 CDN——連 HTTPS 都包——費用是零。完整五步食譜,用我的 side project NamLoop 做白老鼠(任何網站都適用)。"
pubDatetime: 2026-07-03T10:00:00+08:00
ogImage: ../../../assets/images/deploy-free-with-github-and-cloudflare-cover.png
draft: false
tags:
  - tech
  - it
---

![幾分鐘部署你的網站——GitHub + Cloudflare,快、易、免費;由 star 和 fork 到上線的五個步驟](../../../assets/images/deploy-free-with-github-and-cloudflare-cover.png)

我最近放上互聯網的三個網站,每一個部署都用**不到十分鐘**,每月費用**正好 £0**。沒有伺服器、沒有 nginx、沒有要續期的 TLS 證書、沒有帳單。我 push 上 `main`,大約一分鐘後,改動就上線到全球 CDN。

如果你學識部署網站是幾年前的事,上面這句話應該聽起來很可疑。但它不是——只是那些煩人的部分被免費工具默默吸收了,而沒有人為此開過慶祝會。在 [NamLoop 第二篇](/zh/posts/namloop-part-2-cloudflare-cicd/)裡,我寫過*為甚麼*這件事感覺如此不同。這一篇是另一半:**完整食譜**,一步一步,讓你今日就做得到。

我會用我的小 side project **[NamLoop](https://github.com/NamNamChanChan/NamLoop)**(一個無廣告的 YouTube 循環播放器)做示範,但同樣這五步,可以部署*任何*網站——一個靜態作品集、一個 Astro 部落格、一個 Next.js 應用。

## 目錄

## 你在建甚麼——以及它的成本

最終狀態:你的 GitHub repo 連上了 Cloudflare,之後每一次 push 都會自動建置並把你的網站部署到 Cloudflare 的邊緣網絡,經 HTTPS 由一條 `*.workers.dev` 網址提供服務(自訂域名是多一下點擊)。這就是持續部署——CI/CD——而在免費層,它是真的一分錢都不用。

![「免費」到底代表甚麼:主機、TLS、CDN、CI/CD 全部 $0/月;Workers 每日 10 萬個請求免費,靜態資源請求無限;由 300 多個城市提供服務](../../../assets/images/deploy-free-with-github-and-cloudflare-free.png)

*誠實的數字。靜態網站基本上永遠免費;一個 Worker 應用在你需要考慮付費之前,有每日 10 萬個請求。資料來源:Cloudflare Workers & Pages 定價。*

> [!note] 「免費」的星號,先講清楚
> Cloudflare 的 Workers 免費計劃容許**每日 10 萬個請求**,而對**靜態資源的請求在所有計劃都是無限的**。對一個作品集、一個介紹網站、或者像 NamLoop 這樣的工具,你幾乎肯定永遠碰不到付費層。文末我會誠實列出真正的限制。

## 第一步 —— 先 Star,再 Fork 或 Clone

去到你想部署的 repo——本篇用的是 **[github.com/NamNamChanChan/NamLoop](https://github.com/NamNamChanChan/NamLoop)**。

![GitHub 上的 NamLoop repo——Star 掣在右上角,Fork 就在旁邊](../../../assets/images/namloop-p2-repo.png)

*任何你看得到的公開 repo,你都可以 fork。Star 同 Fork 掣一齊住喺右上角。*

這裡有三個掣重要,而且各有各的用途:

- **Star** ⭐ —— 一個書籤,加一句對作者的無聲多謝。它不會複製任何東西,只是讓你日後容易再搵到這個 repo(而且老實講,它會令一個開源作者開心一整日)。
- **Fork** —— 在你的 GitHub 帳戶下,做一份*屬於你自己*的 repo 副本。如果你要部署的是別人的項目,這就是你要的那個,因為 Cloudflare 會由一個**你**控制的 repo 去部署。
- **Clone** —— 把一份副本下載到你的筆電,讓你在本地跑:

```bash
git clone https://github.com/NamNamChanChan/NamLoop.git
cd NamLoop
npm install
npm run dev        # 開 http://localhost:3000 睇住佢喺本地跑起
```

如果你部署的是自己的項目,那就跳過 fork,直接把你的程式碼 push 上一個屬於你自己的 GitHub repo。無論哪種,**規則都很簡單:Cloudflare 由一個你擁有的 GitHub repo 去部署。**

## 第二步 —— 開一個免費 Cloudflare 帳戶

去 [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up),輸入一個電郵同密碼,驗證電郵。就這樣——免費層**不需要信用卡**。兩分鐘,而且跟著這條食譜走,你完全不用碰 DNS 或伺服器。

## 第三步 —— 打開「Workers & Pages」

在 Cloudflare 儀表板的側欄,按 **Workers & Pages**。這一個區塊是 Cloudflare 兩個網站托管產品共同的家,關於 2026 年該用哪一個,簡單講幾句:

- **Workers** 是現在該伸手去拿的那個。由一個裝滿靜態檔案的資料夾,到一個完整的伺服器渲染應用,它都托管得到,而且這是 Cloudflare 把所有新功能投放的地方。我三個網站(這個部落格、[krystle.hk](https://krystle.hk)、NamLoop)全部跑在 Workers 上。
- **Pages** 是較舊的兄弟,為純靜態網站而造。它仍然好用,如果你手上只有一個 HTML 資料夾,它是完全可以的選擇——但任何新東西,我都會由 Workers 開始。

> [!tip] 不用糾結 Workers 定 Pages
> 對一個部署靜態網站的新手,兩個都得。揀 **Workers**,然後繼續——下面那套 git 連結流程,兩者幾乎一模一樣,而 Workers 是 Cloudflare 正在投資的方向。

按 **Create**,然後找 **Import a repository**(匯入一個 repo)。

## 第四步 —— 連接 GitHub

Cloudflare 會要求連接你的 Git 帳戶。揀 **GitHub**,授權它(你可以授權*全部* repo,或者只選部分——只選你要部署的那一個是最整潔的做法),然後在清單裡揀你的 repo——你的 **NamLoop fork**,或者你自己項目的 repo。

這一下握手,就是令魔法變成「持續發生」的關鍵:從此以後,Cloudflare 會盯住那個 repo,每當你 push 就重新部署。

## 第五步 —— build 與 deploy 指令

這是唯一一個技術性的步驟,而它就是兩個欄位。當 Cloudflare 建置你的網站時,它會跑一條 **build 指令**(把你的原始碼變成一個檔案資料夾或者一個 Worker),然後跑一條 **deploy 指令**(把它送出去)。以下就是該填甚麼:

![你唯一要設定的兩條指令:靜態網站用 `npm run build` 再 `npx wrangler deploy`;像 NamLoop 這樣的 Next.js 應用用 `npx opennextjs-cloudflare build` 再 `npx wrangler deploy`](../../../assets/images/deploy-free-with-github-and-cloudflare-commands.png)

*兩條食譜覆蓋幾乎所有情況。deploy 指令預設就是 `npx wrangler deploy`,所以大部分時候你只需要設定 build 指令。*

**如果是靜態網站**(Astro 部落格、Vite 應用、純 HTML——像這個部落格):

- **Build 指令:** `npm run build`
- **Deploy 指令:** `npx wrangler deploy`(這是預設值——你通常原封不動)

一個靜態網站需要在 repo 裡放一個兩行的設定檔 `wrangler.jsonc`,告訴 Cloudflare「這只是一個檔案資料夾」:

```jsonc
{
  "name": "my-site",
  "compatibility_date": "2026-07-04",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

**如果是 Next.js 應用**(像 NamLoop,用 [OpenNext](https://opennext.js.org/cloudflare/) 轉接器在 Cloudflare 上跑):

- **Build 指令:** `npx opennextjs-cloudflare build`
- **Deploy 指令:** `npx wrangler deploy`

NamLoop 的 `wrangler.jsonc` 本來就帶在 repo 裡(它把 `main` 指向建置好的 `.open-next/worker.js`),所以如果你 fork 了它,你甚麼都不用寫——Cloudflare 會自己找到。

> [!note] 如果你的 repo 沒有設定檔,Cloudflare 會幫你寫
> 連上一個沒有 `wrangler.jsonc` 的 repo,Cloudflare 的 **autoconfig** 會偵測你的框架(Astro、Next.js⋯⋯),然後開一個 **pull request** 幫你加上正確的設定,再附一個預覽部署讓你合併前先測試。你真的可以由「淨係我嘅程式碼」開始,讓平台替你提議接線方式。

按 **Save and Deploy**。Cloudflare 會克隆 repo、跑你的 build、部署它,然後遞給你一條 `https://<project>.workers.dev` 的上線網址——全球提供服務、包 HTTPS、大約一分鐘搞掂。

> [!tip] 偏好用命令列?從筆電一鍵部署
> 你其實不一定要用儀表板。克隆了 repo 之後,這樣就能直接從你的機器送上去:
> ```bash
> npx wrangler login    # 一次性:瀏覽器授權 Cloudflare
> npm run deploy        # NamLoop 的腳本:用 OpenNext 建置,然後部署
> ```
> 上面那套 git 連結的設定,其實就是把這件事自動化到每次 push,讓你永遠不用記得去跑它。

## 從今以後,`git push` 就是部署

這就是重點。第五步一做完,部署就不再是一件「工作」:

```bash
git add -A
git commit -m "tweak the hero copy"
git push origin main   # 大約一分鐘後,全球上線
```

Cloudflare 會自動重新建置、重新部署。想要一個真正的地址,而不是 `*.workers.dev`?在項目設定裡,**加一個自訂域名**——如果你的域名在 Cloudflare,DNS 記錄同 TLS 證書會一下點擊幫你建好。我替 `loop.nam-ai.uk` 做這件事,大約用了三十秒。

## 誠實的注意事項

因為我不會賣一頓免費午餐而不先讓你看餐牌:

- **免費層很慷慨,但不是無限。** Workers 免費 = **每日 10 萬個請求**;靜態資源請求無限。對一個作品集或工具來說綽綽有餘;一個爆紅的上線日,才是你會去看那個 $5/月 計劃的時候。
- **邊緣 runtime 不完全是 Node。** 一個 Worker 不是一部普通伺服器。大部分東西都能跑,但例外(例如 NamLoop 關掉了 Next 的圖片優化器,因為 Worker runtime 跑不動它)會在建置時自己喊出來。
- **「微不足道」的前提是無後端。** 一旦你需要資料庫、登入、或者佇列,你就回到真正的架構了——Cloudflare 樂意賣給你它的版本(D1、KV、R2),那是一條好路,但它是一條*路*,不是一個剔選框。
- **輕度綁定是魔法的價錢。** 這裡一個 `wrangler.jsonc`,那裡一個 build 設定。靜態資料夾要搬去別處是幾分鐘的事;倚賴平台儲存的話,就不止。

這些我在 [NamLoop 第二篇](/zh/posts/namloop-part-2-cloudflare-cicd/)裡講得更深——這一篇是食譜,那一篇是反思。

## 真正的重點

在過去幾年的某一刻,部署一個網站,悄悄變成了一個**儲存掣**。上面這條食譜,無論你是在出貨一個週末玩具、還是一個客戶的網站,都是一樣的:star、fork、連接、一條 build 指令、push。難的從來不是把它放上線——而是決定這件事值不值得放上線。

所以,揀一個 repo——我的、一個模板、或者你這個星期做出來的東西——給它一個地址。它只會花你十分鐘,除此之外,甚麼都不用。

*卡在某一步,或者想在把真域名指過去之前,有多一雙眼幫你看看?[電郵我](mailto:nam@wistkey.com)——我很樂意幫你把它弄上線。*

---

*覺得有用的話,同類文章陸續有來:[在 Medium 追蹤我](https://nam0403.medium.com/)、[訂閱或收藏 nam-ai.uk](https://nam-ai.uk) 睇新的 build-in-public 文章,亦歡迎[在 LinkedIn 連繫我](https://www.linkedin.com/in/nam-chan/)——我鍾意識到肯動手做嘢的人。*
