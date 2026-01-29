import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogoChain from '@/components/LogoChain';
import { Link } from 'react-router-dom';


  // 精选案例数据 - 精简版，减少页面面积浪费
  const caseStudies = [
    {
      id: 1,
      title: "脊柱矫正器应用",
      slug: "scoliosis-brace-application",
      category: "医疗行业",
      description: "3D打印脊柱侧弯矫形器能够起到良好的矫形效果，减少制作步骤，简化工艺流程，提高制作效率。",
      longDescription: "本案例展示了我们如何为医疗行业提供创新的3D打印脊柱侧弯矫形器解决方案。3D打印脊柱侧弯矫形器能够起到良好的矫形效果，减少制作步骤，简化工艺流程，提高制作效率。并且改善患者治疗体验，让青少年佩戴上美观、重量轻的支具，最大程度降低对青少年日常生活的影响。我们的SLS打印技术使矫形器具有精确的贴合度和透气性，通过个性化定制满足每位患者的独特需求，同时保持优异的结构强度和耐用性。",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/WX20260117-180452@2x_20260117203105.png",
      details: {
        material: "医疗级尼龙PA12",
        quantity: "50件",
        leadTime: "48小时",
        application: "脊柱侧弯矫正、康复治疗、医疗辅助"
      },
      keywords: "脊柱矫正器,3D打印矫形器,SLS技术,医疗应用,个性化定制",
      benefits: ["良好的矫形效果", "减少制作步骤", "简化工艺流程", "提高制作效率", "改善患者治疗体验", "美观、重量轻", "降低对日常生活的影响"]
    },
    {
      id: 2,
      title: "医疗假肢组件",
      slug: "medical-prosthetic-components",
      category: "医疗行业",
      description: "为残障人士定制的高性能医疗假肢组件，具有轻量化设计和优异的机械性能。",
      longDescription: "本案例展示了我们如何为医疗设备公司提供定制化的SLS 3D打印假肢组件解决方案。传统的假肢组件制造过程复杂，成本高昂，且难以实现个性化定制。通过SLS 3D打印技术，我们能够根据患者的具体需求快速生产出轻量化、高强度的假肢组件，大大提高了患者的舒适度和使用体验。这些组件采用医疗级尼龙PA12材料制造，具有优异的生物相容性、强度和耐用性，完全符合医疗行业标准。",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/back-view-man-with-mechanical-leg-sunny-day-sportsman-black-shorts-white-sneakers-photographed-training-sport-disability-hobby-concept-scaled_20260117143004.jpg",
      details: {
        material: "医疗级尼龙PA12",
        quantity: "30件",
        leadTime: "72小时",
        application: "医疗假肢、康复辅具"
      },
      keywords: "医疗假肢,3D打印假肢,SLS技术,个性化定制,医疗级尼龙",
      benefits: ["个性化定制适配", "重量减轻40%", "提高佩戴舒适度", "降低制造成本50%"]
    },
    {
      id: 3,
      title: "精密小零件批量生产",
      slug: "precision-small-parts-mass-production",
      category: "工业自动化",
      description: "为多家行业客户提供的精密小零件批量生产服务，满足多样化的复杂设计需求。",
      longDescription: "这个案例展示了我们如何为多个行业的客户提供精密小零件的批量生产服务。客户需要生产各种具有复杂几何形状和高精度要求的小零件，传统制造方法难以满足这些要求且成本高昂。通过SLS 3D打印技术，我们能够快速、经济地生产出各种复杂形状的精密小零件，包括叶轮、连接器、支架等。这些零件采用高性能尼龙材料制造，具有优异的机械性能和尺寸稳定性，完全满足客户的使用要求。",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/sls-print-examples-1024x471_20260117143102.webp",
      details: {
        material: "尼龙PA12/PA11",
        quantity: "200件",
        leadTime: "120小时",
        application: "电子设备、精密机械、汽车零部件"
      },
      keywords: "精密小零件,批量生产,SLS打印,复杂形状,多行业应用",
      benefits: ["复杂形状一体化成型", "小批量生产成本低", "缩短交付周期", "满足严格公差要求"]
    },
    {
      id: 4,
      title: "重型机械底座件",
      slug: "heavy-machinery-base-components",
      category: "工业自动化",
      description: "为重型机械设备设计的轻量化底座组件，具有高强度和优异的减震性能。",
      longDescription: "本案例展示了我们如何为重型机械制造商提供轻量化底座组件的解决方案。传统的重型机械底座通常采用金属材料制造，重量大且加工复杂。通过SLS 3D打印技术和玻纤增强尼龙材料，我们成功设计并制造出了轻量化但强度足够的底座组件，重量比传统金属底座减轻了35%，同时保持了良好的结构强度和减震性能。这些组件的成功应用不仅降低了重型机械的整体重量，还提高了设备的机动性和能源利用效率。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Heavy%20machinery%20base%20components%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=58b8694b228aa6816de0225b6f5ba124",
      details: {
        material: "玻纤增强尼龙",
        quantity: "12件",
        leadTime: "144小时",
        application: "重型机械设备、工业自动化设备"
      },
      keywords: "重型机械底座,轻量化设计,玻纤增强尼龙,SLS打印,高强度",
      benefits: ["重量减轻35%", "提高结构强度", "优异的减震性能", "降低运输成本"]
    },
    {
      id: 5,
      title: "汽车零部件原型",
      slug: "automotive-parts-prototype",
      category: "汽车行业",
      description: "为某知名汽车制造商生产的发动机部件原型，用于性能测试和装配验证。",
      longDescription: "本案例展示了我们为国内某知名汽车制造商提供的SLS 3D打印服务。客户需要快速生产一批高精度发动机部件原型，用于性能测试和装配验证。传统制造方法需要数周时间，而通过我们的SLS技术，仅用48小时就完成了12件部件的生产。这些部件采用尼龙PA12材料制造，具有优异的机械性能和尺寸稳定性，完全满足客户的测试要求。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Automotive%20parts%20prototype%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=a9cf759bfab979a07daaf95dad2f68a5",
      details: {
        material: "尼龙PA12",
        quantity: "12件",
        leadTime: "48小时",
        application: "功能测试、装配验证"
      },
      keywords: "汽车零部件,SLS 3D打印,尼龙PA12,快速原型制作,发动机部件",
      benefits: ["缩短开发周期80%", "降低原型制作成本60%", "确保高精度和一致性", "无需昂贵的模具费用"]
    },
    {
      id: 6,
      title: "医疗器械外壳",
      slug: "medical-device-housing",
      category: "医疗行业",
      description: "为医疗设备公司生产的精密外壳组件，具有复杂的内部结构和严格的尺寸要求。",
      longDescription: "我们为一家专业医疗设备公司提供了SLS 3D打印解决方案，帮助他们快速生产精密的医疗设备外壳组件。这些组件具有复杂的内部结构和严格的尺寸要求，传统制造方法难以实现且成本高昂。通过使用医疗级尼龙PA12材料和我们先进的SLS技术，我们成功制造出符合医疗行业标准的组件，完全满足客户的设计要求和功能需求。本项目共生产25件产品，交付周期仅为72小时，远低于传统制造方式所需的时间。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Medical%20device%20housing%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20precision%20components%2C%20complex%20structure&sign=6bc7c47feba7a27852eabc52c7780493",
      details: {
        material: "医疗级尼龙PA12",
        quantity: "25件",
        leadTime: "72小时",
        application: "医疗设备测试、临床验证"
      },
      keywords: "医疗器械外壳,医疗级尼龙,SLS打印,精密组件,医疗设备测试",
      benefits: ["高精度复杂结构制造", "符合医疗行业标准", "快速交付满足紧急需求", "降低小批量生产门槛"]
    },
    {
      id: 7,
      title: "工业机器人夹具",
      slug: "industrial-robot-gripper",
      category: "工业自动化",
      description: "为自动化生产线设计的轻量化机器人末端执行器，具有高强度和耐用性。",
      longDescription: "这个案例展示了我们如何帮助一家自动化设备制造商优化其机器人末端执行器的设计和生产流程。客户需要一种轻量化但高强度的机器人夹具，以提高生产线上的操作效率和减少能耗。我们推荐使用玻纤增强尼龙材料，并通过SLS 3D打印技术制造出重量轻、强度高的夹具。这些夹具比传统金属夹具轻60%，同时保持了足够的强度和耐用性，大大提高了机器人的工作效率和能源利用率。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Industrial%20robot%20gripper%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=d0e5cf14f3657d2e2ca50994c9522b19",
      details: {
        material: "玻纤增强尼龙",
        quantity: "8件",
        leadTime: "96小时",
        application: "自动化生产线、物料搬运"
      },
      keywords: "机器人夹具,轻量化设计,玻纤增强尼龙,工业自动化,末端执行器",
      benefits: ["重量减轻60%", "提升机器人工作效率", "降低能耗30%", "提高生产灵活性"]
    },
    {
      id: 8,
      title: "航空航天支架组件",
      slug: "aerospace-bracket-component",
      category: "航空航天",
      description: "为航空设备制造商生产的轻量化支架组件，满足严格的重量和强度要求。",
      longDescription: "在这个航空航天领域的项目中，我们为客户生产了一系列高精度的轻量化支架组件。航空航天行业对零部件的重量和强度有极其严格的要求，传统金属部件往往较重，增加了燃料消耗和发射成本。通过采用高性能尼龙PA12材料和SLS 3D打印技术，我们成功制造出比传统金属部件轻40%的支架组件，同时保持了相同的结构强度和耐久性。这些组件通过了严格的性能测试，完全满足航空航天行业的高标准要求。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Aerospace%20bracket%20component%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20lightweight%2C%20high%20strength-to-weight%20ratio&sign=f6197b02f746c3e1627455a21242e72e",
      details: {
        material: "高性能尼龙PA12",
        quantity: "5件",
        leadTime: "120小时",
        application: "航空设备测试、原型验证"
      },
      keywords: "航空航天,轻量化部件,高性能尼龙,SLS打印,支架组件",
      benefits: ["重量减轻40%", "满足航空航天标准", "复杂结构一体成型", "缩短开发验证周期"]
    },
    {
      id: 9,
      title: "无人机结构部件",
      slug: "drone-structural-components",
      category: "航空航天",
      description: "为无人机研发公司生产的轻量化结构部件，具有高强度重量比和复杂几何形状，Drones parts manufacturing专业解决方案。",
      longDescription: "我们为一家无人机研发公司提供了定制化的SLS 3D打印服务，帮助他们生产高性能的无人机结构部件。无人机对重量和强度有严格要求，传统制造方法难以实现复杂的轻量化设计。我们采用碳纤维增强尼龙材料和先进的SLS打印技术，成功制造出符合客户要求的结构部件。这些部件不仅重量轻、强度高，而且具有复杂的几何形状，完全满足无人机的空气动力学要求。通过使用我们的服务，客户的无人机研发周期缩短了50%，并且成功降低了产品重量，提高了飞行性能和续航能力。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Drone%20structural%20parts%2C%20SLS%203D%20printed%2C%20lightweight%2C%20high%20strength%2C%20nylon%20material&sign=08e30fb399206ebc5a3befbe4195e47b",
      details: {
        material: "碳纤维增强尼龙",
        quantity: "15件",
        leadTime: "108小时",
        application: "无人机研发、原型测试"
      },
      keywords: "无人机,结构部件,碳纤维增强尼龙,Drones parts manufacturing,轻量化设计",
      benefits: ["提高飞行性能30%", "延长续航时间25%", "缩短研发周期50%", "支持复杂几何形状设计"]
    },
    {
      id: 10,
      title: "工程齿轮组",
      slug: "engineering-gear-set",
      category: "工业自动化",
      description: "为机械设备制造商生产的高精度工程齿轮组，具有复杂齿形和严格的配合要求。",
      longDescription: "这个案例展示了我们如何为机械设备制造商提供高精度的工程齿轮组解决方案。客户需要生产一批具有复杂齿形和严格配合要求的齿轮组，用于测试新型机械设备的性能。传统的齿轮制造方法需要昂贵的模具和较长的生产周期，而通过我们的SLS 3D打印技术，我们能够快速、经济地生产出符合精度要求的耐磨尼龙齿轮组。这些齿轮组在测试中表现优异，完全满足客户的功能要求，帮助客户缩短了产品开发周期并降低了研发成本。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Engineering%20gear%20set%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=9ea83fed639a0719e76d43dba3c6a9f6",
      details: {
        material: "耐磨尼龙PA12",
        quantity: "20件",
        leadTime: "96小时",
        application: "机械传动系统、设备研发"
      },
      keywords: "工程齿轮组,高精度齿轮,耐磨尼龙,SLS打印,机械传动",
      benefits: ["高精度齿形制造", "减少齿轮磨损", "无需复杂模具", "快速迭代设计变更"]
    },
    {
      id: 11,
      title: "汽车制造解决方案",
      slug: "automotive-manufacturing-solution",
      category: "汽车行业",
      description: "为汽车制造商提供的SLS 3D打印解决方案，加速研发进程，降低小批量生产成本。",
      longDescription: "本案例展示了我们如何为汽车制造商提供SLS 3D打印解决方案，帮助他们解决小批量生产中的成本和时间挑战。传统的汽车零部件生产通常需要昂贵的模具投入，特别是对于小批量生产来说成本极高。通过SLS 3D打印技术，我们能够帮助客户避免这些高昂的模具投入，同时能够制造出传统工艺难以实现的复杂结构。SLS技术的无需支撑特性让设计团队能够自由创新，提升设计灵活性，通过快速原型制造与测试加速整个研发进程。这些优势使我们的客户能够更快地将新产品推向市场，同时降低开发成本。",
      image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/WX20260117-180241@2x_20260117180812.png",
      details: {
        material: "Precimid1172Pro GF30 BLK (玻纤增强尼龙12)",
        quantity: "15件",
        leadTime: "72小时",
        application: "汽车部件研发、小批量生产、功能测试"
      },
      keywords: "汽车制造,SLS 3D打印,小批量生产,复杂结构,快速原型",
      benefits: ["避免小批量生产的昂贵模具投入", "复杂结构无需支撑", "提升设计灵活性", "通过快速原型制造与测试加速研发进程"]
    }
  ];

  // 英文案例数据 - 更新版
  const getEnglishCases = () => {
    return [
      {
        id: 1,
        title: "3D Printed Scoliosis Brace",
        slug: "scoliosis-brace-application",
        category: "Medical",
        description: "3D printed scoliosis braces provide excellent orthopedic effects, reduce production steps, simplify processes, and improve manufacturing efficiency.",
        longDescription: "This case showcases our innovative 3D printing scoliosis brace solutions for the medical industry. 3D printed scoliosis braces provide excellent orthopedic effects, reduce production steps, simplify processes, and improve manufacturing efficiency. They also improve patient treatment experience by allowing adolescents to wear aesthetically pleasing, lightweight braces that minimize the impact on their daily lives. Our SLS printing technology provides precise fit and breathability for the braces, meeting each patient's unique needs through personalized customization while maintaining excellent structural strength and durability.",
        image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/WX20260117-180452@2x_20260117203105.png",
        details: {
          material: "Medical-grade Nylon PA12",
          quantity: "50 pieces",
          leadTime: "48 hours",
          application: "Scoliosis correction, Rehabilitation treatment, Medical assistance"
        },
        keywords: "scoliosis brace, 3D printed brace, SLS technology, medical application, personalized customization",
        benefits: ["Excellent orthopedic effects", "Reduced production steps", "Simplified processes", "Improved manufacturing efficiency", "Enhanced patient experience", "Aesthetically pleasing and lightweight", "Minimized impact on daily life"]
      },
      {
        id: 2,
        title: "Medical Prosthetic Components",
        slug: "medical-prosthetic-components",
        category: "Medical",
        description: "High-performance custom prosthetic components for people with disabilities, featuring lightweight design and excellent mechanical properties.",
        longDescription: "This case showcases our customized SLS 3D printing solutions for prosthetic components provided to medical device companies. Traditional prosthetic component manufacturing is complex, costly, and difficult to achieve personalized customization. Through SLS 3D printing technology, we can quickly produce lightweight, high-strength prosthetic components according to the specific needs of patients, greatly improving comfort and user experience. These components are manufactured using medical-grade Nylon PA12 material, offering excellent biocompatibility, strength, and durability, fully meeting medical industry standards.",
        image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/back-view-man-with-mechanical-leg-sunny-day-sportsman-black-shorts-white-sneakers-photographed-training-sport-disability-hobby-concept-scaled_20260117143004.jpg",
        details: {
          material: "Medical-grade Nylon PA12",
          quantity: "30 pieces",
          leadTime: "72 hours",
          application: "Medical prosthetics, Rehabilitation aids"
        },
        keywords: "medical prosthetics, 3D printed prosthetics, SLS technology, personalized customization, medical grade nylon",
        benefits: ["Personalized custom fit", "40% weight reduction", "Improved wearing comfort", "50% lower manufacturing costs"]
      },
      {
        id: 3,
        title: "Precision Small Parts Mass Production",
        slug: "precision-small-parts-mass-production",
        category: "Industrial Automation",
        description: "Batch production services of precision small parts for multiple industry clients, meeting diverse complex design requirements.",
        longDescription: "This case demonstrates how we provide batch production services of precision small parts for clients in multiple industries. Clients need to produce various small parts with complex geometries and high precision requirements, which are difficult and costly to achieve with traditional manufacturing methods. Through SLS 3D printing technology, we can quickly and economically produce various complex-shaped precision small parts, including impellers, connectors, brackets, etc. These parts are manufactured using high-performance nylon materials, offering excellent mechanical properties and dimensional stability, fully meeting the client's usage requirements.",
        image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/sls-print-examples-1024x471_20260117143102.webp",
        details: {
          material: "Nylon PA12/PA11",
          quantity: "200 pieces",
          leadTime: "120 hours",
          application: "Electronic devices, Precision machinery, Automotive parts"
        },
        keywords: "precision small parts, batch production, SLS printing, complex shapes, multi-industry applications",
        benefits: ["Complex shape integrated molding", "Low cost for small batch production", "Shortened delivery cycle", "Meeting strict tolerance requirements"]
      },
      {
        id: 4,
        title: "Heavy Machinery Base Components",
        slug: "heavy-machinery-base-components",
        category: "Industrial Automation",
        description: "Lightweight base components designed for heavy machinery, featuring high strength and excellent shock absorption performance.",
        longDescription: "This case showcases how we provide lightweight base component solutions for heavy machinery manufacturers. Traditional heavy machinery bases are usually made of metal materials, which are heavy and complex to process. Through SLS 3D printing technology and glass fiber reinforced nylon materials, we have successfully designed and manufactured lightweight but sufficiently strong base components, which are 35% lighter than traditional metal bases while maintaining good structural strength and shock absorption performance. The successful application of these components not only reduces the overall weight of heavy machinery but also improves the mobility and energy efficiency of the equipment.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Heavy%20machinery%20base%20components%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=58b8694b228aa6816de0225b6f5ba124",
        details: {
          material: "Glass Fiber Reinforced Nylon",
          quantity: "12 pieces",
          leadTime: "144 hours",
          application: "Heavy machinery equipment, Industrial automation equipment"
        },
        keywords: "heavy machinery base, lightweight design, glass fiber reinforced nylon, SLS printing, high strength",
        benefits: ["35% weight reduction", "Improved structural strength", "Excellent shock absorption performance", "Reduced transportation costs"]
      },
      {
        id: 5,
        title: "Automotive Parts Prototype",
        slug: "automotive-parts-prototype",
        category: "Automotive",
        description: "Engine component prototypes produced for a renowned automobile manufacturer, used for performance testing and assembly verification.",
        longDescription: "This case showcases our SLS 3D printing services for a leading domestic automobile manufacturer. The client needed to quickly produce a batch of high-precision engine component prototypes for performance testing and assembly verification. Traditional manufacturing methods would take weeks, but with our SLS technology, we completed the production of 12 parts in just 48 hours. These parts were manufactured using Nylon PA12 material, offering excellent mechanical properties and dimensional stability, fully meeting the client's testing requirements.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Automotive%20parts%20prototype%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=a9cf759bfab979a07daaf95dad2f68a5",
        details: {
          material: "Nylon PA12",
          quantity: "12 pieces",
          leadTime: "48 hours",
          application: "Functional testing, Assembly verification"
        },
        keywords: "automotive parts, SLS 3D printing, Nylon PA12, rapid prototyping, engine components",
        benefits: ["80% shorter development cycle", "60% lower prototype costs", "Ensured high precision and consistency", "No expensive tooling costs"]
      },
      {
        id: 6,
        title: "Medical Device Housing",
        slug: "medical-device-housing",
        category: "Medical",
        description: "Precision housing components produced for medical device companies, featuring complex internal structures and strict dimensional requirements.",
        longDescription: "We provided SLS 3D printing solutions for a professional medical device company, helping them rapidly produce precise medical device housing components. These components feature complex internal structures and strict dimensional requirements that are difficult and costly to achieve with traditional manufacturing methods. By using medical-grade Nylon PA12 material and our advanced SLS technology, we successfully manufactured components that meet medical industry standards and fully satisfy the client's design and functional requirements. A total of 25 products were produced for this project with a delivery cycle of just 72 hours, much shorter than required by traditional manufacturing methods.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Medical%20device%20housing%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20precision%20components%2C%20complex%20structure&sign=6bc7c47feba7a27852eabc52c7780493",
        details: {
          material: "Medical-grade Nylon PA12",
          quantity: "25 pieces",
          leadTime: "72 hours",
          application: "Medical device testing, Clinical verification"
        },
        keywords: "medical device housing, medical grade nylon, SLS printing, precision components, medical device testing",
        benefits: ["High-precision complex structure manufacturing", "Compliant with medical industry standards", "Rapid delivery for urgent needs", "Lower barrier for small batch production"]
      },
      {
        id: 7,
        title: "Industrial Robot Gripper",
        slug: "industrial-robot-gripper",
        category: "Industrial Automation",
        description: "Lightweight robotic end effectors designed for automated production lines, featuring high strength and durability.",
        longDescription: "This case demonstrates how we helped an automation equipment manufacturer optimize the design and production process of their robotic end effectors. The client needed lightweight but high-strength robot grippers to improve operational efficiency and reduce energy consumption on production lines. We recommended glass fiber reinforced nylon material and manufactured lightweight, high-strength grippers using SLS 3D printing technology. These grippers are 60% lighter than traditional metal grippers while maintaining sufficient strength and durability, greatly improving the robot's work efficiency and energy utilization.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Industrial%20robot%20gripper%2C%20SLS%203D%20printed%2C%20glass%20fiber%20reinforced%20nylon%2C%20lightweight%2C%20high%20strength&sign=d0e5cf14f3657d2e2ca50994c9522b19",
        details: {
          material: "Glass Fiber Reinforced Nylon",
          quantity: "8 pieces",
          leadTime: "96 hours",
          application: "Automated production lines, Material handling"
        },
        keywords: "robot gripper, lightweight design, glass fiber reinforced nylon, industrial automation, end effector",
        benefits: ["60% weight reduction", "Improved robot working efficiency", "30% reduced energy consumption", "Increased production flexibility"]
      },
      {
        id: 8,
        title: "Aerospace Bracket Component",
        slug: "aerospace-bracket-component",
        category: "Aerospace",
        description: "Lightweight bracket components produced for aerospace equipment manufacturers, meeting strict weight and strength requirements.",
        longDescription: "In this aerospace project, we produced a series of high-precision lightweight bracket components for our client. The aerospace industry has extremely strict requirements for component weight and strength, and traditional metal components are often heavy, increasing fuel consumption and launch costs. By using high-performance Nylon PA12 material and SLS 3D printing technology, we successfully manufactured bracket components that are 40% lighter than traditional metal components while maintaining the same structural strength and durability. These components passed rigorous performance tests and fully met the high standards of the aerospace industry.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Aerospace%20bracket%20component%2C%20SLS%203D%20printing%2C%20nylon%20PA12%2C%20lightweight%2C%20high%20strength-to-weight%20ratio&sign=f6197b02f746c3e1627455a21242e72e",
        details: {
          material: "High-performance Nylon PA12",
          quantity: "5 pieces",
          leadTime: "120 hours",
          application: "Aerospace equipment testing, Prototype verification"
        },
        keywords: "aerospace, lightweight components, high-performance nylon, SLS printing, bracket components",
        benefits: ["40% weight reduction", "Compliant with aerospace standards", "Complex structure integrated molding", "Shortened development and verification cycle"]
      },
      {
        id: 9,
        title: "Drone Structural Components",
        slug: "drone-structural-components",
        category: "Aerospace",
        description: "Lightweight structural parts produced for drone development companies, featuring high strength-to-weight ratio and complex geometries. Specialized in Drones parts manufacturing.",
        longDescription: "We provided customized SLS 3D printing services to a drone development company, helping them produce high-performance drone structural components. Drones have strict requirements for weight and strength, and traditional manufacturing methods struggle to achieve complex lightweight designs. Using carbon fiber reinforced nylon material and advanced SLS printing technology, we successfully manufactured structural components that met the client's requirements. These components are not only lightweight and high-strength but also feature complex geometries that fully satisfy the aerodynamic requirements of drones. Through our services, the client's drone development cycle was shortened by 50%, and they successfully reduced product weight, improving flight performance and battery life.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Drone%20structural%20parts%2C%20SLS%203D%20printed%2C%20lightweight%2C%20high%20strength%2C%20nylon%20material&sign=08e30fb399206ebc5a3befbe4195e47b",
        details: {
          material: "Carbon Fiber Reinforced Nylon",
          quantity: "15 pieces",
          leadTime: "108 hours",
          application: "Drone development, Prototype testing"
        },
        keywords: "drone, structural components, carbon fiber reinforced nylon, Drones parts manufacturing, lightweight design",
        benefits: ["30% improved flight performance", "25% extended battery life", "50% shortened development cycle", "Support for complex geometry designs"]
      },
      {
        id: 10,
        title: "Engineering Gear Set",
        slug: "engineering-gear-set",
        category: "Industrial Automation",
        description: "High-precision engineering gear sets produced for machinery manufacturers, featuring complex tooth profiles and strict fitting requirements.",
        longDescription: "This case demonstrates how we provided high-precision engineering gear set solutions for machinery manufacturers. The client needed to produce a batch of gear sets with complex tooth profiles and strict fitting requirements for testing the performance of new mechanical equipment. Traditional gear manufacturing methods require expensive molds and long production cycles, but with our SLS 3D printing technology, we were able to quickly and economically produce wear-resistant nylon gear sets that meet precision requirements. These gear sets performed excellently in testing, fully satisfying the client's functional requirements and helping them shorten product development cycles and reduce R&D costs.",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Engineering%20gear%20set%2C%20SLS%203D%20printed%2C%20nylon%20material%2C%20high%20precision%2C%20mechanical%20components&sign=9ea83fed639a0719e76d43dba3c6a9f6",
        details: {
          material: "Wear-resistant Nylon PA12",
          quantity: "20 pieces",
          leadTime: "96 hours",
          application: "Mechanical transmission systems, Equipment development"
        },
        keywords: "engineering gear set, high-precision gears, wear-resistant nylon, SLS printing, mechanical transmission",
        benefits: ["High-precision tooth profile manufacturing", "Reduced gear wear", "No complex tooling required", "Rapid iteration of design changes"]
      },
      {
        id: 11,
        title: "Automotive Manufacturing Solution",
        slug: "automotive-manufacturing-solution",
        category: "Automotive",
        description: "SLS 3D printing solutions for automotive manufacturers, accelerating R&D processes and reducing small-batch production costs.",
        longDescription: "This case showcases how we provide SLS 3D printing solutions for automotive manufacturers, helping them overcome cost and time challenges in small-batch production. Traditional automotive component production usually requires expensive tooling investments, which are particularly costly for small-batch production. Through SLS 3D printing technology, we can help clients avoid these expensive tooling costs while manufacturing complex structures that are difficult to achieve with traditional processes. The support-free nature of SLS technology allows design teams to innovate freely, enhancing design flexibility and accelerating the entire R&D process through rapid prototyping and testing. These advantages enable our clients to bring new products to market faster while reducing development costs.",
        image: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/WX20260117-180241@2x_20260117180812.png",
        details: {
          material: "Precimid1172Pro GF30 BLK (Glass Reinforced Nylon 12)",
          quantity: "15 pieces",
          leadTime: "72 hours",
          application: "Automotive component R&D, Small-batch production, Functional testing"
        },
        keywords: "automotive manufacturing, SLS 3D printing, small-batch production, complex structures, rapid prototyping",
        benefits: ["Avoid expensive tooling costs for small-batch production", "Complex structures without support", "Enhanced design flexibility", "Accelerated R&D process through rapid prototyping and testing"]
      }
    ];
  };

