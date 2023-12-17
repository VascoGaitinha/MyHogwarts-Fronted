import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { useNavigate } from "react-router-dom";




const SignUpPopover = (titleProps) => {

const navigate=useNavigate();
const {BACKEND, storeToken, authenticateUser} = useContext(AuthContext);
const [error, setError] = useState('');
const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
});

const handleTyping = (e, field) => {
    setForm((prev)=>({
        ...prev,[field]:e
    }))
};

const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const requestBody = form


    axios.post(`${BACKEND}/auth/signup`, requestBody)
        .then(()=>{
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error);
            setError("error");
        })
}


  return(
  <div className="px-1 py-2 w-full">
    <p className="text-small font-bold text-foreground" {...titleProps}>
    </p>
    <div className="mt-2 flex flex-col gap-2 w-full">
        <form onSubmit={handleSignUpSubmit}>
            <Input value={form.name} label="Name" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'name')}/>
            <Input value={form.email} label="Email" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'email')}/>
            <Input type="password" value={form.password} label="Password" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'password')}/>
            <Button type="submit" size="sm">Join Us!</Button>
            {error && <p>{error}</p>}
      </form>
    </div>
  </div>
)  };

export default SignUpPopover;
