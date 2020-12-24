// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import AgregaTutorial from './component/agregarTutorial/agregarTutorial'
import DesafioRayen from './component/inicio/desafioRayen'

function App() {
  return (
    <Router>
      <div className="container p-4">
        <Route path="/" exact component={DesafioRayen} />
        <Route path="/agregarTutorial" component={AgregaTutorial} />
      </div>
    </Router>

   
    
  );
}

export default App;
