import React, { Component } from 'react';
import { addExpress } from '../../api/remote';
import toastr from 'toastr';

export default class AddExpenses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: 'Non-essential',
      nameHasError: '',
      categoryHasError: '',
      costHasError: '',
      dataHasError: ''
    }

    //bind
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault()
    this.setState({
      date: Number(this.state.data),
      amount: Number(this.state.amount)
    })
    let res = await addExpress(this.props.match.params.year, this.props.match.params.month, this.state )
    if(!res.success){
      toastr.error(res.message)
      return
    }
    toastr.success(res.message)
    let year = this.props.match.params.year;
    let month = this.props.match.params.month;
    this.props.history.push(`/mountlyBalance/${year}/${month}`)

  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Add Expenses</h1>
            <h3>November 2017</h3>
          </div>
        </div>
        <div className="row space-top">
          <div className="col-md-10">
            <form onSubmit={this.onSubmit}>
              <legend>Add a new expense</legend>
              <div className="form-group">
                <label className="col-md-2" htmlFor="name">Name:</label>
                <input onChange={this.onChangeHandler} className="col-md-2" name="name" type="text" />
              </div>
              <div className="form-group">
                <label className="col-md-2" htmlFor="category">Category:</label>
                <select value={this.state.category} onChange={this.onChangeHandler} className="col-md-2 pl-2" name="category">
                  <option>Non-essential</option>
                  <option>Fixed</option>
                  <option>Variable</option>
                </select>
              </div>
              <div className="form-group">
                <label className="col-md-2" htmlFor="cost">Cost:</label>
                <input onChange={this.onChangeHandler} className="col-md-2" name="amount" type="number" />
              </div>
              <div className="form-group">
                <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                <input onChange={this.onChangeHandler} className="col-md-2" name="date" type="text" />
              </div>
              <input type="submit" className="btn btn-secondary" value="Add" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}