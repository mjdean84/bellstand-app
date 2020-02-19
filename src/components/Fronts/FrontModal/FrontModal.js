import React from 'react';

const frontModal = (props) => {

    let ticketInput = null;
    if (props.frontInputs.type === 'Check In') {
        ticketInput =
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="ticketNumber">Ticket:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ticketNumber"
                        placeholder="Ticket #"
                        onChange={(e) => props.frontInputsHandler('ticket', e.target.value)}
                    />
                    <p className="text-danger">{props.frontInputs.ticketError}</p>
                    </div>
                </div>
            </div>
    } else {
        ticketInput = null;
    }
    

    return (
        <form id="frontForm">
            <div className="modal" id="frontModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Add Front</h2>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="#typeRadios">Request Type:</label>
                            <div id="typeRadios">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="checkInRadio" name="frontType" value="Check In" onChange={() => props.typeSelect('Check In')} />Check In
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="checkOutRadio" name="frontType" value="Check Out" onChange={() => props.typeSelect('Check Out')} />Check Out
                                    </label>
                                </div>
                                <p className="text-danger">{props.frontInputs.typeError}</p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="frontRoom">Room:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="frontRoom"
                                            placeholder="Room #"
                                            onChange={(e) => props.frontInputsHandler('room', e.target.value)}
                                            value={props.frontInputs.room}
                                        />
                                        <p className="text-danger">{props.frontInputs.roomError}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="frontName">Guest Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="frontName"
                                            placeholder="Last Name"
                                            onChange={(e) => props.frontInputsHandler('name', e.target.value)}
                                            value={props.frontInputs.name}
                                        />
                                        <p className="text-danger">{props.frontInputs.nameError}</p>
                                    </div>
                                </div>
                            </div>
                            {ticketInput}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="frontComment">Comment:</label>
                                        <textarea
                                            className="form-control"
                                            id="frontComment"
                                            rows="2"
                                            placeholder="Comment..."
                                            onChange={(e) => props.frontInputsHandler('comment', e.target.value)}
                                            value={props.frontInputs.comment}
                                        />
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="#membershipRadios">Membership:</label>
                            <div id="membershipRadios">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="eliteRadio" name="frontElite" value="Elite" onChange={(e) => props.frontInputsHandler('elite', e.target.value)} />Elite
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="platinumRadio" name="frontElite" value="Platinum" onChange={(e) => props.frontInputsHandler('elite', e.target.value)} />Platinum
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="titaniumRadio" name="frontElite" value="Titanium" onChange={(e) => props.frontInputsHandler('elite', e.target.value)} />Titanium
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="ambassadorRadio" name="frontElite" value="Ambassador" onChange={(e) => props.frontInputsHandler('elite', e.target.value)} />Ambassador
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="frontElite" value="" onChange={(e) => props.frontInputsHandler('elite', e.target.value)} defaultChecked />None
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success form-control" onClick={() => props.click()} data-dismiss="modal">Dispatch</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        )
}

export default frontModal;