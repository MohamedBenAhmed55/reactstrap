import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Forms from './Forms';
import UserProfile from './UserProfile'
import Login from './Login';
import login from './test/logintest'

import { BrowserRouter as Router } from 'react-router-dom';
import FinalPage from './Finalpage';


function App(){
   
  return(
    <Router> <FinalPage />  </Router>

  )
}

export default App;

