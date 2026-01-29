import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Feature Card Component
function Feature({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-lg border border-gray-700 text-center transform transition-all duration-300 hover:-translate-y-2 hover:bg-gray-800/80 hover:border-orange-500/30">
      <div className="mb-3 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  
  return (
     <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0icmdiYSgxNjUsMjEwLDMzLDAuMDcpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnpNNDAgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnpNNDQgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnptMCA0aC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6bS00IDBoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnptMCA0aC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6bS00IDBoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnptMCA0aC0ydi0yaDJ2MnoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')] opacity-20"></div>
      
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          <span className="block">Industrial Grade SLS 3D Printing Service</span>
          <span className="text-orange-400">{t('hero_subtitle')}</span>
        </h1>
        
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 inline-flex items-center">
            <i className="fa-solid fa-certificate text-yellow-400 mr-2"></i>
            <span className="text-white text-sm md:text-base font-medium">TÜV Rheinland CE certified SLS printing systems</span>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
          We provide high-quality <strong>SLS 3D printing services</strong> for global engineers and manufacturers, specializing in rapid prototyping and functional parts production.
        </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            

          </div>
          
           {/* Key features */}
           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
             <Feature 
               icon={<i className="fa-solid fa-ruler-combined text-orange-400 text-2xl"></i>}
               title={t('feature_precision')}
               description={t('feature_precision_desc')}
             />
             
             <Feature 
               icon={<i className="fa-solid fa-bolt text-orange-400 text-2xl"></i>}
               title={t('feature_speed')}
               description={t('feature_speed_desc')}
             />
             
             <Feature 
               icon={<i className="fa-solid fa-plane text-orange-400 text-2xl"></i>}
               title={t('feature_global_delivery')}
               description={t('feature_global_delivery_desc')}
             />
             
             <Feature 
               icon={<i className="fa-solid fa-industry text-orange-400 text-2xl"></i>}
               title={t('feature_material')}
               description={t('feature_material_desc')}
             />
           </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#services" 
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs mb-1">{t('scroll_more')}</span>
          <i className="fa-solid fa-chevron-down text-sm"></i>
        </a>
      </div>
    </section>
  );
}