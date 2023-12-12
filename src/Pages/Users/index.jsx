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

    return(
        <div>
            <div>
            </div>
            {loading ? <p>Loading...</p> :
            
            users.map((user)=>{
            return(
                <div key={user._id} style={{display: "flex", justifyContent: "center"}} className="">
                    <Avatar src={user.image} size="sm"/>
                    <p>{user.name}</p>
                    <Avatar src={`/${user.team.name}-badge.png`} size="sm"/>
                </div>)
            })}
            <div>
            </div>
        </div>
    )
}

export default UsersPage;