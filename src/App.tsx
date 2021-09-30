import React from 'react';
import LoginPage from './components/login/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/home/home';
import AuthContextProvider from './contexts/auth_context';
import LandingPage from './components/landing/landing';
import NavbarContextProvider from './contexts/nav_context';
import EventContextProvider from './contexts/event_context';

function App() {
  return (
    <AuthContextProvider>
      <NavbarContextProvider>
        <EventContextProvider>
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
        </EventContextProvider>
      </NavbarContextProvider>
    </AuthContextProvider>
  );
}

export default App;
