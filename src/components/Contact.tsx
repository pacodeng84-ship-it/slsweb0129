import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';
import { saveContactForm } from '@/lib/contactApi';
// [重要更改 1] 使用标准静态导入，不要用 await import
import emailjs from '@emailjs/browser';

// --- 辅助组件保持不变 ---
function ContactInfo({ icon, title, content, link }: any) {
  const Content = link ? (
    <a href={link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">{content}</a>
  ) : (<span>{content}</span>);
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">{icon}</div>
      <div><h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4><p className="text-gray-600 dark:text-gray-300 mt-1">{Content}</p></div>
    </div>
  );
}

function SocialLink({ href, icon }: any) {
  return (<a href={href} className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-500 dark:hover:bg-orange-900/30 transition-colors">{icon}</a>);
}

function FormInput({ label, name, type = "text", value, onChange, placeholder, required = false }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"/>
    </div>
  );
}

// --- 主组件 ---
export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', message: '', projectType: 'prototype'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  // EmailJS 配置 (硬编码在这里是最稳的)
  const SERVICE_ID = 'service_skk9v64';
  const TEMPLATE_ID = 'template_89x5gwl';
  const PUBLIC_KEY = 'OHf3G4nRBB361tYT7'; 

  const formPlaceholders = language === 'en' 
    ? { name: "Please enter your name", company: "Please enter your company name", email: "Please enter your email address", phone: "Please enter your phone number", message: "Please describe your requirements..." }
    : { name: "请输入您的姓名", company: "请输入您的公司名称", email: "请输入您的电子邮箱", phone: "请输入您的联系电话", message: "请详细描述您的需求..." };
  
  const projectTypeOptions = [
    { value: 'prototype', label: language === 'en' ? t('form_project_type_1') : '产品样板' },
    { value: 'handboard', label: language === 'en' ? t('form_project_type_2') : '工程手板' },
    { value: 'smallBatch', label: language === 'en' ? t('form_project_type_3') : '小批量生产' },
    { value: 'other', label: language === 'en' ? t('form_project_type_4') : '其他服务' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. 保留原本的本地存储逻辑
      saveContactForm(formData);
      
      // 2. [重要更改 2] 使用 .send() 方法发送，确保参数名与模板变量 {{name}} 一一对应
      console.log('正在通过 EmailJS 发送...');
      
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,       // 确保模板里写的是 {{from_name}}
          from_email: formData.email,     // 确保模板里写的是 {{from_email}}
          company: formData.company,      // 确保模板里写的是 {{company}}
          phone: formData.phone,          // 确保模板里写的是 {{phone}}
          project_type: formData.projectType, // 确保模板里写的是 {{project_type}}
          message: formData.message       // 确保模板里写的是 {{message}}
        },
        PUBLIC_KEY
      );

      console.log('发送结果:', result.text);
      
      if (result.status === 200) {
        toast.success(language === 'en' ? 'Submitted successfully!' : '提交成功！我们会尽快联系您。');
        setFormData({ name: '', company: '', email: '', phone: '', message: '', projectType: 'prototype' });
      }

    } catch (error: any) {
      console.error('EmailJS Error:', error);
      // 这里的 error.text 通常会告诉你是因为 whitelist 还是 key 错误
      toast.error(language === 'en' 
        ? `Submission failed: ${error.text || 'Network Error'}` 
        : `提交失败: ${error.text || '网络错误，请检查控制台'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact_title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t('contact_subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧信息栏 */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contact_info_title')}</h3>
            <div className="space-y-6">
              <ContactInfo icon={<i className="fa-solid fa-map-marker-alt text-orange-500"></i>} title={t('address')} content={t('address_value')} />
              <ContactInfo icon={<i className="fa-solid fa-envelope text-orange-500"></i>} title={t('email')} content={t('email_value')} link="mailto:sales@sls-3d.com" />
              <ContactInfo icon={<i className="fa-solid fa-phone text-orange-500"></i>} title={t('phone')} content={t('phone_value')} link="tel:+862158886666" />
              <ContactInfo icon={<i className="fa-solid fa-clock text-orange-500"></i>} title={t('working_hours')} content={t('working_hours_value')} />
            </div>
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{t('follow_us')}</h4>
              <div className="flex space-x-4">
                <SocialLink href="#" icon={<i className="fa-brands fa-weixin"></i>} />
                <SocialLink href="#" icon={<i className="fa-brands fa-weibo"></i>} />
              </div>
            </div>
          </div>
          
          {/* 右侧表单 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('send_request_title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('form_name')} name="name" value={formData.name} onChange={handleChange} placeholder={formPlaceholders.name} required />
                <FormInput label={t('form_company')} name="company" value={formData.company} onChange={handleChange} placeholder={formPlaceholders.company} required />
                <FormInput label={t('form_email')} name="email" type="email" value={formData.email} onChange={handleChange} placeholder={formPlaceholders.email} required />
                <FormInput label={t('form_phone')} name="phone" value={formData.phone} onChange={handleChange} placeholder={formPlaceholders.phone} required />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form_project_type')}</label>
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  {projectTypeOptions.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form_message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder={formPlaceholders.message} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" required></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}>
                {isSubmitting ? (<span><i className="fa-solid fa-spinner fa-spin mr-2"></i>{t('form_submitting')}</span>) : (<span><i className="fa-solid fa-paper-plane mr-2"></i>{t('form_submit')}</span>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}