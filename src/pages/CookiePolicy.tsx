import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiePolicy() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {isEnglish ? 'Cookie Policy' : 'Cookie政策'}
              </h1>
              
              <div className="space-y-8 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'This Cookie Policy explains how TPM Precision SLS ("we", "us", or "our") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.' 
                      : '本Cookie政策解释了TPM精密SLS（"我们"、"公司"）如何在我们的网站上使用cookies和类似技术。通过使用我们的网站，您同意按照本政策中描述的方式使用cookies。'}
                  </p>

                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'What Are Cookies?' : '什么是Cookies？'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.' 
                      : 'Cookies是在您访问网站时放置在您的计算机或移动设备上的小型文本文件。它们被广泛用于使网站更高效地工作，以及向网站所有者提供信息。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Types of Cookies We Use' : '我们使用的Cookie类型'}
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isEnglish ? 'Essential Cookies' : '必要的Cookies'}
                    </h3>
                    <p>
                      {isEnglish 
                        ? 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.' 
                        : '这些cookies对于网站正常运行是必要的。它们启用基本功能，如页面导航和访问网站的安全区域。没有这些cookies，网站无法正常运行。'}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isEnglish ? 'Performance Cookies' : '性能Cookies'}
                    </h3>
                    <p>
                      {isEnglish 
                        ? 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.' 
                        : '这些cookies允许我们计算访问量和流量来源，以便我们可以衡量和改进网站的性能。它们帮助我们了解哪些页面最受欢迎和最不受欢迎，并了解访问者如何在网站上移动。'}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isEnglish ? 'Functional Cookies' : '功能性Cookies'}
                    </h3>
                    <p>
                      {isEnglish 
                        ? 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.' 
                        : '这些cookies使网站能够提供增强的功能和个性化。它们可能由我们设置，也可能由我们添加到页面中的第三方提供商设置。'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isEnglish ? 'Targeting Cookies' : '目标Cookies'}
                    </h3>
                    <p>
                      {isEnglish 
                        ? 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.' 
                        : '这些cookies可能由我们的广告合作伙伴通过我们的网站设置。它们可能被这些公司用来建立您的兴趣档案，并在其他网站上向您展示相关广告。它们不直接存储个人信息，而是基于唯一识别您的浏览器和互联网设备。'}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'How We Use Cookies' : '我们如何使用Cookies'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'To enable basic functionality of our website' 
                        : '启用我们网站的基本功能'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To improve the performance and user experience of our website' 
                        : '提高我们网站的性能和用户体验'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To analyze how visitors use our website' 
                        : '分析访问者如何使用我们的网站'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To remember your preferences and settings' 
                        : '记住您的偏好和设置'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'To provide personalized content and advertising' 
                        : '提供个性化内容和广告'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Third-Party Cookies' : '第三方Cookies'}
                  </h2>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'Our website may use third-party cookies for various purposes, such as analytics and advertising. These third parties have their own privacy policies governing how they use information collected through cookies.' 
                      : '我们的网站可能出于各种目的使用第三方cookies，例如分析和广告。这些第三方有自己的隐私政策，规定了他们如何使用通过cookies收集的信息。'}
                  </p>
                  <p>
                    {isEnglish 
                      ? 'Examples of third-party services we may use include Google Analytics for website analytics and advertising platforms for targeted advertising.' 
                      : '我们可能使用的第三方服务的例子包括用于网站分析的Google Analytics和用于定向广告的广告平台。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Managing Cookies' : '管理Cookies'}
                  </h2>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience and reduce the functionality of our website.' 
                      : '大多数网络浏览器允许您通过其设置首选项控制cookies。但是，如果您限制网站设置cookies的能力，您可能会恶化整体用户体验并降低我们网站的功能。'}
                  </p>
                  <p>
                    {isEnglish 
                      ? 'To learn more about how to manage cookies in your specific browser, please refer to the browser\'s help documentation:' 
                      : '要了解更多关于如何在您特定的浏览器中管理cookies的信息，请参阅浏览器的帮助文档：'}
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline">Google Chrome</a>
                    </li>
                    <li>
                      <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-blue-600 hover:underline">Mozilla Firefox</a>
                    </li>
                    <li>
                      <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline">Microsoft Edge</a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline">Apple Safari</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Cookie Consent' : 'Cookie同意'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'By continuing to use our website without changing your cookie settings, you consent to our use of cookies as described in this policy. If you do not agree to our use of cookies, you should set your browser to refuse cookies or exit our website.' 
                      : '通过继续使用我们的网站而不更改您的cookie设置，您同意我们按照本政策中描述的方式使用cookies。如果您不同意我们使用cookies，您应该将浏览器设置为拒绝cookies或退出我们的网站。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Changes to This Cookie Policy' : '本Cookie政策的变更'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we use cookies.' 
                      : '我们可能会不时更新本Cookie政策，以反映我们实践中的变化或出于其他运营、法律或监管原因。我们鼓励您定期查看本政策，以了解我们如何使用cookies。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Contact Us' : '联系我们'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'If you have any questions or concerns about our use of cookies, please contact us at:' 
                      : '如果您对我们使用cookies有任何问题或疑虑，请通过以下方式联系我们：'}
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