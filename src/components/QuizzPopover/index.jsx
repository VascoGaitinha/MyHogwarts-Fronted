import { useContext, useEffect, useState } from "react";
import "./index.css"
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import shuffleArray from "../../utils/shuffleArray";

const QuizzPopover = (props) => {
  const { quizzId, user} = props;
  const [ option, setOption ] = useState(null);
  const [ quizz, setQuizz ] = useState({});
  const { BACKEND} = useContext(AuthContext);
  const [ indexToShow, setIndexToShow ] = useState(0);
  const [ points, setPoints ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);



  useEffect(()=>{
    axios.get(`${BACKEND}/api/quizz/${quizzId}`)
    .then((response) => {
      setQuizz(response.data);
      setPoints(user.totalPoints);
    })
    .catch((error) => console.log(error));

  },[])

  useEffect(()=>{
    setPoints(user.totalPoints + correctCount*100);
  },[correctCount])

  const handleRadioChange = (qIndex, aIndex, correct) => {
    setOption({ qIndex, aIndex });
    setIndexToShow((prev)=>{return prev + 1});
    correct && setCorrectCount((prev)=> prev +1);
  };

  const postChanges = async (userId, quizzId) => {

    try {
      await axios.put(`${BACKEND}/api/users/${userId}`, {totalPoints: points});
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.put(`${BACKEND}/api/users/${userId}/addquizz`, {quizzId: quizzId});
    } catch (error) {
      console.log(error);
    }
    
    try {
      await axios.put(`${BACKEND}/api/quizz/${quizzId}/adduser`, { memberId: userId });
    } catch (error) {
      console.log(error);
    }

    finally {
      window.location.reload();
    }
  };
  
  return (
  indexToShow <= (quizz.questions?.length - 1) ? (
    <div className="popover-main" style={{display:"block"}}>
      <h1>{quizz.name}</h1>
      <hr></hr>
        <div>
          <div>
          {quizz.questions &&
            quizz.questions.map((q, qIndex) => (
              <div key={qIndex} style={{ display: indexToShow === qIndex ? 'block' : 'none' }}>
                <h2>{q.question}</h2>
                {shuffleArray(q.answers).map((a, aIndex) => (
                  <div key={aIndex} className="radio-container">
                    <input
                      name={`radio_${qIndex}`}
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
    </div>

  ):(
    <div className="popover-main">
      <h2>Congratulations ! You solved this quizz !</h2>
      <hr></hr>
      <h3>You got {correctCount}/{quizz.questions?.length} right answers, awarding {correctCount*100} points!</h3>
      <h3>You got {points} points so far to {user.team?.name}!</h3>
      <button onClick={() => postChanges(user._id, quizz._id)}>Next</button>
    </div>
  ));
};

export default QuizzPopover;