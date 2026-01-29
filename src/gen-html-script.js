import fs from 'fs';
import path from 'path';

// 创建存放HTML文件的文件夹
const htmlDir = path.join(process.cwd(), 'html-pages');
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// 读取原始index.html文件内容
const indexHtmlPath = path.join(process.cwd(), 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 定义要生成的页面
const pages = [
  { filename: 'index.html', title: 'Professional SLS 3D Printing Service | TPM3D Manufacturing' },
  { filename: 'about.html', title: 'About Us | TPM3D Manufacturing' },
  { filename: 'services.html', title: '3D Printing Services | TPM3D Manufacturing' },
  { filename: 'technology.html', title: 'SLS 3D Printing Technology | TPM3D' },
  { filename: 'materials.html', title: '3D Printing Materials | TPM3D' },
  { filename: 'cases.html', title: 'Success Cases | TPM3D' },
  { filename: 'quote.html', title: '3D Printing Quote | TPM3D' },
  { filename: 'privacy.html', title: 'Privacy Policy | TPM3D' },
  { filename: 'terms.html', title: 'Terms of Service | TPM3D' },
  { filename: 'cookies.html', title: 'Cookie Policy | TPM3D' },
  { filename: 'contact-management.html', title: 'Contact Management | TPM3D' },
  { filename: '404.html', title: 'Page Not Found | TPM3D' }
];

// 生成每个页面的HTML文件
pages.forEach(page => {
  const pageHtmlContent = indexHtmlContent
    .replace(
      /<title>.*?<\/title>/,
      `<title>${page.title}</title>`
    );
  
  const pagePath = path.join(htmlDir, page.filename);
  fs.writeFileSync(pagePath, pageHtmlContent);
  console.log(`Generated ${pagePath}`);
});

// 生成简单的静态资源文件复制脚本
const copyResourcesScript = `import fs from 'fs';
import path from 'path';

// 复制CSS样式文件
try {
  // 注意：在ES模块中无法直接执行shell命令，此脚本主要用于演示
  
  // 复制静态资源
  const copyResources = () => {
    const distDir = path.join(process.cwd(), 'dist', 'static');
    const htmlPagesDir = path.join(process.cwd(), 'html-pages');
    
    if (fs.existsSync(distDir)) {
      // 复制所有静态资源到html-pages目录
      const copyRecursiveSync = (src, dest) => {
        if (fs.lstatSync(src).isDirectory()) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
          }
          fs.readdirSync(src).forEach(child => {
            copyRecursiveSync(path.join(src, child), path.join(dest, child));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };
      
      // 复制构建后的静态资源
      fs.readdirSync(distDir).forEach(item => {
        const srcPath = path.join(distDir, item);
        const destPath = path.join(htmlPagesDir, item);
        if (fs.existsSync(destPath)) {
          if (fs.lstatSync(destPath).isDirectory()) {
            fs.rmdirSync(destPath, { recursive: true });
          } else {
            fs.unlinkSync(destPath);
          }
        }
        if (fs.lstatSync(srcPath).isDirectory()) {
          fs.mkdirSync(destPath);
          fs.readdirSync(srcPath).forEach(child => {
            fs.copyFileSync(path.join(srcPath, child), path.join(destPath, child));
          });
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
      
      console.log('Static resources copied to html-pages directory');
    } else {
      console.error('dist/static directory does not exist');
    }
  };
  
  copyResources();
} catch (error) {
  console.error('Error during resource copying:', error);
}`;

// 将脚本保存到文件
const copyScriptPath = path.join(process.cwd(), 'copy-static-resources.js');
fs.writeFileSync(copyScriptPath, copyResourcesScript);
console.log(`Generated ${copyScriptPath}`);

console.log('All HTML pages and scripts have been generated successfully.');
console.log('Run "node copy-static-resources.js" after building to copy static resources.');