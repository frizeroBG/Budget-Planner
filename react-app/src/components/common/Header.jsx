import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: 2017,
      month: 0
    }
  }

  componentDidMount() {
    let today = new Date()
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    this.setState({
      year,
      month
    })
  }

  render() {
    const { loggedIn, onLogout } = this.props;

    return (
      <header>
        <nav className="navbar navbar-dark bg-secondary">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loggedIn && <NavLink className="nav-link" to={`/mountlyBalance/${this.state.year}/${this.state.month}`} >Monthly Balance</NavLink>}
                {loggedIn && <NavLink className="nav-link" to={`/yearlyBalance/${this.state.year}`} >Yearly Balance</NavLink>}
                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                {!loggedIn && <NavLink className="nav-link" to="/" >Login</NavLink>}
                {!loggedIn && <NavLink className="nav-link" to="/register" >Register</NavLink>}
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}