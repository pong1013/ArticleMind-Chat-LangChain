import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

//codeblock component is responsible for rendering code blocks with syntax highlighting
const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={coldarkCold}
      customStyle={{
        overflowX: "auto",
        paddingRight: "2em",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
      }}
    >
      {value}
    </SyntaxHighlighter>
  );
};
// AnswerSection somponent is for displaying a list of questions and answers
const AnswerSection = ({ arrs }) => {
  return (
    <div className="all-answer">
      <div className="scroll">
        {arrs
          ? arrs.map((value, index) => (
              <div className="answer-container" key={index}>
                <div className="question-section">
                  <img
                    className="user-icon"
                    src="https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png"
                    alt="user-icon"
                  />
                  <p className="question">{value.question}</p>
                </div>
                <div className="answer-section">
                  <img
                    className="chatbot-icon"
                    src="https://img.icons8.com/?size=512&id=m31DrURYH9au&format=png"
                    alt="chatbot-icon"
                  />
                  {/*Use the ReactMarkdown component to display the answer and support syntax highlighting for code blocks */}
                  <ReactMarkdown
                    className="answer"
                    /* */
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {value.answer}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AnswerSection;
