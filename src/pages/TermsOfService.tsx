import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {isEnglish ? 'Terms of Service' : '服务条款'}
              </h1>
              
              <div className="space-y-8 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="mb-4">
                    {isEnglish 
                      ? 'Welcome to TPM Precision SLS. These Terms of Service ("Terms") govern your use of our website and the SLS 3D printing services we provide. By accessing our website or using our services, you agree to be bound by these Terms. Please read them carefully.' 
                      : '欢迎使用TPM精密SLS。本服务条款（"条款"）管辖您对我们网站的使用以及我们提供的SLS 3D打印服务。通过访问我们的网站或使用我们的服务，您同意受这些条款的约束。请仔细阅读。'}
                  </p>
                  <p>
                    {isEnglish 
                      ? 'Last updated: January 8, 2026' 
                      : '最后更新日期：2026年1月8日'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '1. Services Provided' : '1. 提供的服务'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'TPM Precision SLS provides Selective Laser Sintering (SLS) 3D printing services, including but not limited to prototyping, small batch production, post-processing, and related design consultation. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.' 
                      : 'TPM精密SLS提供选择性激光烧结（SLS）3D打印服务，包括但不限于原型制作、小批量生产、后处理和相关设计咨询。我们保留在不事先通知的情况下随时修改、暂停或终止服务任何部分的权利。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '2. User Responsibilities' : '2. 用户责任'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'You must provide accurate, complete, and current information when requesting our services.' 
                        : '您在请求我们的服务时必须提供准确、完整和最新的信息。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'You are responsible for ensuring that any 3D models or designs you submit do not infringe upon the intellectual property rights of others.' 
                        : '您有责任确保您提交的任何3D模型或设计不侵犯他人的知识产权。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'You agree not to use our services for any illegal or unauthorized purpose.' 
                        : '您同意不将我们的服务用于任何非法或未经授权的目的。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'You agree to comply with all applicable laws and regulations when using our services.' 
                        : '您同意在使用我们的服务时遵守所有适用的法律和法规。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '3. Order Process and Payment' : '3. 订单流程和付款'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'Quotes are provided based on the information you provide, including model complexity, material selection, quantity, and post-processing requirements.' 
                        : '报价基于您提供的信息，包括模型复杂度、材料选择、数量和后处理要求。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Orders are considered confirmed upon receipt of payment in full or as otherwise agreed.' 
                        : '订单在收到全额付款或按其他约定方式确认后视为确认。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Prices are subject to change without notice but will be confirmed at the time of order placement.' 
                        : '价格可能会随时变动，恕不另行通知，但会在下单时确认。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Payment terms and methods are specified in our quote or order confirmation.' 
                        : '付款条款和方式在我们的报价或订单确认中规定。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '4. Delivery and Shipping' : '4. 交付和运输'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'Delivery times are estimates and may vary based on order complexity, queue length, and other factors.' 
                        : '交付时间为预估，可能因订单复杂度、队列长度和其他因素而有所不同。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Shipping costs are additional and will be calculated based on destination, weight, and shipping method.' 
                        : '运费另计，将根据目的地、重量和运输方式计算。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Risk of loss or damage to printed parts passes to you upon delivery to the carrier.' 
                        : '打印零件的丢失或损坏风险在交付给承运人时转移给您。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'We are not responsible for delays caused by shipping carriers, customs, or events beyond our control.' 
                        : '我们不对因运输商、海关或我们无法控制的事件导致的延误负责。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '5. Quality and Returns' : '5. 质量和退货'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'We strive to provide high-quality 3D printed parts that meet industry standards.' 
                        : '我们致力于提供符合行业标准的高质量3D打印零件。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Claims for defective parts must be made within 7 days of delivery, accompanied by photographic evidence.' 
                        : '对有缺陷零件的索赔必须在交付后7天内提出，并附有照片证据。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'We reserve the right to inspect any claimed defective parts before issuing a refund or reprint.' 
                        : '我们保留在发放退款或重新打印之前检查任何声称有缺陷的零件的权利。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'Refunds or reprints will not be provided for issues related to user-provided designs or files.' 
                        : '对于与用户提供的设计或文件相关的问题，我们不提供退款或重新打印。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '6. Intellectual Property' : '6. 知识产权'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'You retain all ownership rights to your 3D models and designs.' 
                        : '您保留对您的3D模型和设计的所有所有权。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'By submitting your designs to us, you grant us a non-exclusive, royalty-free license to use your designs solely for the purpose of providing the requested services.' 
                        : '通过向我们提交您的设计，您授予我们非独家、免版税的许可，仅为提供请求的服务而使用您的设计。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'We reserve the right to use images of completed projects for marketing purposes unless you specifically request otherwise.' 
                        : '除非您特别要求，否则我们保留将已完成项目的图像用于营销目的的权利。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'You warrant that you have the necessary rights to submit your designs to us and that their use does not infringe any third-party rights.' 
                        : '您保证您有权向我们提交您的设计，并且它们的使用不侵犯任何第三方权利。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '7. Limitation of Liability' : '7. 责任限制'}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {isEnglish 
                        ? 'Our liability for any damages arising from our services shall not exceed the total amount paid by you for the specific order giving rise to the claim.' 
                        : '我们对因我们的服务而产生的任何损害的责任不超过您为引起索赔的特定订单支付的总金额。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'We shall not be liable for any indirect, incidental, special, or consequential damages.' 
                        : '我们不对任何间接、偶然、特殊或后果性损害负责。'}
                    </li>
                    <li>
                      {isEnglish 
                        ? 'This limitation of liability shall apply even if we have been advised of the possibility of such damages.' 
                        : '即使我们已被告知此类损害的可能性，此责任限制也应适用。'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '8. Termination' : '8. 终止'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the services will immediately cease.' 
                      : '我们可以在任何时候终止或暂停您对我们服务的访问，无需事先通知或承担责任，无论出于任何原因，包括但不限于您违反这些条款。终止后，您使用服务的权利将立即停止。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '9. Governing Law' : '9. 适用法律'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'These Terms shall be governed and construed in accordance with the laws of the People\'s Republic of China, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these Terms shall be resolved through amicable negotiation. If negotiation fails, such disputes shall be submitted to the exclusive jurisdiction of the courts located in Shanghai, China.' 
                      : '本条款应根据中华人民共和国法律管辖和解释，不考虑其法律冲突规定。因本条款产生的或与本条款有关的任何争议应通过友好协商解决。如果协商不成，此类争议应提交至中国上海市有管辖权的法院专属管辖。'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? '10. Contact Us' : '10. 联系我们'}
                  </h2>
                  <p>
                    {isEnglish 
                      ? 'If you have any questions or concerns about these Terms of Service, please contact us at:' 
                      : '如果您对本服务条款有任何问题或疑虑，请通过以下方式联系我们：'}
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