
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import "./index.css"
function UserProfilePage() {
  const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
  const[loading,setLoading] = useState(true);
  const[profileOwner, setProfileOwner] = useState(null);
  const[imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const idToGet = useParams().userId;
  
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${BACKEND}/api/users/${idToGet}`)
        .then((response) => {
          setProfileOwner(response.data)
          setImgUrl(response.data.image)
          setLoading(false);
          console.log(user)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(true);
    }
  }, [user]); 

return( <div className="to-blur profile-main-div ">
        <div className="profile-banner-div" style={{backgroundImage: `url(/${profileOwner?.team.name}-banner.png)`}}>
        </div>
        <div className="user-info-div">
          <h1>{profileOwner?.name}</h1>  
          <img className="profile-image" src={profileOwner?.image}></img>
          <p>Member since: {profileOwner?.firstJoined}</p>
        </div>
        <div className="profile-banner-div" style={{backgroundImage: `url(/${profileOwner?.team.name}-banner.png)`}}>
        </div>
    </div>)
};

export default UserProfilePage;
