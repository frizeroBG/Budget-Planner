import React, { Component } from 'react';
import Input from '../common/Input';
import { register, login } from '../../api/remote';
import toastr from 'toastr'

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      repeat: '',
      nameHasError: '',
      emailHasError: '',
      passwordHasError: '',
      repeatPasswordHasError: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.repeat !== this.state.password) {
      this.setState({ repeatPasswordHasError: "true" })
      toastr.error("Password's didn't match!");
      return
    }

    let data = await register(this.state.name, this.state.email, this.state.password);
    if (!data.success) {
      toastr.error(data.message)
      if (data.errors.hasOwnProperty('name')) {
        this.setState({ nameHasError: "true" });
      }
      else {
        this.setState({ nameHasError: "false" });
      }

      if (data.errors.hasOwnProperty('email')) {
        this.setState({ emailHasError: "true" });
      }
      else {
        this.setState({ emailHasError: "false" });
      }

      if (data.errors.hasOwnProperty('password')) {
        this.setState({
          passwordHasError: "true",
          repeatPasswordHasError: "true"
        });

      }
      else {
        this.setState({
          passwordHasError: "false",
          repeatPasswordHasError: "false"
        });
      }
      return
    }
    toastr.success(data.message)
    let resReg = await login(this.state.email, this.state.password);
    if (!resReg.success) {
      toastr.error(resReg.message)
    }
    toastr.success(resReg.message)
    localStorage.setItem('authToken', resReg.token)
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
            <h1>Register</h1>
            <p>Please fill all fields.</p>
          </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                  label="Name"
                  error={this.state.nameHasError}
                />
              </div>
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
              <div className="form-group">
                <Input
                  name="repeat"
                  type="password"
                  value={this.state.repeat}
                  onChange={this.onChangeHandler}
                  label="Repeat password"
                  error={this.state.repeatPasswordHasError}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Register" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}