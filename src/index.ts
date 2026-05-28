import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';
import { FeedSource } from './types.js';
import { fetchAllFeeds } from './fetchers.js';
import { filterLast24Hours, deduplicateArticles, sortByDateDesc, getUniqueSources } from './filters.js';
import { generateMarkdown } from './markdown.js';
import { translateArticles } from './translator.js';
import { summarizeArticles } from './summarizer.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const FEED_SOURCES: FeedSource[] = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    type: 'rss',
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    type: 'rss',
  },
  {
    name: 'Hacker News',
    url: 'https://hnrss.org/newest?q=AI&count=30',
    type: 'hn',
  },
];

async function main() {
  try {
    console.log('🚀 Starting AI news aggregation...\n');

    console.log('📡 Fetching feeds...');
    const allArticles = await fetchAllFeeds(FEED_SOURCES);
    console.log(`✓ Fetched ${allArticles.length} articles\n`);

    console.log('🔍 Processing articles...');
    const filtered = filterLast24Hours(allArticles);
    console.log(`✓ Filtered to ${filtered.length} articles from last 24 hours`);

    const deduplicated = deduplicateArticles(filtered);
    console.log(`✓ Deduplicated to ${deduplicated.length} unique articles`);

    const sorted = sortByDateDesc(deduplicated);
    const sources = getUniqueSources(sorted);
    console.log(`✓ Found articles from ${sources.size} sources\n`);

    const summarized = await summarizeArticles(sorted);
    const translated = await translateArticles(summarized);

    console.log('📝 Generating markdown...');
    const markdown = generateMarkdown(translated, sources.size);

    const outputDir = join(__dirname, '..', 'output');
    await mkdir(outputDir, { recursive: true });

    const dateStr = format(new Date(), 'yyyy-MM-dd');
    const outputPath = join(outputDir, `ai-news-${dateStr}.md`);
    await writeFile(outputPath, markdown, 'utf-8');

    console.log(`✓ Report saved to: ${outputPath}\n`);
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
