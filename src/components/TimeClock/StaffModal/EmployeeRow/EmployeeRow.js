import React from 'react';

const employeeRow = (props) => {
	return (
		<tr className="text-capitalize" onClick={props.staffListClick} active={props.active}>
			<td>{props.name}</td>
			<td>{props.position}</td>
		</tr>
	)
}

export default employeeRow;