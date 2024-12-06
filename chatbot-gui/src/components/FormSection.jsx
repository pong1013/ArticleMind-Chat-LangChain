import React, { useEffect, useState } from "react";
import AnswerSection from "./AnswerSection";
import Lottie from "react-lottie";
import animationData from "../animations/98993-three-dots-loading.json";
// import { Scrollbars } from "react-custom-scrollbars";

const FormSection = () => {
  const [input, setInput] = useState("");
  const [arrs, setArrs] = useState([]);
  const [loading, setLoading] = useState(false);


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
      body: JSON.stringify({ question: input }),
    };
    
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:3035/qa/ask", options);
      const data = await response.json();
      setInput("");
      setArrs([...arrs, data]);
    } catch (e) {
      console.log(e);
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
