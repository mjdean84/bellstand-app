import React, { useState } from 'react';

import Front from '../Front/Front';

const FrontModal = (props) => {

    const [inputs, setInputs] = useState({
        frontType: '',
        roomNumber: '',
        guestName: '',
        ticketNumber: '',
        numberOfBags: '',
        comment: '',
        membership: ''
    });

    const [validators, setValidators] = useState({
        typeError: '',
        roomError: '',
        nameError: '',
        ticketError: '',
        bagsError: ''
    });

    const validateInputs = () => {
        let returnMessage = true;

        let typeError = '';
        let roomError = '';
        let nameError = '';
        let ticketError = '';
        let bagsError = '';

        const message = '*Required';

        if (!inputs.frontType) {
            typeError = message;
            returnMessage = false;
        }
        if (!inputs.roomNumber) {
            roomError = message;
            returnMessage = false;
        }
        if (!inputs.guestName) {
            nameError = message;
            returnMessage = false;
        }
        if (inputs.frontType === 'Check In' && !inputs.ticketNumber) {
            ticketError = message;
            returnMessage = false;
        }
        if (inputs.frontType === 'Check In' && !inputs.numberOfBags) {
            bagsError = message;
            returnMessage = false;
        }
        setValidators({
            typeError: typeError,
            roomError: roomError,
            nameError: nameError,
            ticketError: ticketError,
            bagsError: bagsError
        });
        return returnMessage;
    }

    const addFront = () => {
        if (validateInputs()) {
            const front = new Front(inputs.frontType, inputs.roomNumber, inputs.guestName, inputs.ticketNumber,
                inputs.numberOfBags, inputs.comment, inputs.membership);
            props.addFrontHandler(front);
            
            setInputs({
                frontType: '',
                roomNumber: '',
                guestName: '',
                ticketNumber: '',
                numberOfBags: '',
                comment: '',
                membership: ''
            });

            document.getElementById('frontForm').reset();
        }
        else {
            document.getElementById('addFrontBtn').click();
        }
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
                                        <input type="radio" className="form-check-input" id="checkInRadio" name="frontType"
                                            value="Check In" onClick={() => setInputs({ ...inputs, frontType: 'Check In' })} />Check In
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="checkOutRadio" name="frontType"
                                            value="Check Out" onClick={() => setInputs({ ...inputs, frontType: 'Check Out' })} />Check Out
                                    </label>
                                </div>
                                <p className="text-danger">{validators.typeError}</p>
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
                                            onChange={(e) => setInputs({ ...inputs, roomNumber: e.target.value })}
                                            value={inputs.roomNumber || ''}
                                        />
                                        <p className="text-danger">{validators.roomError}</p>
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
                                            onChange={(e) => setInputs({ ...inputs, guestName: e.target.value })}
                                            value={inputs.guestName || ''}
                                        />
                                        <p className="text-danger">{validators.nameError}</p>
                                    </div>
                                </div>
                            </div>

                            <div hidden={inputs.frontType !== 'Check In'}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ticketNumber">Ticket:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ticketNumber"
                                                placeholder="Ticket #"
                                                onChange={(e) => setInputs({ ...inputs, ticketNumber: e.target.value })}
                                            />
                                            <p className="text-danger">{validators.ticketError}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="#numBags">Number of Bags:</label>
                                            <input type="number" className="form-control" id="numBags" min="1"
                                                onChange={(e) => setInputs({ ...inputs, numberOfBags: e.target.value })} />
                                            <p className="text-danger">{validators.bagsError}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="frontComment">Comment:</label>
                                        <textarea
                                            className="form-control"
                                            id="frontComment"
                                            rows="2"
                                            placeholder="Comment..."
                                            onChange={(e) => setInputs({ ...inputs, comment: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="#membershipRadios">Membership:</label>
                            <div id="membershipRadios">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="eliteRadio" name="frontElite"
                                            value="Elite" onChange={(e) => setInputs({ ...inputs, membership: e.target.value })}
                                        />Elite
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="platinumRadio" name="frontElite"
                                            value="Platinum" onChange={(e) => setInputs({ ...inputs, membership: e.target.value })}
                                        />Platinum
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="titaniumRadio" name="frontElite"
                                            value="Titanium" onChange={(e) => setInputs({ ...inputs, membership: e.target.value })}
                                        />Titanium
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" id="ambassadorRadio" name="frontElite"
                                            value="Ambassador" onChange={(e) => setInputs({ ...inputs, membership: e.target.value })}
                                        />Ambassador
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="frontElite" value=""
                                            onChange={(e) => setInputs({ ...inputs, membership: e.target.value })}
                                            defaultChecked />None
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success form-control" onClick={() => addFront()}
                                data-dismiss="modal">Dispatch</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        )
}

export default FrontModal;