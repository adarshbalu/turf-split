import React from 'react';
import LoginBox from './components/login/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginBox />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
