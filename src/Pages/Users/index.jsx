import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Avatar } from "@nextui-org/react";

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
        <div className="profile-main-div">
        <div className="profile-banner-div" style={{backgroundImage: `url(/Hogwarts-banner.png)`}}>
        </div>
        <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <Avatar src={user.image} size="sm" />
                </td>
                <td>
                  <h2>{user.name}</h2>
                </td>
                <td>
                  <Avatar src={`/${user.team?.name}-badge.png`} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="profile-banner-div" style={{backgroundImage: `url(/Hogwarts-banner.png)`}}>
        </div>
        </div>
      );

   
}

export default UsersPage;