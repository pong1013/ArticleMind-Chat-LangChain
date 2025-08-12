import React, { useState, useEffect } from "react";
import AnswerSection from "../../components/AnswerSection/AnswerSection";
import FormSection from "../../components/FormSection/FormSection";
import styles from "./ChatBot.module.css";
import { apiService } from "../../services/api";

const ChatBot = () => {
  console.log("=== CHATBOT COMPONENT RENDER ===");
  
  const userEmail = localStorage.getItem("userEmail");
  const [remainingQuestions, setRemainingQuestions] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("ChatBot - userEmail:", userEmail);
  console.log("ChatBot - token exists:", !!localStorage.getItem("token"));

  // 檢查登入狀態
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!(token && email));
  }, []);

  const handleLogout = () => {
    console.log("=== LOGOUT TRIGGERED ===");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setRemainingQuestions(null);
    setIsAdmin(false);
  };

  const handleLogin = () => {
    console.log("=== LOGIN BUTTON CLICKED ===");
    window.location.href = "/login";
  };

  useEffect(() => {
    console.log("=== CHATBOT USE EFFECT ===");
    console.log("userEmail in useEffect:", userEmail);
    
    const fetchRemainingQuestions = async () => {
      try {
        console.log("Fetching user status...");
        setIsLoading(true);
        const data = await apiService.getUserStatus(userEmail);
        console.log("User status data:", data);
        setRemainingQuestions(data.remainingQuestions);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error fetching remaining questions:", error);
        if (error.message.includes("Authentication failed")) {
          console.log("Authentication failed in API call, logging out");
          handleLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail && isLoggedIn) {
      fetchRemainingQuestions();
    } else {
      setIsLoading(false);
    }
  }, [userEmail, isLoggedIn]);

  console.log("✅ ChatBot rendering successfully");
  return (
    <div className={styles.chatbot}>
      {/* 只有登入後才顯示用戶信息 */}
      {isLoggedIn && userEmail && (
        <div className="userEmailDisplay">
          <p className="hiText">Welcome  {isAdmin && <l className="adminTag">Admin</l>}
          </p>
          <span className="emailText">{userEmail}</span>
          <p className="remainingQuestions">
            Remaining Questions: {isLoading ? "Loading..." : (remainingQuestions !== null ? remainingQuestions : "Unknown")}
          </p>
        </div>
      )}
      
      {/* 登入/登出按鈕 */}
      {isLoggedIn ? (
        <button className={`${styles.logoutButton} logoutButton`} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className={`${styles.loginButton} loginButton`} onClick={handleLogin}>
          Login
        </button>
      )}
      
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Chien's ChatBot</h1>
        </div>
        <p>Hi I'm Chien's robot agency, feel free to ask me everything!</p>
      </div>
      
      {/* 總是顯示完整的聊天界面 */}
      <FormSection setRemainingQuestions={setRemainingQuestions} />
      <AnswerSection />
    </div>
  );
};

export default ChatBot;
