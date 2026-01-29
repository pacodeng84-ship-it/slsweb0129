import fs from 'fs';
import path from 'path';

// 确保html-pages目录存在
const htmlDir = path.join(process.cwd(), 'html-pages');
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// 读取主index.html作为模板
const indexHtmlPath = path.join(process.cwd(), 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 页面配置
const pages = [
  { 
    filename: 'index.html', 
    title: 'SLS 3D Printing Service | Nylon PA12 & PA11 | 3-Day Turnaround',
    canonical: 'https://sls-3d.com/'
  },
  { 
    filename: 'about.html', 
    title: 'About Us | Your Dedicated SLS Additive Manufacturing Partner',
    canonical: 'https://sls-3d.com/about'
  },
  { 
    filename: 'services.html', 
    title: 'SLS 3D Printing Services | Prototyping & Low-Volume Production',
    canonical: 'https://sls-3d.com/services'
  },
  { 
    filename: 'technology.html', 
    title: 'SLS Technology | Powder Bed Fusion for Complex Geometries',
    canonical: 'https://sls-3d.com/technology'
  },
  { 
    filename: 'materials.html', 
    title: 'SLS Materials | Nylon PA12, PA11 & Glass-Filled (PA12GB)',
    canonical: 'https://sls-3d.com/materials'
  },
  { 
    filename: 'cases.html', 
    title: 'SLS 3D Printing Gallery | Real Projects in Drone, Auto & Medical',
    canonical: 'https://sls-3d.com/cases'
  },
  { 
    filename: 'quote.html', 
    title: '3D Printing Quote | TPM3D',
    canonical: 'https://sls-3d.com/quote'
  },
  { 
    filename: 'privacy.html', 
    title: 'Privacy Policy | TPM3D',
    canonical: 'https://sls-3d.com/privacy'
  },
  { 
    filename: 'terms.html', 
    title: 'Terms of Service | TPM3D',
    canonical: 'https://sls-3d.com/terms'
  },
  { 
    filename: 'cookies.html', 
    title: 'Cookie Policy | TPM3D',
    canonical: 'https://sls-3d.com/cookies'
  },
  { 
    filename: 'contact-management.html', 
    title: 'Contact Management | TPM3D',
    canonical: 'https://sls-3d.com/contact-management'
  },
  { 
    filename: '404.html', 
    title: 'Page Not Found | TPM3D',
    canonical: 'https://sls-3d.com/404'
  }
];

// 为每个页面生成HTML文件
pages.forEach(page => {
  let pageContent = indexHtmlContent
    // 更新标题
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    // 添加canonical链接
    .replace('</head>', `  <link rel="canonical" href="${page.canonical}" />\n  </head>`)
    // 保持script src路径为绝对路径，确保在任何路径下都能正确加载
    .replace(/src="\/src\/main.tsx"/, `src="/src/main.tsx"`);
  
  // 如果是404页面，添加适当的meta标签
  if (page.filename === '404.html') {
    pageContent = pageContent.replace(
      '</head>',
      '  <meta name="robots" content="noindex, nofollow">\n  </head>'
    );
  }
  
  // 写入文件
  const outputPath = path.join(htmlDir, page.filename);
  fs.writeFileSync(outputPath, pageContent);
  console.log(`Created ${outputPath}`);
});

// 确保在dist目录也生成一份，以便部署后能直接访问
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 复制生成的HTML文件到dist目录
pages.forEach(page => {
  const srcPath = path.join(htmlDir, page.filename);
  const destPath = path.join(distDir, page.filename);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${page.filename} to dist directory`);
});



console.log('All HTML pages have been successfully generated and copied to dist directory!');