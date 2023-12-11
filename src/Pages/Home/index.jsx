import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();



  return (

    <div>
      {!user || !isLoggedIn ?
      <div>
        <h1>Please Log In</h1>
        <button onClick={()=>{navigate('/login')}}>Login</button>
      </div>
      :
      <h1>Welcome {user.name} </h1>}
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default HomePage;
