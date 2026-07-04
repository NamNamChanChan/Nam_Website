import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
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
    tagline: "Nam Chan · aka Alfred Nam · Hong Kong ⇄ London",
    rolePre: "I'm the CTO of ",
    roleLink: "Wistkey",
    rolePost:
      ", where we help businesses put AI to work — private on-prem LLMs, agentic workflow automation, and the engineering teams to ship them.",
    writing:
      "This site is my personal corner of the web — I write about tech, IT, AI, business, finance and yoga, and gather my side projects and links in one place.",
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
