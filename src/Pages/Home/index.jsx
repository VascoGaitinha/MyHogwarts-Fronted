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
        <img className="loading-gif" src="/loading.gif"/>
    </div>)
}


export default AllTeamsPage;