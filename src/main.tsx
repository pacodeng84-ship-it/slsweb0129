import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App";
import "./index.css";

// 添加一个简单的检查，确保在任何环境下路由都能正常工作
if (import.meta.env.PROD) {
  // 在生产环境中，可以添加一些特定的配置
  console.log('Production environment detected - routing configured for SPA');
} else {
  console.log('Development environment detected - using Vite dev server routing');
}

// 确保使用React 18的createRoot API而不是旧版的ReactDOM.render
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
