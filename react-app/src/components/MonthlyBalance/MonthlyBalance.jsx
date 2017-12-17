import React, { Component } from 'react';
import { getExpress, updateExpress } from '../../api/remote';
import Expenses from './Expenses';
import toastr from 'toastr';

export default class Mounthly extends Component {
  constructor(props) {
    super(props);


    this.state = {
      year: this.props.match.params.year,
      month: this.props.match.params.month,
      expenses: [],
      income: 0,
      budget: 0,
      mounthText: ''
    }

    //bind
    this.getData = this.getData.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.mounthText = this.mounthText.bind(this);
  }

  componentDidMount() {
    this.getData()
    this.mounthText()
  }

  async getData() {
    let data = await getExpress(this.state.year, this.state.month);
    this.setState({
      income: data.income,
      budget: data.budget,
      expenses: data.expenses
    })
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault()
    let res = await updateExpress(this.state.year, this.state.month, { "income": Number(this.state.income), "budget": Number(this.state.budget) })
    if (!res.success) {
      toastr.error(res.message)
      return
    }
    toastr.success(res.message)
  }

  mounthText() {

    let mounth = Number(this.state.month);
    if (mounth === 1) {
      this.setState({mounthText: 'January'})
    }
    else if (mounth === 2) {
      this.setState({mounthText: 'February'})
    }
    else if (mounth === 3) {
      this.setState({mounthText: 'March'})
    }
    else if (mounth === 4) {
      this.setState({mounthText: 'April'})
    }
    else if (mounth === 5) {
      this.setState({mounthText: 'May'})
    }
    else if (mounth === 6) {
      this.setState({mounthText: 'June'})
    }
    else if (mounth === 7) {
      this.setState({mounthText: 'July'})
    }
    else if (mounth === 8) {
      this.setState({mounthText: 'August'})
    }
    else if (mounth === 9) {
      this.setState({mounthText: 'September'})
    }
    else if (mounth === 10) {
      this.setState({mounthText: 'October'})
    }
    else if (mounth === 11) {
      this.setState({mounthText: 'November'})
    }
    else if (mounth === 12) {
      this.setState({mounthText: 'December'})
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Welcome to Budget Planner</h1>
          </div>
        </div>
        <div className="row space-top ">
          <div className="col-md-12 ">
            <div className="card bg-secondary">
              <div className="card-body">
                <blockquote className="card-blockquote">
                  <h2 id="month">{this.state.mounthText} {this.state.year}</h2>
                  <div className="row">
                    <div className="col-md-3 space-top">
                      <h4>Planner</h4>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="income">Income:</label>
                          <input onChange={this.onChangeHandler} value={this.state.income} className="form-control" name="income" type="number" />
                        </div>
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="budget">Budget:</label>
                          <input onChange={this.onChangeHandler} value={this.state.budget} className="form-control" name="budget" type="number" />
                        </div>
                        <input type="submit" className="btn btn-secondary" value="Save" />
                      </form>
                    </div>
                    <div className="col-md-8 space-top">
                      <div className="row">
                        <h4 className="col-md-9">Expenses</h4>
                        <a href={`/expense/${this.state.year}/${this.state.month}`} className="btn btn-secondary ml-2 mb-2">Add expenses</a>
                      </div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Payment Date</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.expenses.map(e => {
                            return <Expenses props={e} key={e.id} />
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}