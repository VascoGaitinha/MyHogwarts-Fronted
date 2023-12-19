import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing';
import { useContext } from 'react';
import { AuthContext } from './Context/auth.context';
import AllTeamsPage from './Pages/AllTeams';
import UserProfilePage from './Pages/UserProfile';
import UsersPage from './Pages/Users';
import QuizzesPage from './Pages/Quizzes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TeamPage from './Pages/Team';


function App() {
  const {isLoggedIn} = useContext(AuthContext);


  return (
    <div>
    {isLoggedIn ? <NavBar/> : ""}
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/users" element={<UsersPage/>} />
      <Route path="/users/:userId" element={<UserProfilePage/>}/>
      <Route path="/teams" element={<AllTeamsPage/>}/>
      <Route path="/teams/:teamId" element={<TeamPage/>}/>
      <Route path="/quizz" element={<QuizzesPage/>} />
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    {isLoggedIn ? <Footer /> :"" }
    </div>
  )
}

export default App;
