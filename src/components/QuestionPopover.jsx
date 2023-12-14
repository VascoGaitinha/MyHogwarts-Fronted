import { useState } from "react";

const QuestionPopover = (props) => {
  const { question, index, isOpen, onToggle, setCorrectAnswers, correctAnswers} = props;
  const [option, setOption ] = useState(null);

  const handleOption = () => {
    if (option === "true") {
      setCorrectAnswers((prev) => prev + 1);
    } else {
        
    }
  };
  

  return (
    <div style={{ display: isOpen ? "flex" : "none", flexDirection: "column"}}>
        <h2>Question {index + 1} </h2>
      <h1>{question.question}</h1>
      <hr></hr>
      {question.answers.map((answer, answerIndex) => (
        <label key={answerIndex}>
          {answer.option}
          <input
            type="radio"
            name={`question-${index}`}
            value={answer.correct}
            onChange={(e) => setOption(e.target.value)}
          />
        </label>
      ))}
        <Button size="sm" onClick={() => { onToggle(); handleOption(); }}>
        Next
        </Button>
    </div>
  );
};

export default QuestionPopover;