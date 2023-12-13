import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../Context/auth.context"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const QuizzesPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`${BACKEND}/api/quizz`)
        .then((response)=>{
            console.log(response.data)
            setQuizzes(response.data)
        })
        .catch((error)=> console.log(error))
        .finally(
            console.log(quizzes),
            setLoading(false))
    },[loading])


return( <div className="profile-main-div">
        <div className="profile-banner-div" style={{backgroundImage: `url(/Hogwarts-banner.png)`}}>
        </div>
        <div className="centered">
    {loading?<p>loading</p>:
    quizzes.map((quizz)=>{
        return(
            <div className="quizz-card" key={quizz._id}>
                <h1>{quizz.name}</h1>
                <hr style={{width: "75%"}}></hr>
                <Button onClick={()=>navigate(`/quizz/${quizz._id}`)}>Go</Button>
            </div>
        )
    })
    
    
    }</div>
        <div className="profile-banner-div" style={{backgroundImage: `url(/Hogwarts-banner.png)`}}>
        </div>
    </div>)
}


export default QuizzesPage;