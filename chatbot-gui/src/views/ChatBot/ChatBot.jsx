import React, { useState } from "react";
import AnswerSection from "../../components/AnswerSection/AnswerSection";
import FormSection from "../../components/FormSection/FormSection";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  // 从 localStorage 获取用户信息
  const userEmail = localStorage.getItem("userEmail");
  const [remainingQuestions, setRemainingQuestions] = useState(10); // 初始为 10

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // 同时移除 email
    window.location.href = "/login";
  };

  return (
    <div className={styles.chatbot}>
      {userEmail && (
        <div className="userEmailDisplay">
          <p className="hiText">Welcome</p>
          <span className="emailText">{userEmail}</span>
          {/* 显示剩余提问次数 */}
          <p className="remainingQuestions">Remaining Questions: {remainingQuestions}</p>
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
