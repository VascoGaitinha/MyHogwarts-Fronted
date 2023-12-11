import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  console.log(user)
  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
}

export default HomePage;
