import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login/Login";
import ChatBot from "../views/ChatBot/ChatBot";
import "../assets/styles/scrollbar.css";
import "../index.css"; // 引入全局样式


// 权限控制组件
const RequireAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
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
        {/* 預設路徑跳轉 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
