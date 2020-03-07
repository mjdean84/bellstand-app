import React from 'react';

const completedFronts = (props) => {
    return (
        <section className={props.class}>
            <h1 className="display-3 text-center">Completed Fronts</h1>
            <hr />


            <div className="container my-4">
                <div className="row">
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="#startDate">Start Date:</label>
                            <input className="form-control" id="startDate" type="date" value={props.completedFilters.startDate || ''}
                                onChange={(e) => props.setCompletedFilters('startDate', e.target.value)} />
                            <p className="text-danger">{props.dateError}</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="#endDate">End Date:</label>
                            <input className="form-control" id="endDate" type="date" value={props.completedFilters.endDate || ''}
                                onChange={(e) => props.setCompletedFilters('endDate', e.target.value)} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="#guestName">Guest Name:</label>
                            <input className="form-control" id="guestName" type="text" value={props.completedFilters.guestName || ''}
                                onChange={(e) => props.setCompletedFilters('guestName', e.target.value)} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="#bellman">Bellman:</label>
                            <input className="form-control" id="bellman" type="text" value={props.completedFilters.bellman || ''}
                                onChange={(e) => props.setCompletedFilters('bellman', e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-success form-control"
                            onClick={() => props.searchCompleted()}>Search</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary form-control" hidden={props.filtered}
                            onClick={() => props.resetFilter()}>Reset</button>
                    </div>
                </div>
            </div>


            <table className="table table-striped text-capitalize">
                <thead>
                    <tr className="hover">
                        <th onClick={() => props.sort('time')}>Requested</th>
                        <th onClick={() => props.sort('timeCompleted')}>Completed</th>
                        <th onClick={() => props.sort('timeElapsed')}>Time</th>
                        <th onClick={() => props.sort('bellman')}>Bellman</th>
                        <th onClick={() => props.sort('type')}>Type</th>
                        <th onClick={() => props.sort('room')}>Room</th>
                        <th onClick={() => props.sort('name')}>Name</th>
                        <th onClick={() => props.sort('ticket')}>Ticket</th>
                        <th onClick={() => props.sort('bags')}>Bags</th>
                        <th onClick={() => props.sort('eliteStatus')}>Membership</th>
                    </tr>
                </thead>
                <tbody>
                    {props.fronts.map(front => {
                        return (
                            <tr key={front.time}>
                                <td>{front.time.toLocaleString()}</td>
                                <td>{front.timeCompleted.toLocaleString()}</td>
                                <td>{front.timeElapsed}</td>
                                <td>{front.bellman}</td>
                                <td>{front.type}</td>
                                <td>{front.room}</td>
                                <td>{front.name}</td>
                                <td>{front.ticket}</td>
                                <td>{front.bags}</td>
                                <td>{front.eliteStatus}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4 className="text-center text-danger" hidden={props.fronts.length !== 0}>*No completed fronts available</h4>
        </section>
    )
}

export default completedFronts;