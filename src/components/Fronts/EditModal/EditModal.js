import React from 'react';

const editModal = (props) => {
	let roomValidator = null;
	if (props.front.room === '') {
		roomValidator =
		<p className="text-danger">*Required</p>
	}

	let nameValidator = null;
	if (props.front.name === '') {
		nameValidator =
			<p className="text-danger">*Required</p>
	}

	let ticketValidator = null;
	if (props.front.ticket === '' && props.front.type === 'Check In') {
		ticketValidator =
			<p className="text-danger">*Required</p>
	}

	let ticketInput = null;
	if (props.front.type === 'Check In') {
		ticketInput =
		<div className="row">
			<div className="col-md-6">
				<div className="form-group">
					<label htmlFor="ticketNumber">Ticket:</label>
					<input
						type="text"
						className="form-control"
						id="ticketNumber"
						value={props.front.ticket}
						onChange={(e) => props.editInputs('ticket', e.target.value)}
					/>
					{ticketValidator}
				</div>
			</div>
		</div>
	} else {
		ticketInput = null;
	}

	return (
		<div className="modal" id="editModal">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title">Edit Front</h1>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>
					<div className="modal-body">
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="checkInRadio" name="frontType" value="Check In"
									checked={props.front.type === 'Check In'}
									onChange={() => props.editType('Check In')}/>Check In
                                </label>
						</div>
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="checkOutRadio" name="frontType" value="Check Out"
									checked={props.front.type === 'Check Out'}
									onChange={() => props.editType('Check Out')}
								/>Check Out</label>
						</div>
						<div className="row">
							<div className="col">
								<div className="form-group">
									<label htmlFor="#editRoom">Room:</label>
									<input className="form-control" type="number" id="editRoom" value={props.front.room || ''}
										onChange={(e) => props.editInputs('room', e.target.value)}
									/>
									{roomValidator}
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label htmlFor="#editName">Name:</label>
									<input className="form-control" type="text" id="editName" value={props.front.name || ''}
										onChange={(e) => props.editInputs('name', e.target.value)}
									/>
									{nameValidator}
								</div>
							</div>
						</div>
						{ticketInput}
						<div className="form-group">
							<label htmlFor="#editComment">Comment:</label>
							<textarea className="form-control" id="editComment" value={props.front.comment}
								onChange={(e) => props.editInputs('comment', e.target.value)}
							/>
						</div>

						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="eliteRadio" name="frontElite"
									value="Elite" checked={props.front.eliteStatus === 'Elite'}
									onChange={(e) => props.editInputs('elite', e.target.value)} />Elite
                                </label>
						</div>
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="platinumRadio" name="frontElite"
									value="Platinum" checked={props.front.eliteStatus === 'Platinum'}
									onChange={(e) => props.editInputs('elite', e.target.value)} />Platinum
                                </label>
						</div>
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="titaniumRadio" name="frontElite"
									value="Titanium" checked={props.front.eliteStatus === 'Titanium'}
									onChange={(e) => props.editInputs('elite', e.target.value)} />Titanium
                                </label>
						</div>
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" id="ambassadorRadio" name="frontElite"
									value="Ambassador" checked={props.front.eliteStatus === 'Ambassador'}
									onChange={(e) => props.editInputs('elite', e.target.value)} />Ambassador
                                </label>
						</div>
						<div className="form-check-inline">
							<label className="form-check-label">
								<input type="radio" className="form-check-input" name="frontElite" value=""
									checked={props.front.eliteStatus === ''}
									onChange={(e) => props.editInputs('elite', e.target.value)} />None
                                </label>
						</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-success form-control" data-dismiss="modal">Done</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default editModal;