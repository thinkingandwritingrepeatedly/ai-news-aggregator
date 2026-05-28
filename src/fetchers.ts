import Parser from 'rss-parser';
import { Article, FeedSource } from './types.js';

const parser = new Parser();

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function extractSummary(description: string | undefined): string {
  if (!description) return '';

  const cleaned = stripHtml(description);

  // 过滤掉纯 URL 或只包含 URL 的内容
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return '';
  }

  // 移除开头的 "Article URL:" 或 "Comments URL:" 等标记
  let text = cleaned
    .replace(/^Article URL:?\s*/i, '')
    .replace(/^Comments URL:?\s*/i, '')
    .replace(/^https?:\/\/[^\s]+\s*/i, '')
    .trim();

  // 如果还是 URL，返回空
  if (text.startsWith('http://') || text.startsWith('https://')) {
    return '';
  }

  // 截取前 100 个字符
  return text.length > 100 ? text.substring(0, 100) + '...' : text;
}

async function fetchRssFeed(url: string, source: string): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
      source,
      description: extractSummary(item.content || item.description),
    }));
  } catch (error) {
    console.warn(`⚠️  Failed to fetch ${source}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
}

async function fetchHackerNews(): Promise<Article[]> {
  try {
    const response = await fetch('https://hnrss.org/newest?q=AI&count=30');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();

    const parser = new Parser();
    const feed = await parser.parseString(text);

    return (feed.items || []).map(item => {
      // 从 description 中提取点数和评论数
      const description = item.description || '';
      const pointsMatch = description.match(/Points:\s*(\d+)/);
      const commentsMatch = description.match(/Comments:\s*(\d+)/);

      return {
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: 'Hacker News',
        description: '',
        metadata: {
          points: pointsMatch ? parseInt(pointsMatch[1]) : 0,
          comments: commentsMatch ? parseInt(commentsMatch[1]) : 0,
        },
      };
    });
  } catch (error) {
    console.warn(`⚠️  Failed to fetch Hacker News: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
}

export async function fetchAllFeeds(sources: FeedSource[]): Promise<Article[]> {
  const promises = sources.map(source => {
    if (source.type === 'hn') {
      return fetchHackerNews();
    }
    return fetchRssFeed(source.url, source.name);
  });

  const results = await Promise.all(promises);
  return results.flat();
}
