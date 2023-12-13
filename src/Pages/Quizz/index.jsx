import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionPopover from "../../components/QuestionPopover";
import { Popover, PopoverContent, PopoverTrigger, Button } from "@nextui-org/react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

const QuizzPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizz, setQuizz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [solved, setSolved] = useState(false);
    const {quizzId} = useParams();

    useEffect(()=>{
        console.log(`REQUISTIG TO ${BACKEND}/api/quizz/${quizzId}`)
        axios.get(`${BACKEND}/api/quizz/${quizzId}`)
        .then((response)=>{
            setQuizz(response.data)
        })
        .catch((error)=> console.log(error))
        .finally(
            setLoading(false))
    },[])

  const togglePopover = (index) => {
    if (index >= quizz.questions.length) {
      setCurrentQuestionIndex(null);
    } else {
      setCurrentQuestionIndex(index);
      setSolved(true);
    }
  };

  return (
    <div className="centered">
        {!loading ?(
            <div>
      <h1>{quizz?.name}</h1>
      <hr></hr>
      <p>{quizz?.description}</p>
      <Popover
        placement="bottom"
        showArrow ={false}
        offset={0}
        backdrop="opaque"
        isOpen={currentQuestionIndex !== null}
        onToggle={() => setCurrentQuestionIndex(null)}
        className="center-popover"
      >
        <PopoverTrigger>
          <Button color="primary" size="lg" onClick={() => togglePopover(0)}>
            Start
          </Button>
        </PopoverTrigger>
        <PopoverContent >
          {quizz?.questions.map((q, index) => (  
            <QuestionPopover
              key={index}
              question={q}
              index={index}
              isOpen={currentQuestionIndex === index}
              setCorrectAnswers={setCorrectAnswers}
              correctAnswers={correctAnswers}
              onToggle={() => togglePopover(index + 1)} // Show the next question
            />
          ))}
        </PopoverContent>
      </Popover>
      </div>)
      :<p>Loading</p>
      }
    </div>
  );
};

export default QuizzPage;