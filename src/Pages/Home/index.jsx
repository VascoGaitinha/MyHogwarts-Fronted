import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../Context/auth.context"
import "./index.css"

const AllTeamsPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`${BACKEND}/api/teams`)
        .then((response)=>{
            setTeams(response.data)
        })
        .catch((error)=> console.log(error))
        .finally(
            console.log(teams),
            setLoading(false))
    },[loading])


return( <div className="to-blur main">
        <div className="banner">
        </div>
        <div className="all-list">
          <h1>Hi</h1>
        </div>
        <div className="banner">
        </div>
    </div>)
}


export default AllTeamsPage;