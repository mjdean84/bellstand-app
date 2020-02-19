import React, { Component } from 'react';
import './App.css';

import TimeClock from './components/TimeClock/TimeClock';
import Bellman from './components/Bellman/Bellman';
import Fronts from './components/Fronts/Fronts';
import Front from './components/Fronts/Front/Front';
import CompletedFronts from './components/CompletedFronts/CompletedFronts';
import Nav from './components/Nav/Nav';

class App extends Component {
    state = {
        currentTime: new Date(),

        //Hide Elements
        frontsClass: '',
        timeClockClass: '',
        completedClass: '',

        bellmanInputs: {
            lastName: '',
            firstName: '',
            position: '',

            lastNameError: '',
            firstNameError: '',
            positionError: '',
        },

        bellmen: [],
        activeIndex: '',
        activeStatus: '',

        fronts: [],
        activeFront: '',
        prevFrontState: '',
        frontInputs: {
            type: '',
            room: '',
            name: '',
            ticket: '',
            bags: '',
            comment: '',
            elite: '',

            //Validators
            typeError: '',
            roomError: '',
            nameError: '',
            ticketError: '',
            bagsError: ''
        },

        completedFronts: [],
        completedSort: ''

    }

    setCurrentTime() {
        this.setState({ currentTime: new Date() });
    }

    componentDidMount() {
        setInterval(()=>this.setCurrentTime(), 3000);
    }

    showTable = (arr) => {
        if (arr.length === 0) {
            return "d-none";
        } else {
            return "d-block";
        }
    }


    //Nav Buttons
    navClickHandler = (el) => {
        let val;
        if (el === 'fronts') {
            val = this.toggle(this.state.frontsClass);
            this.setState({ frontsClass: val });
        }
        if (el === 'timeClock') {
            val = this.toggle(this.state.timeClockClass);
            this.setState({ timeClockClass: val });
        }
        if (el === 'completed') {
            val = this.toggle(this.state.completedClass);
            this.setState({ completedClass: val });
        }
    }

    toggle = (arg) => {
        if (arg === '') return 'd-none';
        else return '';
    }

    //Staff
    bellmanInputsHandler = (argInput, argValue) => {
        const input = argInput;
        const value = argValue;
        let inputs = this.state.bellmanInputs;
        if (input === 'lastName') {
            inputs.lastName = value;
        }
        if (input === 'firstName') {
            inputs.firstName = value;
        }
        if (input === 'position') {
            inputs.position = value;
        }
        this.setState({ bellmanInputs: inputs });
    }

    isValid = (input) => {
        if (input === '') return false;
        return true;
    }

    clockInHandler = () => {
        let inputs = this.state.bellmanInputs;
        const message = '*Required';

        if (!this.isValid(inputs.lastName) || !this.isValid(inputs.firstName) || !this.isValid(inputs.position)) {
            if (!this.isValid(inputs.lastName)) inputs.lastNameError = message;
            else {
                inputs.lastNameError = '';
            }
            if (!this.isValid(inputs.firstName)) inputs.firstNameError = message;
            else {
                inputs.firstNameError = '';
            }
            if (!this.isValid(inputs.position)) inputs.positionError = message;
            else {
                inputs.positionError = '';
            }
            this.setState({ bellmanInputs: inputs });
        }
        else {
            const bellman = new Bellman(inputs.lastName, inputs.firstName, inputs.position);
            inputs= {
                lastName: '',
                firstName: '',
                position: '',
                lastNameError: '',
                firstNameError: '',
                positionError: '',
            }
            let bellmen = [...this.state.bellmen, bellman];
            this.setState({ bellmen: bellmen, bellmanInputs: inputs });

        }
    }

    employeeClickHandler = (index) => {
        this.state.bellmen.forEach((bellman) => {
            bellman.active = "false";
        })
        let bellmen = [...this.state.bellmen];
        bellmen[index].active = "true";
        let activeIndex = index;
        let activeStatus = this.state.bellmen[index].status;
        this.setState({ bellmen: bellmen, activeIndex: activeIndex, activeStatus: activeStatus });
    }

