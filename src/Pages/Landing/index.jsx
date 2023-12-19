import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";
import teams from "../../assets/teams.json";
import defaultImage from "../../utils/defaultimage";
import Footer from "../../components/Footer";

const LandingPage = () => {

const navigate=useNavigate();
const [popUp, setPopUp] = useState(false)
const {BACKEND, storeToken, authenticateUser} = useContext(AuthContext);
const [error, setError] = useState('');
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("")
const [logInForm, setLoginForm] = useState({
    email: "",
    password: "",
});

useEffect (()=>{
    setSignUpForm((prev)=>({
        ...prev,name: firstName.charAt(0).toUpperCase() + firstName.slice(1) +" "+ lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }))
},[firstName, lastName])

const [signUpForm, setSignUpForm] = useState({
    name: "" ,
    email: "",
    password: "",
    team: "",
    image: "",
});

const handleSignUpFormSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {
        ...signUpForm,
        image: signUpForm.image || defaultImage,
    };

    axios.post(`${BACKEND}/auth/signup`, requestBody)
        .then(()=>{
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error);
            setError(error.data);n
        })
    
};

const handleLoginFormSubmit = (e) =>{
    e.preventDefault();

    const requestBody = logInForm;

    axios.post(`${BACKEND}/auth/login`, requestBody)
        .then((response)=>{
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/homepage');
        })
        .catch((error)=>{
            console.log(error);
            setError(error.response.data.message);
        })
};

    const togglePopUp = () =>{
        const body = document.querySelector(".to-blur");
        body.classList.toggle("blur");
        setPopUp(!popUp)
    }

    const  imgToB64 = (file) =>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) =>{
                reject(error)
            }
        })
        }       

    const handleFile = async (e, field) => {
        try {
            if (e.target.files && e.target.files.length > 0) {
                const convImg = await imgToB64(e.target.files[0]);
                setSignUpForm((prev) => ({
                    ...prev, [field]: convImg
                }))
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginTyping = (e, field) => {
        setLoginForm((prev)=>({
            ...prev,[field]:e
        }))
    };

    const handleSignUpTyping = (e, field) => {
        setSignUpForm((prev)=>({
            ...prev,[field]:e
        }))
    };

    const handleSelect = (e, field) => {
        setSignUpForm((prev)=>({
            ...prev,[field]:e
        }))
    };  




    return(
        <div>
        <div className="main to-blur">
                <div className="left-div">
                </div>
                <div className="right-div">
                    <div className="form-div">
                        <h1 className="login-h">Welcome to MyHogwarts!</h1>
                        <img src="/menu.png" className="login-h"/>    
                        <form onSubmit={handleLoginFormSubmit}>
                            <input value={logInForm.email} placeholder="Email" label="Email" onChange={(e)=>handleLoginTyping(e.target.value, 'email')}/>
                            <input type="password" placeholder="Password" value={logInForm.password} label="Password" onChange={(e)=>handleLoginTyping(e.target.value, 'password')}/>
                            <button type="submit">Log In</button>
                            {error && <p style={{color: "red"}}>{error}</p>}
                        </form>
                        <h2 className="login-h">Don't have an Account?</h2>
                        <div>
                        <button onClick={() => togglePopUp()}>Sign Up</button>
                    </div>
                </div>
    <Footer/>
                                    {/* POP UP DIV */}
    </div>
        </div>
        <div className="pop-up-div" style={{ display: popUp?"block":"none" }}>
            <h1 className="signup-h">SignUp</h1>
                <form onSubmit={handleSignUpFormSubmit}>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection:"column"}}>
                        <label>First Name</label>
                        <input 
                        value={firstName} label="first-name" onChange={(e) => {setFirstName(e.target.value);
                        }}
                        />
                        </div>
                        <div style={{display: "flex", flexDirection:"column"}}>
                        <label>Last Name</label>
                        <input value={lastName} label="last-name" onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection:"column"}}>
                        <label>Email</label>
                        <input value={signUpForm.email} label="Email" onChange={(e)=>handleSignUpTyping(e.target.value, 'email')}/>
                    </div>
                    <div style={{display: "flex", flexDirection:"column"}}>
                        <label>Password</label>
                        <input type="password" value={signUpForm.password} label="Email" onChange={(e)=>handleSignUpTyping(e.target.value, 'password')}/>
                    </div>
                    <div style={{display: "flex", flexDirection:"column"}}>
                    <label>Select Your Team</label>
                    <select onChange={(e) => {handleSelect(e.target.value, "team")}}>
                        <option value="Select your team" hidden></option>
                        {teams.map((team) => (
                        <option value={team.id} key={team.id}>
                            {team.name}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div style={{display: "flex", flexDirection:"column"}}>
                    <label className="w-full">Profile Picture (max 100kb)</label>
                    <input className="file-button" type="file" onChange={(e) => handleFile(e, "image")}/>
                    {error && <p style={{color: "red"}}>{error}</p>}
                    </div>


                    <button type="submit">Create Account</button>
                </form>
                </div>
        </div>
    )
}

export default LandingPage;