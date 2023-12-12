import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './Context/auth.context';
import AddTeam from './Pages/AddTeam';


function App() {
  const {isLoggedIn} = useContext(AuthContext);


  return (
    <div>
    {isLoggedIn ? <NavBar /> : ""}
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/addteam" element={<AddTeam/>}/>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App;
