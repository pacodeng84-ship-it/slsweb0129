import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

// 技术优势组件
function TechAdvantage({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex">
      <div className="mr-3 text-orange-500 flex-shrink-0">
        <i className="fa-solid fa-check-circle"></i>
      </div>
      <div>
        <span className="font-medium text-gray-900 dark:text-white">{title}:</span>{" "}
        <span className="text-gray-700 dark:text-gray-300">{description}</span>
      </div>
    </li>
  );
}

// SLS技术材料性能数据 - 中英文对照
const getMaterialData = (language: string) => {
  if (language === 'en') {
    return [
      { name: 'Tensile Strength', value: 52, unit: 'MPa' },
      { name: 'Flexural Strength', value: 75, unit: 'MPa' },
      { name: 'Impact Strength', value: 4.2, unit: 'kJ/m²' },
      { name: 'Melting Point', value: 170, unit: '°C' },
      { name: 'Density', value: 1.02, unit: 'g/cm³' }
    ];
  }
  
  return [
    { name: '抗拉强度', value: 52, unit: 'MPa' },
    { name: '弯曲强度', value: 75, unit: 'MPa' },
    { name: '冲击强度', value: 4.2, unit: 'kJ/m²' },
    { name: '熔点', value: 170, unit: '°C' },
    { name: '密度', value: 1.02, unit: 'g/cm³' }
  ];
};

// SLS技术规格参数 - 中英文对照
const getTechSpecs = (language: string) => {
  if (language === 'en') {
    return [
      {
        category: "Printing Accuracy",
        specs: [
          { name: "Dimensional Accuracy", value: "±0.1mm or ±0.005mm/mm (whichever is larger)" },
          { name: "Layer Thickness", value: "0.05mm-0.15mm" },
          { name: "Minimum Detail", value: "0.4mm" },
          { name: "Minimum Wall Thickness", value: "0.8mm" }
        ]
      },
      {
        category: "Material Properties",
        specs: [
          { name: "Material Type", value: "Nylon PA12, PA11, Glass Fiber Reinforced Nylon" },
          { name: "Colors", value: "White, Black, Gray (post-processing coloring available)" },
          { name: "Surface Finish", value: "Matte texture, post-processing polishing available" },
          { name: "Post-processing Options", value: "Grinding, Polishing, Coloring, Shot Peening, Metal Plating" }
        ]
      },
      {
        category: "Printing Capability",
        specs: [
          { name: "Maximum Build Size", value: "600mm × 600mm × 800mm" },
          { name: "File Formats", value: "STL, OBJ, 3MF" },
          { name: "Supported Software", value: "AutoCAD, SolidWorks, Catia, Pro/E, UG" },
          { name: "Design Advice", value: "Provide DFM analysis and optimization suggestions" }
        ]
      }
    ];
  }
  
  return [
    {
      category: "打印精度",
      specs: [
        { name: "尺寸精度", value: "±0.1mm 或 ±0.005mm/mm（取较大值）" },
        { name: "层厚", value: "0.05mm-0.15mm" },
        { name: "最小细节", value: "0.4mm" },
        { name: "最小壁厚", value: "0.8mm" }
      ]
    },
    {
      category: "材料特性",
      specs: [
        { name: "材料类型", value: "尼龙PA12, PA11, 玻纤增强尼龙" },
        { name: "颜色", value: "白色、黑色、灰色（可后处理上色）" },
        { name: "表面光洁度", value: "磨砂质感，可后处理抛光" },
        { name: "后处理选项", value: "打磨、抛光、染色、喷丸、金属镀覆" }
      ]
    },
    {
      category: "打印能力",
      specs: [
        { name: "最大构建尺寸", value: "600mm × 600mm × 800mm" },
        { name: "文件格式", value: "STL, OBJ, 3MF" },
        { name: "支持软件", value: "AutoCAD, SolidWorks, Catia, Pro/E, UG" },
        { name: "设计建议", value: "提供DFM分析和优化建议" }
      ]
    }
  ];
};

export default function Technology() {
  const { t, language } = useLanguage();
  const materialData = getMaterialData(language);
  const techSpecs = getTechSpecs(language);

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('tech_title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            {t('tech_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 技术说明 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('tech_principle_title')}
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                {t('tech_principle_desc')}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  <i className="fa-solid fa-lightbulb mr-2"></i>{t('tech_advantage_title')}
                </h4>
                
                <ul className="space-y-2 text-sm">
                  <TechAdvantage 
                    title={t('tech_advantage_1')} 
                    description={t('tech_advantage_1_desc')} 
                  />
                  <TechAdvantage 
                    title={t('tech_advantage_2')} 
                    description={t('tech_advantage_2_desc')} 
                  />
                  <TechAdvantage 
                    title={t('tech_advantage_3')} 
                    description={t('tech_advantage_3_desc')} 
                  />
                  <TechAdvantage 
                    title={t('tech_advantage_4')} 
                    description={t('tech_advantage_4_desc')} 
                  />
                </ul>
              </div>
            </div>
          </div>
          
          {/* 材料性能图表 */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t('material_performance_title')}
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={materialData}
                  margin={{ top: 15, right: 20, left: 15, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} ${props.payload.unit}`, props.payload.name]}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#f97316" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
             <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              {t('material_performance_note')}
            </p>
            
             {/* 材料性能细节按钮 */}
            <div className="mt-6 text-center">
               <a
                  href="/materials"
                  className="inline-flex items-center px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors shadow-md hover:shadow-orange-500/30 text-sm"
                >
                  <i className="fa-solid fa-arrow-right mr-1.5"></i>
                  {t('more_material_details')}
                </a>
            </div>
          </div>
        </div>
        
        {/* 技术规格参数表 */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('tech_specs_title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {techSpecs.map((category, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {category.category}
                </h4>
                
                <ul className="space-y-2 text-sm">
                  {category.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{spec.name}</span>
                      <span className="text-gray-800 dark:text-white font-medium">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}