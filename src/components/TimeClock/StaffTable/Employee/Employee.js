import React from 'react';

const employee = (props) => {
    return (
        <tr className="text-capitalize" onClick={props.click} active={props.active}>
            <td>{props.name}</td>
            <td>{props.position}</td>
            <td>{props.timeIn}</td>
            <td>{props.statusUpdated}</td>
            <td>{props.status}</td>
        </tr>
    );
}

export default employee;