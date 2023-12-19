import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const sortedUsers = users.sort((a,b) => (a.totalPoints > b.totalPoints) ? -1 : ((b.totalPoints > a.totalPoints) ? 1 : 0))

    useEffect(()=>{
        axios.get(`${BACKEND}/api/users`)
        .then((response) =>{
            setUsers(response.data)
            setLoading(false)
        })    
        .catch((error)=>console.log(error))
    },[])



    return (
      <div>

        <div className="main to-blur">
        <div className="banner">
        </div>
        {loading ?
        <img className="loading-gif" src="/loading.gif"/>
        :
        <div className="user-list">
        <table>
          <thead>
            <tr>
              <th><h1>Member</h1></th>
              <th><h1>Name</h1></th>
              <th><h1>Points</h1></th>
              <th><h1>Team</h1></th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
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
                <td>
                  <img src={`/${user.team?.name}-badge.png`} className="badge2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>}
        <div className="banner">
        </div>
        </div>
        </div>
      );

   
}

export default UsersPage;