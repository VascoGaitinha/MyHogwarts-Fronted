import { useContext } from "react";
import "./index.css"
import { AuthContext } from "../../Context/auth.context";


const Footer = () => {
const {isLoggedIn} = useContext(AuthContext)


    return(<div className="footer" style={{position: isLoggedIn? "fixed" : "static"}}>
       <a href="https://www.linkedin.com/in/vgaitinha/" target="_bank"><img className="social" src="/lin.png" /></a> 
       <a href="https://github.com/VascoGaitinha/" target="_bank"><img className="social" src="/git.png" /></a>
    </div>)

}

export default Footer;