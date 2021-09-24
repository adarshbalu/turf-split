import React from 'react';
import LoginBox from './components/login/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/"><div>Home page</div></Route>
        <Route path="/login">
          <LoginBox />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
