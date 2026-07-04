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
      en: "Helping businesses put AI to work: private on-prem LLM deployments, agentic workflow automation, and on-demand engineering teams that ship. Delivery across the UK and Hong Kong.",
      zh: "協助企業把 AI 真正用起來：私有化部署 LLM、Agentic 工作流程自動化，以及能落地交付的工程團隊。服務覆蓋英國與香港。",
    },
  },
  {
    name: "NamLoop",
    url: "https://namloop.chankwunnam0304.workers.dev/",
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
