import React from 'react';
import LoginPage from './components/login/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';
import AuthContextProvider from './contexts/auth_context';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
            <LoginPage />
        </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
      </Switch>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
