import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import ProfilePopOver from "../../components/ProfilePopover";

function HomePage() {
  const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
  const[loading,setLoading] = useState(true);
  const[loggedUser, setLoggedUser] = useState(null);
  const[imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${BACKEND}/api/users/${user._id}`)
        .then((response) => {
          setLoggedUser(response.data)
          setImgUrl(response.data.image)
          setLoading(false);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where user or user._id is not available
      setLoading(false);
    }
  }, [user]); 

  return (

    <div>
      {loading || !loggedUser ? <p>Loading...</p> :
      loggedUser?.firstLoggin ? <ProfilePopOver loggedUser={loggedUser} />
      :
      <h1 className="text-3xl font-bold underline">
      Welcome {loggedUser.name}
      <img src={imgUrl}></img>
    </h1>}
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default HomePage;
