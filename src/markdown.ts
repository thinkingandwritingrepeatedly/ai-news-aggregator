import { format } from 'date-fns';
import { Article } from './types.js';

export function generateMarkdown(articles: Article[], sourceCount: number): string {
  const now = new Date();
  const dateStr = format(now, 'yyyy-MM-dd');
  const totalCount = articles.length;

  let markdown = `# AI新闻日报 - ${dateStr}\n\n`;

  markdown += `## 📊 统计\n`;
  markdown += `- 总文章数：${totalCount}篇\n`;
  markdown += `- 信息源：${sourceCount}个\n\n`;

  markdown += `## 📰 文章列表\n\n`;

  articles.forEach((article, index) => {
    const timeStr = format(article.pubDate, 'yyyy-MM-dd HH:mm');
    markdown += `### ${index + 1}. [${article.title}](${article.link})\n`;
    markdown += `- 来源：${article.source}\n`;
    markdown += `- 时间：${timeStr} UTC\n`;

    // 如果有摘要，显示摘要
    if (article.description) {
      markdown += `- 摘要：${article.description}\n`;
    }

    // 如果有元数据（Hacker News 的点数和评论数）
    if (article.metadata) {
      if (article.metadata.points !== undefined) {
        markdown += `- 👍 ${article.metadata.points} 点`;
      }
      if (article.metadata.comments !== undefined) {
        markdown += ` | 💬 ${article.metadata.comments} 条评论`;
      }
      if (article.metadata.points !== undefined || article.metadata.comments !== undefined) {
        markdown += '\n';
      }
    }

    markdown += '\n';
  });

  return markdown;
}
