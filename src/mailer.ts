import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';

// 邮件配置（126 邮箱）
const EMAIL_CONFIG = {
  service: '126',
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || '', // 你的 126 邮箱
    pass: process.env.EMAIL_PASSWORD || '', // 126 邮箱授权码
  },
};

const RECIPIENT_EMAIL = 'timyhao@126.com';

export async function sendEmailReport(reportPath: string, articleCount: number, sourceCount: number): Promise<boolean> {
  // 检查邮件配置
  if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
    console.warn('⚠️  Email credentials not set. Skipping email notification.');
    console.warn('   Set EMAIL_USER and EMAIL_PASSWORD environment variables to enable email.');
    return false;
  }

  try {
    console.log('📧 Sending email report...');

    // 读取报告文件
    const reportContent = await readFile(reportPath, 'utf-8');

    // 创建邮件传输
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // 准备邮件内容
    const today = new Date().toLocaleDateString('zh-CN');
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: RECIPIENT_EMAIL,
      subject: `🤖 AI 新闻日报 - ${today}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🤖 AI 新闻日报
          </h1>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>📅 日期：</strong>${today}</p>
            <p style="margin: 5px 0;"><strong>📊 统计：</strong>${articleCount} 篇文章，${sourceCount} 个信息源</p>
            <p style="margin: 5px 0;"><strong>⏰ 生成时间：</strong>${new Date().toLocaleTimeString('zh-CN')}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #007bff; margin-top: 0;">📰 文章列表</h2>
            <p style="color: #666; font-size: 14px;">详细内容请查看附件或访问本地文件。</p>
          </div>

          <div style="background-color: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <p style="margin: 0; color: #004085;">
              💡 <strong>提示：</strong>完整的日报已保存到本地文件，包含所有文章的详细摘要。
            </p>
          </div>

          <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>这是一封自动生成的邮件，请勿回复。</p>
            <p>AI News Aggregator - Automated Daily Report</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `ai-news-${today.replace(/\//g, '-')}.md`,
          path: reportPath,
        },
      ],
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully!`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: ${RECIPIENT_EMAIL}`);

    return true;
  } catch (error) {
    console.error(`❌ Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

export async function testEmailConnection(): Promise<boolean> {
  if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
    console.error('❌ Email credentials not set!');
    console.error('   Set EMAIL_USER and EMAIL_PASSWORD environment variables.');
    return false;
  }

  try {
    console.log('🔍 Testing email connection...');
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    await transporter.verify();
    console.log('✅ Email connection successful!');
    return true;
  } catch (error) {
    console.error(`❌ Email connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}
