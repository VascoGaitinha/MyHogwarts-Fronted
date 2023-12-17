import { useContext, useEffect, useState } from "react";
import "./index.css"
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

const QuizzPopover = (props) => {
  const { quizzId, user } = props;
  const [ option, setOption ] = useState(null);
  const [ quizz, setQuizz ] = useState({});
  const { BACKEND} = useContext(AuthContext);
  const [ indexToShow, setIndexToShow ] = useState(0);
  const [ isDone, setIsDone ] = useState(false);
  const [ points, setPoints ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);



  useEffect(()=>{
    axios.get(`${BACKEND}/api/quizz/${quizzId}`)
    .then((response) => {
      setQuizz(response.data);
      setPoints(user.totalPoints);
      console.log(response.data);
    })
    .catch((error) => console.log(error));

  },[])
  
  const handleNext = () => {
    if( indexToShow >= quizz.questions.length -1){
      postChanges();
      window.location.reload();
    }
    else{
    setIndexToShow((prev)=>{
      return prev + 1
    })}

  }

  const handleRadioChange = (qIndex, aIndex, correct) => {
    setOption({ qIndex, aIndex });
    correct ? 
    (setPoints((prev)=> prev +100), setCorrectCount((prev)=> prev +1))
    :
    (setPoints((prev)=> prev -100), setCorrectCount((prev)=> prev -1))
  };

  const postChanges = () => {
    const idToPush = user._id;
    const userRequestBody= {totalPoints: points}
    const quizzRequestBody= {memberId: idToPush}
    axios.put(`${BACKEND}/api/users/${user._id}`, userRequestBody)
    .then(console.log("posted points", userRequestBody))
    .catch((error) => console.log(error));
    axios.put(`${BACKEND}/api/quizz/${quizz._id}/adduser`, quizzRequestBody)
    .then(console.log("posted user id", quizzRequestBody, "to", quizz._id))
    .catch((error) => console.log(error));

  }




  

  return (
  indexToShow < (quizz.questions?.length - 1) ? (
    <div className="popover-main" style={{display: !isDone ? "block" : "none"}}>
      <h1>{quizz.name}</h1>
      <hr></hr>
      <div>
      <div>
      {quizz.questions &&
        quizz.questions.map((q, qIndex) => (
          <div key={qIndex} style={{ display: indexToShow === qIndex ? 'block' : 'none' }}>
            <h2>{q.question}</h2>
            {q.answers.map((a, aIndex) => (
              <div key={aIndex} className="radio-container">
                <input
                  name={`radio_${qIndex}`} // Use the same name for all radio buttons in the same question
                  type="radio"
                  id={`radio_${qIndex}_${aIndex}`}
                  value={a.correct}
                  checked={option && option.qIndex === qIndex && option.aIndex === aIndex}
                  onChange={() => handleRadioChange(qIndex, aIndex, a.correct)}
                />
                <label
                  htmlFor={`radio_${qIndex}_${aIndex}`}
                  className={`label-2 ${option && option.qIndex === qIndex && option.aIndex === aIndex ? 'selected' : ''}`}
                >
                  {a.option}
                </label>
              </div>
            ))}
          </div>
        ))}
    </div>


      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  ):(
    <div className="popover-main">
      <h2>Congratulations ! You solved this quizz !</h2>
      <hr></hr>
      <h3>You got {correctCount}/{quizz.questions?.length} right answers, awarding {correctCount*100} points!</h3>
      <h3>You got {points} points so far to {user.team.name}!</h3>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  ));
};

export default QuizzPopover;