import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import "./components/scrollbar.css";

const App = () => {
  return (
    <div>
      <div className="header-section">
        <h1>Chien's ChatBot</h1>
        <p>
          Hi I'm Chien's robot agency, feel free to ask me everything!
        </p>
      </div>

      <FormSection />

      <AnswerSection />
    </div>
  );
};

export default App;
