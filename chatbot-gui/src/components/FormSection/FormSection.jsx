import React, { useEffect, useState } from "react";
import AnswerSection from "../AnswerSection/AnswerSection";
import Lottie from "react-lottie";
import animationData from "../../animations/loading.json";
import TopicButtons from "../TopicButtons/TopicButtons";
import topics from "../../data/topics";

const FormSection = ({setRemainingQuestions}) => {
  const [input, setInput] = useState("");
  const [arrs, setArrs] = useState([]);
  const [loading, setLoading] = useState(false);
  // User Question Restriction
  const [errorMessage, setErrorMessage] = useState("");



  useEffect(() => {
    const cleanChatHistory = async () => {
      try {
        const options = {
          method: "GET",
        };
        await fetch("http://127.0.0.1:3035/qa/clean-chat-history", options);
      } catch (error) {
        console.log(error);
      }
    };

    cleanChatHistory();
  }, []);

  const handleTopicClick = (question) => {
    setInput(question); // 将按钮的问题填充到输入框
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    // console.log(input);
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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: input, user_email:localStorage.getItem("userEmail") }),
    };
    
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await fetch("http://127.0.0.1:3035/qa/ask", options);

      if (response.status === 403) {
        // 如果提问次数已用尽，显示错误信息
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        return;
      }

      const data = await response.json();
      setInput("");
      setArrs([...arrs, data]);

      // Update Remain Questions
      if (data.remainingQuestions !== undefined) {
        setRemainingQuestions(data.remainingQuestions);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setInput("");
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

      {loading && <Lottie options={loadingOptions} height={50} width={100} />}
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
