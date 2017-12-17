import React from 'react';

export default (props) => {
  props = props.props;
  let date = props.date + '/' + props.month + '/' + props.year;
  console.log(date)
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>{date}</td>
      <td>
        <a href={"/expense/" + props.id} className="btn btn-secondary">Delete</a>
      </td>
    </tr>
  )
}