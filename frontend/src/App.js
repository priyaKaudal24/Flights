import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Flights from './components/Flights'
function App() {
  return (

    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/flights" element={<Flights/>}/>
        </Routes>
    </Router>
  );
}

export default App;
