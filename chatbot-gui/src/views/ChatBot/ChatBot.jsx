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

  console.log("ChatBot - userEmail:", userEmail);
  console.log("ChatBot - token exists:", !!localStorage.getItem("token"));

  const handleLogout = () => {
    console.log("=== LOGOUT TRIGGERED ===");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
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
          // 如果認證失敗，重定向到登入頁面
          handleLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchRemainingQuestions();
    } else {
      console.log("No userEmail found in useEffect");
    }
  }, [userEmail]);

  // 如果沒有用戶郵箱，重定向到登入頁面
  if (!userEmail) {
    console.log("❌ No userEmail in ChatBot, redirecting to login");
    handleLogout();
    return null;
  }

  console.log("✅ ChatBot rendering successfully");
  return (
    <div className={styles.chatbot}>
      {userEmail && (
        <div className="userEmailDisplay">
          <p className="hiText">Welcome  {isAdmin && <l className="adminTag">Admin</l>}
          </p>
          <span className="emailText">{userEmail}</span>
          {/* 显示剩余提问次数 */}
          <p className="remainingQuestions">
            Remaining Questions: {isLoading ? "Loading..." : (remainingQuestions !== null ? remainingQuestions : "Unknown")}
          </p>
        </div>
      )}
      <button className={`${styles.logoutButton} logoutButton`} onClick={handleLogout}>
        Logout
      </button>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Chien's ChatBot</h1>
        </div>
        <p>Hi I'm Chien's robot agency, feel free to ask me everything!</p>
      </div>
      <FormSection setRemainingQuestions={setRemainingQuestions} />
      <AnswerSection />
    </div>
  );
};

export default ChatBot;
