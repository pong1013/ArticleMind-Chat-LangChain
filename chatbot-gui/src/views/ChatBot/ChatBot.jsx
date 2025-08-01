import React, { useState, useEffect } from "react";
import AnswerSection from "../../components/AnswerSection/AnswerSection";
import FormSection from "../../components/FormSection/FormSection";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '/qa'; 
  const userEmail = localStorage.getItem("userEmail"); // 从 localStorage 获取用户邮箱
  const [remainingQuestions, setRemainingQuestions] = useState(null); // 初始为 null，表示未加载
  const [isAdmin, setIsAdmin] = useState(false); // 是否为管理员

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  // 登录时主动获取剩余提问次数
  useEffect(() => {
    const fetchRemainingQuestions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user-status?user_email=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setRemainingQuestions(data.remainingQuestions);
          setIsAdmin(data.isAdmin); // 如果返回了管理员状态，更新到状态
        } else {
          console.error("Failed to fetch user status");
        }
      } catch (error) {
        console.error("Error fetching remaining questions:", error);
      }
    };

    if (userEmail) {
      fetchRemainingQuestions();
    }
  }, [BACKEND_URL,userEmail]);

  return (
    <div className={styles.chatbot}>
      {userEmail && (
        <div className="userEmailDisplay">
          <p className="hiText">Welcome  {isAdmin && <l className="adminTag">Admin</l>}
          </p>
          <span className="emailText">{userEmail}</span>
          {/* 显示剩余提问次数 */}
          <p className="remainingQuestions">
            Remaining Questions: {remainingQuestions !== null ? remainingQuestions : "Loading..."}
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
