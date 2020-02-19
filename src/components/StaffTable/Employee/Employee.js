import React from 'react';

const employee = (props) => {
    return (
        <tr className="text-capitalize" onClick={props.click} active={props.active}>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td>{props.position}</td>
            <td>{props.status}</td>
        </tr>
    );
}

export default employee;