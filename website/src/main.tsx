import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/site.css";
/* 多语言两层,必须排在 site.css 之后才能覆盖字体变量与方向性声明。
   两者都只在 <html lang=…> / <html dir="rtl"> 命中时生效,英文站零影响。 */
import "./styles/fonts-i18n.css";
import "./styles/rtl.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
