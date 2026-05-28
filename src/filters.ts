import { subHours } from 'date-fns';
import { Article } from './types.js';

export function filterLast24Hours(articles: Article[]): Article[] {
  const now = new Date();
  const twentyFourHoursAgo = subHours(now, 24);

  return articles.filter(article => article.pubDate >= twentyFourHoursAgo);
}

export function deduplicateArticles(articles: Article[]): Article[] {
  const seen = new Set<string>();
  const deduplicated: Article[] = [];

  for (const article of articles) {
    if (!seen.has(article.link)) {
      seen.add(article.link);
      deduplicated.push(article);
    }
  }

  return deduplicated;
}

export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export function getUniqueSources(articles: Article[]): Set<string> {
  return new Set(articles.map(a => a.source));
}
