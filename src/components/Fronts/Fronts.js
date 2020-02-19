import React from 'react';

import AssignModal from './AssignModal/AssignModal';
import FrontModal from './FrontModal/FrontModal';
import EditModal from './EditModal/EditModal';

const fronts = (props) => {
    let assignedClass;
    let assignedFronts = 0;
    props.fronts.forEach(front => {
        if (front.status === 'Assigned') {
            assignedFronts++;
        }
    })
    if (assignedFronts === 0) {
        assignedClass = 'd-none';
    } else {
        assignedClass = 'd-block';
    }

    return (
        <section className={props.class}>
            <div className="container">
                <h1 className="display-3 text-center">Service Requests</h1>
                <hr />
                <button className="btn btn-primary" id="addFrontBtn" data-toggle="modal" data-target="#frontModal">Add Request</button>
                <div className={props.tableClass(props.fronts)}>
                    <h1 className="mt-3">Pending</h1>
                    <table className="table table-hover text-capitalize">
                        <thead className="bg-light">
                            <tr>
                                <th>Time</th>
                                <th>Room</th>
                                <th>Last Name</th>
                                <th>Type</th>
                                <th>Ticket</th>
                                <th>Comment</th>
                                <th>Membership</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white hover">
                            {props.fronts.map((front, index) => {
                                let time = Math.floor((props.currentTime.getTime() - front.time.getTime()) / 1000 / 60);
                                if (time < 0) {
                                    time = 0;
                                }
                                if (front.status === 'Pending') {
                                    return (
                                        <tr key={front.time} data-toggle="modal" data-target="#assignModal" onClick={() => props.frontClick(index)}>
                                            <td id={front.time}>{time}</td>
                                            <td>{front.room}</td>
                                            <td>{front.name}</td>
                                            <td>{front.type}</td>
                                            <td>{front.ticket}</td>
                                            <td>{front.comment}</td>
                                            <td>{front.eliteStatus}</td>
                                        </tr>
                                    )
                                }
                                return null;
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={assignedClass}>
                    <h1>Assigned</h1>
                    <table className="table table-hover text-capitalize hover">
                        <thead className="bg-light">
                            <tr>
                                <th>Time</th>
                                <th>Bellman</th>
                                <th>Room</th>
                                <th>Last Name</th>
                                <th>Type</th>
                                <th>Ticket</th>
                                <th>Comment</th>
                                <th>Membership</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {props.fronts.map((front, index) => {
                                if (front.status === 'Assigned') {
                                    let time = Math.floor((props.currentTime.getTime() - front.time.getTime()) / 1000 / 60);
                                    if (time < 0) {
                                        time = 0;
                                    }
                                    return (
                                        <tr key={front.time} data-toggle="modal" data-target="#completeModal" onClick={() => props.frontClick(index)}>
                                            <td id={front.time}>{time}</td>
                                            <td>{front.bellman.fullName}</td>
                                            <td>{front.room}</td>
                                            <td>{front.name}</td>
                                            <td>{front.type}</td>
                                            <td>{front.ticket}</td>
                                            <td>{front.comment}</td>
                                            <td>{front.eliteStatus}</td>
                                        </tr>
                                    )
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="modal" id="completeModal">
                    <div className="modal-dialog p-5">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title">Complete?</h1>
                            </div>
                            <div className="modal-body text-center">
                                <button className="btn btn-lg btn-success m-3" onClick={props.confirmCancel} data-dismiss="modal">Yes</button>
                                <button className="btn btn-lg btn-danger m-3" data-dismiss="modal">No</button>
                                <button className="btn btn-lg btn-info m-3" onClick={() => props.assignFront('pending')} data-dismiss="modal">Pending</button>
                            </div>
                        </div>
                    </div>
                </div>


                <FrontModal
                    click={props.click}
                    typeSelect={props.typeSelect}
                    frontInputs={props.frontInputs}
                    frontInputsHandler={props.frontInputsHandler}
                />
                <AssignModal
                    bellmen={props.bellmen}
                    bellmanClick={props.bellmanClick}
                    assignBtn={props.assignFront}
                    confirmCancel={props.confirmCancel}
                />
                <EditModal
                    front={props.activeFront}
                    editInputs={props.editInputs}
                    editType={props.editType}
                />
            </div>
        </section>
    )
}
export default fronts;