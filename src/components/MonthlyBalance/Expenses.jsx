import React from 'react';

export default (props) => {
  props = props.props
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>{props.creationTime}</td>
      <td>
        <a href={"/expense/" + props.id} className="btn btn-secondary">Delete</a>
      </td>
    </tr>
  )
}