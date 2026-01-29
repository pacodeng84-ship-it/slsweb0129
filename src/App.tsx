import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { LanguageProvider } from '@/contexts/languageContext';
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

// 导入页面组件
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import SLSTechnology from "@/pages/SLSTechnology";
import Materials from "@/pages/Materials";
import Cases from "@/pages/Cases";
import Quote from "@/pages/Quote";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/components/NotFound";
import CookiePolicy from "@/pages/CookiePolicy";
import ContactManagement from "@/pages/ContactManagement";

// 加载占位组件
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  // 打开联系表单模态框
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // 关闭联系表单模态框
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // 添加路由初始化检查，确保在任何环境下都能正确处理路由
  React.useEffect(() => {
    // 在应用加载时确保路由状态正确
    const currentPath = window.location.pathname;
    
    // 可以在这里添加一些特定的路由处理逻辑
    console.log(`Current route: ${currentPath}`);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, openContactModal }}
    >
      <LanguageProvider>
      <div className={theme}>
        <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
        <Routes>
          {/* 使用Suspense包裹每个路由组件，并提供加载占位符 */}
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/services" 
            element={<Services />} 
          />
          <Route 
            path="/technology" 
            element={<SLSTechnology />} 
          />
          <Route 
            path="/materials" 
            element={<Materials />} 
          />
          <Route 
            path="/cases" 
            element={<Cases />} 
          />

          {/* 隐私政策、服务条款和Cookie政策页面 */}
          <Route 
            path="/privacy" 
            element={<PrivacyPolicy />} 
          />
          <Route 
            path="/terms" 
            element={<TermsOfService />} 
          />
              <Route 
                path="/cookies" 
                element={<CookiePolicy />} 
              />
              
              {/* 联系表单管理页面 */}
              <Route 
                path="/contact-management" 
                element={<ContactManagement />} 
              />
          
           {/* 通配符路由，处理所有未匹配的路径，显示404页面 */}
           <Route 
             path="*" 
             element={<NotFound />} 
           />
        </Routes>
        <Footer />
      </div>
      </LanguageProvider>
    </AuthContext.Provider>
  );
}
