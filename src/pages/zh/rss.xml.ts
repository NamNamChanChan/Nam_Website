import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { filterByLang } from "@/utils/locale";
import config from "@/config";

export async function GET() {
  const posts = filterByLang(await getCollection("posts"), "zh");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: `${config.site.title}（中文）`,
    description:
      "Nam Chan（又名 Alfred Nam）— Wistkey CTO。科技、IT、AI、商業、理財與瑜伽的中文文章。",
    site: config.site.url,
    customData: "<language>zh-hant</language>",
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath, "zh"),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
