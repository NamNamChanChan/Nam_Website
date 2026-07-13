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
    tagline: "Nam Chan · 又名 Alfred Nam · Wistkey CTO · 倫敦 ⇄ 香港",
    rolePre: "我是 ",
    roleLink: "Wistkey",
    rolePost:
      " 的 CTO——我們為企業與政府打造真正上線的 AI 系統：私有化部署的 LLM、多 Agent 系統，以及能把它們交付出去的工程團隊。十年交付經驗，橫跨英國與香港，做過的平台如今服務數以百萬計的使用者。",
    writing:
      "我現在大部分的工作，是協助企業在整個組織導入 AI——不只是技術部門。我在這裡寫真正行得通的東西：AI、科技、IT、商業、理財，以及那個讓一切得以持續的清晨四點 Ashtanga 練習。",
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