    statusHandler = (action) => {

        let status = this.state.activeStatus;
        let index = this.state.activeIndex;

        let bellmen = [...this.state.bellmen];

        if (action === "startBreak") {
            status = "On Break";
        }
        else if (action === "endBreak") {
            status = "Available";
        }
        else if (action === "exitQueue") {
            status = "Away";
        }
        else if (action === "enterQueue") {
            status = "Available";
        }
        else if (action === "busy") {
            status = "Busy";
        }
        else if (action === "clockOut") {
            bellmen.splice(index, 1);
            index = "";
            let activeStatus = "";
            this.setState({ bellmen: bellmen, activeStatus: activeStatus, activeIndex: index });
            return;
        }

        bellmen[index].status = status;
        bellmen[index].statusUpdated = new Date().toLocaleString();
        let activeStatus = status;

        this.setState({ bellmen: bellmen, activeStatus: activeStatus, activeIndex: index });

    }


    //Fronts
    frontInputsHandler = (field, value) => {
        let inputState = this.state.frontInputs;
        if (field === 'room') {
            inputState.room = value;
        }
        if (field === 'name') {
            inputState.name = value;
        }
        if (field === 'ticket') {
            inputState.ticket = value;
        }
        if (field === 'comment') {
            inputState.comment = value;
        }
        if (field === 'elite') {
            inputState.elite = value;
        }
        if (field === 'bags') {
            inputState.bags = value;
        }
        this.setState({ frontInputs: inputState });
    }

    editTypeHandler = (type) => {
        let activeFront = this.state.activeFront;
        const newType = type;
        activeFront.type = newType;
        if (activeFront.type === 'Check Out') {
            activeFront.ticket = '';
        }
        this.setState({ activeFront: activeFront });
    }

    editInputsHandler = (field, value) => {
        let front = this.state.activeFront;
        if (field === 'room') {
            front.room = value;
        }
        if (field === 'name') {
            front.name = value;
        }
        if (field === 'ticket') {
            front.ticket = value;
        }
        if (field === 'comment') {
            front.comment = value;
        }
        if (field === 'elite') {
            front.eliteStatus = value;
        }
        if (field === 'bags') {
            front.bags = value;
        }
        this.setState({ activeFront: front });
    }

    validate = (inputs) => {
        if (inputs.type === '' || inputs.room === '' || inputs.name === '') {
            return true;
        }
        if (inputs.type === 'Check In') {
            if (inputs.ticket === '' || inputs.bags === '') {
                return true;
            }
        }
        return false;
    }

    addFrontHandler = () => {
        let inputs = this.state.frontInputs;
        const missingItem = this.validate(inputs);
        if (missingItem) {
            if (inputs.type === '') inputs.typeError = '*Required';
            if (inputs.room === '') inputs.roomError = '*Required';
            if (inputs.name === '') inputs.nameError = '*Required';
            if (inputs.type === 'Check In') {
                if (inputs.ticket === '') {
                    inputs.ticketError = '*Required';
                }
                if (inputs.bags === '') {
                    inputs.bagsError = '*Required';
                }
            }
            this.setState({ frontInputs: inputs });
            document.getElementById('addFrontBtn').click();
        } else {
            const front = new Front(inputs.type, inputs.room, inputs.name, inputs.ticket, inputs.bags, inputs.comment, inputs.elite);
            const fronts = [...this.state.fronts, front];
            this.setState({ fronts: fronts });
            inputs = {
                type: '',
                room: '',
                name: '',
                ticket: '',
                bags: '',
                comment: '',
                elite: '',

                typeError: '',
                roomError: '',
                nameError: '',
                ticketError: '',
                bagsError: ''
            }
            
            this.setState({ frontInputs: inputs });
            document.getElementById('frontForm').reset();
        }
    }

    typeSelectHandler = (type) => {
        let frontInputs = this.state.frontInputs;
        frontInputs.type = type;
        this.setState({ frontInputs: frontInputs });
    }

    frontClickHandler = (index) => {
        let fronts = [...this.state.fronts];
        let activeFront = fronts[index];

        let bellmen = [...this.state.bellmen];
        bellmen.forEach((bellman) => {
            bellman.active = 'false';
        })
        this.setState({ bellmen: bellmen, activeFront: activeFront, activeIndex: '', activeStatus: '' });
    }

