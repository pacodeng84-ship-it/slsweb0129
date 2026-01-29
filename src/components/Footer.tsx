import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

// 页脚联系信息组件
function FooterContact({ 
  icon, 
  content, 
  link 
}: { 
  icon: React.ReactNode; 
  content: string; 
  link?: string; 
}) {
  const Content = link ? (
    <a href={link} className="text-gray-400 hover:text-orange-400 transition-colors">
      {content}
    </a>
  ) : (
    <span className="text-gray-400">{content}</span>
  );
  
  return (
    <li className="flex items-center">
      <span className="text-orange-500 mr-3">{icon}</span>
      {Content}
    </li>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();
  
  // 检查是否在静态HTML页面中
  const useStaticHtml = window.location.pathname.includes('.html');
  
  // 为静态HTML页面创建正确的链接路径
  const getHref = (path: string) => {
    if (useStaticHtml) {
      // 对于静态HTML，我们需要使用相对路径
      if (path === '/') return 'index.html';
      if (path.startsWith('/')) return path.substring(1) + '.html';
      return path + '.html';
    }
    return path;
  };
  
  // 根据语言选择公司信息
  const companyInfo = language === 'en' 
    ? 'Professional SLS 3D nylon printing service provider, offering high-quality, fast-delivered prototypes, handboards, and small-batch parts manufacturing services.'
    : '专业的SLS 3D尼龙打印服务提供商，为制造业客户提供高质量、快速交付的样板、手板和小批量零件制作服务。';
  
  // 联系信息
  const contactInfo = {
    address: language === 'en' ? '112, Building 6, 3000 Yixian Road, Shanghai' : '上海逸仙路3000号6号楼112',
    email: 'sales@sls-3D.com',
    phone: language === 'en' ? '+86 136 0242 6997' : '021-58886666'
  };
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 扁平化布局 - 合并公司信息和联系信息 */}
        <div className="max-w-4xl mx-auto">
          {/* 公司信息 */}
          <p className="text-gray-400 mb-6 text-sm text-center">
            {companyInfo}
          </p>
          
          {/* 联系信息 - 扁平布局 */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
            <FooterContact 
              icon={<i className="fa-solid fa-map-marker-alt"></i>}
              content={contactInfo.address}
            />
            <FooterContact 
              icon={<i className="fa-solid fa-envelope"></i>}
              content={contactInfo.email}
              link={`mailto:${contactInfo.email}`}
            />
            <FooterContact 
              icon={<i className="fa-solid fa-phone"></i>}
              content={contactInfo.phone}
              link={`tel:${contactInfo.phone}`}
            />
            <FooterContact 
              icon={<i className="fa-solid fa-clock"></i>}
              content={language === 'zh' ? '周一至周五: 9:00 - 18:00' : 'Monday to Friday: 9:00 - 18:00'}
            />
          </ul>
          
          {/* 底部版权和政策链接 - 扁平布局 */}
          <div className="flex flex-col items-center justify-center text-sm text-gray-500">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <a href={getHref('/privacy')} className="hover:text-gray-300">{language === 'zh' ? '隐私政策' : 'Privacy Policy'}</a>
              <a href={getHref('/terms')} className="hover:text-gray-300">{language === 'zh' ? '服务条款' : 'Terms of Service'}</a>
              <a href={getHref('/cookies')} className="hover:text-gray-300">{language === 'zh' ? 'Cookie政策' : 'Cookie Policy'}</a>
            </div>
            <p>
              {language === 'zh' ? '&copy; 2026 精密SLS 3D打印服务. 保留所有权利.' : '&copy; 2026 Precision SLS 3D Printing Service. All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}