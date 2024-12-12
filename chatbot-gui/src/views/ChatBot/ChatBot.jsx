import React from "react";
import AnswerSection from "../../components/AnswerSection/AnswerSection";
import FormSection from "../../components/FormSection/FormSection";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  // 假設您已經有了從登入後存儲的使用者資訊
  const userEmail = localStorage.getItem("userEmail"); // 從localStorage取得email

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // 同時移除email
    window.location.href = "/login";
  };

  return (
    <div className={styles.chatbot}>
      {userEmail && (
        <div className="userEmailDisplay">
        <p className="hiText">Welcome </p>
        <span className="emailText">{userEmail}</span>
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
      <FormSection />
      <AnswerSection />
    </div>
  );
};

export default ChatBot;