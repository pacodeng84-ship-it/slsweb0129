import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 20
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.6
        }
    }
};

const staggerContainer = {
    hidden: {
        opacity: 0
    },

    visible: {
        opacity: 1,

        transition: {
            staggerChildren: 0.1
        }
    }
};

interface TechAdvantageProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const TechAdvantage: React.FC<TechAdvantageProps> = (
    {
        icon,
        title,
        description
    }
) => {
    return (
        <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div
                className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <div className="text-orange-500 text-xl">{icon}</div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </motion.div>
    );
};

interface ApplicationProps {
    image: string;
    title: string;
    description: string;
}

const Application: React.FC<ApplicationProps> = (
    {
        image,
        title,
        description
    }
) => {
    return (
        <motion.div
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p
                    className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    toggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = (
    {
        question,
        answer,
        isOpen,
        toggle
    }
) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={toggle}>
                <span className="font-medium text-gray-900 dark:text-white">{question}</span>
                <i
                    className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-orange-500 transition-transform`}></i>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{
                    duration: 0.3
                }}
                className="overflow-hidden">
                <p className="py-2 pb-4 text-gray-600 dark:text-gray-300 text-sm">{answer}</p>
            </motion.div>
        </div>
    );
};

import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import ExpandableContactForm from "@/components/ExpandableContactForm";

export default function SLSTechnology() {
    const {
        t,
        language
    } = useLanguage();
    
    // 设置页面标题，确保与SEO配置一致
    useEffect(() => {
      document.title = "SLS Technology | Powder Bed Fusion for Complex Geometries";
    }, []);

    const {
        openContactModal
    } = useContext(AuthContext);

    const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);
    const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const techAdvantages = [{
        icon: <i className="fa-solid fa-cogs"></i>,
        title: t("sls_advantage_1_title"),
        description: t("sls_advantage_1_desc")
    }, {
        icon: <i className="fa-solid fa-ruler-combined"></i>,
        title: t("sls_advantage_2_title"),
        description: t("sls_advantage_2_desc")
    }, {
        icon: <i className="fa-solid fa-clock"></i>,
        title: t("sls_advantage_3_title"),
        description: t("sls_advantage_3_desc")
    }, {
        icon: <i className="fa-solid fa-industry"></i>,
        title: t("sls_advantage_4_title"),
        description: t("sls_advantage_4_desc")
    }, {
        icon: <i className="fa-solid fa-recycle"></i>,
        title: t("sls_advantage_5_title"),
        description: t("sls_advantage_5_desc")
    }, {
        icon: <i className="fa-solid fa-layer-group"></i>,
        title: t("sls_advantage_6_title"),
        description: t("sls_advantage_6_desc")
    }];

    const applications = [{
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Automotive%20SLS%203D%20printed%20parts%2C%20nylon%20material%2C%20engine%20components%2C%20automotive%20industry&sign=6cc3ad5957f66780b753cce252105b6d",
        title: t("sls_app_1_title"),
        description: t("sls_app_1_desc")
    }, {
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Medical%20device%20components%203D%20printed%20with%20SLS%2C%20nylon%20material%2C%20surgical%20tools%2C%20prosthetics&sign=2cd220a1c3f4cf486d6c2882d1e696ab",
        title: t("sls_app_2_title"),
        description: t("sls_app_2_desc")
    }, {
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Aerospace%20SLS%203D%20printed%20parts%2C%20lightweight%20components%2C%20nylon%20material%2C%20aircraft%20parts&sign=04ba43e48fd0b9ade43281d77dbe5f8b",
        title: t("sls_app_3_title"),
        description: t("sls_app_3_desc")
    }, {
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Consumer%20products%203D%20printed%20with%20SLS%2C%20nylon%20material%2C%20custom%20designs%2C%20household%20items&sign=729b858ca276f57678c6cabd56665fd8",
        title: t("sls_app_4_title"),
        description: t("sls_app_4_desc")
    }];

    const faqs = [{
        question: t("sls_faq_1_q"),
        answer: t("sls_faq_1_a")
    }, {
        question: t("sls_faq_2_q"),
        answer: t("sls_faq_2_a")
    }, {
        question: t("sls_faq_3_q"),
        answer: t("sls_faq_3_a")
    }, {
        question: t("sls_faq_4_q"),
        answer: t("sls_faq_4_a")
    }, {
        question: t("sls_faq_5_q"),
        answer: t("sls_faq_5_a")
    }];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="pt-16">
                {}
                <section
                    className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
                        <div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
                    </div>
                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <div className="max-w-3xl">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true
                                }}
                                variants={fadeInUp}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                    {t("sls_hero_title")}
                                </h1>
                                <p className="text-xl text-gray-300 mb-8">
                                    {t("sls_hero_subtitle")}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
                </section>
                {}
                <section className="py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t("sls_intro_desc")}
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {t("sls_benefits_title")}
                            </h3>
                        </motion.div>
                        
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {[
                                    { title: t("sls_benefit_1_title"), desc: t("sls_benefit_1_desc") },
                                    { title: t("sls_benefit_2_title"), desc: t("sls_benefit_2_desc") },
                                    { title: t("sls_benefit_3_title"), desc: t("sls_benefit_3_desc") },
                                    { title: t("sls_benefit_4_title"), desc: t("sls_benefit_4_desc") }
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true
                                        }}
                                        variants={fadeInUp}
                                        className="flex items-start bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                                    >
                                        <i className="fa-solid fa-check-circle text-green-500 mt-1 mr-3 text-xl flex-shrink-0"></i>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-white block mb-1">
                                                {benefit.title}
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                                                {benefit.desc}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {}
                <section id="how-it-works" className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="rounded-xl overflow-hidden shadow-xl mb-12">
                            <img
                                src="https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/SLS_20260128163229.gif"
                                alt="SLS 3D Printing Process"
                                className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {t("sls_how_title")}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t("sls_how_desc")}
                            </p>
                        </motion.div>
                        <div className="max-w-6xl mx-auto">
                            <div className="relative">
                                {}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                    {}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true
                                        }}
                                        variants={fadeInUp}
                                        className="text-center">
                                        <div
                                            className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                            <span className="text-orange-500 text-xl font-bold">1</span>
                                            <div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {t("sls_step_1_title")}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {t("sls_step_1_desc")}
                                        </p>
                                    </motion.div>
                                    {}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true
                                        }}
                                        variants={fadeInUp}
                                        className="text-center">
                                        <div
                                            className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                            <span className="text-orange-500 text-xl font-bold">2</span>
                                            <div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {t("sls_step_2_title")}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {t("sls_step_2_desc")}
                                        </p>
                                    </motion.div>
                                    {}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true
                                        }}
                                        variants={fadeInUp}
                                        className="text-center">
                                        <div
                                            className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                            <span className="text-orange-500 text-xl font-bold">3</span>
                                            <div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {t("sls_step_3_title")}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {t("sls_step_3_desc")}
                                        </p>
                                    </motion.div>
                                    {}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true
                                        }}
                                        variants={fadeInUp}
                                        className="text-center">
                                        <div
                                            className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                            <span className="text-orange-500 text-xl font-bold">4</span>
                                            <div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {t("sls_step_4_title")}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {t("sls_step_4_desc")}
                                        </p>
                                    </motion.div>
                                </div>
                                {}
                                <div
                                    className="absolute top-8 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-gray-200 dark:bg-gray-700 hidden md:block">
                                    <div className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {}
                 <section className="py-12 bg-gray-50 dark:bg-gray-900">
                     <div className="container mx-auto px-4">
                         <motion.div
                             initial="hidden"
                             whileInView="visible"
                             viewport={{
                                 once: true
                             }}
                             variants={fadeInUp}
                             className="max-w-4xl mx-auto text-center mb-12">
                             <h2
                                 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                 {t("sls_tech_adv_title")}
                             </h2>
                             <p className="text-lg text-gray-600 dark:text-gray-300">
                                 {t("sls_tech_adv_desc")}
                             </p>
                         </motion.div>
                         <motion.div
                             initial="hidden"
                             whileInView="visible"
                             viewport={{
                                 once: true
                             }}
                             variants={staggerContainer}
                             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
                             {techAdvantages.map((advantage, index) => <TechAdvantage
                                 key={index}
                                 icon={advantage.icon}
                                 title={advantage.title}
                                 description={advantage.description} />)}
                        </motion.div>
                    </div>
                </section>
                {}
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {t("sls_applications_title")}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t("sls_applications_desc")}
                            </p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                            {applications.map((app, index) => <Application
                                key={index}
                                image={app.image}
                                title={app.title}
                                description={app.description} />)}
                        </motion.div>
                    </div>
                </section>
                {}
                <section className="py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {t("sls_materials_title")}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t("sls_materials_desc")}
                            </p>
                        </motion.div>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                            {}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true
                                }}
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=PA12%20nylon%20powder%2C%20SLS%203D%20printing%20material%2C%20white%20powder%2C%20plastic%20material&sign=d83ff5b701991c78b3785a1947dceb8d"
                                        alt="PA12 Nylon Material"
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PA12</h3>
                                    <p className="text-sm text-orange-500 font-medium mb-3">{t("sls_mat_pa12_type")}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        {t("sls_mat_pa12_desc")}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_strength")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">52 MPa</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_heat")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">175°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_density")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">1.02 g/cm³</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true
                                }}
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=PA11%20nylon%20powder%2C%20SLS%203D%20printing%20material%2C%20natural%20color%20powder%2C%20biobased%20material&sign=5742fb3e5cc335089f1f9e8d8eb33fdf"
                                        alt={language === "zh" ? "PA11尼龙材料" : "PA11 Nylon Material"}
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PA11</h3>
                                    <p className="text-sm text-green-500 font-medium mb-3">{t("sls_mat_pa11_type")}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        {t("sls_mat_pa11_desc")}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_strength")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">48 MPa</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_elongation")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">45%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_impact")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{t("sls_mat_high")}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true
                                }}
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Glass%20fiber%20reinforced%20nylon%20powder%2C%20SLS%203D%20printing%20material%2C%20composite%20material%2C%20high%20strength&sign=cadf91bf90fb91983523eb508ac6aed0"
                                        alt={language === "zh" ? "玻纤增强尼龙材料" : "Glass-filled Nylon Material"}
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {t("sls_mat_glass_title")}
                                    </h3>
                                    <p className="text-sm text-blue-500 font-medium mb-3">{t("sls_mat_glass_type")}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        {t("sls_mat_glass_desc")}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_strength")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">70 MPa</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_stiffness")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">3500 MPa</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t("sls_mat_heat")}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">190°C</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="text-center mt-12">
                            <a
                                href="/materials"
                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors">
                                {t("sls_mat_more")} <i className="fa-solid fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </section>
                 {}
                {/* 新增的尼龙材料环保性展示部分 */}
                <section className="py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {language === 'zh' ? '尼龙材料的环保特性' : 'Nylon Material Sustainability'}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {language === 'zh' 
                                    ? 'SLS 3D打印使用的尼龙材料具有优异的环保特性，支持可持续制造实践' 
                                    : 'Nylon materials used in SLS 3D printing offer excellent environmental characteristics, supporting sustainable manufacturing practices'}
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {/* 环保特性卡片 1：材料可回收 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-recycle text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '材料可回收' : 'Material Recyclability'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? '未烧结的尼龙粉末可重复使用，减少材料浪费，提高资源利用率' 
                                        : 'Unsintered nylon powder can be reused, reducing material waste and improving resource utilization'}
                                </p>
                            </motion.div>
                            
                            {/* 环保特性卡片 2：减少生产浪费 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-leaf text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '减少生产浪费' : 'Reduced Production Waste'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? '增材制造技术仅使用所需材料，相比传统减法制造大幅减少废料产生' 
                                        : 'Additive manufacturing only uses necessary materials, significantly reducing waste compared to traditional subtractive manufacturing'}
                                </p>
                            </motion.div>
                            
                            {/* 环保特性卡片 3：生物基尼龙 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-seedling text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '生物基尼龙选项' : 'Biobased Nylon Options'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? 'PA11等生物基尼龙来源于可再生资源（如蓖麻油），降低对化石燃料的依赖' 
                                        : 'Biobased nylons like PA11 are derived from renewable resources (e.g., castor oil), reducing dependence on fossil fuels'}
                                </p>
                            </motion.div>
                            
                            {/* 环保特性卡片 4：能源效率 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-bolt text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '能源效率' : 'Energy Efficiency'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? 'SLS工艺相比传统制造方法能耗更低，特别是在小批量生产时' 
                                        : 'SLS process consumes less energy compared to traditional manufacturing methods, especially for small batch production'}
                                </p>
                            </motion.div>
                            
                            {/* 环保特性卡片 5：产品轻量化 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-feather-alt text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '产品轻量化' : 'Product Lightweighting'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? '尼龙3D打印部件可实现复杂轻量化设计，减少产品整体重量，降低运输能耗' 
                                        : 'Nylon 3D printed parts enable complex lightweight designs, reducing overall product weight and transportation energy consumption'}
                                </p>
                            </motion.div>
                            
                            {/* 环保特性卡片 6：延长产品寿命 */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                    <i className="fa-solid fa-clock text-green-500 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                    {language === 'zh' ? '延长产品寿命' : 'Extended Product Lifespan'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {language === 'zh' 
                                        ? '按需生产备件和维修部件，延长现有产品使用寿命，减少资源消耗' 
                                        : 'On-demand production of spare and repair parts extends the lifespan of existing products, reducing resource consumption'}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
                {}
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {t("sls_faq_title")}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t("sls_faq_desc")}
                            </p>
                        </motion.div>
                        <div className="max-w-3xl mx-auto">
                            {faqs.map((faq, index) => <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openFAQ === index}
                                toggle={() => toggleFAQ(index)} />)}
                        </div>
                    </div>
                </section>
                {}
                <section
                    className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
                        <div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true
                            }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {t("sls_cta_title")}
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                                {t("sls_cta_desc")}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={() => setIsContactFormExpanded(!isContactFormExpanded)}
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md text-lg transition-all duration-300 border border-white/20">
                                    <i className="fa-solid fa-envelope mr-2"></i>{language === "zh" ? "联系我们" : "Contact Us"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
                {}
                <ExpandableContactForm
                    isExpanded={isContactFormExpanded}
                    onToggle={() => setIsContactFormExpanded(!isContactFormExpanded)} />
            </main>
        </div>
    );
}