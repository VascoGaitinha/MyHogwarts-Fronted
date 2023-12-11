import { useNavigate } from "react-router-dom";


function HomePage() {

    const navigate = useNavigate();

  return (
    <div>
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={()=>navigate('/signup')}>SignUp</button>
    </div>
  );
}

export default HomePage;
