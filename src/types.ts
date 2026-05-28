export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  source: string;
  description: string;
  metadata?: {
    points?: number;
    comments?: number;
  };
}

export interface FeedSource {
  name: string;
  url: string;
  type: 'rss' | 'hn';
}

export interface AggregationResult {
  articles: Article[];
  sourceCount: number;
  generatedAt: Date;
}
