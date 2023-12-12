import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './Context/auth.context';
import AddTeam from './Pages/AddTeam';
import AllTeamsPage from './Pages/AllTeams';
import UserProfilePage from './Pages/UserProfile';
import UsersPage from './Pages/Users';


function App() {
  const {isLoggedIn} = useContext(AuthContext);


  return (
    <div>
    {isLoggedIn ? <NavBar /> : ""}
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/teams" element={<AllTeamsPage/>}/>
      <Route path="/users" element={<UsersPage/>} />
      <Route path="/users/:userId" element={<UserProfilePage/>}/>
      <Route path="/addteam" element={<AddTeam/>}/>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App;
