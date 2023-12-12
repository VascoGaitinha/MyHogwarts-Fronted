
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import ProfilePopOver from "../../components/ProfilePopover";
import { Avatar } from "@nextui-org/react";

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
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(true);
    }
  }, [user]); 

  return (

    <div>
    {loading || !profileOwner ? <p>Loading...</p> :
    <div className="profile-main-div">
    <div className="profile-banner-div" style={{backgroundImage: `url(/${profileOwner.team.name}-banner.png)`}}>
    </div>
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <div >
            <img style={{width: "200px", height: "250px"}}src={profileOwner.image} />
            <h1 className="text-3xl font-bold underline">
            {profileOwner?.name}
            </h1>
        </div>
        <div>
            <h1>
                {profileOwner.name}'s correct answers
            </h1>
        </div>
    </div>
    <div className="profile-banner-div" style={{backgroundImage: `url(/${profileOwner.team.name}-banner.png)`}}>
    </div>
    </div>
    }
    </div>
  );
}

export default UserProfilePage;
