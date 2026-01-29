import fs from 'node:fs';
import path from 'node:path';

// 这里修改为标准的 dist 目录，不要再用 dist/static 了
const distPath = path.resolve('dist');
const redirectsPath = path.join(distPath, '_redirects');
const rule = '/* /index.html 200';

try {
  // 确保 dist 目录存在
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  // 写入规则文件
  fs.writeFileSync(redirectsPath, rule);
  console.log('✅ 成功生成 _redirects 文件 (解决 404 问题)');
} catch (error) {
  console.error('❌ 生成失败:', error);
  process.exit(1);
}
