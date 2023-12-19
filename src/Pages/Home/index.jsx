import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AllTeamsPage = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("USER LOADED AS:");
        console.log(user);
        user && navigate(`/users/${user._id}`);
    },[user])


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