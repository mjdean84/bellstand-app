import React from 'react';


const timeClock = (props) => {
    return (
        <section className={props.class}>
            <div className="container">
                <h1 className="display-3 text-center">Staff</h1>
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
                            <label id="lastNameValidator" htmlFor="lastName" className="text-danger d-none">*Required</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="First Name" />
                            <label id="firstNameValidator" htmlFor="firstName" className="text-danger d-none">*Required</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="position">Position:</label>
                            <input type="text" className="form-control" id="position" placeholder="Position" />
                            <label id="positionValidator" htmlFor="position" className="text-danger d-none">*Required</label>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={props.click}>Clock In</button>
            </div>
        </section>
    );
}

export default timeClock;