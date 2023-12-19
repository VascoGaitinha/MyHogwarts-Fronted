import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";

const AllTeamsPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getData();
      }, []);

      const getData = async () => {
        const response = await axios.get(`${BACKEND}/api/teams`);
        const teams = response.data;
        setTeams(teams);
        try{
        teams.forEach(team => {
          let teamPoints = 0;
          team.members.map((member) =>{
            teamPoints += member.totalPoints
            console.log(team.name, teamPoints)
            axios.put(`${BACKEND}/api/teams/${team._id}`, {totalPoints: teamPoints})
            try{
              console.log("Posted to", team.name, "Score is", teamPoints)
            }catch(error){
              console.log(error)
            }
          })
        })}
        catch(error){
          console.log(error)
        }
        finally{
        setLoading(false)
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