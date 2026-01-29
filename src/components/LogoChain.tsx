import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface LogoItem {
    id: number;
    url: string;
    alt: string;
}

const logoData: LogoItem[] = [{
    id: 1,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/Edser-Labs-logo_20260115171949.webp",
    alt: "Edser Labs"
}, {
    id: 2,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/chint-logo_20260115171949.webp",
    alt: "CHNT"
}, {
    id: 3,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/BLT-logo_20260115171949.webp",
    alt: "BLT"
}, {
    id: 4,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/YTS-Goup_20260115171949.webp",
    alt: "YTS-Group"
}, {
    id: 5,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/trauson-logo_20260115171949.webp",
    alt: "trauson"
}, {
    id: 6,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/Micropolis-Robotics-logo_20260115171949.webp",
    alt: "Micropolis Robotics"
}, {
    id: 7,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/LG-logo_20260115171949.webp",
    alt: "LG"
}, {
    id: 8,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/Hyundai-logo_20260115171950.webp",
    alt: "Hyundai"
}, {
    id: 9,
    url: "https://lf-code-agent.coze.cn/obj/x-ai-cn/320717878274/attachment/Gree-Logo_20260115171950.webp",
    alt: "Gree"
}];

export default function LogoChain() {
    const {
        language
    } = useLanguage();

    const containerVariants = {
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

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section
            className="py-12 bg-white dark:bg-gray-800"
            style={{
                backgroundImage: "url(https://space-static.coze.site/coze_space/7591691864719163694/upload/20231012031118682-1024x576.webp?sign=1771409442-e93a847d90-0-9f12af2a4983bf75b131a1aed9b56d3edba4dd7a671381629fe8751a3c0056d3)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%"
            }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2
                        className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {language === "en" ? "Trusted by Industry Leaders" : "受到行业领先企业的信任"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                        {language === "en" ? "We work with top companies across various industries" : "我们与各行业的顶级企业合作"}
                    </p>
                </div>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-5 items-center justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true
                    }}>
                    {logoData.map(logo => <motion.div
                        key={logo.id}
                        variants={itemVariants}
                        className="flex justify-center items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <img
                            src={logo.url}
                            alt={logo.alt}
                            className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                    </motion.div>)}
                </motion.div>
            </div>
        </section>
    );
}