import React from "react";
import styles from "./TopicButtons.module.css";

const TopicButtons = ({ topics, onSelectTopic }) => {
  return (
    <div className={styles.topicButtons}>
      {topics.map((topic, index) => (
        <button
          key={index}
          className={styles.button}
          onClick={() => onSelectTopic(topic.question)}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
};

export default TopicButtons;