    assignHandler = (action) => {
        let activeFront = this.state.activeFront;
        if (this.validate(activeFront)) {
            document.getElementById('editBtn').click();
            return;
        }
        let fronts = this.state.fronts;
        let bellmen = this.state.bellmen;
        let bellman = bellmen[this.state.activeIndex];

        let frontIndex = fronts.indexOf(activeFront);
        let bellmanIndex = bellmen.indexOf(activeFront.bellman);

        if (this.state.activeIndex !== '' && action==='assign') {
            fronts.splice(frontIndex, 1);
            activeFront.status = 'Assigned';
            activeFront.bellman = bellman;
            fronts.push(activeFront);
            bellmen[this.state.activeIndex].fronts++;
            bellmen[this.state.activeIndex].status = 'Busy';
            bellmen.forEach(bellman => {
                bellman.active = "false";
            })
            this.setState({ activeFront: activeFront, fronts: fronts, bellmen: bellmen, activeStatus: '' });
        }
        else if (action === 'pending') {
            fronts.splice(frontIndex, 1);
            activeFront.status = 'Pending';
            activeFront.bellman = '';
            fronts.push(activeFront);
            bellmen[bellmanIndex].fronts--;
            if (bellmen[bellmanIndex].fronts === 0) {
                bellmen[bellmanIndex].status = 'Available';
            }
            this.setState({ activeFront: activeFront, fronts: fronts, bellmen: bellmen });
        }
        else {
            alert("Select a bellman to assign");
        }
    }

    completeFrontHandler = () => {
        const activeFront = this.state.activeFront;
        let fronts = this.state.fronts;
        let index = fronts.indexOf(activeFront);
        let completedFronts = this.state.completedFronts;
        fronts.splice(index, 1);

        if (activeFront.status === 'Assigned') {
            let bellmen = this.state.bellmen;
            let bellmanIndex = bellmen.indexOf(activeFront.bellman);
            let bellman = bellmen[bellmanIndex];
            bellman.fronts--;

            if (bellman.status === 'Busy' && bellman.fronts === 0) {
                bellman.status = 'Available';
            }
            bellmen[bellmanIndex] = bellman;
            activeFront.timeCompleted = new Date();
            activeFront.timeElapsed = Math.floor((activeFront.timeCompleted.getTime() - activeFront.time.getTime()) / 1000 / 60);
            activeFront.bellman = activeFront.bellman.fullName;
            completedFronts.push(activeFront);
            this.setState({ bellmen: bellmen, completedFronts: completedFronts });
        }
        
        this.setState({ fronts: fronts });
    }

    sortBy = (property) => {
        let order = 1;
        let completedSort = this.state.completedSort;
        if (property === completedSort) {
            order = -1;
            completedSort = '';
        } else {
            completedSort = property;
        }
        this.setState({ completedSort: completedSort });
        return function (a, b) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * order;
        }
    }

    sortCompletedHandler = (property) => {
        let fronts = this.state.completedFronts;
        fronts.sort(this.sortBy(property));
        this.setState({ completedFronts: fronts });
    }



    render() {




        return (
            <div className="App">
                <Nav click={this.navClickHandler} frontsClass={this.state.frontsClass} />
                <Fronts
                    class={this.state.frontsClass}
                    currentTime={this.state.currentTime}
                    activeFront={this.state.activeFront}
                    tableClass={this.showTable}
                    fronts={this.state.fronts}
                    bellmen={this.state.bellmen}
                    validators={this.state.validators}
                    frontInputs={this.state.frontInputs}
                    click={this.addFrontHandler}
                    frontClick={this.frontClickHandler}
                    typeSelect={this.typeSelectHandler}
                    frontInputsHandler={this.frontInputsHandler}
                    bellmanClick={this.employeeClickHandler}
                    assignFront={this.assignHandler}
                    confirmCancel={this.completeFrontHandler}
                    editInputs={this.editInputsHandler}
                    editType={this.editTypeHandler}
                />
                <TimeClock
                    class={this.state.timeClockClass}
                    className={this.showTable(this.state.bellmen)}
                    bellmen={this.state.bellmen}
                    status={this.state.activeStatus}
                    bellmanInputs={this.state.bellmanInputs}
                    bellmanInputsHandler={this.bellmanInputsHandler}
                    click={this.clockInHandler}
                    staffButtonClick={this.statusHandler}
                    employeeClick={this.employeeClickHandler}
                />
                <CompletedFronts class={this.state.completedClass} fronts={this.state.completedFronts} sort={this.sortCompletedHandler} />
            </div>
        );
    }
}

export default App;
