import React, { useEffect, useState } from "react";
import AnswerSection from "../AnswerSection/AnswerSection";
import Lottie from "react-lottie";
import animationData from "../../animations/loading.json";
import TopicButtons from "../TopicButtons/TopicButtons";
import topics from "../../data/topics";
import { apiService } from "../../services/api";

const FormSection = ({setRemainingQuestions}) => {
  const [input, setInput] = useState("");
  const [arrs, setArrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const cleanChatHistory = async () => {
      try {
        await apiService.clearChatHistory();
      } catch (error) {
        console.log("Clear chat history error:", error);
      }
    };

    cleanChatHistory();
  }, []);

  const handleTopicClick = (question) => {
    setInput(question);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendInputToPython();
    console.log(input);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      handleSubmit(event);
    }
  }

  const sendInputToPython = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setInput("");
      
      const userEmail = localStorage.getItem("userEmail");
      const data = await apiService.sendMessage(input, userEmail);
      
      setArrs([...arrs, data]);

      if (data.remainingQuestions !== undefined) {
        setRemainingQuestions(data.remainingQuestions);
      }
    } catch (e) {
      console.log(e);
      if (e.message.includes("Authentication failed")) {
        setErrorMessage("登入已過期，請重新登入");
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="form-section">
      <div className="info-bar">
        {/* 显示错误信息 */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <TopicButtons topics={topics} onSelectTopic={handleTopicClick} />

      <AnswerSection arrs={arrs} />

      {loading && (
        <div className="loading-container">
          <Lottie options={loadingOptions} height={50} width={100} />
          <p style={{ marginLeft: '10px', color: '#667eea', fontWeight: '600' }}>
            Generating response...
          </p>
        </div>
      )}
      <div className="reduction" />
      <div className="ask-form">
        <textarea
          rows="2"
          className="form-control"
          placeholder="Ask me anything..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" type="button" onClick={handleSubmit}>
          Generate Response
        </button>
      </div>
    </div>
  );
};

export default FormSection;
