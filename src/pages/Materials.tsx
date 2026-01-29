import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { saveContactForm } from '@/lib/contactApi';
import emailjs from '@emailjs/browser';

export default function Materials() {
  const { language } = useLanguage();
  
  // 根据语言切换显示内容
  const isEnglish = language === 'en';
  
  // 表单状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 设置页面标题，确保与SEO配置一致
  useEffect(() => {
    document.title = "SLS Materials | Nylon PA12, PA11 & Glass-Filled (PA12GB)";
  }, []);
   
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">
                {isEnglish ? 'Materials Selection' : '材料选择'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {isEnglish ? 'Nylon PA12, TPA Flexible & Glass-filled Materials' : '尼龙PA12、TPA柔性与玻纤增强材料'}
              </h2>
              <p className="text-slate-500 max-w-3xl mx-auto">
                {isEnglish 
                  ? 'High-quality Nylon PA12 3D printing materials, TPA flexible parts, and Glass-filled Nylon printing solutions for industrial applications' 
                  : '高品质尼龙PA12 3D打印材料、TPA柔性零件和玻纤增强尼龙打印解决方案，满足工业应用需求'}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i className="fa-solid fa-cube text-orange-500 mr-2"></i> 
                {isEnglish ? 'Standard Nylon' : '通用工程尼龙'} 
                <span className="ml-2 text-sm font-normal text-slate-500">
                  {isEnglish ? '(General Engineering)' : '(Standard Nylon)'}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">PA12</h4>
                      <span className="text-xs text-slate-500">
                        {isEnglish ? 'General-purpose Nylon (Polyamide 12)' : '通用型尼龙 (Polyamide 12)'}
                      </span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                      {isEnglish ? 'Most Popular' : '最热门'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mb-3 min-h-[40px]">
                    {isEnglish 
                      ? 'The most balanced material. With excellent toughness, detail expression and long-term stability. Very low water absorption.' 
                      : '性能最均衡的材料。具有优异的韧性、细节表现力和长期稳定性。吸水率极低。'}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500">
                        {isEnglish ? 'Heat Deflection Temperature' : '热变形温度'}
                      </span>
                      <span className="font-bold">175°C</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500">
                        {isEnglish ? 'Tensile Modulus' : '拉伸模量'}
                      </span>
                      <span className="font-bold">1700 MPa</span>
                    </div>

                    <div className="mt-3 text-slate-700 text-xs">
                      <span className="font-bold text-orange-500">
                        {isEnglish ? 'Applications: ' : '应用：'}
                      </span> 
                      {isEnglish 
                        ? 'Functional prototypes, enclosures, snaps, drone shells' 
                        : '功能手板、外壳、卡扣、无人机外壳'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">PA11</h4>
                      <span className="text-xs text-slate-500">
                        {isEnglish ? 'High-toughness Nylon (Polyamide 11)' : '高韧性尼龙 (Polyamide 11)'}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      {isEnglish ? 'High Impact' : '高抗冲'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mb-3 min-h-[40px]">
                    {isEnglish 
                      ? 'Bio-based material derived from castor oil. More ductile and impact resistant than PA12, not easily broken.' 
                      : '源自蓖麻油的生物基材料。比 PA12 更具延展性和抗冲击性，不易断裂。'}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500">
                        {isEnglish ? 'Elongation at Break' : '断裂伸长率'}
                      </span>
                      <span className="font-bold">45% (High Ductility)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500">
                        {isEnglish ? 'Impact Strength' : '抗冲击强度'}
                      </span>
                      <span className="font-bold">
                        {isEnglish ? 'Extremely High' : '极高'}
                      </span>
                    </div>

                    <div className="mt-3 text-slate-700 text-xs">
                      <span className="font-bold text-orange-500">
                        {isEnglish ? 'Applications: ' : '应用：'}
                      </span> 
             {isEnglish 
                        ? 'Sports equipment, automotive interior parts, loose-leaf' 
                        : '运动器材、汽车内饰件、活页'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i className="fa-solid fa-fire text-orange-500 mr-2"></i> 
                {isEnglish ? 'High Performance' : '高性能/特种工程塑料'} 
                <span className="ml-2 text-sm font-normal text-slate-500">
                  {isEnglish ? '(Special Engineering Plastics)' : '(High Performance)'}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default">
                  <h4 className="text-lg font-bold text-slate-900">PA6</h4>
                  <span className="text-xs text-slate-500 block mb-3">
                    {isEnglish ? 'High Strength Nylon' : '高强度尼龙'}
                  </span>
                  <p className="text-slate-600 text-xs mb-3 min-h-[40px]">
                    {isEnglish 
                      ? 'Harder, stronger, and better heat resistance than PA12. Similar performance to injection-molded ABS/PA6.' 
                      : '比 PA12 更硬、更强、耐热性更好。类似注塑 ABS/PA6 的性能。'}
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Strength' : '强度'}
                      </span> 
                      <strong>85 MPa</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Heat Resistance' : '耐热'}
                      </span> 
                      <strong>200°C</strong>
                    </div>

                    <div className="mt-2 text-slate-800 font-medium text-xs">
                      {isEnglish 
                        ? 'Applications: Load-bearing gears, power tool housings' 
                        : '应用：受力齿轮、电动工具外壳'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default">
                  <h4 className="text-lg font-bold text-slate-900">PPS</h4>
                  <span className="text-xs text-slate-500 block mb-3">
                    {isEnglish ? 'Polyphenylene Sulfide (Flame Retardant)' : '聚苯硫醚 (阻燃)'}
                  </span>
                  <p className="text-slate-600 text-xs mb-3 min-h-[40px]">
                    {isEnglish 
                      ? 'Excellent chemical resistance and inherent flame retardant properties. High rigidity, extremely low water absorption.' 
                      : '卓越的耐化学腐蚀性和自带阻燃特性。高刚性，吸水率极低。'}
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Flame Retardant Grade' : '阻燃级'}
                      </span> 
                      <strong>UL94 V0</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Chemical Resistance' : '耐化学'}
                      </span> 
                      <strong>
                        {isEnglish ? 'Excellent' : '极佳'}
                      </strong>
                    </div>

                    <div className="mt-2 text-slate-800 font-medium text-xs">
                      {isEnglish 
                        ? 'Applications: Electronic connectors, fuel system components' 
                        : '应用：电子连接器、燃油系统组件'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 material-card transition cursor-default shadow-lg">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-bold text-white">PEEK</h4>
                    <i className="fa-solid fa-crown text-yellow-400"></i>
                  </div>
                  <span className="text-xs text-slate-400 block mb-3">
                    {isEnglish ? 'Polyetheretherketone (Aerospace Grade)' : '聚醚醚酮 (航空级)'}
                  </span>
                  <p className="text-slate-300 text-xs mb-3 min-h-[40px]">
                    {isEnglish 
                      ? 'Material at the top of the plastic pyramid. Can replace metal with ultra-high strength and extreme heat resistance.' 
                      : '塑料金字塔塔尖材料。替代金属，具备超高强度和极端耐热性。'}
                  </p>
                  <div className="text-xs space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Continuous Service Temperature' : '连续使用温度'}
                      </span> 
                      <strong className="text-white">260°C</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {isEnglish ? 'Tensile Strength' : '拉伸强度'}
                      </span> 
                      <strong className="text-white">98 MPa</strong>
                    </div>

                    <div className="mt-2 text-white font-medium text-xs">
                      {isEnglish 
                        ? 'Applications: Aerospace components, medical implants' 
                        : '应用：航空航天部件、医疗植入物'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i className="fa-solid fa-shapes text-purple-500 mr-2"></i> 
                {isEnglish ? 'Flexible & Functional' : '弹性体与功能塑料'} 
                <span className="ml-2 text-sm font-normal text-slate-500">
                  {isEnglish ? '(Elastomers & Functional Plastics)' : '(Flexible & Functional)'}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default border-l-4 border-l-purple-500">
                  <h4 className="text-xl font-bold text-slate-900">TPU</h4>
                  <span className="text-xs text-slate-500">
                    {isEnglish ? 'Thermoplastic Polyurethane Elastomer' : '热塑性聚氨酯弹性体'}
                  </span>
                  <p className="text-slate-600 text-xs my-3">
                    {isEnglish 
                      ? 'Rubber-like elasticity. Excellent rebound performance and wear resistance, hardness can be adjusted through lattice structure.' 
                      : '具有橡胶般的弹性。极佳的回弹性能和耐磨性，通过晶格结构可调节软硬度。'}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-xs">
                        {isEnglish ? 'Hardness (Shore A)' : '硬度 (Shore A)'}
                      </span> 
                      <span className="font-bold">88A - 95A</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">
                        {isEnglish ? 'Elongation at Break' : '断裂伸长率'}
                      </span> 
                      <span className="font-bold">{'>'} 250%</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-700">
                    <span className="font-bold text-purple-600">
                      {isEnglish ? 'Applications: ' : '应用：'}
                    </span> 
                                 {isEnglish 
                        ? 'Seals, hoses, shock pads' 
                                 : '密封件、软管、防震垫'}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 material-card transition cursor-default border-l-4 border-l-teal-500">
                  <h4 className="text-xl font-bold text-slate-900">PP</h4>
                  <span className="text-xs text-slate-500">
                    {isEnglish ? 'Polypropylene' : '聚丙烯 (Polypropylene)'}
                  </span>
                  <p className="text-slate-600 text-xs my-3">
                    {isEnglish 
                      ? 'Excellent chemical resistance and air tightness. Low density (lightweight), commonly used in fluid handling.' 
                      : '极好的耐化学腐蚀性和气密性。密度低（轻量化），常用于流体处理。'}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-xs">
                        {isEnglish ? 'Chemical Resistance' : '耐化学性'}
                      </span> 
                      <span className="font-bold">
                        {isEnglish ? 'Excellent' : '优异'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">
                        {isEnglish ? 'Density' : '密度'}
                      </span> 
                      <span className="font-bold">0.9 g/cm³</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-700">
                    <span className="font-bold text-teal-600">
                      {isEnglish ? 'Applications: ' : '应用：'}
                    </span> 
                    {isEnglish 
                      ? 'Liquid containers, pipe, acid and alkali resistant components, automotive oil pots' 
                      : '液体容器、管道、耐酸碱组件、汽车油壶'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
         {/* PDF Download Section */}
         <section className="py-16 bg-gray-50 dark:bg-gray-900">
           <div className="container mx-auto px-4">
             <div className="max-w-4xl mx-auto">
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                   {isEnglish ? 'Download Material Specification PDF' : '下载材料规格PDF'}
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                   {isEnglish 
                     ? 'Please fill in your information to download our comprehensive material specification document' 
                     : '请填写您的信息以下载我们的材料规格文档'}
                 </p>
                 
                 <form 
                   className="space-y-6" 
                   onSubmit={async (e) => {
                     e.preventDefault();
                     const form = e.target as HTMLFormElement;
                     const name = form.elements.namedItem('name') as HTMLInputElement;
                     const email = form.elements.namedItem('email') as HTMLInputElement;
                     
                     if (name.value && email.value) {
                       setIsSubmitting(true);
                       
                       try {
                         // 使用与联系表单相同的方式收集数据
                         const formData = {
                           name: name.value,
                           email: email.value,
                           company: '',
                           country: '',
                           industry: '',
                           projectType: 'material_download'
                         };
                         
                         // 1. 保存表单数据到本地存储
                         saveContactForm(formData);
                         
                         // 2. 使用EmailJS发送邮件
                         // EmailJS配置
                         const SERVICE_ID = 'service_skk9v64';
                         const TEMPLATE_ID = 'template_89x5gwl';
                         const PUBLIC_KEY = 'OHf3G4nRBB361tYT7';
                         
                         const result = await emailjs.send(
                           SERVICE_ID,
                           TEMPLATE_ID,
                           {
                             from_name: formData.name,
                             from_email: formData.email,
                             company: formData.company,
                             country: formData.country,
                             industry: formData.industry,
                             project_type: formData.projectType,
                             message: 'Material specification PDF download request'
                           },
                           PUBLIC_KEY
                         );
                         
                         if (result.status === 200) {
                           toast.success(isEnglish 
                             ? 'Your information has been successfully submitted! Your download will start shortly.' 
                             : '您的信息已成功提交！下载即将开始。');
                           
                           // 打开下载链接
                           window.open('https://drive.google.com/file/d/14hkmH4rXy4V9BUAtqBXYU4XDMR2igV3O/view?usp=sharing', '_blank');
                           
                           // 重置表单
                           form.reset();
                         }
                       } catch (error: any) {
                         console.error('EmailJS Error:', error);
                         toast.error(isEnglish 
                           ? `Submission failed: ${error.text || 'Network Error'}` 
                           : `提交失败: ${error.text || '网络错误，请检查控制台'}`);
                       } finally {
                         setIsSubmitting(false);
                       }
                     }
                   }}
                 >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                         {isEnglish ? 'Name *' : '姓名 *'}
                       </label>
                       <input
                         type="text"
                         id="name"
                         name="name"
                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                         placeholder={isEnglish ? 'Please enter your name' : '请输入您的姓名'}
                         required
                       />
                     </div>
                     <div>
                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                         {isEnglish ? 'Email *' : '电子邮箱 *'}
                       </label>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                         placeholder={isEnglish ? 'Please enter your email' : '请输入您的电子邮箱'}
                         required
                       />
                     </div>
                   </div>
                   
                   <div className="flex justify-center">
                     <button
                       type="submit"
                       disabled={isSubmitting}
                       className={`px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors shadow-md hover:shadow-orange-500/30 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                     >
                       {isSubmitting ? (
                         <>
                           <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                           {isEnglish ? 'Submitting...' : '提交中...'}
                         </>
                       ) : (
                         <>
                           {isEnglish ? 'Download PDF' : '下载PDF文件'}
                         </>
                       )}
                     </button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </section>
       </main>
      </div>
   );
}