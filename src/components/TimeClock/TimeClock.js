import React from 'react';

import StaffTable from './StaffTable/StaffTable'

const timeClock = (props) => {
    return (
        <section className={props.class}>
            <div className="container">
                <h1 className="display-3 text-center">Staff</h1>
                <hr />
                <StaffTable
                    className={props.className}
                    bellmen={props.bellmen}
                    click={props.employeeClick}
                    status={props.status}
                    staffButtonClick={props.staffButtonClick}
                />
                <h1>Add Employee</h1>
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
            </div>
        </section>
    );
}

export default timeClock;