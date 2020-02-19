import React from 'react';

const nav = (props) => {
    const toggleFronts = () => {
        if (props.frontsClass === 'd-none') {
            props.click('fronts');
        }
    }
	return (
		<nav>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <span className="navbar-brand"><h3>Bellstand App</h3></span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => props.click('fronts')}>Requests</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => props.click('timeClock')}>Time Clock</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => props.click('completed')}>Completed</button>
                        </li>
                        <li className="nav-item active">
                            <button className="nav-link btn btn-primary" onClick={() => toggleFronts()} data-toggle="modal" data-target="#frontModal">Add Request</button>
                        </li>
                    </ul>
                </div>
            </nav>
		</nav>
	)
}

export default nav;