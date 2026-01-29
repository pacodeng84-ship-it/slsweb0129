import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function NotFound() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const isEnglish = language === 'en';
  
  // 返回首页按钮处理函数
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 主要内容 */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404图标 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-orange-100 dark:bg-orange-900/20">
              <i className="fa-solid fa-circle-exclamation text-orange-500 text-6xl"></i>
            </div>
          </motion.div>
          
          {/* 错误信息 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? '404' : '未找到页面'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {isEnglish 
                ? 'Oops! The page you are looking for does not exist.' 
                : '抱歉！您查找的页面不存在。'}
            </p>
            
            {/* 返回首页按钮 */}
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors shadow-md hover:shadow-orange-500/30"
            >
              <i className="fa-solid fa-house mr-2"></i>
              {isEnglish ? 'Go Back Home' : '返回首页'}
            </button>
          </motion.div>
          
          {/* 帮助信息 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="mt-12 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              {isEnglish 
                ? 'If you believe this is an error, please contact our support team.' 
                : '如果您认为这是一个错误，请联系我们的支持团队。'}
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}