import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';

// 案例数据 - 简化版本，减少初始加载时的内存占用
const caseStudies = [
  {
    id: 1,
    title: "汽车零部件原型",
    category: "汽车行业",
    description: "为某知名汽车制造商生产的发动机部件原型，用于性能测试和装配验证。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Automotive%20parts%20prototype%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=a9cf759bfab979a07daaf95dad2f68a5",
    details: {
      material: "尼龙PA12",
      quantity: "12件",
      leadTime: "48小时",
      application: "功能测试、装配验证"
    }
  },
  {
    id: 2,
    title: "医疗器械外壳",
    category: "医疗行业",
    description: "为医疗设备公司生产的精密外壳组件，具有复杂的内部结构和严格的尺寸要求。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Medical%20device%20housing%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20precision%20components%2C%20complex%20structure&sign=6bc7c47feba7a27852eabc52c7780493",
    details: {
      material: "医疗级尼龙PA12",
      quantity: "25件",
      leadTime: "72小时",
      application: "医疗设备测试、临床验证"
    }
  },
  {
    id: 3,
    title: "工业机器人夹具",
    category: "工业自动化",
    description: "为自动化生产线设计的轻量化机器人末端执行器，具有高强度和耐用性。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Industrial%20robot%20gripper%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=d0e5cf14f3657d2e2ca50994c9522b19",
    details: {
      material: "玻纤增强尼龙",
      quantity: "8件",
      leadTime: "96小时",
      application: "自动化生产线、物料搬运"
    }
  },
  {
    id: 4,
    title: "航空航天支架组件",
    category: "航空航天",
    description: "为航空设备制造商生产的轻量化支架组件，满足严格的重量和强度要求。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Aerospace%20bracket%20component%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20lightweight%2C%20high%20strength-to-weight%20ratio&sign=f6197b02f746c3e1627455a21242e72e",
    details: {
      material: "高性能尼龙PA12",
      quantity: "5件",
      leadTime: "120小时",
      application: "航空设备测试、原型验证"
    }
  }
];

export default function Cases() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(language === 'en' ? "All" : "全部");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { t } = useLanguage();
  
  // 延迟加载数据，避免初始加载时内存占用过高
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 获取英文案例数据 - 简化版本
  const getEnglishCases = () => {
    return [
      {
        id: 1,
        title: "Automotive Parts Prototype",
        category: "Automotive",
        description: "Engine component prototypes produced for a renowned automobile manufacturer.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Automotive%20parts%20prototype%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=a9cf759bfab979a07daaf95dad2f68a5",
        details: {
          material: "Nylon PA12",
          quantity: "12 pieces",
          leadTime: "48 hours",
          application: "Functional testing"
        }
      },
      {
        id: 2,
        title: "Medical Device Housing",
        category: "Medical",
        description: "Precision housing components for medical device companies.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Medical%20device%20housing%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20precision%20components%2C%20complex%20structure&sign=6bc7c47feba7a27852eabc52c7780493",
        details: {
          material: "Medical-grade Nylon PA12",
          quantity: "25 pieces",
          leadTime: "72 hours",
          application: "Medical device testing"
        }
      },
      {
        id: 3,
        title: "Industrial Robot Gripper",
        category: "Industrial Automation",
        description: "Lightweight robotic end effectors for automated production lines.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Industrial%20robot%20gripper%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=d0e5cf14f3657d2e2ca50994c9522b19",
        details: {
          material: "Glass Fiber Reinforced Nylon",
          quantity: "8 pieces",
          leadTime: "96 hours",
          application: "Material handling"
        }
      },
      {
        id: 4,
        title: "Aerospace Bracket Component",
        category: "Aerospace",
        description: "Lightweight bracket components for aerospace equipment manufacturers.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Aerospace%20bracket%20component%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20lightweight%2C%20high%20strength-to-weight%20ratio&sign=f6197b02f746c3e1627455a21242e72e",
        details: {
          material: "High-performance Nylon PA12",
          quantity: "5 pieces",
          leadTime: "120 hours",
          application: "Prototype verification"
        }
      }
    ];
  };
  
  // 根据语言选择案例数据
  const currentCases = language === 'en' ? getEnglishCases() : caseStudies;
  
  // 根据语言选择分类
  const currentCategories = language === 'en' 
    ? ["All", "Automotive", "Medical", "Industrial Automation", "Aerospace"] 
    : ["全部", "汽车行业", "医疗行业", "工业自动化", "航空航天"];
  
  // 根据选择的类别筛选案例
  const filteredCases = selectedCategory === (language === 'en' ? "All" : "全部") 
    ? currentCases 
    : currentCases.filter(caseItem => caseItem.category === selectedCategory);
  
  // 获取当前选中的案例详情
  const currentCase = selectedCase !== null 
    ? currentCases.find(caseItem => caseItem.id === selectedCase) 
    : null;
  
  // 案例详情标签
  const detailLabels = language === 'en' 
    ? { material: "Material", quantity: "Quantity", leadTime: "Lead Time", application: "Application" }
    : { material: "材料", quantity: "数量", leadTime: "交付时间", application: "应用场景" };

  // 加载状态显示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="pt-16">
          <section className="py-20 bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading cases...</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('cases_title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t('cases_subtitle')}
              </p>
            </div>
            
            {/* 案例筛选 */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {currentCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-orange-500 text-white font-medium shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
             {/* 案例展示 - 减少列数，降低渲染压力 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl cursor-pointer group"
                  onClick={() => setSelectedCase(caseItem.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {caseItem.category}
                    </div>
                  </div>
                  
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3 sm:mb-4">
                      {caseItem.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-medium text-sm">
                        {language === 'en' ? 'View Details' : '查看详情'}
                      </span>
                      <i className="fa-solid fa-arrow-right text-orange-500 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* 案例详情模态框 - 简化版 */}
            {currentCase && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedCase(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <img 
                      src={currentCase.image} 
                      alt={currentCase.title} 
                      className="w-full h-80 object-cover"
                    />
                    <button
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                      onClick={() => setSelectedCase(null)}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                        {currentCase.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {currentCase.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentCase.description}
                    </p>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-2">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.material}</p>
                          <p className="font-medium">{currentCase.details.material}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.quantity}</p>
                          <p className="font-medium">{currentCase.details.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.leadTime}</p>
                          <p className="font-medium">{currentCase.details.leadTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.application}</p>
                          <p className="font-medium">{currentCase.details.application}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setSelectedCase(null)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium rounded-md transition-colors"
                      >
                        {language === 'zh' ? '关闭' : 'Close'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}