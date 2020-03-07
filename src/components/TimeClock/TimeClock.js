import React from 'react';

import StaffTable from './StaffTable/StaffTable';
import StaffModal from './StaffModal/StaffModal';

const timeClock = (props) => {
    return (
        <section className={props.class}>
            <div className="container">
                <h1 className="display-3 text-center">Staff</h1>

                <hr />

                <div className="d-flex justify-content-between my-2">
                    <button className="btn btn-success" id="clockInBtn" data-toggle="modal"
                        data-target="#staffModal">Clock In</button>
                    <button className="btn btn-primary ml-auto" data-toggle="modal"
                    data-target="#manageStaffModal">Employee List</button>
                </div>
                
                <StaffTable
                    className={props.className}
                    bellmen={props.bellmen}
                    click={props.employeeClick}
                    status={props.status}
                    staffButtonClick={props.staffButtonClick}
                />
                <StaffModal
                    staff={props.staff}
                    staffListClick={props.staffListClick}
                    clockIn={props.clockIn}
                    clockInError={props.clockInError}
                />
                
            </div>
        </section>
    );
}

export default timeClock;

/*
 * <h1>Add Employee</h1>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                                value={props.bellmanInputs.lastName}
                                onChange={(e) => props.bellmanInputsHandler('lastName', e.target.value)}
                            />
                            <label htmlFor="lastName" className="text-danger">{props.bellmanInputs.lastNameError}</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="First Name"
                                value={props.bellmanInputs.firstName}
                                onChange={(e) => props.bellmanInputsHandler('firstName', e.target.value)}
                            />
                            <label htmlFor="firstName" className="text-danger">{props.bellmanInputs.firstNameError}</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="position">Position:</label>
                            <select className="form-control" id="position" value={props.bellmanInputs.position}
                                onChange={(e) => props.bellmanInputsHandler('position', e.target.value)}>
                                <option value="" hidden>Select Position</option>
                                <option value="Bellman">Bellman</option>
                                <option value="Bell Captain">Bell Captain</option>
                                <option value="Manager">Manager</option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="position" className="text-danger">{props.bellmanInputs.positionError}</label>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={props.click}>Clock In</button>
                */