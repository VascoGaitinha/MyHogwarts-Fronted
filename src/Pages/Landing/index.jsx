import { Input, Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import SignUpPopover from "../../components/SignUpPopover";




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
        <div className="landing">
            <div className="landing-image-div">

            </div>
            <div className="landing-form mt-2 flex flex-col gap-2">
        <h1>Welcome to MyHogwarts!</h1>        
        <form onSubmit={handleFormSubmit}>
            <Input value={form.email} label="Email" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'email')}/>
            <Input type="password" value={form.password} label="Password" size="sm" variant="bordered" onChange={(e)=>handleTyping(e.target.value, 'password')}/>
            <Button type="submit" size="md" className="max-w-md">Log In</Button>
            {error && <p>{error}</p>}
      </form>
      <hr className="landing-hr"></hr>
            <h1>Dont have an Account?</h1>
      <Popover placement="bottom" showArrow offset={10} backdrop="blur">
                <PopoverTrigger>
                    <Button color="primary" size="lg">SignUp</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    <SignUpPopover/>
                </PopoverContent>
            </Popover>
    </div>
        </div>
    )
}

export default LandingPage;