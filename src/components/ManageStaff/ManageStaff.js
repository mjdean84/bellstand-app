import React, { useState } from 'react';

const ManageStaff = (props) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [position, setPosition] = useState('');

    return (
        <div className="modal" id="manageStaffModal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Manage Staff</h2>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <input className="form-control" type="text" placeholder="Last Name"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                                <div className="col-md-3">
                                    <input className="form-control" type="text" placeholder="First Name"
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    <select className="form-control" onChange={(e) => setPosition(e.target.value)}>
                                        <option value="-1">Choose Position</option>
                                        <option>Bellman</option>
                                        <option>Bell Captain</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success form-control"
                                        onClick={() => props.postNewEmployee(lastName, firstName, position)}>Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table text-capitalize">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.staff.map((empl, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{empl.name}</td>
                                            <td>{empl.position}</td>
                                            <td>
                                                <button
                                                    className="btn text-lg" onClick={() => props.deleteStaff(index)}>&times;
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">

                    </div>
                </div>
            </div>
        </div>
                    
               

    )
}
            
export default ManageStaff;