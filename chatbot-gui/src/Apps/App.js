import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login/Login";
import ChatBot from "../views/ChatBot/ChatBot";
import "../assets/styles/scrollbar.css";
import "../index.css"; // 引入全局样式

const App = () => {
  console.log("=== APP RENDER ===");
  console.log("Current pathname:", window.location.pathname);
  
  return (
    <Router>
      <Routes>
        {/* 登入頁面 */}
        <Route path="/login" element={<Login />} />
        
        {/* ChatBot 頁面，不需要驗證，但會顯示登入按鈕 */}
        <Route path="/chatbot" element={<ChatBot />} />
        
        {/* 根路徑直接顯示聊天頁面 */}
        <Route path="/" element={<ChatBot />} />
        
        {/* 其他路徑重定向到聊天頁面 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
