import React, { useState, useEffect } from 'react';
import './App.css';
import Transactions from './Transaction/Transaction';
import TransactionNew from './Transaction/TransactionNew';
import Login from './Auth/Login';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SimpleBottomNavigation from './UI/SimpleBottomNavigation';
import CategoryList from './Category/CategoryList';
import CategoryNew from './Category/CategoryNew';
import AuthService from './Auth/AuthService';

const authService = new AuthService();


function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (authService.isLoggedIn()) {
        setIsLogged(true);
    }
});

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Login />
          </Route>          
          <Route path="/transaction/list">
            <Transactions />
          </Route>
          <Route path="/transaction/new">
            <TransactionNew />
          </Route>
          <Route path="/category/list">
            <CategoryList />
          </Route>
          <Route path="/category/new">
            <CategoryNew />
          </Route>
          <Route path="/">
            <Transactions />
          </Route>

        </Switch>
        {isLogged ? (<SimpleBottomNavigation />) : ''}
      </Router>


     
    </div>


  );
}


export default App;
