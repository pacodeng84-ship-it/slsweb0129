import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 腾讯企业邮配置接口
export interface TencentEmailConfig {
  smtpServer: string;
  smtpPort: number;
  emailAccount: string;
  emailPassword?: string;
  useSSL: boolean;
  emailTemplate?: {
    subject: string;
    body: string;
  };
}

// 默认腾讯企业邮配置
export const defaultTencentEmailConfig: TencentEmailConfig = {
  smtpServer: 'smtp.exmail.qq.com',
  smtpPort: 465,
  useSSL: true,
  emailAccount: 'sales@sls-3d.com',
  emailPassword: '4BcTbjbgGVBZcJ2t',
  emailTemplate: {
    subject: 'New Contact Form Submission',
    body: 'You have received a new contact form submission.'
  }
};

// 发送邮件函数 - 在实际环境中需要配置后端API
export const sendEmailViaTencent = async (
  to: string,
  subject: string,
  body: string,
  config: TencentEmailConfig = defaultTencentEmailConfig
): Promise<{ success: boolean; message: string }> => {
  // 检查是否在生产环境
  const isProduction = import.meta.env.PROD;
  
  try {
    if (isProduction) {
      // 生产环境: 调用后端API发送邮件
      // 添加跨域处理
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 包含cookie等凭证
        body: JSON.stringify({
          to,
          subject,
          body,
          config
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } else {
      // 开发环境: 模拟邮件发送（仅打印到控制台）
      console.log(`[Tencent Email Simulation] Sending email to ${to} with subject: ${subject}`);
      console.log(`SMTP Config: ${config.smtpServer}:${config.smtpPort}, SSL: ${config.useSSL}`);
      console.log(`Email body: ${body}`);
      
      // 模拟成功响应
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: `Email successfully sent to ${to} via Tencent Enterprise Email`
          });
        }, 1000);
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    
    // 返回错误信息给前端
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};