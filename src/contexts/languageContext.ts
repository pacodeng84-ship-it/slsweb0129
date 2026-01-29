import React, { createContext, useState, useEffect, ReactNode } from "react";

// 定义支持的语言类型
type Language = 'zh' | 'en';

// 定义翻译类型
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// 创建翻译字典
export const translations: Translations = {
  en: {
    // 添加联系表单的翻译
    "contact_us": "Contact Us",
    "name": "Name",
    "email": "Email",
    "country": "Country",
    "company": "Company",
    "industry": "Industry",
    "enter_your_name": "Enter your name",
    "enter_your_email": "Enter your email",
    "enter_company_name": "Enter company name",
    "select_country": "Select country",
    "select_industry": "Select industry",
    "submit": "Submit",
    "submitting": "Submitting...",
    
    // 通用文本
    "hero_title": "Professional SLS 3D Nylon Printing Service",
    "hero_subtitle": "Empowering Manufacturing Innovation",
    "hero_description": "Providing high-precision, engineering-grade quality prototypes, handboards, engineering samples, and small-batch parts manufacturing services to accelerate your product iteration and market validation.",
    "quote_now": "Request a Quote",
    "learn_tech": "Learn Technology",
    "scroll_more": "Learn More",
    "feature_precision": "Engineering-grade Precision",
    "feature_precision_desc": "±0.1mm accuracy guarantee to meet strict engineering design requirements, ensuring precise and reliable part dimensions",
    "feature_speed": "Fast Delivery",
    "feature_speed_desc": "Standard parts delivered within 24 hours, express service available within 12 hours for urgent orders, accelerating your product development cycle",
    "feature_global_delivery": "Global Delivery",
    "feature_global_delivery_desc": "DHL/UPS global express delivery network, ensuring your parts reach any corner of the world quickly and safely",
    "feature_material": "Industrial-grade Materials",
    "feature_material_desc": "Imported nylon powder materials with excellent mechanical properties, heat resistance, and chemical resistance",
    
    // 导航
    "nav_home": "Home",
    "nav_services": "Services",
    "nav_technology": "Technology",
    "nav_cases": "Cases",
    "nav_contact": "Contact Us",
    
    // 服务
    "services_title": "Professional SLS 3D Printing Services",
    "services_subtitle": "Comprehensive 3D printing solutions for manufacturing clients, from concept validation to small-batch production",
    "services_banner_title": "Industrial-grade 3D Printing Solutions",
    "services_banner_desc": "High-precision, high-performance, high-efficiency SLS nylon printing services to meet strict manufacturing requirements",
    "service_1_title": "Product Prototype Manufacturing",
    "service_1_desc": "Quickly transform your designs into physical prototypes for design verification, functional testing, and market display. Supports complex structures and fine details to meet the needs of various product development stages.",
    "service_2_title": "Engineering Handboard Development",
    "service_2_desc": "Provide high-precision, high-strength engineering handboards for assembly testing, functional verification, and performance evaluation. Our SLS nylon materials have excellent mechanical properties and stability.",
    "service_3_title": "Small-batch Parts Production",
    "service_3_desc": "Provide cost-effective small-batch parts production services for manufacturing clients, shorten supply chain cycles, reduce inventory costs, and meet customized and flexible production needs.",
    
    // 技术
    "tech_title": "Advanced SLS 3D Printing Technology",
    "tech_subtitle": "Using selective laser sintering technology to provide excellent precision and performance for industrial applications",
    "tech_principle_title": "Technical Principles and Advantages",
    "tech_principle_desc": "Selective Laser Sintering (SLS) is an additive manufacturing technology that sinters nylon powder material layer by layer with a high-energy laser beam, enabling the production of complex geometric parts without support structures. This technology is particularly suitable for producing high-strength, high-temperature resistant functional prototypes and end-use parts.",
    "tech_advantage_title": "SLS Technology Core Advantages",
    "tech_advantage_1": "No Support Structures",
    "tech_advantage_1_desc": "Can print complex geometries, internal cavities, and undercut structures",
    "tech_advantage_2": "High Material Utilization",
    "tech_advantage_2_desc": "Unsintered powder can be reused, reducing production costs",
    "tech_advantage_3": "Excellent Mechanical Properties",
    "tech_advantage_3_desc": "Printed parts have good strength, toughness, and chemical resistance",
    "tech_advantage_4": "Batch Production Consistency",
    "tech_advantage_4_desc": "Print multiple parts in the same batch with high consistency",
    "material_performance_title": "Nylon Material Performance Indicators",
    "material_performance_note": "Data based on standard SLS nylon PA12 material test results",
    "more_material_details": "More Material Performance Details",
    "tech_specs_title": "Technical Specifications",
    
    // 案例
    "cases_title": "Featured Success Cases",
    "cases_subtitle": "Explore our high-quality SLS 3D printing solutions for clients across various industries",
    "case_category_all": "All",
    "case_category_auto": "Automotive",
    "case_category_medical": "Medical",
    "case_category_industrial": "Industrial Automation",
    "case_category_aerospace": "Aerospace",
    "view_details": "View Details",
    "get_similar_solution": "Get Similar Solution",
    
    // 流程
    "process_title": "Simple and Efficient Service Process",
    "process_subtitle": "Complete your SLS 3D printing needs in three steps, from communication to delivery, worry-free",
    "process_step_1_title": "Requirement Confirmation",
    "process_step_1_desc": "Quickly understand your needs, evaluate 3D models, and provide professional advice and accurate quotations",
    "process_step_2_title": "Efficient Production",
    "process_step_2_desc": "Optimize printing parameters, arrange production plans, and achieve high-precision, high-efficiency printing",
    "process_step_3_title": "Quality Inspection & Delivery",
    "process_step_3_desc": "Strict quality inspection, post-processing as needed, and fast and safe delivery to your hands",
    "commitment_title": "Our Delivery Commitments",
    "commitment_1_title": "Fast Delivery",
    "commitment_1_desc": "Standard parts delivered within 24 hours, express service available within 12 hours for urgent orders",
    "commitment_2_title": "Engineering-grade Precision",
    "commitment_2_desc": "±0.1mm accuracy guarantee to meet strict engineering design requirements",
    "commitment_3_title": "Professional Support",
    "commitment_3_desc": "One-on-one service from technical experts, following up on your project throughout",
    "submit_requirement": "Submit Requirement Now",
    
    // 联系我们
    "contact_title": "Contact Us",
    "contact_subtitle": "Whether you have specific printing needs or want to learn more about our services, we are happy to hear from you",
    "contact_info_title": "Contact Information",
      "address": "Company Address",
      "address_value": "112, Building 6, 3000 Yixian Road, Shanghai",
      "email_label": "Email Address",
      "email_value": "sales@sls-3D.com",
      "phone": "Phone Number",
      "phone_value": "+86 136 0242 6997",
      "working_hours": "Working Hours",
    "working_hours_value": "Monday to Friday: 9:00 - 18:00",
    "follow_us": "Follow Us",
    "view_faq": "View FAQ",
    "send_request_title": "Send Request",
    "form_name": "Name",
    "form_company": "Company Name",
    "form_email": "Email Address",
    "form_phone": "Phone Number",
    "form_project_type": "Project Type",
    "form_project_type_1": "Product Prototype",
    "form_project_type_2": "Engineering Handboard",
    "form_project_type_3": "Small-batch Production",
    "form_project_type_4": "Other Services",
    "form_message": "Requirement Description",
    "form_privacy": "I agree to the company processing my personal information according to the privacy policy",
    "form_submit": "Submit Request",
    "form_submitting": "Submitting...",
    
    // 页脚
    "footer_company_desc": "Professional SLS 3D nylon printing service provider, offering high-quality, fast-delivered prototypes, handboards, and small-batch parts manufacturing services for manufacturing clients.",
    "footer_services": "Services",
    "footer_prototype": "Product Prototype Manufacturing",
    "footer_handboard": "Engineering Handboard Development",
    "footer_small_batch": "Small-batch Parts Production",
    "footer_post_processing": "Post-processing Services",
    "footer_design": "Design Optimization Services",
    "footer_quick_links": "Quick Links",
    "footer_about": "About Us",
    "footer_tech_center": "Technology Center",
    "footer_success_cases": "Success Cases",
    "footer_faq": "Frequently Asked Questions",
    "footer_privacy": "Privacy Policy",
    "footer_terms": "Terms of Service",
    "footer_cookies": "Cookie Policy",
    "footer_copyright": "© 2026 Precision SLS 3D Printing Service. All rights reserved.",
    
    // SLS技术页面翻译 - 英文
    "sls_hero_title": "Selective Laser Sintering (SLS) 3D Printing",
    "sls_hero_subtitle": "Advanced additive manufacturing technology for engineering-grade prototypes and end-use parts",
    "sls_hero_cta": "Get a Quote",
    "sls_hero_learn": "See How It Works",
    
    // SLS介绍
    "sls_intro_title": "What is SLS 3D Printing?",
    "sls_intro_desc": "Selective Laser Sintering (SLS) is an additive manufacturing process that uses a high-power laser to sinter small particles of polymer powder into a solid structure based on a 3D model.",
    
    // SLS优势
    "sls_benefits_title": "Why Choose SLS 3D Printing?",
    "sls_benefit_1_title": "Complex Geometry Capability",
    "sls_benefit_1_desc": "Build intricate designs, internal features, and undercuts without the need for support structures",
    "sls_benefit_2_title": "High-Quality Materials",
    "sls_benefit_2_desc": "Produce strong, durable parts with engineering-grade thermoplastics like nylon",
    "sls_benefit_3_title": "Cost-Effective for Small Batches",
    "sls_benefit_3_desc": "Ideal for producing small batches of functional parts without expensive tooling",
    "sls_benefit_4_title": "Excellent Material Utilization",
    "sls_benefit_4_desc": "Unused powder can be recycled, reducing material waste and production costs",
    
    // SLS工作原理
    "sls_how_title": "How SLS 3D Printing Works",
    "sls_how_desc": "The SLS process involves several key steps to transform digital designs into physical parts",
    "sls_step_1_title": "Powder Deposition",
    "sls_step_1_desc": "A thin layer of polymer powder is spread evenly across the build platform",
    "sls_step_2_title": "Laser Sintering",
    "sls_step_2_desc": "A high-power laser selectively sinters the powder particles together according to the 3D model",
    "sls_step_3_title": "Layer-by-Layer Building",
    "sls_step_3_desc": "The build platform lowers, and a new layer of powder is applied for the next sintering cycle",
    "sls_step_4_title": "Cooling & Finishing",
    "sls_step_4_desc": "After printing, the part cools in the powder bed before being removed and post-processed",
    
    // SLS技术核心优势
    "sls_tech_adv_title": "SLS Technology Advantages",
    "sls_tech_adv_desc": "Our SLS 3D printing technology offers unparalleled benefits for your projects",
    "sls_advantage_1_title": "No Support Structures",
    "sls_advantage_1_desc": "Print complex geometries, internal cavities and undercuts without additional supports",
    "sls_advantage_2_title": "High Precision Details",
    "sls_advantage_2_desc": "±0.1mm accuracy guarantee, capable of clearly presenting complex design details and thin-wall features",
    "sls_advantage_3_title": "Fast Production Cycles",
    "sls_advantage_3_desc": "Standard parts delivered within 24 hours, significantly shortening product development cycles",
    "sls_advantage_4_title": "Industrial-Grade Materials",
    "sls_advantage_4_desc": "Offer multiple high-performance nylon materials with excellent mechanical properties and durability",
    "sls_advantage_5_title": "High Material Utilization",
    "sls_advantage_5_desc": "Unsintered powder can be reused, reducing material waste and production costs",
    "sls_advantage_6_title": "Batch Production Consistency",
    "sls_advantage_6_desc": "Print multiple parts in the same batch with high consistency and stability",
    
    // SLS应用领域
    "sls_applications_title": "SLS 3D Printing Applications",
    "sls_applications_desc": "Our SLS technology is widely used across multiple industries to create value for customers",
    "sls_app_1_title": "Automotive Industry",
    "sls_app_1_desc": "Produce lightweight components, functional prototypes, tools and fixtures to accelerate automotive R&D",
    "sls_app_2_title": "Medical & Healthcare",
    "sls_app_2_desc": "Manufacture medical device components, surgical guides, prosthetics and rehabilitation aids",
    "sls_app_3_title": "Aerospace",
    "sls_app_3_desc": "Produce lightweight aerospace components, complex structural parts and functional prototypes",
    "sls_app_4_title": "Consumer Products",
    "sls_app_4_desc": "Rapidly develop new product prototypes, customized components and small-batch production",
    
    // SLS材料
    "sls_materials_title": "SLS Printing Materials",
    "sls_materials_desc": "We offer a variety of high-performance nylon materials to meet different application needs",
    "sls_mat_pa12_type": "General-Purpose Nylon",
    "sls_mat_pa12_desc": "The most commonly used SLS material with excellent balanced performance, low water absorption and good dimensional stability",
    "sls_mat_pa11_type": "Bio-based Nylon",
    "sls_mat_pa11_desc": "Eco-friendly material derived from castor oil with higher toughness and impact resistance",
    "sls_mat_glass_title": "Glass-Filled Nylon",
    "sls_mat_glass_type": "High-Strength Composite",
    "sls_mat_glass_desc": "Reinforced with glass fibers to improve strength and rigidity while maintaining good heat resistance",
    "sls_mat_strength": "Tensile Strength",
    "sls_mat_heat": "Heat Deflection Temp",
    "sls_mat_density": "Density",
    "sls_mat_elongation": "Elongation at Break",
    "sls_mat_impact": "Impact Resistance",
    "sls_mat_stiffness": "Stiffness",
    "sls_mat_high": "Very High",
    "sls_mat_more": "View More Materials",
    
    // SLS常见问题
    "sls_faq_title": "Frequently Asked Questions",
    "sls_faq_desc": "Learn more about common questions regarding SLS 3D printing technology",
    "sls_faq_1_q": "How does SLS printing differ from other 3D printing technologies?",
    "sls_faq_1_a": "SLS technology doesn't require support structures, can print more complex geometries, and produces parts with mechanical properties closer to injection-molded parts. Compared to FDM, it offers better surface quality; compared to SLA, it uses more durable materials suitable for functional testing.",
    "sls_faq_2_q": "What is the surface quality of SLS printed parts?",
    "sls_faq_2_a": "SLS printed parts have a natural matte texture similar to injection-molded parts. We offer various post-processing options such as sanding, polishing, and painting to further enhance surface quality according to requirements.",
    "sls_faq_3_q": "What are the maximum size limitations for SLS printing?",
    "sls_faq_3_a": "Our SLS equipment has a maximum build size of 600mm × 600mm × 800mm, which can meet the size requirements of most industrial parts. For larger parts beyond this range, we can provide segmented printing and splicing services.",
    "sls_faq_4_q": "What post-processing can be done on SLS printed parts?",
    "sls_faq_4_a": "We offer various post-processing services including sanding, polishing, painting, dyeing, shot peening, and metal plating. These post-processing options can improve the surface quality, mechanical properties, or aesthetic effects of parts to meet different application scenarios.",
    "sls_faq_5_q": "How do I get a quote for SLS printing?",
    "sls_faq_5_a": "You can submit your 3D model file and requirements through our website, and our technical team will provide you with a detailed quote within 24 hours. Factors affecting the quote include material selection, part size, complexity, quantity, and post-processing requirements.",
    
    // SLS CTA
    "sls_cta_title": "Ready to Start Your SLS 3D Printing Project?",
    "sls_cta_desc": "Contact our technical experts to learn how SLS 3D printing can help you accelerate product development, reduce costs, and improve innovation capabilities",
    "sls_cta_button": "Get a Quote Now",
    "sls_cta_contact": "Contact Technical Experts"
  },
  zh: {
    // 添加联系表单的翻译
    "contact_us": "联系我们",
    "name": "姓名",
    "email": "电子邮箱",
    "country": "国家",
    "company": "公司名称",
    "industry": "行业",
    "enter_your_name": "请输入您的姓名",
    "enter_your_email": "请输入您的电子邮箱",
    "enter_company_name": "请输入公司名称",
    "select_country": "选择国家",
    "select_industry": "选择行业",
    "submit": "提交",
    "submitting": "提交中...",
    
    // 保持中文原文不变，这里仅作为结构参考
    "hero_title": "专业SLS 3D尼龙打印服务",
    "hero_subtitle": "为制造业赋能创新",
    "hero_description": "提供高精度、工程级品质的样板、手板、工程样件、零件等少批量制作服务，助力您的产品快速迭代与市场验证。",
    "quote_now": "立即咨询",
    "learn_tech": "了解技术",
    "scroll_more": "了解更多",
    "feature_precision": "工程级精度",
    "feature_precision_desc": "±0.1mm精度保证，满足严格的工程设计要求，确保零件尺寸精准可靠",
    "feature_speed": "快速交付",
    "feature_speed_desc": "标准件24小时内交付，急件可提供12小时加急服务，加速您的产品开发周期",
    "feature_global_delivery": "全球配送",
    "feature_global_delivery_desc": "DHL/UPS全球快递网络，确保您的零件快速安全地送达世界任何角落",
    "feature_material": "工业级材料",
    "feature_material_desc": "进口尼龙粉末材料，具备优异的力学性能、耐热性和耐化学腐蚀性",
    
    // 导航
    "nav_home": "首页",
    "nav_services": "服务",
    "nav_technology": "技术",
    "nav_cases": "案例",
    "nav_contact": "联系我们",
    
    // 服务
    "services_title": "专业SLS 3D打印服务",
    "services_subtitle": "为制造业客户提供全方位的3D打印解决方案，从概念验证到小批量生产",
    "services_banner_title": "工业级3D打印解决方案",
    "services_banner_desc": "高精度、高性能、高效率的SLS尼龙打印服务，满足制造业的严格要求",
    "service_1_title": "产品样板制作",
    "service_1_desc": "快速将您的设计转化为实物样板，用于设计验证、功能测试和市场展示。支持复杂结构和精细细节，满足产品开发各个阶段的需求。",
    "service_2_title": "工程手板研发",
    "service_2_desc": "为工程师提供高精度、高强度的工程手板，用于装配测试、功能验证和性能评估。我们的SLS尼龙材料具有优异的力学性能和稳定性。",
    "service_3_title": "小批量零件生产",
    "service_3_desc": "为制造业客户提供经济高效的小批量零件生产服务，缩短供应链周期，降低库存成本，满足定制化和柔性生产需求。",
    
    // 技术
    "tech_title": "先进的SLS 3D打印技术",
    "tech_subtitle": "采用选择性激光烧结技术，提供卓越的精度和性能，满足工业级应用需求",
    "tech_principle_title": "技术原理与优势",
    "tech_principle_desc": "选择性激光烧结（SLS）是一种增材制造技术，通过高能量激光束逐层烧结尼龙粉末材料，无需支撑结构即可制造复杂几何形状的零件。这种技术特别适合生产高强度、耐高温的功能性原型和终端零件。",
    "tech_advantage_title": "SLS技术核心优势",
    "tech_advantage_1": "无需支撑结构",
    "tech_advantage_1_desc": "可打印复杂几何形状，内部空腔和倒扣结构",
    "tech_advantage_2": "材料利用率高",
    "tech_advantage_2_desc": "未烧结粉末可重复使用，降低生产成本",
    "tech_advantage_3": "力学性能优异",
    "tech_advantage_3_desc": "打印件具有良好的强度、韧性和耐化学腐蚀性",
    "tech_advantage_4": "批量生产一致性",
    "tech_advantage_4_desc": "同一批次打印多个零件，保持高度一致性",
    "material_performance_title": "尼龙材料性能指标",
    "material_performance_note": "数据基于标准SLS尼龙PA12材料测试结果",
    "more_material_details": "更多材料性能细节",
    "tech_specs_title": "技术规格参数",
    
    // 案例
    "cases_title": "精选成功案例",
    "cases_subtitle": "探索我们为各行业客户提供的高品质SLS 3D打印解决方案",
    "case_category_all": "全部",
    "case_category_auto": "汽车行业",
    "case_category_medical": "医疗行业",
    "case_category_industrial": "工业自动化",
    "case_category_aerospace": "航空航天",
    "view_details": "查看详情",
    "get_similar_solution": "获取类似方案",
    
    // 流程
    "process_title": "简洁高效的服务流程",
    "process_subtitle": "三步完成您的SLS 3D打印需求，从沟通到交付，全程无忧",
    "process_step_1_title": "需求确认",
    "process_step_1_desc": "快速理解您的需求，评估3D模型，提供专业建议和精准报价",
    "process_step_2_title": "高效生产",
    "process_step_2_desc": "优化打印参数，安排生产计划，实现高精度、高效率打印",
    "process_step_3_title": "质检交付",
    "process_step_3_desc": "严格质量检测，按需后处理，快速安全送达您的手中",
    "commitment_title": "我们的交付承诺",
    "commitment_1_title": "快速交付",
    "commitment_1_desc": "标准件24小时内交付，急件可提供12小时加急服务",
    "commitment_2_title": "工程级精度",
    "commitment_2_desc": "±0.1mm精度保证，满足严格的工程设计要求",
    "commitment_3_title": "专业支持",
    "commitment_3_desc": "技术专家一对一服务，全程跟进您的项目",
    "submit_requirement": "立即提交需求",
    
    // 联系我们
    "contact_title": "联系我们",
    "contact_subtitle": "无论您是有具体的打印需求，还是想了解更多关于我们的服务，我们都很乐意听取您的声音",
    "contact_info_title": "联系方式",
    "address": "公司地址",
    "address_value": "上海逸仙路3000号6号楼112",
    "email_label": "电子邮箱",
    "email_value": "sales@sls-3D.com",
    "phone": "联系电话",
    "phone_value": "+86 136 0242 6997",
    "working_hours": "工作时间",
    "working_hours_value": "周一至周五: 9:00 - 18:00",
    "follow_us": "关注我们",
    "view_faq": "查看常见问题解答",
    "send_request_title": "发送需求",
    "form_name": "姓名",
    "form_company": "公司名称",
    "form_email": "电子邮箱",
    "form_phone": "联系电话",
    "form_project_type": "项目类型",
    "form_project_type_1": "产品样板",
    "form_project_type_2": "工程手板",
    "form_project_type_3": "小批量生产",
    "form_project_type_4": "其他服务",
    "form_message": "需求描述",
    "form_privacy": "我同意贵公司根据隐私政策处理我的个人信息",
    "form_submit": "提交需求",
    "form_submitting": "提交中...",
    
    // 页脚
    "footer_company_desc": "专业的SLS 3D尼龙打印服务提供商，为制造业客户提供高质量、快速交付的样板、手板和小批量零件制作服务。",
    "footer_services": "服务项目",
    "footer_prototype": "产品样板制作",
    "footer_handboard": "工程手板研发",
    "footer_small_batch": "小批量零件生产",
    "footer_post_processing": "后处理服务",
    "footer_design": "设计优化服务",
    "footer_quick_links": "快速链接",
    "footer_about": "关于我们",
    "footer_tech_center": "技术中心",
    "footer_success_cases": "成功案例",
    "footer_faq": "常见问题",
    "footer_privacy": "隐私政策",
    "footer_terms": "服务条款",
    "footer_cookies": "Cookie政策",
    
    // SLS技术页面翻译
    "sls_hero_title": "选择性激光烧结 (SLS) 3D打印",
    "sls_hero_subtitle": "为工程级原型和终端零件提供先进的增材制造技术",
    "sls_hero_cta": "获取报价",
    "sls_hero_learn": "了解工作原理",
    "sls_intro_title": "什么是SLS 3D打印？",
    "sls_intro_desc": "选择性激光烧结（SLS）是一种增材制造工艺，它使用高功率激光将聚合物粉末的小颗粒烧结成基于3D模型的固体结构。",
    "sls_benefits_title": "为什么选择SLS 3D打印？",
    "sls_benefit_1_title": "复杂几何形状能力",
    "sls_benefit_1_desc": "构建复杂设计、内部特征和倒扣结构，无需支撑结构",
    "sls_benefit_2_title": "高质量材料",
    "sls_benefit_2_desc": "使用工程级热塑性塑料如尼龙生产坚固耐用的零件",
    "sls_benefit_3_title": "小批量生产成本效益高",
    "sls_benefit_3_desc": "无需昂贵模具，非常适合生产小批量功能零件",
    "sls_benefit_4_title": "材料利用率高",
    "sls_benefit_4_desc": "未使用的粉末可以回收利用，减少材料浪费和生产成本",
    "sls_how_title": "SLS 3D打印如何工作？",
    "sls_how_desc": "SLS工艺涉及几个关键步骤，将数字设计转化为物理零件",
    "sls_step_1_title": "粉末沉积",
    "sls_step_1_desc": "一层薄的聚合物粉末均匀地铺展在构建平台上",
    "sls_step_2_title": "激光烧结",
    "sls_step_2_desc": "高功率激光根据3D模型选择性地将粉末颗粒烧结在一起",
    "sls_step_3_title": "逐层构建",
    "sls_step_3_desc": "构建平台下降，新的粉末层被应用用于下一个烧结周期",
    "sls_step_4_title": "冷却与后处理",
    "sls_step_4_desc": "打印完成后，零件在粉末床中冷却，然后被取出并进行后处理",
    "sls_tech_adv_title": "SLS 技术核心优势",
    "sls_tech_adv_desc": "我们的SLS 3D打印技术为您的项目提供无与伦比的优势和价值",
    "sls_advantage_1_title": "无需支撑结构",
    "sls_advantage_1_desc": "可打印复杂几何形状，内部空腔和倒扣结构，无需额外支撑",
    "sls_advantage_2_title": "高精度细节表现",
    "sls_advantage_2_desc": "±0.1mm精度保证，能够清晰呈现复杂的设计细节和薄壁特征",
    "sls_advantage_3_title": "快速生产周期",
    "sls_advantage_3_desc": "标准件24小时内交付，大幅缩短产品开发周期，加速上市时间",
    "sls_advantage_4_title": "工业级材料性能",
    "sls_advantage_4_desc": "提供多种高性能尼龙材料，具备优异的力学性能和耐久性",
    "sls_advantage_5_title": "材料利用率高",
    "sls_advantage_5_desc": "未烧结粉末可重复使用，降低材料浪费和生产成本",
    "sls_advantage_6_title": "批量生产一致性",
    "sls_advantage_6_desc": "同一批次打印多个零件，保持高度一致性和稳定性",
    
    // SLS应用领域
    "sls_applications_title": "SLS 3D打印应用领域",
    "sls_applications_desc": "我们的SLS技术广泛应用于多个行业，为客户创造价值",
    "sls_app_1_title": "汽车行业",
    "sls_app_1_desc": "生产轻量化零部件、功能原型、工具和夹具，加速汽车研发过程",
    "sls_app_2_title": "医疗健康",
    "sls_app_2_desc": "制造医疗设备部件、手术导板、假肢和康复辅具，提供定制化解决方案",
    "sls_app_3_title": "航空航天",
    "sls_app_3_desc": "生产轻量化航空部件、复杂结构件和功能原型，满足严格的航空标准",
    "sls_app_4_title": "消费产品",
    "sls_app_4_desc": "快速开发新产品原型、定制化零部件和小批量生产，提升产品创新速度",
    
    // SLS材料
    "sls_materials_title": "SLS 打印材料",
    "sls_materials_desc": "我们提供多种高性能尼龙材料，满足不同应用需求",
    "sls_mat_pa12_type": "通用型尼龙",
    "sls_mat_pa12_desc": "最常用的SLS材料，具有优异的平衡性能，低吸水率和良好的尺寸稳定性",
    "sls_mat_pa11_type": "生物基尼龙",
    "sls_mat_pa11_desc": "源自蓖麻油的环保材料，具有更高的韧性和抗冲击性能，适合需要高延展性的应用",
    "sls_mat_glass_title": "玻纤增强尼龙",
    "sls_mat_glass_type": "高强度复合材料",
    "sls_mat_glass_desc": "添加玻璃纤维增强，提高了强度和刚性，同时保持良好的耐热性和尺寸稳定性",
    "sls_mat_strength": "抗拉强度",
    "sls_mat_heat": "热变形温度",
    "sls_mat_density": "密度",
    "sls_mat_elongation": "断裂伸长率",
    "sls_mat_impact": "抗冲击性",
    "sls_mat_stiffness": "刚度",
    "sls_mat_high": "极高",
    "sls_mat_more": "查看更多材料",
    
    // SLS常见问题
    "sls_faq_title": "常见问题解答",
    "sls_faq_desc": "了解更多关于SLS 3D打印技术的常见问题",
    "sls_faq_1_q": "SLS打印和其他3D打印技术有什么区别？",
    "sls_faq_1_a": "SLS技术无需支撑结构，可以打印更复杂的几何形状，材料力学性能更接近注塑件，适合功能性原型和小批量生产。相比FDM，表面质量更好；相比SLA，材料更坚韧适合功能性测试。",
    "sls_faq_2_q": "SLS打印件的表面质量如何？",
    "sls_faq_2_a": "SLS打印件的表面呈现自然的磨砂质感，类似于注塑件的哑光表面。我们提供多种后处理选项，如打磨、抛光、喷漆等，可以根据需求进一步提升表面质量。",
    "sls_faq_3_q": "SLS打印的最大尺寸限制是多少？",
    "sls_faq_3_a": "我们的SLS设备最大构建尺寸为600mm × 600mm × 800mm，可以满足大多数工业零件的尺寸需求。对于超出范围的大型零件，我们可以提供分段打印和拼接服务。",
    "sls_faq_4_q": "SLS打印件可以进行哪些后处理？",
    "sls_faq_4_a": "我们提供多种后处理服务，包括打磨、抛光、喷漆、染色、喷丸处理、金属镀覆等。这些后处理可以提高零件的表面质量、机械性能或美学效果，满足不同应用场景的需求。",
    "sls_faq_5_q": "如何获取SLS打印的报价？",
    "sls_faq_5_a": "您可以通过我们的网站提交3D模型文件和需求，我们的技术团队会在24小时内为您提供详细的报价。影响报价的因素包括材料选择、零件尺寸、复杂度、数量和后处理要求等。",
    
    // SLS CTA
    "sls_cta_title": "准备好开始您的SLS 3D打印项目了吗？",
    "sls_cta_desc": "联系我们的技术专家，了解SLS 3D打印如何帮助您加速产品开发、降低成本并提高创新能力",
    "sls_cta_button": "立即获取报价",
    "sls_cta_contact": "联系技术专家"
  }
};

// 创建语言上下文接口
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建语言上下文
export const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  t: (key) => key
});

// 语言提供者组件
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'en';
  });

  // 保存语言设置到本地存储
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // 翻译函数
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
}