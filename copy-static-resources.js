import fs from 'fs';
import path from 'path';

// 复制静态资源到html-pages目录
const copyStaticResources = () => {
  try {
    const distDir = path.join(process.cwd(), 'dist', 'static');
    const htmlPagesDir = path.join(process.cwd(), 'html-pages');
    
    // 确保目标目录存在
    if (!fs.existsSync(htmlPagesDir)) {
      fs.mkdirSync(htmlPagesDir, { recursive: true });
    }
    
    if (!fs.existsSync(distDir)) {
      console.error('Build directory does not exist. Please run npm run build first.');
      process.exit(1);
    }
    
    // 复制dist/static目录下的所有文件和文件夹到html-pages
    const copyRecursive = (src, dest) => {
      if (fs.lstatSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest);
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);
          copyRecursive(srcPath, destPath);
        });
      } else {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${dest.replace(process.cwd(), '.')}`);
      }
    };
    
    // 复制index.html作为备用入口
    fs.copyFileSync(
      path.join(process.cwd(), 'index.html'), 
      path.join(htmlPagesDir, 'index-backup.html')
    );
    

    
    // 复制静态资源
    const staticFiles = fs.readdirSync(distDir);
    staticFiles.forEach(file => {
      const srcPath = path.join(distDir, file);
      const destPath = path.join(htmlPagesDir, file);
      copyRecursive(srcPath, destPath);
    });
    
    console.log('\nAll static resources have been copied to the html-pages directory.');
    console.log('You can now deploy the html-pages directory as a static website.');
  } catch (error) {
    console.error('Error during resource copying:', error);
    process.exit(1);
  }
};
  
copyStaticResources();