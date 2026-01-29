/**
 * 联系表单API服务
 * 提供表单提交和数据管理功能
 */

// 定义表单数据类型
export interface ContactFormData {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  projectType?: string;
  country?: string;
  industry?: string;
  timestamp: string;
}

// 本地存储键名
const STORAGE_KEY = 'contact_form_submissions';

/**
 * 保存表单数据到本地存储
 * @param formData 表单数据
 * @returns 是否保存成功
 */
export const saveContactForm = (formData: Omit<ContactFormData, 'id' | 'timestamp'>): boolean => {
  try {
    // 获取现有数据
    const existingData = getAllContactForms();
    
    // 添加新数据，包含ID和时间戳
    const newFormData: ContactFormData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    // 保存到本地存储
    existingData.push(newFormData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    
    return true;
  } catch (error) {
    console.error('Error saving contact form:', error);
    return false;
  }
};

/**
 * 获取所有表单数据
 * @returns 表单数据数组
 */
export const getAllContactForms = (): ContactFormData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting contact forms:', error);
    return [];
  }
};

/**
 * 删除表单数据
 * @param id 表单ID
 * @returns 是否删除成功
 */
export const deleteContactForm = (id: string): boolean => {
  try {
    const existingData = getAllContactForms();
    const filteredData = existingData.filter(form => form.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
    return true;
  } catch (error) {
    console.error('Error deleting contact form:', error);
    return false;
  }
};

/**
 * 清除所有表单数据
 * @returns 是否清除成功
 */
export const clearAllContactForms = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing contact forms:', error);
    return false;
  }
};