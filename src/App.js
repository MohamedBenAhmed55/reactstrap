import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Forms from './Forms';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

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
    <Router> <NavBar /> </Router>
  )
}

export default App;

// ReactDOM.render(<Router><NavBar /></Router>, document.getElementById('root'));