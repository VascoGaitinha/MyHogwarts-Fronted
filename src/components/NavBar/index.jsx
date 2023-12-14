import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import './index.css'
import { useNavigate } from "react-router-dom";



const NavBar = () => {

    const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
    const[loading,setLoading] = useState(true);
    const[loggedUser, setLoggedUser] = useState(null);
    const [list, setList] = useState({opacity: "0", height: "0rem", open: false, display: "hidden"});
    const navigate = useNavigate(); 
    
    useEffect(() => {
      if (user && user._id) {
        axios.get(`${BACKEND}/api/users/${user._id}`)
          .then((response) => {
            setLoggedUser(response.data)
            setLoading(false);

          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(true);
          });
      } else {
        setLoading(true);
      }
    }, [loading]); 


  const toggleList = () =>{
    const body = document.querySelector(".to-blur");
    body.classList.toggle("blur");

    !list.open ? 
    setList({opacity: "1", height: "50vh", open: true , index: 1, display: "block"})
    :
    setList({opacity: "0", height: "2rem", open: false, index: 0, display: "hidden"})
  }

  const goTo = (x) =>{
    navigate(`/${x}`)
    setList({opacity: "0", height: "2rem", open: false})
    const body = document.querySelector(".to-blur");
    body.classList.toggle("blur");

  }


  return (
    <nav id="nav">
      <div className="nav-brand">
        <img src="/menu.png" className="menu-small"/>
        <h1>MyHogwarts</h1>
      </div>
      <div className="nav-icons">
        <img id="nav-button" src={`${loggedUser?.image}`} onClick={()=>toggleList()}/>
        <ul className="nav-droplist" id="menu" style={{opacity: `${list.opacity}`, height: `${list.height}`, display:`${list.display}`, cursor: list.open? "pointer" : "default" }}>
          <li>
              <p className="menu-item" onClick={() => list.open && goTo("homepage")}>Profile</p>
            </li>
            <li>
              <p className="menu-item" onClick={() => list.open &&  goTo("homepage")}>{loggedUser?.team.name}</p>
            </li>
            <li>
              <p className="menu-item" onClick={() => list.open &&  goTo("teams")}>All Teams</p>
            </li>
            <li>
              <p className="menu-item" onClick={() => list.open &&  goTo("users")}>Users</p>
            </li>
            <li>
              <p className="menu-item" onClick={() => list.open &&  goTo("quizz")}>Quizz</p>
            </li>
            <li>
              <p className="menu-item" onClick={() => list.open && logOut()} style={{color: "red"}}>Log Out</p>
            </li>
          </ul>
      </div>
    </nav>
  );
}

export default NavBar;

