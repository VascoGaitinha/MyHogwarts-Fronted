import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { useNavigate } from "react-router-dom";
import QuizzPopover from "../../components/QuizzPopover";
import "./index.css";


const QuizzesPage = () => {
    const {BACKEND, user} = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedQuizz, setSelectedQuizz] = useState(null);
    const [ userInDb, setUserInDB ] = useState ({});
    const navigate = useNavigate();
    const userIdToCheck = user?._id;

    useEffect(()=> {
        axios.get(`${BACKEND}/api/quizz`)
        .then((response)=>{
            setQuizzes(response.data)
        })
        .catch((error)=> console.log(error))

        user && axios.get(`${BACKEND}/api/users/${user._id}`)
        .then((response) => {
            setUserInDB(response.data);
            setLoading(false)
        })
        .catch((error) => console.log(error))
    },[user])

    const handleBlur = () =>{
        const body = document.querySelector(".to-blur");
        body.classList.toggle("blur");
      }
    const handleOpenPopover = (quizz) => {
        setSelectedQuizz(quizz); // Set the selectedQuizz state
        setIsPopoverOpen(true);
        handleBlur(); // Open the popover
    };



return( 
    <div>
    <div className="main-quizz-div to-blur">
        <div className="banner">
        </div>
        {loading ? 
          <img className="loading-gif" src="/loading.gif"/>
        :
        <div className="quizz-list">
        {quizzes.map((quizz)=>{
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
                    <button onClick={() => handleOpenPopover(quizz)}>Go</button>
                    </div>}
                </div>
            )
            })}
    
    
    </div>}
            <div className="banner">
        </div>
    </div>
    <div>
        {isPopoverOpen && selectedQuizz &&
            <QuizzPopover quizzId={selectedQuizz._id} user={userInDb}/>
        }
    </div>
    </div>)
}


export default QuizzesPage;
