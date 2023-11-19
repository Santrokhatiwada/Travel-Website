import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Footer from './Components/HomePage/Footer/Footer';
import Home from './Components/HomePage/Home/Home';
import Main from './Components/HomePage/Main/Main';
import Navbar from './Components/HomePage/Navbar/Navbar';
import Login from './Components/LogIn/Login';
import Register from './Components/Register/Register';
import { TokenContext } from './Components/LogIn/Login'; // Import  TokenContext

function App() {
  const [token, setToken] = useState(""); // Initialize the token state


  return (  
    <Router>
            <TokenContext.Provider value={{ token, setToken }}>
        {/* Wrap your entire app with TokenContext.Provider */}

      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Layout />} />
        <Route path="/Register" element={<Register />} />
      </Routes>

      </TokenContext.Provider>


    </Router>
  );
}

function Layout() {
  return (
    <> <Navbar />
      <Home />
      <Main />
      <Footer />
    </>
  );
}

export default App;
