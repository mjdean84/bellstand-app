import React from 'react';

import Employee from './Employee/Employee';

const staffTable = (props) => {

    const isDisabled = (btnType, status) => {
        if (btnType === 'startBreak') {
            if (status === 'Available') return false;
            else return true;
        }
        if (btnType === 'endBreak') {
            if (status === 'On Break') return false;
            else return true;
        }
        if (btnType === 'exitQueue') {
            if (status === 'Available') return false;
            else return true;
        }
        if (btnType === 'clockOut') {
            if (status === 'Available') return false;
            else return true;
        }
    }

    const isHidden = (btnType, status) => {
        if (btnType === 'exitQueue') {
            if (status === 'Away') return true;
            else return false;
        }
        if (btnType === 'enterQueue') {
            if (status === 'Away') return false;
            else return true;
        }
    }

    return (
        <div className={props.className}>
            <div className="container">
                <table className="table">
                    <thead className="bg-light">
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Time In</th>
                            <th>Status Updated</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white hover">
                        {props.bellmen.map((bellman, index) => {
                            return (
                                <Employee
                                    key={index}
                                    click={() => props.click(index)}
                                    active={bellman.active}
                                    name={bellman.name}
                                    position={bellman.position}
                                    timeIn={bellman.timeIn}
                                    statusUpdated={bellman.statusUpdated}
                                    status={bellman.status}
                                />
                            )
                        })}
                    </tbody>
                </table>
                <div className="text-center">
                    <button
                        className="btn btn-secondary m-3"
                        onClick={() => props.staffButtonClick('startBreak')}
                        disabled={isDisabled('startBreak', props.status)}>Start Break
                        </button>
                    <button
                        className="btn btn-secondary m-3"
                        onClick={() => props.staffButtonClick('endBreak')}
                        disabled={isDisabled('endBreak', props.status)}>End Break</button>
                    <button
                        className="btn btn-secondary m-3"
                        onClick={() => props.staffButtonClick('exitQueue')}
                        disabled={isDisabled('exitQueue', props.status)}
                        hidden={isHidden('exitQueue', props.status)}>Exit Queue</button>
                    <button
                        className="btn btn-secondary m-3"
                        onClick={() => props.staffButtonClick('enterQueue')}
                        hidden={isHidden('enterQueue', props.status)}>Enter Queue</button>
                    <button
                        className="btn btn-secondary m-3"
                        onClick={() => props.staffButtonClick('clockOut')}
                        disabled={isDisabled('clockOut', props.status)}>Clock Out</button>
                </div>
            </div>
        </div>
    )
}

export default staffTable;