//React Imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//Style Sheets
import './App.css';

//Components
import Sidebar from './components/Sidebar';

//Pages for Sidebar:
import Home from './pages/Home';
import History from './pages/History';
import Learn from './pages/Learn';


function App() {



  return (
    <>
      <Router>
          <Sidebar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/history' component={History} />
            <Route path='/learn' component={Learn} />
          </Switch>
        </Router>
    </>
  );
}

export default App;
