import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import teams from "../../assets/teams.json"

const TeamPage = () => {

    const {BACKEND} = useContext(AuthContext);
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {teamId} = useParams();
    const foundTeam = teams.find((item) => item.name === team.name);


    useEffect(() =>{
      axios.get(`${BACKEND}/api/teams/${teamId}`)
        .then((response)=> {setTeam(response.data)
        setLoading(false)})
        .catch((error)=>  
        console.log(error))
    },[])

    const sortedUsers = team.members?.sort((a,b) => (a.totalPoints > b.totalPoints) ? -1 : ((b.totalPoints > a.totalPoints) ? 1 : 0))
    
    


      
return( <div className="to-blur main-teams-div">
          <div className="profile-banner-div" style={{backgroundImage: loading ? `url("/Hogwarts-banner.png")` : `url(/${team?.name}-banner.png)` }}>
          </div>
          {loading ?
            <img className="loading-gif" src="/loading.gif"/>
            :
            <div className="team-div">
            <div className="user-info-div">
              <h1>{team.name}</h1> 
              <p>{foundTeam?.description}</p>
              <p>Total Points: {team.totalPoints}</p>
            </div>
            <div className="user-info-div">
        <table>
          <tbody>
            {sortedUsers?.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.image} className="badge" onClick={() => {navigate(`/users/${user._id}`)  }} />
                </td>
                <td>
                  <h2>{user.name}</h2>
                </td>
                <td>
                <h2>{user.totalPoints}</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
            </div>}
            <div className="profile-banner-div" style={{backgroundImage: loading ? `url("/Hogwarts-banner.png")` : `url(/${team?.name}-banner.png)` }}>
            </div>
          </div>)
}


export default TeamPage;