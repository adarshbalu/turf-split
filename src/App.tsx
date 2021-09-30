import React from 'react';
import LoginPage from './components/login/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/home/home';
import AuthContextProvider from './contexts/auth_context';
import LandingPage from './components/landing/landing';

function App() {
  return (
    <AuthContextProvider>

    <Router>
      <Switch>

        <Route exact path="/">
            <LandingPage />
        </Route>
        <Route path="/login">
            <LoginPage />
        </Route>
          <Route path="/home">
            <HomePage />
          </Route>
      </Switch>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
