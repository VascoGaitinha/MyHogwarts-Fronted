import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import "./index.css";

const UsersPage = () => {
    const {BACKEND} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND}/api/users`)
        .then((response) =>{
            setUsers(response.data)
        })    
        .catch((error)=>console.log(error))
        .finally(setLoading(false))    
    },[])

    return (
        <div className="main to-blur">
        <div className="banner">
        </div>
        <div className="user-list">
        <table>
          <thead>
            <tr>
              <th><h1>Member</h1></th>
              <th><h1>Name</h1></th>
              <th><h1>Team</h1></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.image} className="badge" />
                </td>
                <td>
                  <h2>{user.name}</h2>
                </td>
                <td>
                  <img src={`/${user.team?.name}-badge.png`} className="badge" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="banner">
        </div>
        </div>
      );

   
}

export default UsersPage;