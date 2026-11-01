# Medium Export Guide for Blog Agents

This guide explains how to turn an English Markdown blog post into a Medium-ready export folder.
It is based on the `new-blog-post` workflow and its reusable `to_medium.py` exporter.

The export contains:

- one formatted HTML file for copying into Medium;
- every article image as a separate numbered file;
- ready-to-use `Photo N - ...` captions; and
- a `README.txt` containing the five suggested Medium topics.

Medium does not reliably retain local images when an article is pasted, so the text and formatting
are copied first and the numbered image files are dragged into the Medium editor afterwards.

## 1. Locate the exporter

In the `Backlink Analysis` workspace, the exporter is located at:

```text
.agents/skills/new-blog-post/scripts/to_medium.py
```

The script is portable: the source post and export directory can belong to another blog project.
Run it from the `Backlink Analysis` workspace root, or replace the exporter path with its absolute
path if working from another directory.

Requirements:

- Python 3;
- read access to the Markdown post and its local images; and
- optional: Pillow, which creates image previews inside the local HTML file. The export still works
  without Pillow.

## 2. Prepare the source post

Use the English Markdown version of the article. The exporter expects ordinary Markdown with
single-line `title` and `description` values in YAML frontmatter:

```yaml
---
title: "A clear article title"
description: "A concise subtitle for Medium."
---
```

Before exporting, check the following:

- The post is final enough to review on Medium.
- Every image is stored locally; remote image URLs are not supported by this exporter.
- Every image uses normal Markdown syntax rather than an MDX or HTML component.
- The cover image appears in the article body. An `ogImage` value in frontmatter alone is not
  exported.
- Each image has useful alt text and, preferably, an italic caption on the next non-empty line.

Recommended image format:

```markdown
![A workflow moving from research to writing and review](../../../assets/images/example-workflow.png)

*A measurable workflow gives the next iteration evidence to learn from.*
```

The italic line becomes the description in `Photo N - <description>`. If no italic caption exists,
the exporter uses the image alt text instead.

The exporter handles headings, paragraphs, inline links, bold and italic text, code blocks,
blockquotes, callouts, unordered lists, simple Markdown tables and local Markdown images. Inspect
the result carefully when the source contains ordered or nested lists, footnotes, raw HTML, MDX
components or unusually complex frontmatter.

## 3. Choose five Medium topics

Read the complete article and select exactly five distinct topics that a Medium reader might follow
or search for. Topics should describe the article, not merely repeat the blog's internal tags.

Good topic choices are:

- specific enough to match the subject;
- recognisable to the intended audience;
- different from one another; and
- written consistently, without duplicate capitalisation variants.

For example, an SME deployment article could use:

```text
Kimi K3
Open Source AI
Small Business AI
Private AI
AI Infrastructure
```

The exporter rejects a command unless it receives exactly five non-empty, unique `--topic` values.

## 4. Run the export

From the `Backlink Analysis` workspace root, run:

```bash
python3 .agents/skills/new-blog-post/scripts/to_medium.py \
  "<BLOG_PROJECT>/path/to/english-post.md" \
  "<BLOG_PROJECT>/medium-exports" --next \
  --topic "<Medium topic 1>" \
  --topic "<Medium topic 2>" \
  --topic "<Medium topic 3>" \
  --topic "<Medium topic 4>" \
  --topic "<Medium topic 5>"
```

Example for Project 14:

```bash
python3 .agents/skills/new-blog-post/scripts/to_medium.py \
  "14_Personal_Website/src/content/posts/en/kimi-k3-for-smes-pilot-now-host-later.md" \
  "14_Personal_Website/medium-exports" --next \
  --topic "Kimi K3" \
  --topic "Open Source AI" \
  --topic "Small Business AI" \
  --topic "Private AI" \
  --topic "AI Infrastructure"
```

Always prefer `--next`. It finds the highest existing four-digit export code and creates the next
folder in publish order:

```text
medium-exports/0024-example-article/
```

Do not reuse an existing export folder unless intentionally regenerating it. The script can replace
its HTML and README while leaving unrelated stale files in that folder.

## 5. Verify the generated folder

A successful export should look like this:

```text
medium-exports/0024-example-article/
├── example-article.html
├── 1-example-cover.png
├── 2-example-workflow.png
├── 3-example-results.png
└── README.txt
```

Check all of the following before opening Medium:

