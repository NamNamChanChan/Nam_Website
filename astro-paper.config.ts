import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://nam-ai.uk/",
    title: "Nam Chan",
    description:
      "Nam Chan (aka Alfred Nam) — CTO at Wistkey. Writing on tech, IT, AI, business, finance & yoga.",
    author: "Nam Chan",
    profile: "https://nam-ai.uk/about/",
    lang: "en",
    timezone: "Asia/Hong_Kong",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  // Icons live in src/assets/icons/socials/<name>.svg.
  // A "#" url marks a profile as pending: it is hidden from the header/footer
  // social row and shown as "coming soon" on the /links page.
  socials: [
    { name: "github", url: "https://github.com/NamNamChanChan", linkTitle: "Nam Chan on GitHub" },
    { name: "linkedin", url: "https://www.linkedin.com/in/nam-chan/", linkTitle: "Nam Chan on LinkedIn" },
    { name: "x", url: "https://x.com/namchan_hk", linkTitle: "Nam Chan on X (Twitter)" },
    { name: "instagram", url: "https://www.instagram.com/nam.traveling/", linkTitle: "Nam Chan on Instagram" },
    { name: "threads", url: "https://www.threads.com/@nam.traveling", linkTitle: "Nam Chan on Threads" },
    { name: "facebook", url: "#", linkTitle: "Nam Chan on Facebook" }, // TODO(nam): add profile URL
    { name: "youtube", url: "#", linkTitle: "Nam Chan on YouTube" }, // TODO(nam): add channel URL
    { name: "mail", url: "mailto:nam@wistkey.com", linkTitle: "Email Nam Chan" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
