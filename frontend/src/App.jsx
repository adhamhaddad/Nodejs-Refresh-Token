import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '@hooks';
import RegisterPage from '@pages/register';
import LoginPage from '@pages/login';
import HomePage from '@pages/home';

function App() {
  const { isLogged, user } = useAuth();
  return user ? (
    <>
      <Switch>
        <Route path='/login' exact>
          <Redirect to='/' />
        </Route>
        <Route path='/register' exact>
          <Redirect to='/' />
        </Route>
        <Route path='/' exact>
          <HomePage />
        </Route>
      </Switch>
    </>
  ) : (
    <>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='*' render={() => <Redirect exact to='/login' />} />
    </>
  );
}

export default App;
