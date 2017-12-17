import React, { Component } from 'react';
import { getPlan } from '../../api/remote';
import Box from './Box';

export default class YearlyBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      year: Number(this.props.match.params.year)
    }

    //bind
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.year);
  }

  async getData(year) {
    let data = await getPlan(year);
    this.setState({ data })
  }
  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Yearly Balance</h1>
          </div>
        </div>
        <div className="row space-top col-md-12">
          <Box
            month="January"
            year={this.state.year}
            data={this.state.data[1]}
            monthNumber="1"
          />
          <Box
            month="February"
            year={this.state.year}
            data={this.state.data[2]}
            monthNumber="2"
          />
          <Box
            month="March"
            year={this.state.year}
            data={this.state.data[3]}
            monthNumber="3"
          />
          <Box
            month="April"
            year={this.state.year}
            data={this.state.data[4]}
            monthNumber="4"
          />
        </div>
        <div className="row space-top col-md-12">

          <Box
            month="May"
            year={this.state.year}
            data={this.state.data[5]}
            monthNumber="5"
          />
          <Box
            month="June"
            year={this.state.year}
            data={this.state.data[6]}
            monthNumber="6"
          />
          <Box
            month="July"
            year={this.state.year}
            data={this.state.data[7]}
            monthNumber="7"
          />
          <Box
            month="August"
            year={this.state.year}
            data={this.state.data[8]}
            monthNumber="8"
          />
        </div>
        <div className="row space-top col-md-12">

          <Box
            month="September"
            year={this.state.year}
            data={this.state.data[9]}
            monthNumber="9"
          />
          <Box
            month="October"
            year={this.state.year}
            data={this.state.data[10]}
            monthNumber="10"
          />
          <Box
            month="November"
            year={this.state.year}
            data={this.state.data[11]}
            monthNumber="11"
          />
          <Box
            month="December"
            year={this.state.year}
            data={this.state.data[12]}
            monthNumber="12"
          />
        </div>
      </div>
    );
  }
}