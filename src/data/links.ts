import type { LocalizedText } from "./projects";

export interface SiteLink {
  label: LocalizedText;
  url: string;
}

/** Non-social sites shown on the /links page. */
export const siteLinks: SiteLink[] = [
  {
    label: {
      en: "Wistkey — private on-prem AI & engineering teams",
      zh: "Wistkey — 私有化 AI 與工程團隊",
    },
    url: "https://wistkey.com",
  },
  {
    label: {
      en: "VitaBaby — baby health & growth tracking",
      zh: "VitaBaby — 嬰幼兒健康與成長追蹤",
    },
    url: "https://vitababy.ai",
  },
];
