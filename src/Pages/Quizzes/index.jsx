import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../Context/auth.context"
import { useNavigate } from "react-router-dom"
import "./index.css"

const QuizzesPage = () => {
    const {BACKEND, user} = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userIdToCheck = user?._id;

    useEffect(()=> {
        axios.get(`${BACKEND}/api/quizz`)
        .then((response)=>{
            console.log(response.data)
            setQuizzes(response.data)
        })
        .catch((error)=> console.log(error))
        .finally(
            console.log(quizzes),
            setLoading(false),
            console.log(user?._id)
    )
    },[loading])





return( <div className="main to-blur">
        <div className="banner">
        </div>
        <div className="quizz-list">
    {loading?<p>loading</p>:
    quizzes.map((quizz)=>{
        return(
            <div className="quizz-card" key={quizz._id}>
                <h1>{quizz.name}</h1>
                <div className="quizz-details">
                <img className="quizz-image" src={`/${quizz._id}.jpg`} alt={`${quizz.name}`}/>
                <p>{quizz.description}</p>
                </div>
                <hr></hr>
                {(quizz.solvedBy.some(user => user._id === userIdToCheck))? <p className="span">You already solved this quizz!</p>
                :
                <div>
                <button onClick={()=>navigate(`/quizz/${quizz._id}`)}>Go</button>
                </div>}
            </div>
        )
    })
    
    
    }</div>
         <div className="banner">
        </div>
    </div>)
}


export default QuizzesPage;