export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  name: string;
  url?: string;
  role?: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
}

export const projects: Project[] = [
  {
    name: "Wistkey",
    url: "https://wistkey.com",
    role: { en: "CTO · day job", zh: "CTO · 正職" },
    description: {
      en: "Production AI and engineering delivery for enterprise and government. Private on-premises LLMs, multi-agent systems and workflow automation — plus the on-demand engineering teams that ship them. London HQ, delivering across the UK and Hong Kong: ten years, 120+ clients, 15+ government platforms, systems used by over 2M people.",
      zh: "為企業與政府打造真正上線的 AI 與工程交付。私有化部署 LLM、多 Agent 系統與工作流程自動化——以及能把它們交付出去的工程團隊。倫敦總部，服務覆蓋英國與香港：十年、120+ 客戶、15+ 個政府平台，系統服務超過 200 萬名使用者。",
    },
  },
  {
    name: "krystle.hk",
    url: "https://krystle.hk",
    role: { en: "Rebuilt it, in a weekend", zh: "一個週末重建" },
    description: {
      en: "My wife's professional MC portfolio, rebuilt from a heavy WordPress stack into 102 pages of dependency-free static HTML. Lighthouse SEO 85 → 100, first paint 13.8s → 1.7s, ~5 KB of JavaScript. Written up as a five-part series on this blog.",
      zh: "太太的專業司儀作品集，由臃腫的 WordPress 技術棧重建成 102 頁零相依的靜態 HTML。Lighthouse SEO 由 85 → 100、首次繪製由 13.8 秒 → 1.7 秒、僅約 5 KB JavaScript。過程寫成本站的五篇系列文章。",
    },
  },
  {
    name: "NamLoop",
    url: "https://loop.nam-ai.uk/",
    role: { en: "Side project", zh: "個人項目" },
    description: {
      en: "A tool to put any YouTube video on endless loop — whole clip or a precise A–B segment — with speed control and a queue. Plays through the official YouTube embed, and every setting is shareable by URL.",
      zh: "把任何 YouTube 影片放到無限循環的小工具——整段或精準的 A–B 片段——支援變速與播放佇列。透過官方 YouTube 嵌入播放，所有設定都能以連結分享。",
    },
  },
  {
    name: "VitaBaby",
    url: "https://vitababy.ai",
    role: { en: "Builder", zh: "開發者" },
    description: {
      en: "Baby health & growth tracking for parents, by Vitaledger. I build the web experience and the free tools around it.",
      zh: "Vitaledger 旗下的嬰幼兒健康與成長追蹤產品。網站與相關免費工具由我開發。",
    },
  },
  {
    name: "Baby Growth Percentile Calculator",
    url: "https://vitababy.ai/tools/baby-growth-percentile-calculator",
    role: { en: "Free tool", zh: "免費工具" },
    description: {
      en: "A free growth percentile calculator based on WHO child growth standards. Runs entirely in the browser — no data leaves your device — and can be embedded on other sites.",
      zh: "根據 WHO 兒童生長標準的免費百分位計算器。完全在瀏覽器本地運算——數據不會離開你的裝置——亦可嵌入其他網站。",
    },
  },
];
