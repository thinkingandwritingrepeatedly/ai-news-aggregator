# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AI News Aggregator** - A CLI tool that aggregates AI-related news from multiple RSS feeds and generates a daily markdown report.

### Features
- Fetches articles from TechCrunch AI, The Verge AI, and Hacker News (AI tag)
- Filters articles from the last 24 hours
- Deduplicates articles by URL
- Generates a markdown daily report with article summaries
- Outputs to `output/ai-news-YYYY-MM-DD.md`

## Setup & Installation

### Prerequisites
- Node.js 18+ (with npm)

### Installation
```bash
npm install
```

## Development Commands

### Run the aggregator
```bash
npm start
# or directly with tsx:
npx tsx src/index.ts
```

### Project Structure
```
src/
├── types.ts          # TypeScript type definitions (Article, FeedSource, etc.)
├── fetchers.ts       # RSS feed fetching logic (handles RSS and Hacker News)
├── filters.ts        # Article filtering (24-hour window, deduplication, sorting)
├── markdown.ts       # Markdown report generation
└── index.ts          # Main entry point
output/               # Generated daily reports (auto-created)
```

## Architecture

### Data Flow
1. **Fetching** (`fetchers.ts`): Parallel requests to three feed sources
   - TechCrunch and The Verge use standard RSS parsing
   - Hacker News uses special handling (JSON feed with AI tag filtering)
   - Individual source failures don't block the entire process

2. **Processing** (`filters.ts`):
   - Filter articles to last 24 hours (UTC-based)
   - Deduplicate by URL (Set-based)
   - Sort by publication date (newest first)
   - Count unique sources

3. **Output** (`markdown.ts`):
   - Generate markdown with statistics header
   - Include article title, link, source, timestamp, and 100-char summary
   - Save to `output/` with date-based filename

### Key Design Decisions
- **Error Handling**: Single source failures are logged as warnings but don't crash the process
- **Deduplication**: Uses URL as unique identifier
- **Summary Extraction**: Strips HTML tags and truncates to 100 characters
- **Time Handling**: Uses UTC for 24-hour window calculation to avoid timezone issues
- **Concurrency**: Fetches all sources in parallel with `Promise.all()`

## Output Format

Example markdown structure:
```markdown
# AI新闻日报 - 2026-05-27

## 📊 统计
- 总文章数：15篇
- 信息源：3个

## 📰 文章列表

### 1. [Article Title](https://example.com)
- 来源：TechCrunch
- 时间：2026-05-27 14:30 UTC
- 摘要：First 100 characters of the article description...
```

## Dependencies

- **rss-parser**: Parses RSS/Atom feeds with automatic date handling
- **date-fns**: Date manipulation (24-hour filtering, formatting)
- **tsx**: TypeScript execution without compilation step

## Common Tasks

### Add a new feed source
Edit `src/index.ts` and add to `FEED_SOURCES` array:
```typescript
{
  name: 'Source Name',
  url: 'https://example.com/feed.xml',
  type: 'rss',
}
```

### Modify article summary length
In `src/fetchers.ts`, change the `100` in `extractSummary()` function.

### Change output directory
In `src/index.ts`, modify the `outputDir` path calculation.

## Troubleshooting

- **Feed fetch fails**: Check network connectivity and feed URL validity. The tool logs warnings for individual source failures.
- **No articles found**: Verify feeds have recent content within the last 24 hours.
- **Output file not created**: Ensure `output/` directory has write permissions.
