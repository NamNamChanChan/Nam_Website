import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    games: "Games",
    about: "About",
    archives: "Archives",
    search: "Search",
    projects: "Projects",
    links: "Links",
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share this post on {{platform}}",
    sharePostViaEmail: "Share this post via email",
    shareButton: "Share",
    shareDialogTitle: "Share this post",
    shareDialogDescription: "Choose how you’d like to share it.",
    shareClose: "Close share dialog",
    shareCopyLink: "Copy link",
    shareLinkCopied: "Link copied to your clipboard.",
    shareCopyError: "Couldn’t copy automatically. Please copy the page URL.",
    shareInstagram: "Instagram Story",
    shareInstagramDescription: "Create a portrait Story image",
    shareLinkedIn: "LinkedIn",
    shareLinkedInDescription: "Share the summary and post link",
    shareLinkedInReady:
      "Summary and link copied — paste them into your LinkedIn post.",
    shareStoryGenerating: "Creating your Story image…",
    shareStoryReady: "Your 1080 × 1920 Story image is ready.",
    shareStoryError: "Couldn’t create the Story image. Please try again.",
    shareStoryTitle: "Instagram Story preview",
    shareStoryInstructions:
      "Share the image and choose Instagram, or download it and add it to your Story manually.",
    shareStoryImage: "Share Story image",
    shareStoryShared: "Story image shared.",
    shareStoryDownloaded: "Story image downloaded.",
    shareDownloadImage: "Download image",
    shareStoryPreviewAlt:
      "Portrait preview of this blog post for Instagram Story",
    shareBack: "Back to sharing options",
    tagLabel: "Tags",
    backToTop: "Back to top",
    goBack: "Go back",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    socialLinks: "Social Links",
    featured: "Featured",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
  },
  hero: {
    title: "Hi, I'm Nam 👋",
    tagline: "Nam Chan · aka Alfred Nam · CTO at Wistkey · London ⇄ Hong Kong",
    rolePre: "I'm the CTO of ",
    roleLink: "Wistkey",
    rolePost:
      " — we engineer production AI for enterprise and government: private on-premises LLMs, multi-agent systems, and the engineering teams that ship them. Ten years of delivery across the UK and Hong Kong, on platforms now used by millions.",
    writing:
      "Most of my work now is helping companies adopt AI across the whole organisation — not just the tech department. I write here about what actually works: AI, tech, IT, business, finance, and the 4am Ashtanga practice that keeps it all sustainable.",
    ctaProjects: "See my projects",
    ctaAbout: "More about me",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  langSwitch: {
    toggle: "中",
    toggleTitle: "切換至中文版",
  },
  links: {
    socialsHeading: "Social",
    sitesHeading: "Sites",
    subscribeHeading: "Subscribe",
    comingSoon: "coming soon",
    email: "Email",
    rss: "RSS feed",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",

    tagsTitle: "Tags",
    tagsDesc: "All the tags used in posts.",

    postsTitle: "Posts",
    postsDesc: "All the articles I've posted.",

    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",

    searchTitle: "Search",
    searchDesc: "Search any article ...",

    projectsTitle: "Projects",
    projectsDesc: "Side projects and things I've built.",
    projectsMore:
      "There are plenty more — client work, older builds and half-finished experiments. I'll add them here as soon as I get a free weekend.",

    linksTitle: "Links",
    linksDesc: "All my profiles and sites in one place.",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    searchPlaceholder: "Search posts...",
    noResults: "No results found",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;
