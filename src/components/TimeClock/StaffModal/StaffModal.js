import React from 'react';

import EmployeeRow from './EmployeeRow/EmployeeRow';

const staffModal = (props) => {
    return(
        <div className="modal" id="staffModal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Staff</h2>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead className="bg-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white hover">
                                {props.staff.map((empl, index) => {
                                    return (
                                        <EmployeeRow
                                            key={index}
                                            name={empl.name}
                                            position={empl.position}
                                            staffListClick={() => props.staffListClick(index)}
                                            active={empl.active}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                        <h4 className="text-danger text-center">{props.clockInError}</h4>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success form-control" onClick={() => props.clockIn()} data-dismiss="modal">Clock In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default staffModal;