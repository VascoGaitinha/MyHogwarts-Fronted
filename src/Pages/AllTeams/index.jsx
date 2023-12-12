import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../Context/auth.context"

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


return(<div className="centered">
    {loading?<p>loading</p>:
    teams.map((team)=>{
        return(
            <div className="team-card" key={team._id}>
                <h1>{team.name}</h1>
                <img src={`/${team.name}-logo.png`} />
            </div>
        )
    })
    
    
    }
    </div>)
}


export default AllTeamsPage;