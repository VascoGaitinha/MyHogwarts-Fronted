
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import "./index.css";


function UserProfilePage() {
  const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
  const[loading,setLoading] = useState(true);
  const[profileOwner, setProfileOwner] = useState(null);
  const idToGet = useParams().userId;

  const handleFirstLoggin = (user) => {
  profileOwner?.firstLoggin && 
    axios.put(`${BACKEND}/api/teams/${user.team._id}/adduser`, { memberId: user._id })
    .then(response => {
      console.log(response.data);
      axios.put(`${BACKEND}/api/users/${user._id}`, { firstLoggin: false })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    })
    .catch(error => {
      console.error(error);
    });


  }
  
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${BACKEND}/api/users/${idToGet}`)
        .then((response) => {
          setProfileOwner(response.data)
          setLoading(false);
          handleFirstLoggin(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data");
          setLoading(false);
        });
    } else {
      setLoading(true);
    }
  }, [user, loading]); 


  

return( <div>

          <div className="to-blur profile-main-div ">
            <div className="profile-banner-div" style={{backgroundImage: loading ? `url("/Hogwarts-banner.png")` : `url(/${profileOwner?.team.name}-banner.png)` }}>
            </div>
            {loading ?
            <img className="loading-gif" src="/loading.gif"/>
            :
            <div className="user-info-div">
              <h1>{profileOwner?.name}</h1>  
              <img className="profile-image" src={profileOwner?.image}></img>
              <p>Member since: {profileOwner?.firstJoined}</p>
              <div style={{display: "flex", alignItems: "center"}}>
                <p>Team: {profileOwner?.team.name}</p>
                <img className="team-badge" src={`/${profileOwner?.team.name}-badge.png`}/>
              </div>
              <p>Total Points: {profileOwner?.totalPoints}</p>
            </div>}
            <div className="profile-banner-div" style={{backgroundImage: `url(/${profileOwner?.team.name}-banner.png)`}}>
            </div>
          </div>
     </div>
    )
};

export default UserProfilePage;
