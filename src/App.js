import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import PageNotFound from './components/common/PageNotFound';
import Footer from './components/common/Footer';
import YearlyBalance from './components/YearlyBalance/YearlyBalance';
import MountlyBalance from './components/MonthlyBalance/MonthlyBalance';
import AddExpenses from './components/MonthlyBalance/AddExpenses';
import DeleteExpress from './components/MonthlyBalance/DeleteExpress';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
        <main>
          <Switch>
            <PrivateRoute path="/yearlyBalance/:year" component={YearlyBalance} />
            <PrivateRoute path="/mountlyBalance/:year/:month" component={MountlyBalance} />
            <PrivateRoute path="/expense/:year/:month" component={AddExpenses} />
            <PrivateRoute path="/expense/:expenseId" component={DeleteExpress} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/" component={LoginPage} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);