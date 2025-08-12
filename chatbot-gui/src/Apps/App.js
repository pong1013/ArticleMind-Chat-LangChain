import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login/Login";
import ChatBot from "../views/ChatBot/ChatBot";
import "../assets/styles/scrollbar.css";
import "../index.css"; // 引入全局样式


// 权限控制组件
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");
  
  console.log("=== REQUIRE AUTH CHECK ===");
  console.log("Current URL:", window.location.href);
  console.log("Token exists:", !!token);
  console.log("User email exists:", !!userEmail);
  console.log("Token length:", token ? token.length : 0);
  console.log("User email:", userEmail);
  
  // 檢查是否有有效的 token 和用戶郵箱
  if (!token || !userEmail) {
    console.log("❌ Authentication failed - redirecting to login");
    console.log("Token exists:", !!token);
    console.log("Email exists:", !!userEmail);
    return <Navigate to="/login" replace />;
  }
  
  console.log("✅ Authentication successful - rendering children");
  return children;
};

const App = () => {
  console.log("=== APP RENDER ===");
  console.log("Current pathname:", window.location.pathname);
  
  return (
    <Router>
      <Routes>
        {/* 登入頁面 */}
        <Route path="/login" element={<Login />} />
        
        {/* ChatBot 頁面，需要驗證 */}
        <Route
          path="/chatbot"
          element={
            <RequireAuth>
              <ChatBot />
            </RequireAuth>
          }
        />
        
        {/* 根路徑重定向到登入頁面 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 其他路徑重定向到登入頁面 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
