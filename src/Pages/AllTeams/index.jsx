import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";

const AllTeamsPage = () => {

    const {BACKEND} = useContext(AuthContext);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("PAGE LOADED")
        processTeamPoints();
    }, []);
    

      /* axios.put(`${BACKEND}/api/teams/${team._id}`, {totalPoints: teamPoints}) */


      const processTeamPoints = async () => {
        const dbData = await axios.get(`${BACKEND}/api/teams`);
        setTeams(dbData.data);
        try {
          await Promise.all(dbData.data.map(async (team) => {
            let teamPoints = 0;
            team.members.forEach((member) => {
              teamPoints += member.totalPoints;
              console.log(member.name, "has", member.totalPoints);
              console.log("Total", team.name, "points count is:", teamPoints);
            });
            try {
              await axios.put(`${BACKEND}/api/teams/${team._id}`, { totalPoints: teamPoints });
              console.log("POSTING DATA for", team.name);
            } catch (error) {
              console.error("Error updating team points:", error);
            }
          }));
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
        finally{
          setLoading(false);
        }
      }
      
return( <div className="to-blur main">
        <div className="banner">
        </div>
        {loading ? 
          <img className="loading-gif" src="/loading.gif"/>
        :
        <div className="team-list">
          {loading?<p>loading</p>:
          teams.map((team)=>{
              return(
                  <div className="team-card" key={team._id}>
                      <h1>{team.name}</h1>
                      <img src={`/${team.name}-logo.png`} />
                      <p>Total Points: {team.totalPoints}</p>
                  </div>
              )
          })
          }</div>}
              <div className="banner">
              </div>
          </div>)
}


export default AllTeamsPage;