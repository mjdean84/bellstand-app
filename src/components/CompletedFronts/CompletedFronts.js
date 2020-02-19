import React from 'react';

const completedFronts = (props) => {
    return (
        <section className={props.class}>
            <h1 className="display-3 text-center">Completed Fronts</h1>
            <hr />
            <table className="table table-striped text-capitalize" hidden={props.fronts.length === 0}>
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
        </section>
    )
}

export default completedFronts;