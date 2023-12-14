import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";




const LogInPopover = (titleProps) => {

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
  <div className="px-1 py-2 w-full">
    <p className="text-small font-bold text-foreground" {...titleProps}>
    </p>
    <div className="mt-2 flex flex-col gap-2 w-full">
        <form onSubmit={handleFormSubmit}>
            <Input value={form.email} label="Email" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'email')}/>
            <Input type="password" value={form.password} label="Password" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'password')}/>
            <Button type="submit" size="sm">Log In</Button>
            {error && <p>{error}</p>}
      </form>
    </div>
  </div>
)  };

export default LogInPopover;
