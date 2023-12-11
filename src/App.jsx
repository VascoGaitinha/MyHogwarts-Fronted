import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home';
import NavBar from './components/NavBar';

function App() {

  return (
    <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    </div>
  )
}

export default App;
