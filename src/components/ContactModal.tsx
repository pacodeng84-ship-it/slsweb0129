import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';
import { saveContactForm } from '@/lib/contactApi';
import emailjs from '@emailjs/browser';

// 定义表单验证模式
const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  country: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
});

// 定义表单数据类型
type ContactFormData = z.infer<typeof contactSchema>;

// 行业选项
const industryOptions = [
  'Automotive',
  'Aerospace',
  'Medical',
  'Consumer Products',
  'Industrial Equipment',
  'Electronics',
  'Education',
  'Other'
];

// 国家选项
const countryOptions = [
  'China',
  'United States',
  'United Kingdom',
  'Germany',
  'Japan',
  'France',
  'Italy',
  'Spain',
  'Australia',
  'Canada',
  'Other'
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  
  // 表单状态
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    country: '',
    company: '',
    industry: '',
  });
  
  // 错误状态
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormData];
        return newErrors;
      });
    }
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      // 收集错误信息
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach(issue => {
        newErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      });
      setErrors(newErrors);
      return;
    }
    
    // 提交表单
    setIsSubmitting(true);
    
    try {
      // 使用新的@emailjs/browser API发送邮件
      await emailjs.send('service_skk9v64', 'template_89x5gwl', {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        country: formData.country,
        industry: formData.industry,
      }, {
        // EmailJS用户ID
        publicKey: 'OHf3G4nRBB361tYT7',
        // 添加额外配置以提高在不同环境中的兼容性
        secure: true,
        timeout: 15000
      });
      
      console.log('Email sent successfully via EmailJS');
      
      // 同时保存表单数据到本地存储作为备份
      const saveResult = saveContactForm(formData);
      
      // 显示成功提示
      toast.success(language === 'zh' ? '您的信息已成功提交！我们将尽快与您联系。' : 'Your information has been successfully submitted! We will contact you soon.');
      
      if (saveResult) {
        // 显示数据保存确认
        toast.info(language === 'zh' ? '表单数据已成功保存' : 'Form data has been saved successfully');
      }
      
      // 关闭模态框
      onClose();
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        country: '',
        company: '',
        industry: '',
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // 即使EmailJS发送失败，也要保存表单数据到本地存储
      const saveResult = saveContactForm(formData);
      
      // 显示错误提示，同时告知用户数据已保存
      toast.error(
        language === 'zh' 
          ? '邮件发送失败，请稍后再试。表单数据已保存，您可以通过管理页面查看。' 
          : 'Email sending failed. Please try again later. Form data has been saved and can be viewed through the management page.'
      );
      
      // 显示更详细的错误信息以便调试
      if (error instanceof Error) {
        console.error('EmailJS error details:', error.message);
        // 在开发环境中显示完整错误
        if (import.meta.env.DEV) {
          console.error('Full EmailJS error:', error);
        }
      }
      
      if (saveResult) {
        // 显示数据保存确认
        toast.info(language === 'zh' ? '表单数据已成功保存' : 'Form data has been saved successfully');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 点击背景关闭模态框
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // 模态框动画变体
  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  
  // 背景动画变体
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  
  // 检查是否在开发环境
  const isDevelopment = !import.meta.env.PROD;
  
  // 在开发环境中显示EmailJS配置信息
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('EmailJS Configuration:');
      console.log('- User ID (publicKey):', 'OHf3G4nRBB361tYT7');
      console.log('- Service ID:', 'service_a0ctr3a');
      console.log('- Template ID:', 'template_89x5gwl');
      console.log('- Environment:', import.meta.env.DEV ? 'Development' : 'Production');
    }
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      onClick={handleOverlayClick}
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto"
        variants={modalVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('contact_us') || 'Contact Us'}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
          
          {/* 环境提示已移除，减少不必要的DOM元素 */}
          
           <form onSubmit={handleSubmit} className="space-y-4">
              {/* 客户名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('name') || 'Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white'
                  }`}
                  placeholder={t('enter_your_name') || 'Enter your name'}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('email') || 'Email'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white'
                  }`}
                  placeholder={t('enter_your_email') || 'Enter your email'}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* 环境提示已移除，减少不必要的DOM元素 */}
            
            {/* 国家 */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('country') || 'Country'}
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t('select_country') || 'Select country'}</option>
                {countryOptions.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            {/* 公司名字 */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('company') || 'Company'}
              </label>
              <input
                type="text"
                id="company"
                name="company"value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                placeholder={t('enter_company_name') || 'Enter company name'}
              />
            </div>
            
            {/* 行业 */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('industry') || 'Industry'}
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t('select_industry') || 'Select industry'}</option>
                {industryOptions.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {t('submitting') || 'Submitting...'}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                  {t('submit') || 'Submit'}
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}