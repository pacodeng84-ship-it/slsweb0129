import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

// Navigation Link Component
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <RouterLink
      to={to}
      onClick={handleClick}
      className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
    >
      {children}
    </RouterLink>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const handleClick = () => {
    // 调用原始的onClick处理函数
    onClick();
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <RouterLink
      to={to}
      className={`block px-3 py-2.5 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800`}
      onClick={handleClick}
    >
      {children}
    </RouterLink>
  );
}

import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { openContactModal } = useContext(AuthContext);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center h-16">
           <div className="flex items-center">
            <RouterLink to="/" className="flex items-center">
                <img 
                  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/ScreenShot_2026-01-06_085524_381_20260106085717.png" 
                  alt="精密SLS" 
                  className="w-7 h-7 mr-2"
                />
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  {language === 'zh' ? 'TPM精密SLS' : 'TPM Precision SLS'}
                </span>
              </RouterLink>
            </div>
          
             {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
               <NavLink to="/">{language === 'zh' ? '首页' : 'Home'}</NavLink>
               <NavLink to="/cases">{language === 'zh' ? '案例' : 'Cases'}</NavLink>
               <NavLink to="/services">{language === 'zh' ? '服务' : 'Services'}</NavLink>
               <NavLink to="/technology">{language === 'zh' ? '技术' : 'Technology'}</NavLink>
               <NavLink to="/materials">{language === 'zh' ? '材料' : 'Materials'}</NavLink>
               <NavLink to="/about">{language === 'zh' ? '关于' : 'About'}</NavLink>
              <button
                onClick={openContactModal}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors shadow-sm"
              >
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </button>
            </nav>
          
           <div className="flex items-center">
              {/* Language switch */}
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="切换语言"
              >
                {language === 'zh' ? (
                  <i className="fa-solid fa-language text-gray-600"></i>
                ) : (
                  <i className="fa-solid fa-language text-gray-300"></i>
                )}
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-2"
                aria-label={language === 'zh' ? "切换主题" : "Switch theme"}
              >
                {theme === 'light' ? (
                  <i className="fa-solid fa-moon text-gray-600"></i>
                ) : (
                  <i className="fa-solid fa-sun text-yellow-400"></i>
                )}
              </button>
              
              {/* Mobile Contact Button - Always visible */}
              <button
                onClick={openContactModal}
                className="ml-3 md:hidden bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium text-sm transition-colors shadow-sm"
              >
                <i className="fa-solid fa-envelope mr-1"></i>
                {language === 'zh' ? '联系' : 'Contact'}
              </button>
            </div>
             
               {/* Mobile menu button - increased touch target size */}
               <button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="ml-3 md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                 aria-label={language === 'zh' ? "菜单" : "Menu"}
                 aria-expanded={isMenuOpen}
               >
                 <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
               </button>
           </div>
         </div>
       
       {/* Mobile Navigation */}
       <motion.div
         className={`md:hidden bg-white dark:bg-gray-900 shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
           isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
         }`}
         initial={false}
         animate={{ 
           height: isMenuOpen ? 'auto' : 0,
           opacity: isMenuOpen ? 1 : 0
         }}
       >
           <div className="px-4 pt-2 pb-3 space-y-1">
                 <MobileNavLink to="/" onClick={handleNavClick}>
                    {language === 'zh' ? '首页' : 'Home'}
                  </MobileNavLink>
                   <MobileNavLink to="/cases" onClick={handleNavClick}>
                     {language === 'zh' ? '案例' : 'Cases'}
                   </MobileNavLink>
                   <MobileNavLink to="/services" onClick={handleNavClick}>
                     {language === 'zh' ? '服务' : 'Services'}
                   </MobileNavLink>
                   <MobileNavLink to="/technology" onClick={handleNavClick}>
                     {language === 'zh' ? '技术' : 'Technology'}
                   </MobileNavLink>
                   <MobileNavLink to="/materials" onClick={handleNavClick}>
                     {language === 'zh' ? '材料' : 'Materials'}
                   </MobileNavLink>
                     <MobileNavLink to="/about" onClick={handleNavClick}>
                       {language === 'zh' ? '关于' : 'About'}
                     </MobileNavLink>
          </div>
       </motion.div>
    </header>
  );
}