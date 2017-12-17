import React from 'react';

export default (props) => {
  let budget = '';
  let balance = '';
  if(props.data){
    budget = props.data.budget;
    balance = props.data.balance
  }
  
  return (
    <div className="col-md-3">
      <div className="card text-white bg-secondary">
        <div className="card-body">
          <blockquote className="card-blockquote">
            <h2>{props.month}</h2>
            <h4>Year {props.year}</h4>
            <label htmlFor="budget">Budget:</label>
            <input className="col-md-9" name="budget" disabled value={budget} />
            <label htmlFor="balance">Balance:</label>
            <input className="col-md-9" name="balance" disabled value={balance} />
            <div className="space-top">
              <a href={`/mountlyBalance/${props.year}/${props.monthNumber}`} className="btn btn-secondary">Details</a>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  )
}