import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing';
import { useContext } from 'react';
import { AuthContext } from './Context/auth.context';
import AllTeamsPage from './Pages/AllTeams';
import UserProfilePage from './Pages/UserProfile';
import UsersPage from './Pages/Users';
import QuizzPage from './Pages/Quizz';
import QuizzesPage from './Pages/Quizzes';
import NavBar from './components/NavBar';


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
      <Route path="/teams/:teamId" element={<AllTeamsPage/>}/>
      <Route path="/quizz" element={<QuizzesPage/>} />
      <Route path="/quizz/:quizzId" element={<QuizzPage/>} />
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App;
