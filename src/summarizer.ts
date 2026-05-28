import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn('⚠️  ANTHROPIC_API_KEY not set. Summaries will use original descriptions.');
}

const client = apiKey ? new Anthropic({ apiKey }) : null;

export async function generateSummary(title: string, description: string): Promise<string> {
  if (!client || !description) {
    return description || '';
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `请用一句话（不超过50个字）总结这篇文章的核心内容。

标题：${title}

摘要：${description}

只返回总结内容，不要其他说明。`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text.trim();
    }
    return description;
  } catch (error) {
    console.warn(`⚠️  Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return description;
  }
}

export async function summarizeArticles(articles: any[]): Promise<any[]> {
  if (!client) {
    console.log('⏭️  Skipping AI summarization (ANTHROPIC_API_KEY not set)\n');
    return articles;
  }

  console.log('🤖 Generating AI summaries...');

  const summarized = await Promise.all(
    articles.map(async (article) => {
      if (article.description) {
        article.description = await generateSummary(article.title, article.description);
      }
      return article;
    })
  );

  console.log('✓ Summarization completed\n');
  return summarized;
}
