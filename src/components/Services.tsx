import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

const serviceImages = [
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=3D%20printed%20nylon%20prototypes%2C%20industrial%20parts%2C%20mechanical%20components&sign=3e95ea053c173c84224b089d8ba964d4",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Engineering%20handboards%2C%20SLS%203D%20printing%2C%20nylon%20material%2C%20high%20precision&sign=77a5690d83dbc2fd3849eae925027aac",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Small%20batch%20production%2C%20manufacturing%20samples%2C%20industrial%20design&sign=8baf62f680e4c706d8029ab88cd97009"
];

const serviceFeaturesEN = [{
    id: 1,

    features: [
        "High-precision detail reproduction",
        "Multiple color materials available",
        "Rapid prototyping",
        "Cost-effective"
    ]
}, {
    id: 2,

    features: [
        "High-strength nylon material",
        "Impact and corrosion resistance",
        "Good dimensional stability",
        "Available for post-processing"
    ]
}, {
    id: 3,

    features: [
        "Good batch consistency",
        "Short production cycle",
        "No mold costs",
        "On-demand production"
    ]
}];

export default function Services() {
    const {
        t,
        language
    } = useLanguage();

    const serviceTypes = [{
        id: 1,
        title: t("service_1_title"),
        description: t("service_1_desc"),
        icon: <i className="fa-solid fa-cube text-orange-500"></i>,
        features: language === "en" ? serviceFeaturesEN[0].features : ["高精度细节还原", "多色材料可选", "快速成型", "成本效益高"]
    }, {
        id: 2,
        title: t("service_2_title"),
        description: t("service_2_desc"),
        icon: <i className="fa-solid fa-tools text-orange-500"></i>,
        features: language === "en" ? serviceFeaturesEN[1].features : ["高强度尼龙材料", "耐冲击耐腐蚀", "尺寸稳定性好", "可进行后处理"]
    }, {
        id: 3,
        title: t("service_3_title"),
        description: t("service_3_desc"),
        icon: <i className="fa-solid fa-industry text-orange-500"></i>,
        features: language === "en" ? serviceFeaturesEN[2].features : ["批量一致性好", "生产周期短", "无模具成本", "按需生产"]
    }];

    return (
        <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {t("services_title")}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                        {t("services_subtitle")}
                    </p>
                </div>
                {}
                <div className="mb-12 overflow-hidden rounded-xl shadow-xl">
                    <div className="relative h-52 md:h-72">
                        {serviceImages.map((image, index) => <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? "opacity-100" : "opacity-0"}`}
                            style={{
                                animationDelay: `${index * 5}s`
                            }}>
                            <img
                                src={image}
                                alt="SLS 3D printing machine printing nylon parts"
                                className="w-full h-full object-cover" />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"
                                style={{
                                    backgroundImage: "url(https://space-static.coze.site/coze_space/7591691864719163694/upload/sls-print-examples-1024x471.webp?sign=1771409000-225bef077a-0-8c1087052a88135ff7be07f36bbc979c92af992a1bd319611667e2ab8b3d613d)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "50% 50%",
                                    backgroundSize: "contain"
                                }}></div>
                        </div>)}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <></>
                            <></>
                        </div>
                    </div>
                </div>
                {}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {serviceTypes.map(service => <div
                        key={service.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-5 border border-gray-100 dark:border-gray-700 card-hover">
                        <div
                            className="bg-orange-50 dark:bg-orange-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-lg sm:text-xl">{service.icon}</div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {service.description}
                        </p>
                        <ul className="space-y-1.5 mb-4">
                            {service.features.map(
                                (feature, idx) => <li key={idx} className="flex items-start text-xs sm:text-sm">
                                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                </li>
                            )}
                        </ul>
                    </div>)}
                </div>
            </div>
        </section>
    );
}