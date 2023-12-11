import {Routes, Route} from 'react-router-dom';
import SignUpPage from './Pages/SignUp';
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing'

function App() {

  return (
    <div>
    <Routes>
     <Route path="/" element={<LandingPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App
