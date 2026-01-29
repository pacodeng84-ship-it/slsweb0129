import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  getAllContactForms, 
  deleteContactForm, 
  clearAllContactForms,
  ContactFormData
} from '@/lib/contactApi';
import Header from '@/components/Header';

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactManagement() {
  const { language, t } = useLanguage();
  const [contactForms, setContactForms] = useState<ContactFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ContactFormData>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedForm, setSelectedForm] = useState<ContactFormData | null>(null);

  // 加载表单数据
  const loadContactForms = () => {
    setIsLoading(true);
    try {
      const data = getAllContactForms();
      setContactForms(data);
    } catch (error) {
      console.error('Error loading contact forms:', error);
      toast.error(language === 'zh' ? '加载表单数据失败' : 'Failed to load contact forms');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载和监听数据变化
  useEffect(() => {
    loadContactForms();
    
    // 监听存储变化
    const handleStorageChange = () => {
      loadContactForms();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 过滤和排序数据
  const filteredAndSortedForms = contactForms
    .filter(form => 
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.message?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'timestamp') {
        return sortOrder === 'desc' 
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      
      const valueA = a[sortField]?.toString().toLowerCase() || '';
      const valueB = b[sortField]?.toString().toLowerCase() || '';
      
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // 删除单个表单
  const handleDeleteForm = (id: string) => {
    if (window.confirm(language === 'zh' ? '确定要删除这条表单数据吗？' : 'Are you sure you want to delete this form data?')) {
      try {
        const success = deleteContactForm(id);
        if (success) {
          loadContactForms();
          toast.success(language === 'zh' ? '表单数据已删除' : 'Form data deleted');
        } else {
          toast.error(language === 'zh' ? '删除失败' : 'Delete failed');
        }
      } catch (error) {
        console.error('Error deleting contact form:', error);
        toast.error(language === 'zh' ? '删除失败' : 'Delete failed');
      }
    }
  };

  // 清除所有表单
  const handleClearAll = () => {
    if (window.confirm(language === 'zh' ? '确定要清除所有表单数据吗？此操作不可恢复！' : 'Are you sure you want to clear all form data? This action cannot be undone!')) {
      try {
        const success = clearAllContactForms();
        if (success) {
          loadContactForms();
          toast.success(language === 'zh' ? '所有表单数据已清除' : 'All form data cleared');
        } else {
          toast.error(language === 'zh' ? '清除失败' : 'Clear failed');
        }
      } catch (error) {
        console.error('Error clearing all contact forms:', error);
        toast.error(language === 'zh' ? '清除失败' : 'Clear failed');
      }
    }
  };

  // 导出为CSV
  const exportToCSV = () => {
    if (contactForms.length === 0) {
      toast.info(language === 'zh' ? '没有数据可导出' : 'No data to export');
      return;
    }

    // CSV头部
    const headers = [
      'ID',
      'Name',
      'Email',
      'Company',
      'Phone',
      'Message',
      'Project Type',
      'Country',
      'Industry',
      'Timestamp'
    ];
    
    // CSV内容
    const csvContent = [
      headers.join(','),
      ...contactForms.map(form => [
        form.id,
        `"${form.name || ''}"`,
        `"${form.email || ''}"`,
        `"${form.company || ''}"`,
        `"${form.phone || ''}"`,
        `"${form.message || ''}"`,
        `"${form.projectType || ''}"`,
        `"${form.country || ''}"`,
        `"${form.industry || ''}"`,
        `"${form.timestamp}"`
      ].join(','))
    ].join('\n');
    
    // 创建下载链接
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_forms_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(language === 'zh' ? '数据已导出为CSV' : 'Data exported to CSV');
  };

  // 切换排序
  const toggleSort = (field: keyof ContactFormData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US');
    } catch {
      return dateString;
    }
  };

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
                {language === 'zh' ? '联系表单管理' : 'Contact Form Management'}
              </h1>
              <p className="text-xl text-gray-300">
                {language === 'zh' ? '查看和管理所有提交的联系表单数据' : 'View and manage all submitted contact form data'}
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="w-full md:w-1/3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={language === 'zh' ? '搜索表单数据...' : 'Search form data...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                      <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={exportToCSV}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors shadow-sm flex items-center justify-center"
                    >
                      <i className="fa-solid fa-file-csv mr-2"></i>
                      {language === 'zh' ? '导出CSV' : 'Export CSV'}
                    </button>
                    
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors shadow-sm flex items-center justify-center"
                    >
                      <i className="fa-solid fa-trash-can mr-2"></i>
                      {language === 'zh' ? '清除全部' : 'Clear All'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {language === 'zh' 
                    ? `共 ${contactForms.length} 条表单数据` 
                    : `Total ${contactForms.length} form submissions`}
                </div>
              </div>
              
              {/* Data Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300">{language === 'zh' ? '加载中...' : 'Loading...'}</p>
                    </div>
                  </div>
                ) : filteredAndSortedForms.length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <i className="fa-solid fa-inbox text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                      <p className="text-gray-600 dark:text-gray-300">{language === 'zh' ? '暂无表单数据' : 'No form data available'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => toggleSort('timestamp')}
                          >
                            <div className="flex items-center">
                              {language === 'zh' ? '提交时间' : 'Timestamp'}
                              <i className={`fa-solid ml-1 ${sortField === 'timestamp' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}></i>
                            </div>
                          </th>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => toggleSort('name')}
                          >
                            <div className="flex items-center">
                              {language === 'zh' ? '姓名' : 'Name'}
                              <i className={`fa-solid ml-1 ${sortField === 'name' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}></i>
                            </div>
                          </th>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => toggleSort('email')}
                          >
                            <div className="flex items-center">
                              {language === 'zh' ? '邮箱' : 'Email'}
                              <i className={`fa-solid ml-1 ${sortField === 'email' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}></i>
                            </div>
                          </th>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {language === 'zh' ? '公司' : 'Company'}
                          </th>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {language === 'zh' ? '电话' : 'Phone'}
                          </th>
                          <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {language === 'zh' ? '操作' : 'Actions'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredAndSortedForms.map((form) => (
                          <tr 
                            key={form.id} 
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedForm(form)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {formatDate(form.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {form.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              <a href={`mailto:${form.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                {form.email}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {form.company || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {form.phone || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteForm(form.id);
                                }}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Pagination (simplified) */}
              {filteredAndSortedForms.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'zh' 
                      ? `显示 ${Math.min(filteredAndSortedForms.length, 20)} / ${filteredAndSortedForms.length} 条` 
                      : `Showing ${Math.min(filteredAndSortedForms.length, 20)} / ${filteredAndSortedForms.length} entries`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Form Detail Modal */}
        {selectedForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedForm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'zh' ? '表单详情' : 'Form Details'}
                  </h2>
                  <button 
                    onClick={() => setSelectedForm(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <i className="fa-solid fa-times text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'zh' ? '提交时间' : 'Submitted at'}
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {formatDate(selectedForm.timestamp)}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'zh' ? '姓名' : 'Name'}
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {selectedForm.name}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'zh' ? '邮箱' : 'Email'}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      <a href={`mailto:${selectedForm.email}`} className="hover:underline">
                        {selectedForm.email}
                      </a>
                    </div>
                  </div>
                  
                  {selectedForm.company && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '公司' : 'Company'}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {selectedForm.company}
                      </div>
                    </div>
                  )}
                  
                  {selectedForm.phone && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '电话' : 'Phone'}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        <a href={`tel:${selectedForm.phone}`} className="hover:underline">
                          {selectedForm.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedForm.projectType && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '项目类型' : 'Project Type'}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {selectedForm.projectType}
                      </div>
                    </div>
                  )}
                  
                  {selectedForm.country && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '国家' : 'Country'}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {selectedForm.country}
                      </div>
                    </div>
                  )}
                  
                  {selectedForm.industry && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '行业' : 'Industry'}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {selectedForm.industry}
                      </div>
                    </div>
                  )}
                  
                  {selectedForm.message && (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'zh' ? '留言内容' : 'Message'}
                      </div>
                      <div className="text-gray-900 dark:text-white whitespace-pre-line">
                        {selectedForm.message}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedForm(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium rounded-md transition-colors"
                  >
                    {language === 'zh' ? '关闭' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}