import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {isEnglish ? 'Privacy Policy' : '隐私政策'}
              </h1>
              
              <div className="space-y-8 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'This Privacy Policy explains how TPM Precision SLS ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website, request a quote, or use our SLS 3D printing services. We are committed to protecting your privacy and ensuring the security of your personal data.' 
                      : '本隐私政策解释了TPM精密SLS（"我们"、"公司"）如何收集、使用和保护您在访问我们的网站、请求报价或使用我们的SLS 3D打印服务时所提供的个人信息。我们致力于保护您的隐私并确保您个人数据的安全。'}
                  </p>
                  <p>
                    {isEnglish 
                      ? 'Last updated: January 8, 2026' 
                      : '最后更新日期：2026年1月8日'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Information We Collect' : '我们收集的信息'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? '<strong>Personal Information:</strong> When you submit a quote request or contact us, we may collect your name, email address, phone number, company name, and other contact details.' 
                        : '<strong>个人信息：</strong>当您提交报价请求或联系我们时，我们可能会收集您的姓名、电子邮件地址、电话号码、公司名称和其他联系方式。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? '<strong>Project Information:</strong> Details about your 3D printing project, including file uploads, material preferences, and specific requirements.' 
                        : '<strong>项目信息：</strong>关于您的3D打印项目的详细信息，包括文件上传、材料偏好和具体要求。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? '<strong>Usage Data:</strong> Information about how you interact with our website, such as pages visited, time spent on each page, and other browsing data.' 
                        : '<strong>使用数据：</strong>关于您如何与我们的网站互动的信息，如访问的页面、在每个页面上花费的时间和其他浏览数据。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? '<strong>Cookies:</strong> We use cookies to enhance your browsing experience, analyze website traffic, and personalize content.' 
                        : '<strong>Cookies：</strong>我们使用cookies来增强您的浏览体验，分析网站流量并个性化内容。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'How We Use Your Information' : '我们如何使用您的信息'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'To provide and improve our SLS 3D printing services' 
                        : '提供和改进我们的SLS 3D打印服务'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To process and fulfill your quote requests and orders' 
                        : '处理和满足您的报价请求和订单'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To communicate with you regarding your inquiries and projects' 
                        : '与您沟通有关您的咨询和项目'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To improve our website and user experience' 
                        : '改进我们的网站和用户体验'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To send you promotional materials and updates with your consent' 
                        : '经您同意向您发送促销材料和更新信息'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Data Protection' : '数据保护'}
                  </h2>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:' 
                      : '我们实施适当的技术和组织措施来保护您的个人信息免受未经授权的访问、披露、更改或销毁。这些措施包括：'}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'Encryption of sensitive data during transmission' 
                        : '传输过程中对敏感数据进行加密'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Secure storage of data with restricted access' 
                        : '通过受限访问安全存储数据'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Regular security assessments and updates' 
                        : '定期安全评估和更新'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Employee training on data protection practices' 
                        : '员工数据保护实践培训'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Your Rights' : '您的权利'}
                  </h2>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'You have the following rights regarding your personal information:' 
                      : '您对您的个人信息享有以下权利：'}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'The right to access the personal information we hold about you' 
                        : '访问我们持有的关于您的个人信息的权利'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'The right to correct inaccurate or incomplete information' 
                        : '纠正不准确或不完整信息的权利'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'The right to request deletion of your personal information under certain circumstances' 
                        : '在某些情况下要求删除您的个人信息的权利'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'The right to restrict processing of your personal information' 
                        : '限制处理您的个人信息的权利'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'The right to data portability where applicable' 
                        : '在适用情况下数据可携带的权利'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'The right to object to processing of your personal information' 
                        : '反对处理您的个人信息的权利'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Third-Party Services' : '第三方服务'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.' 
                      : '我们的网站可能包含指向第三方网站的链接。我们不对这些第三方网站的隐私做法或内容负责。我们鼓励您查看您访问的任何第三方网站的隐私政策。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Changes to This Privacy Policy' : '本隐私政策的变更'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.' 
                      : '我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何变更。建议您定期查看本隐私政策以了解任何变更。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Contact Us' : '联系我们'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'If you have any questions or concerns about our Privacy Policy or how we handle your personal information, please contact us at:' 
                      : '如果您对我们的隐私政策或我们如何处理您的个人信息有任何问题或疑虑，请通过以下方式联系我们：'}
                  </p>
                   <p className="mt-2 font-medium">
                      {isEnglish 
                        ? 'Email: info@sls-3d.com' 
                        : '电子邮箱：info@sls-3d.com'}
                    </p>
                </div>
              </div>
            </div>
          </section>
         </main>
     </div>
  );
}