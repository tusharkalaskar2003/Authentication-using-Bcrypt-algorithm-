import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login"
import TestPassword from './components/TestPassword';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/test-password" element={<TestPassword/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
