import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {deleteExpress} from '../../api/remote';
import toastr from 'toastr';

export default class Remove extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    } 


    //bind
    this.remove = this.remove.bind(this);
  }

  componentDidMount(){
    this.remove()
  }

  async remove(){
    let res = await deleteExpress(this.props.match.params.expenseId);
    this.setState({redirect: true})
    if(!res.success){
      toastr.error(res.message)
    }
    toastr.success(res.message)
  }

  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to="/mountlyBalance/2017/11" />}
      </div>
    )
  }
}