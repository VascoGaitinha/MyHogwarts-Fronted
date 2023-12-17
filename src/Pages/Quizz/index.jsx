import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import "./index.css"

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


  return (
    <div className="main to-blur">
        <div className="banner">
        </div>
        {!loading ?(
            <div className="quizz">
      <h1>{quizz?.name}</h1>
      <hr></hr>
      <p>{quizz?.description}</p>
      <button>Start Quizz</button>
      </div>)
      :<p>Loading</p>
      }
      <div className="banner">
      </div>
    </div>
  );
};

export default QuizzPage;