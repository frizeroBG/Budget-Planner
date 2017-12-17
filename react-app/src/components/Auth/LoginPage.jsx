import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import toastr from 'toastr'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailHasError: '',
      passwordHasError: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmitHandler(e) {
    e.preventDefault();
    let data = await login(this.state.email, this.state.password);
    if (!data.success) {
      toastr.error(data.message)
      if (data.errors.hasOwnProperty('email')) {
        this.setState({ emailHasError: "true" });
      }
      else {
        this.setState({ emailHasError: "false" });
      }
      if (data.errors.hasOwnProperty('password')) {
        this.setState({ passwordHasError: "true" });
      }
      else {
        this.setState({ passwordHasError: "false" });
      }

      return
    }
    toastr.success(data.message)
    localStorage.setItem('authToken', data.token)
    let today = new Date()
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    this.props.history.push(`/mountlyBalance/${year}/${month}`)
  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Login</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row space-top">
            <div className="col-md-3">
              <div className="form-group">
                <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeHandler}
                  label="E-mail"
                  error={this.state.emailHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangeHandler}
                  label="Password"
                  error={this.state.passwordHasError}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}