export default function Cases() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(language === 'en' ? "All" : "全部");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  
  const { t } = useLanguage();
  
   // 设置页面标题 - SEO优化
  useEffect(() => {
    document.title = "SLS 3D Printing Gallery | Real Projects in Drone, Auto & Medical";
  }, []);
  
  // 根据语言选择案例数据
  const currentCases = language === 'en' ? getEnglishCases() : caseStudies;
  
  // 根据语言选择分类
  const currentCategories = language === 'en' 
    ? ["All", "Automotive", "Medical", "Industrial Automation", "Aerospace"] 
    : ["全部", "汽车行业", "医疗行业", "工业自动化", "航空航天"];
  
  // 根据选择的类别筛选案例
  const filteredCases = selectedCategory === (language === 'en' ? "All" : "全部") 
    ? currentCases 
    : currentCases.filter(caseItem => caseItem.category === selectedCategory);
  
  // 获取当前选中的案例详情
  const currentCase = selectedCase !== null 
    ? currentCases.find(caseItem => caseItem.id === selectedCase) 
    : null;
  
  // 案例详情标签
  const detailLabels = language === 'en' 
    ? { material: "Material", quantity: "Quantity", leadTime: "Lead Time", application: "Application" }
    : { material: "材料", quantity: "数量", leadTime: "交付时间", application: "应用场景" };

  // 面包屑导航
  const breadcrumb = (
    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
      <Link to="/" className="hover:text-orange-500 transition-colors">
        {language === 'en' ? 'Home' : '首页'}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-orange-500 font-medium">{t('cases_title')}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {breadcrumb}
            
            {/* 页面SEO头部 */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {t('cases_title')}
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Explore our success cases in Flexible shoe sole prototyping, Drones parts manufacturing, and Watertight SLS parts production' 
                  : '探索我们在柔性鞋底原型制作、无人机零件制造和防水SLS零件生产方面的成功案例'}
              </p>
              
              {/* 案例筛选 */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {currentCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-orange-500 text-white font-medium shadow-md text-sm' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 案例卡片网格 - 主要展示区 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl cursor-pointer group"
                  onClick={() => setSelectedCase(caseItem.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {caseItem.category}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {caseItem.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 line-clamp-2">
                      {caseItem.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-medium text-xs md:text-sm">
                        {language === 'en' ? 'Read More' : '阅读详情'}
                      </span>
                      <i className="fa-solid fa-arrow-right text-orange-500 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* 案例详情模态框 - 简化版 */}
            {currentCase && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedCase(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <img 
                      src={currentCase.image} 
                      alt={currentCase.title} 
                      className="w-full h-64 object-cover"
                    />
                    <button
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                      onClick={() => setSelectedCase(null)}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                        {currentCase.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {currentCase.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentCase.longDescription}
                    </p>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-2">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.material}</p>
                          <p className="font-medium">{currentCase.details.material}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.quantity}</p>
                          <p className="font-medium">{currentCase.details.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.leadTime}</p>
                          <p className="font-medium">{currentCase.details.leadTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{detailLabels.application}</p>
                          <p className="font-medium">{currentCase.details.application}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setSelectedCase(null)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium rounded-md transition-colors"
                      >
                        {language === 'zh' ? '关闭' : 'Close'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Logo Chain Component */}
        <LogoChain />
       </main>
     </div>
   );
}