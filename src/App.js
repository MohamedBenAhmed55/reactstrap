import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Forms from './Forms';
import UserProfile from './UserProfile'

import { BrowserRouter as Router } from 'react-router-dom';
import FinalPage from './Finalpage';

// function App() {
//   return (
//     <div className="App">
//     <NavBar />
//       <header className="App-header">

//        <Container>
//         <Forms />
//         <Cards />
//         <Breadcrumbs />
//         <Alert variant="success">This is a button</Alert>
//         <Button>Hello</Button>
//         <Popups />
//         </Container>
//       </header>
//     </div>
//   );
// }

function App(){
   
  return(
    <Router> <FinalPage />  </Router>

  )
}

export default App;

// ReactDOM.render(<Router><NavBar /></Router>, document.getElementById('root'));