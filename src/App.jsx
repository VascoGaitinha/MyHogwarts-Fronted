import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import LandingPage from './Pages/Landing'

function App() {

  return (
    <div>
    <Routes>
     <Route path="/" element={<LandingPage/>}/>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App
