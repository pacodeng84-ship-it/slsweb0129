import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// 服务卡片组件
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps & { bgImage: string }> = ({ icon, title, description, features, bgImage }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="relative p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <img 
          src={bgImage} 
          alt={`${title} background`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white/70 dark:from-gray-800 dark:to-gray-800/70 z-0"></div>
      
      {/* 卡片内容 */}
      <div className="relative z-10">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6">
          <div className="text-orange-500 text-2xl">{icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fa-solid fa-check text-green-500 mt-1 mr-3"></i>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// 3D Plus™解决方案项组件
interface PlusSolutionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PlusSolution: React.FC<PlusSolutionProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
        <div className="text-blue-500 text-xl">{icon}</div>
      </div>
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

// 服务优势项组件
interface AdvantageProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Advantage: React.FC<AdvantageProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <div className="text-orange-500 text-xl">{icon}</div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';
import ExpandableContactForm from '@/components/ExpandableContactForm';

export default function Services() {
  const { language } = useLanguage();
  const { openContactModal } = useContext(AuthContext);
  const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);
  
    // 设置页面标题，确保与SEO配置一致
    document.title = "SLS 3D Printing Services | Prototyping & Low-Volume Production";
   
   
  // 3D Plus™解决方案数据
  const plusSolutions = [
    {
      icon: <i className="fa-solid fa-tint"></i>,
      title: language === 'zh' ? 'Dyeing染色' : 'Dyeing',
      description: language === 'zh' 
        ? '提供多种颜色的精准染色服务，使打印件呈现丰富的色彩效果' 
        : 'Provide precise dyeing services in multiple colors to achieve rich color effects for printed parts'
    },
    {
      icon: <i className="fa-solid fa-print"></i>,
      title: language === 'zh' ? 'Screen Printing丝网印刷' : 'Screen Printing',
      description: language === 'zh' 
        ? '高精度丝网印刷技术，为打印件添加精细的图案和标识' 
        : 'High-precision screen printing technology to add fine patterns and logos to printed parts'
    },
    {
      icon: <i className="fa-solid fa-spray-can"></i>,
      title: language === 'zh' ? 'Spray Painting喷漆' : 'Spray Painting',
      description: language === 'zh' 
        ? '专业的喷漆服务，提供均匀的表面涂层和多种颜色选择' 
        : 'Professional spray painting services providing uniform surface coating and multiple color options'
    },
    {
      icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
      title: language === 'zh' ? 'Tapping攻丝' : 'Tapping',
      description: language === 'zh' 
        ? '精确的攻丝服务，为打印件添加内螺纹，提升功能性' 
        : 'Precise tapping services to add internal threads to printed parts and enhance functionality'
    },
    {
      icon: <i className="fa-solid fa-cog"></i>,
      title: language === 'zh' ? 'Threading螺纹' : 'Threading',
      description: language === 'zh' 
        ? '提供外螺纹加工服务，满足各种连接需求' 
        : 'Provide external thread processing services to meet various connection needs'
    },
    {
      icon: <i className="fa-solid fa-mist"></i>,
      title: language === 'zh' ? 'Vapor Smoothing气相平滑' : 'Vapor Smoothing',
      description: language === 'zh' 
        ? '通过气相平滑技术，显著改善表面光洁度，增强防水性能' 
        : 'Significantly improve surface finish and enhance waterproof performance through vapor smoothing technology'
    },
    {
      icon: <i className="fa-solid fa-wave-square"></i>,
      title: language === 'zh' ? 'Vibratory Smoothing振动平滑' : 'Vibratory Smoothing',
      description: language === 'zh' 
        ? '通过振动平滑处理，去除表面粗糙度，提高触感质量' 
        : 'Remove surface roughness and improve tactile quality through vibratory smoothing'
    }
  ];

  // 服务卡片数据
  const serviceCards = [
    {
      icon: <i className="fa-solid fa-industry"></i>,
      title: language === 'zh' ? 'SLS打印零件的3D Plus™解决方案' : '3D Plus™ Solution for SLS Printed Parts',
      description: language === 'zh' 
        ? '我们提供完整的SLS打印解决方案，从设计优化到后处理精加工，满足您的各种专业需求。' 
        : 'We provide complete SLS printing solutions, from design optimization to post-processing and finishing, to meet your various professional needs.',
      features: language === 'zh' 
        ? [
            '高精度SLS尼龙打印技术',
            '多种后处理工艺选项',
            '专业的设计优化建议',
            '严格的质量控制标准'
          ]
        : [
            'High-precision SLS nylon printing technology',
            'Multiple post-processing options',
            'Professional design optimization suggestions',
            'Strict quality control standards'
          ]
    },
    {
      icon: <i className="fa-solid fa-pencil-ruler"></i>,
      title: language === 'zh' ? '模型订制设计方案' : 'Custom Model Design Solutions',
      description: language === 'zh' 
        ? '我们的专业设计团队可以根据您的需求，提供从概念设计到最终模型的完整服务。' 
        : 'Our professional design team can provide complete services from concept design to final model according to your needs.',
      features: language === 'zh' 
        ? [
            '专业CAD设计服务',
            '产品结构优化分析',
            '3D打印可行性评估',
            '定制化设计方案'
          ]
        : [
            'Professional CAD design services',
            'Product structure optimization analysis',
            '3D printing feasibility evaluation',
            'Customized design solutions'
          ]
    }
  ];

  // 服务优势数据
  const advantages = [
    {
      icon: <i className="fa-solid fa-ruler-combined"></i>,
      title: language === 'zh' ? '高精度品质' : 'High Precision Quality',
      description: language === 'zh' 
        ? '采用先进的SLS技术，确保打印件具有±0.1mm的高精度，满足严格的工程要求。' 
        : 'Using advanced SLS technology to ensure printed parts have high precision of ±0.1mm, meeting strict engineering requirements.'
    },
    {
      icon: <i className="fa-solid fa-bolt"></i>,
      title: language === 'zh' ? '快速交付' : 'Fast Delivery',
      description: language === 'zh' 
        ? '标准件24小时内交付，急件可提供12小时加急服务，加速您的产品开发周期。' 
        : 'Standard parts delivered within 24 hours, express service available for urgent orders within 12 hours, accelerating your product development cycle.'
    },
    {
      icon: <i className="fa-solid fa-users"></i>,
      title: language === 'zh' ? '专业团队' : 'Professional Team',
      description: language === 'zh' 
        ? '由经验丰富的工程师和设计师组成的团队，为您提供专业的技术支持和建议。' 
        : 'A team of experienced engineers and designers providing you with professional technical support and advice.'
    },
    {
      icon: <i className="fa-solid fa-handshake"></i>,
      title: language === 'zh' ? '定制服务' : 'Customized Services',
      description: language === 'zh' 
        ? '根据客户需求提供个性化解决方案，满足不同行业的特殊需求。' 
        : 'Provide personalized solutions according to customer needs to meet the special requirements of different industries.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {language === 'zh' ? '专业3D打印服务' : 'Professional 3D Printing Services'}
              </h1>
              <p className="text-xl text-gray-300">
                {language === 'zh' 
                  ? '为您提供全方位的SLS打印解决方案和模型设计服务' 
                  : 'Providing comprehensive SLS printing solutions and model design services for you'}
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-16"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'zh' ? '我们的服务' : 'Our Services'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {language === 'zh' 
                    ? '专注于Nylon PA12 3D打印、TPA柔性零件和Glass-filled Nylon printing服务，为制造业客户提供高质量的解决方案' 
                    : 'Specialized in Nylon PA12 3D printing, TPA flexible parts, and Glass-filled Nylon printing services for manufacturing clients'}
                </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
               {/* 3D Plus™ 解决方案服务卡片 - 使用SLS打印场景图 */}
               <ServiceCard 
                 key="service-1"
                 icon={serviceCards[0].icon}
                 title={serviceCards[0].title}
                 description={serviceCards[0].description}
                 features={serviceCards[0].features}
                 bgImage="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=SLS%203D%20printing%20workshop%2C%20industrial%203D%20printer%20working%2C%20nylon%20powder%20printing%2C%20factory%20environment%2C%20professional%20manufacturing&sign=5833332c036a0d9418805808830a4eda"
               />
               
               {/* 模型订制设计方案服务卡片 - 使用CAD设计场景图 */}
               <ServiceCard 
                 key="service-2"
                 icon={serviceCards[1].icon}
                 title={serviceCards[1].title}
                 description={serviceCards[1].description}
                 features={serviceCards[1].features}
                 bgImage="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Engineer%20working%20on%20CAD%20software%2C%203D%20model%20design%2C%20design%20studio%2C%20professional%20workspace&sign=000c1dc167029c7055d93db2be568ed3"
               />
            </motion.div>
          </div>
        </section>
        
        {/* 3D Plus™ Solutions */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'zh' ? '3D Plus™ 解决方案' : '3D Plus™ Solutions'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'zh' 
                  ? '我们提供多种后处理技术，进一步提升3D打印零件的性能和外观质量' 
                  : 'We provide a variety of post-processing technologies to further enhance the performance and appearance quality of 3D printed parts'}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {plusSolutions.map((solution, index) => (
                <PlusSolution 
                  key={index}
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                />
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Service Advantages */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'zh' ? '服务优势' : 'Service Advantages'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'zh' 
                  ? '选择我们的3D打印服务，享受专业品质和全方位支持' 
                  : 'Choose our 3D printing services to enjoy professional quality and comprehensive support'}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
              {advantages.map((advantage, index) => (
                <Advantage 
                  key={index}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                />
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'zh' ? '服务流程' : 'Service Process'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'zh' 
                  ? '简单高效的服务流程，从咨询到交付全程无忧' 
                  : 'Simple and efficient service process, worry-free from consultation to delivery'}
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto relative">
              {/* Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* Step 1 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-orange-500 text-xl font-bold">1</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {language === 'zh' ? '需求咨询' : 'Requirement Consultation'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'zh' 
                      ? '提供您的需求，我们的技术专家将为您提供专业建议' 
                      : 'Provide your requirements, our technical experts will provide professional advice'}
                  </p>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-orange-500 text-xl font-bold">2</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {language === 'zh' ? '设计确认' : 'Design Confirmation'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'zh' 
                      ? '审核3D模型，确认打印参数和后处理需求' 
                      : 'Review 3D models, confirm printing parameters and post-processing requirements'}
                  </p>
                </motion.div>
                
                {/* Step 3 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-orange-500 text-xl font-bold">3</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {language === 'zh' ? '生产制造' : 'Production Manufacturing'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'zh' 
                      ? '按照计划进行SLS打印和后处理加工' 
                      : 'Carry out SLS printing and post-processing according to the plan'}
                  </p>
                </motion.div>
                
                {/* Step 4 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-orange-500 text-xl font-bold">4</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {language === 'zh' ? '质检交付' : 'Quality Inspection & Delivery'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'zh' 
                      ? '严格质量检测，确保产品符合要求后交付' 
                      : 'Strict quality inspection to ensure products meet requirements before delivery'}
                  </p>
                </motion.div>
              </div>
              
              {/* Connecting Line */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-gray-200 dark:bg-gray-700 hidden md:block">
                <div className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {language === 'zh' ? '立即开启您的3D打印项目' : 'Start Your 3D Printing Project Now'}
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '联系我们的技术专家，获取专业的3D打印解决方案和定制服务' 
                  : 'Contact our technical experts to get professional 3D printing solutions and customized services'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">

                 <button 
                   onClick={() => setIsContactFormExpanded(!isContactFormExpanded)} 
                   className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md text-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
                 >
                   <i className="fa-solid fa-envelope mr-2"></i>
                   {language === 'zh' ? '联系我们' : 'Contact Us'}
                 </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expandable Contact Form */}
        <ExpandableContactForm 
          isExpanded={isContactFormExpanded} 
          onToggle={() => setIsContactFormExpanded(!isContactFormExpanded)} 
        />
      </main>
     </div>
  );
}