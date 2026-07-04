import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { stripBase, stripLocale } from "./withBase";

/**
 * Locales supported by the site. Must stay in sync with `i18n.locales`
 * in astro.config.ts and the dictionaries in src/i18n/lang/.
 */
export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export function otherLocale(locale: string): Locale {
  return locale === "zh" ? "en" : "zh";
}

/**
 * A post's language is derived from its folder inside src/content/posts:
 * `zh/foo.md` → "zh", everything else → "en". Translation pairs share the
 * same filename across the en/ and zh/ folders (and therefore the same slug).
 */
export function getPostLang(post: CollectionEntry<"posts">): Locale {
  return post.id === "zh" || post.id.startsWith("zh/") ? "zh" : "en";
}

export function filterByLang(
  posts: CollectionEntry<"posts">[],
  locale: string = "en"
): CollectionEntry<"posts">[] {
  return posts.filter(post => getPostLang(post) === locale);
}

/** Id of the same-slug post in the other locale's folder. */
export function counterpartId(post: CollectionEntry<"posts">): string {
  return getPostLang(post) === "zh"
    ? post.id.replace(/^zh\//, "en/")
    : post.id.replace(/^en\//, "zh/");
}

/**
 * Naive locale swap of the current pathname: `/posts/foo` ⇄ `/zh/posts/foo`.
 * Only safe for routes that exist in both locales; dynamic pages should
 * compute a real alternate (or a section-index fallback) themselves.
 */
export function swapLocalePath(pathname: string, targetLocale: string): string {
  let path = stripBase(pathname);
  for (const locale of LOCALES) {
    path = stripLocale(path, locale);
  }
  return getRelativeLocaleUrl(targetLocale, path.replace(/^\/+/, ""));
}
