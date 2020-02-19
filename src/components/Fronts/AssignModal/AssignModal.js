import React from 'react';

const assignModal = (props) => {
    let noBellmen = null;
    let availBellmen = false;
    for (let i = 0; i < props.bellmen.length; i++) {
        if (props.bellmen[i].status === "Available" || props.bellmen[i].status === "Busy") {
            availBellmen = true;
        }
    }
    if (availBellmen === false) {
        noBellmen =
            <p className="text-center">*No available bellmen</p>
    }

    return (
        <div>
            <div className="modal" id="assignModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Assign Front</h2>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <table className="table text-capitalize">
                                <thead>
                                    <tr>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="hover">
                                    {
                                        props.bellmen.map((bellman, index) => {
                                            if (bellman.status === "Available" || bellman.status === "Busy") {
                                                return (
                                                    <tr key={index} onClick={() => props.bellmanClick(index)} active={bellman.active}>
                                                        <td>{bellman.lastName}</td>
                                                        <td>{bellman.firstName}</td>
                                                        <td>{bellman.status}</td>
                                                    </tr>
                                                )
                                            }
                                            else return null;
                                        })
                                    }
                                </tbody>
                            </table>
                            {noBellmen}
                            <div className="text-center">
                                <button className="btn btn-success m-3" onClick={() => props.assignBtn('assign')}
                                    data-dismiss="modal">Assign</button>
                                <button className="btn btn-danger m-3" data-dismiss="modal" data-toggle="modal"
                                    data-target="#confirmCancelModal">Cancel Front</button>
                                <button className="btn btn-secondary" id="editBtn" data-dismiss="modal"
                                    data-toggle="modal" data-target="#editModal">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="confirmCancelModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h1 className="m-5">Are you sure you want to cancel this front?</h1>
                            <button className="btn btn-lg btn-success m-3" onClick={props.confirmCancel} data-dismiss="modal">Yes</button>
                            <button className="btn btn-lg btn-danger m-3" data-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default assignModal;