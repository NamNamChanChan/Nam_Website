import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首頁",
    posts: "文章",
    tags: "標籤",
    games: "遊戲",
    about: "關於",
    archives: "彙整",
    search: "搜尋",
    projects: "項目",
    links: "連結",
  },
  post: {
    publishedAt: "發佈於",
    updatedAt: "更新於",
    sharePostIntro: "分享這篇文章：",
    sharePostOn: "分享到 {{platform}}",
    sharePostViaEmail: "以電郵分享這篇文章",
    shareButton: "分享",
    shareDialogTitle: "分享這篇文章",
    shareDialogDescription: "選擇你想使用的分享方式。",
    shareClose: "關閉分享視窗",
    shareCopyLink: "複製連結",
    shareLinkCopied: "連結已複製到剪貼簿。",
    shareCopyError: "無法自動複製，請手動複製頁面網址。",
    shareInstagram: "Instagram 限時動態",
    shareInstagramDescription: "製作直向限時動態圖片",
    shareLinkedIn: "LinkedIn",
    shareLinkedInDescription: "分享文章摘要及連結",
    shareLinkedInReady: "摘要及連結已複製，請貼到 LinkedIn 貼文中。",
    shareStoryGenerating: "正在製作限時動態圖片⋯",
    shareStoryReady: "1080 × 1920 限時動態圖片已準備好。",
    shareStoryError: "無法製作限時動態圖片，請再試一次。",
    shareStoryTitle: "Instagram 限時動態預覽",
    shareStoryInstructions:
      "分享圖片並選擇 Instagram，或下載圖片後手動加入限時動態。",
    shareStoryImage: "分享限時動態圖片",
    shareStoryShared: "限時動態圖片已分享。",
    shareStoryDownloaded: "限時動態圖片已下載。",
    shareDownloadImage: "下載圖片",
    shareStoryPreviewAlt: "這篇網誌文章的 Instagram 限時動態直向預覽",
    shareBack: "返回分享選項",
    tagLabel: "標籤",
    backToTop: "回到頂部",
    goBack: "返回",
    editPage: "編輯此頁",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一頁",
    next: "下一頁",
    page: "頁",
  },
  home: {
    socialLinks: "社交連結",
    featured: "精選",
    recentPosts: "最新文章",
    allPosts: "所有文章",
  },
  hero: {
    title: "你好，我是 Nam 👋",
    tagline:
      "Nam Chan · 又名 Alfred Nam · AceSpeak 共同創辦人兼 CIO · Wistkey CTO · 倫敦 ⇄ 香港",
    rolePre: "我是 ",
    roleLink: "AceSpeak",
    rolePost:
      " 的共同創辦人兼 CIO。2026 年 6 月到 8 月，我們努力把一個共同的夢想變成真正的產品：在 AI 時代，幫助人們重新找回並享受說話的樂趣。現在，我們正在為 8 月底正式上線做最後準備。",
    writing:
      "我同時仍是 Wistkey 的 CTO，協助企業與政府把 AI 真正投入正式環境。我在這裡分享打造 AceSpeak 的歷程、AI 與工程中真正行得通的方法、商業、理財，以及讓一切得以持續的清晨四點 Ashtanga 練習。",
    ctaProjects: "看看我的項目",
    ctaAbout: "更多關於我",
  },
  footer: {
    copyright: "版權所有",
    allRightsReserved: "保留一切權利。",
  },
  langSwitch: {
    toggle: "EN",
    toggleTitle: "Switch to English",
  },
  links: {
    socialsHeading: "社交帳號",
    sitesHeading: "網站",
    subscribeHeading: "訂閱",
    comingSoon: "即將加上",
    email: "電郵",
    rss: "RSS 訂閱",
  },
  pages: {
    tagTitle: "標籤",
    tagDesc: "所有含此標籤的文章：",

    tagsTitle: "標籤",
    tagsDesc: "文章使用過的所有標籤。",

    postsTitle: "文章",
    postsDesc: "我發佈的所有文章。",

    archivesTitle: "彙整",
    archivesDesc: "按時間彙整的所有文章。",

    searchTitle: "搜尋",
    searchDesc: "搜尋任何文章⋯",

    projectsTitle: "項目",
    projectsDesc: "我做過的產品與個人項目。",
    projectsMore:
      "還有很多——客戶項目、以前的作品、以及做到一半的實驗。等我週末有空，會陸續放上來。",

    linksTitle: "連結",
    linksDesc: "我的所有帳號與網站，集中在這裡。",
  },
  a11y: {
    skipToContent: "跳至內容",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    toggleTheme: "切換深淺模式",
    searchPlaceholder: "搜尋文章⋯",
    noResults: "找不到結果",
    goToPreviousPage: "上一頁",
    goToNextPage: "下一頁",
  },
  notFound: {
    title: "404 找不到頁面",
    message: "頁面不存在",
    goHome: "回到首頁",
  },
} satisfies UIStrings;
