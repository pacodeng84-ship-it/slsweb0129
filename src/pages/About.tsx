import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
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

// 统计数据项组件
interface StatItemProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, icon }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center"
    >
      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <div className="text-orange-500 text-lg">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{number}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
    </motion.div>
  );
};

// 业务区域项组件
interface BusinessAreaProps {
  region: string;
  countries: string[];
  icon: React.ReactNode;
}

const BusinessArea: React.FC<BusinessAreaProps> = ({ region, countries, icon }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-2">
          <div className="text-blue-500 text-sm">{icon}</div>
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{region}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-xs">
        {countries.join(', ')}
      </p>
    </motion.div>
  );
};

export default function About() {
   const { openContactModal } = useContext(AuthContext);
  const { t, language } = useLanguage();
  
  // 设置页面标题和元描述，确保与SEO配置一致
  useEffect(() => {
    document.title = "About Us | Your Dedicated SLS Additive Manufacturing Partner";
    
    // 添加页面元描述，强调工厂直营
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = language === 'en' 
        ? 'Learn about our specialized SLS 3D printing facility in China. We combine industrial-grade printers with strict quality control to serve global engineering clients with precision and speed. Factory direct pricing available.' 
        : '了解我们在中国的专业SLS 3D打印工厂。我们结合工业级打印机和严格的质量控制，为全球工程客户提供精确、快速的服务。工厂直营价格优势明显。';
    }
  }, [language]);
  
  // 统计数据
  const stats = [
    {
      number: "30+",
      label: language === 'zh' ? "SLS 3D打印设备" : "SLS 3D Printers",
      icon: <i className="fa-solid fa-industry"></i>
    },
    {
      number: "20+",
      label: language === 'zh' ? "高分子粉末材料" : "Polymer Powder Materials",
      icon: <i className="fa-solid fa-flask-vial"></i>
    },
    {
      number: "90+",
      label: language === 'zh' ? "国家级专利" : "National Patents",
      icon: <i className="fa-solid fa-lightbulb"></i>
    }
  ];
  
  // 业务区域数据
  const businessAreas = [
    {
      region: language === 'zh' ? "欧洲" : "Europe",
      countries: language === 'zh' 
        ? ["德国", "英国", "法国", "意大利", "西班牙"] 
        : ["Germany", "United Kingdom", "France", "Italy", "Spain"],
      icon: <i className="fa-solid fa-landmark"></i>
    },
    {
      region: language === 'zh' ? "北美" : "North America",
      countries: language === 'zh' 
        ? ["美国", "加拿大"] 
        : ["United States", "Canada"],
      icon: <i className="fa-solid fa-map-pin"></i>
    },
    {
      region: language === 'zh' ? "亚太" : "Asia Pacific",
      countries: language === 'zh' 
        ? ["中国", "日本", "韩国", "澳大利亚", "印度"] 
        : ["China", "Japan", "Korea", "Australia", "India"],
      icon: <i className="fa-solid fa-globe-asia"></i>
    },
    {
      region: language === 'zh' ? "中东与南美" : "Middle East & South America",
      countries: language === 'zh' 
        ? ["阿联酋", "沙特阿拉伯", "巴西", "阿根廷"] 
        : ["UAE", "Saudi Arabia", "Brazil", "Argentina"],
      icon: <i className="fa-solid fa-plane"></i>
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
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {language === 'zh' ? '关于我们' : 'About Us'}
              </h1>
              <p className="text-lg text-gray-300">
                {language === 'zh' 
                  ? '自1999年，深耕SLS 3D打印技术' 
                  : 'Since 1999, specializing in SLS 3D printing technology'}
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Company Introduction */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'zh' ? '公司简介' : 'Company Profile'}
                </h2>
                 <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {language === 'zh' 
                    ? '上海TPM三维打印科技有限公司技术团队成立于1999年，是一家专注于选择性激光烧结(SLS)技术研发与应用的3D打印企业，是国内较早进入该领域的专业技术公司。' 
                    : 'The technical team of Shanghai TPM 3D Printing Technology Co., Ltd. was established in 1999. We are a 3D printing enterprise specializing in the research, development and application of Selective Laser Sintering (SLS) technology, and one of the earliest professional technology companies entering this field in China.'}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language === 'zh' 
                    ? '公司现已发展成为集设备、材料研发、生产、销售于一体的行业领先企业，推出了S、P 两大系列工业级SLS 3D 打印系统及二十余种专用材料，拥有90多项国家专利及软著证书，服务涵盖医疗、汽车、消费电子、教育文创及航空航天等领域。' 
                    : 'We have developed into an industry-leading enterprise integrating equipment, material research and development, production, and sales. We have launched two series of industrial-grade SLS 3D printing systems (S and P series) and more than 20 kinds of special materials. With over 90 national patents and software copyright certificates, our services cover medical, automotive, consumer electronics, education, cultural and creative industries, and aerospace fields.'}
                </p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                 <img 
                   src="https://www.tpm3d.com/wp-content/uploads/2025/08/TPM3D-team.webp" 
                   alt={language === 'zh' ? '公司简介' : 'Company Profile'} 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Technology and Product Strength */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {language === 'zh' ? '产品与技术实力' : 'Product and Technical Strength'}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                {language === 'zh' 
                  ? '专业性能，专注创新' 
                  : 'Professional Performance, Focus on Innovation'}
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
                >
                  {stats.map((stat, index) => (
                    <StatItem 
                      key={index}
                      number={stat.number}
                    label={stat.label}
                    icon={stat.icon}
                  />
                ))}
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="order-2 md:order-1"
                >
                   <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {language === 'zh' 
                      ? 'TPM已开发S、P 两大系列SLS系统及20余种高性能高分子粉末材料，各项解决方案在稳定性、打印效率与可扩展性方面持续优化。' 
                      : 'TPM has developed two series of SLS systems (S and P) and more than 20 kinds of high-performance polymer powder materials. Our solutions are continuously optimized in terms of stability, printing efficiency and scalability.'}
                  </p>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {language === 'zh' 
                      ? 'TPM三维在设备设计与材料开发领域持续增加研发投入。通过结构紧凑、性能强劲的设备平台，我们的技术实现了无支撑打印、全过程温度控制、自动化粉末输送及清洁后处理等核心功能。' 
                      : 'TPM 3D continuously increases R&D investment in equipment design and material development. Through compact and powerful equipment platforms, our technology has achieved core functions such as support-free printing, full-process temperature control, automatic powder delivery, and clean post-processing.'}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    src="https://www.tpm3d.com/wp-content/uploads/2025/08/TPM3D-factory-e1756264035273.webp" 
                    alt={language === 'zh' ? '技术设备' : 'Technical Equipment'} 
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Global Business Layout */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {language === 'zh' ? '全球业务布局' : 'Global Business Layout'}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                {language === 'zh' 
                  ? '技术扎根中国，服务覆盖全球' 
                  : 'Rooted in China, Serving the World'}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 text-center"
            >
                     <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      {language === 'zh' 
                        ? 'TPM三维总部位于中国，与经过认证的经销商及合作伙伴建立稳定合作，业务范围覆盖欧洲、北美、澳洲、中东、印度及南美等重要市场。随着全球业务网络的持续完善，我们致力于为世界各地企业更充分地发掘增材制造技术的应用价值提供助力。' 
                        : 'TPM 3D is headquartered in China and has established stable cooperation with certified dealers and partners. Our business scope covers important markets such as Europe, North America, Australia, the Middle East, India and South America. With the continuous improvement of our global business network, we are committed to helping companies around the world fully explore the application value of additive manufacturing technology.'}
                    </p>
            </motion.div>
            
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
              >
                {businessAreas.map((area, index) => (
                  <BusinessArea 
                    key={index}
                    region={area.region}
                  countries={area.countries}
                  icon={area.icon}
                />
              ))}
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-12 text-center"
            >
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Global%20business%20network%2C%20world%20map%20with%20connections%2C%20international%20partnerships%2C%20global%20logistics&sign=0143621d8e7f814110e30455d052c6ec" 
                alt={language === 'zh' ? '全球业务网络' : 'Global Business Network'} 
                className="w-full max-w-4xl mx-auto h-auto rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
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
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'zh' ? '携手共进，共创未来' : 'Join Hands for a Better Future'}
              </h2>
                     <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                      {language === 'zh' 
                        ? 'TPM三维期待与您建立长期稳定的合作关系，共同探索增材制造技术的无限可能，为您的业务创造更多价值。' 
                        : 'TPM 3D looks forward to establishing a long-term and stable cooperative relationship with you, jointly exploring the unlimited possibilities of additive manufacturing technology, and creating more value for your business.'}
                    </p>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {language === 'zh' ? '联系我们' : 'Contact Us'}
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'zh' ? '姓名 *' : 'Name *'}
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder={language === 'zh' ? '请输入您的姓名' : 'Please enter your name'}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'zh' ? '电子邮箱 *' : 'Email *'}
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder={language === 'zh' ? '请输入您的电子邮箱' : 'Please enter your email'}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'zh' ? '公司名称' : 'Company'}
                        </label>
                        <input
                          type="text"
                          id="contact-company"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder={language === 'zh' ? '请输入公司名称' : 'Please enter company name'}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'zh' ? '联系电话' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder={language === 'zh' ? '请输入联系电话' : 'Please enter phone number'}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'zh' ? '留言内容' : 'Message'}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                        placeholder={language === 'zh' ? '请详细描述您的需求...' : 'Please describe your requirements...'}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          openContactModal();
                          // Here you could add form validation and data collection
                          toast.success(language === 'zh' ? '我们会尽快与您联系！' : 'We will contact you soon!');
                        }}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors shadow-md hover:shadow-orange-500/30"
                      >
                        <i className="fa-solid fa-paper-plane mr-2"></i>
                        {language === 'zh' ? '提交' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
            </motion.div>
          </div>
        </section>
      </main>
     </div>
   );
}