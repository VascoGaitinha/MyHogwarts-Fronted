import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import "./index.css";

const LandingPage = () => {

const navigate=useNavigate();
const {BACKEND, storeToken, authenticateUser} = useContext(AuthContext);
const [error, setError] = useState('');
const [form, setForm] = useState({
    email: "",
    password: "",
});

const handleTyping = (e, field) => {
    setForm((prev)=>({
        ...prev,[field]:e
    }))
};

const handleFormSubmit = (e) =>{
    e.preventDefault();

    const requestBody = form;

    axios.post(`${BACKEND}/auth/login`, requestBody)
        .then((response)=>{
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/homepage');
        })
        .catch((error)=>{
            console.log(error);
            setError("error");
        })

};
    return(
        <div className="main">
            <div className="left-div">
            </div>
            <div className="right-div">
                <div className="form-div">
        <h1>Welcome to MyHogwarts!</h1>
        <img src="/menu.png"/>    
        <form onSubmit={handleFormSubmit}>
            <input value={form.email} label="Email" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'email')}/>
            <input type="password" value={form.password} label="Password" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'password')}/>
            <button type="submit" size="md" className="max-w-md">Log In</button>
            {error && <p>{error}</p>}
      </form>
            <h1>Don't have an Account?</h1>
            <div>
            <button>Sign Up</button>
            </div>
            </div>
    </div>
        </div>
    )
}

export default LandingPage;