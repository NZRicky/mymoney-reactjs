import React from 'react';
import './App.css';
import Transactions from './Transaction/Transaction';
import TransactionNew from './Transaction/TransactionNew';
import Login from './Auth/Login';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SimpleBottomNavigation from './UI/SimpleBottomNavigation';
import Layout from './UI/Layout';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/transaction/list">
            <Layout />
          </Route>
          <Route path="/transaction/new">
            <TransactionNew />
          </Route>
          <Route path="/">
            <Transactions />
          </Route>

        </Switch>
      </Router>
      <SimpleBottomNavigation />
    </div>


  );
}


export default App;
