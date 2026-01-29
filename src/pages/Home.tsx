import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Technology from '@/components/Technology';
import LogoChain from '@/components/LogoChain';
import { useLanguage } from '@/hooks/useLanguage';

export default function Home() {
  const { setLanguage, language } = useLanguage();
  
   // 确保主页默认使用英文
  useEffect(() => {
    setLanguage('en');
    // 设置页面标题，确保与SEO配置一致
    document.title = "SLS 3D Printing Service | Nylon PA12 & PA11 | 3-Day Turnaround";
  }, [setLanguage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <Hero />
        
        <Services />
        <section id="materials">
          <Technology />
        </section>
        
        {/* 添加链接到案例页面 */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === 'en' ? 'Featured Cases' : '精选案例'}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
              {language === 'en' ? 'Explore our successful projects and applications' : '探索我们的成功项目和应用案例'}
            </p>
            <Link 
              to="/cases" 
              className="inline-flex items-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors shadow-md"
            >
              <i className="fa-solid fa-arrow-right mr-2"></i>
              {language === 'en' ? 'View All Cases' : '查看所有案例'}
            </Link>
          </div>
        </section>
        
        {/* Logo Chain Component */}
        <LogoChain />
      </main>
     </div>
  );
}