1. The terminal reports the expected number of photos.
2. The HTML file and `README.txt` exist.
3. Every image from the article has a matching numbered file.
4. The files follow the same order as the images in the article.
5. The HTML does not display `[image not found: ...]`.
6. `README.txt` contains the correct topics and maps every numbered file to its caption.

Useful read-only checks are:

```bash
find "<EXPORT_FOLDER>" -maxdepth 1 -type f -print | sort
rg -n "image not found|Photo [0-9]+" "<EXPORT_FOLDER>/<SLUG>.html"
sed -n '1,220p' "<EXPORT_FOLDER>/README.txt"
```

If `rg` is not installed, open the HTML and README files and perform the same checks manually.

## 6. Preview the export locally

Open the generated HTML in Chrome and reveal its folder in Finder:

```bash
open -a "Google Chrome" "<ABSOLUTE_EXPORT_FOLDER>/<SLUG>.html"
open "<ABSOLUTE_EXPORT_FOLDER>"
```

Review the complete HTML page, not only its first screen. Confirm that:

- the title and subtitle are correct;
- headings, links, emphasis, quotes and code blocks look sensible;
- simple tables appear as readable monospaced text;
- all expected `Photo N - ...` captions are present; and
- no Markdown symbols or missing-image warnings remain unexpectedly.

The image thumbnails in this local page are previews only. Medium may remove them during paste;
that is expected.

## 7. Paste the article into Medium

1. In Chrome, open `<SLUG>.html`.
2. Press **Cmd+A**, then **Cmd+C**.
3. Create a new story in Medium.
4. Press **Cmd+V** in the Medium editor.
5. Review the pasted title, subtitle and article formatting.
6. Find each `Photo N - ...` caption in order.
7. Drag the corresponding numbered file from the export folder into the article immediately above
   that caption.
8. Keep the `Photo N - ...` line as the image caption unless editorial changes are required.
9. Repeat until every numbered image has been inserted exactly once.
10. Add the five topics listed in `README.txt` before publishing.

On Windows or Linux, use the platform's equivalent select-all, copy and paste shortcuts.

## 8. Perform the final Medium review

Before publishing or sending the story for approval, confirm:

- [ ] The title and subtitle are correct.
- [ ] No table of contents was pasted.
- [ ] All headings use the intended hierarchy.
- [ ] Links open the correct destinations.
- [ ] Code blocks retain line breaks and indentation.
- [ ] Quotes and callouts remain readable.
- [ ] Every image appears once, in the correct location.
- [ ] Every image has a meaningful caption.
- [ ] No `Photo N` caption is missing or duplicated.
- [ ] No local instructions or missing-image messages appear in the story.
- [ ] Exactly five relevant Medium topics are selected.
- [ ] The story's preview image and excerpt look appropriate.

Do not delete the export folder until the Medium story has been checked. It is the reproducible
handover package for the article.

## 9. Alternative after the original article is published

When the article is already live on its original website, Medium's **Import a story** flow can be
easier: give Medium the published article URL so it can pull in the text and images. Review the
imported result just as carefully. Keep the generated export folder as a fallback if the import
misses formatting or media.

## Troubleshooting

### The exporter reports fewer images than expected

- Confirm each image uses `![alt text](relative/path.png)` on its own line.
- Confirm the file exists relative to the Markdown file.
- Download remote images into the blog repository before exporting.
- Replace MDX or HTML image components with standard Markdown for the export source.

### The HTML shows a caption but no thumbnail

Pillow may not be available. This does not prevent copying the article or exporting the numbered
image. Inspect the numbered image file directly. Install Pillow only if the project permits adding
that local dependency.

### A table looks different from the website

The exporter intentionally changes simple Markdown tables into aligned text inside a code block,
because this format survives Medium's paste process more reliably. Check alignment after pasting.

### Formatting is missing or malformed

Look for ordered lists, nested lists, footnotes, raw HTML, MDX components or multiline frontmatter.
Simplify those sections in a temporary export copy, or extend and test the exporter before relying
on the output.

### The next export code is wrong

`--next` reads four-digit prefixes from existing directories under the chosen `medium-exports`
folder. Confirm that the command points to the correct blog project's export directory.

## Agent handover prompt

A colleague can give an agent this instruction together with the article path:

> Read `MEDIUM_EXPORT_GUIDE.md` completely. Export the supplied English Markdown post with
> `to_medium.py`, choose five distinct article-specific Medium topics, use `--next`, verify every
> numbered image and caption, open the HTML in Chrome, reveal the export folder, and report the
> exact folder path and any formatting limitation. Do not publish the Medium story without explicit
> approval.

