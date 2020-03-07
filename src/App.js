import React, { Component } from 'react';
import './App.css';

import TimeClock from './components/TimeClock/TimeClock';
import Bellman from './components/Bellman/Bellman';
import Fronts from './components/Fronts/Fronts';
import CompletedFronts from './components/CompletedFronts/CompletedFronts';
import Nav from './components/Nav/Nav';
import axios from './axios-fronts';
import ManageStaff from './components/ManageStaff/ManageStaff';

class App extends Component {
    state = {
        currentTime: new Date(),
        appMounted: false,

        //Hide Elements
        frontsClass: '',
        timeClockClass: '',
        completedClass: '',

        allStaff: [],
        staffList: [],
        clockInError: '',

        bellmen: [],
        activeIndex: '',
        activeStatus: '',

        fronts: [],
        activeFront: '',
        prevFrontState: '',

        completedFronts: [],
        completedFrontsFiltered: true,
        allCompletedFronts: [],
        completedSort: '',
        completedFilters: {
            startDate: '',
            endDate: '',
            guestName: '',
            bellman: ''
        },
        dateError: '',

        aveTime: 'N/A'
    }

    setCurrentTime() {
        this.setState({ currentTime: new Date() });
    }

    componentDidMount() {
        this.setCurrentTime();
        setInterval(() => this.setCurrentTime(), 3000);
        
        axios.get('/current-fronts.json')
            .then(response => {
                let fronts = [];
                let data = response.data;
                for (let key in data) {
                    if (key === 'bags') {
                        fronts.push(data);
                        this.setState({ fronts: fronts });
                        return;
                    }
                    else if (data.hasOwnProperty(key)) {
                        fronts.push(data[key]);
                    }
                }
                this.setState({ fronts: fronts });
            })
            .catch(error => console.log(error));

        axios.get('/completed-fronts.json')
            .then(response => {
                let fronts = [];
                let data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        fronts.push(data[key]);
                    }
                }
                this.setState({ completedFronts: fronts, allCompletedFronts: fronts });
                this.aveTimeHandler();
            })

        axios.get('/active-staff.json')
            .then(response => {
                let bellmen = [...this.state.bellmen];
                let data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        bellmen.push(data[key]);
                    }
                }
                this.setState({ bellmen: bellmen });
            })
            .catch(error => console.log(error));
        
        axios.get('/staff.json')
            .then(response => {
                let staff = [];
                let data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        data[key].active = 'false';
                        data[key].id = [key];
                        staff.push(data[key]);
                    }
                }
                this.setState({ staffList: staff, allStaff: staff });
                setTimeout(this.updateStaffList, 1000);
            })
            .catch(error => console.log(error));
    }

    updateStaffList = () => {
        let bellmen = [...this.state.bellmen];
        let staffList = [...this.state.allStaff];

        for (let i = 0; i < bellmen.length; i++) {
            for (let j = 0; j < staffList.length; j++) {
                if (bellmen[i].name === staffList[j].name) {
                    staffList.splice(j, 1);
                    j--;
                }
            }
        }
        this.setState({ staffList: staffList });
    }


    putBellmen = () => {
        let bellmen = [...this.state.bellmen];
        bellmen.forEach(empl => {
            empl.active = 'false';
        })
        axios.put('/active-staff.json', bellmen)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    putFronts = () => {
        axios.put('/current-fronts.json', this.state.fronts)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    postNewEmployee = (lastName, firstName, position) => {
        const name = firstName + ' ' + lastName;

        if (name !== ' ' && position) {
            let staff = this.state.allStaff;
            let empl = { name: name, position: position };
            staff.push(empl);
            this.setState({ allStaff: staff });
            this.updateStaffList();


            axios.post('/staff.json', {
                name: name.toLowerCase(),
                position: position.toLowerCase()
            })
                .then(response => console.log(response))
                .catch(error => console.log(error));

        }
    }

    deleteStaffHandler = (index) => {
        let staff = this.state.allStaff;
        staff.splice(index, 1);
        this.setState({ allStaff: staff });
        this.updateStaffList();
        axios.put('./staff.json', staff)
            .then(response => console.log(response))
            .catch(response => console.log(response));
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
        let staffList = [...this.state.staffList];
        let newBellman;
        let bellmen = [...this.state.bellmen];
        let message = '*Choose an Employee';

        for (let i = 0; i < staffList.length; i++) {
            if (staffList[i].active === 'true') {
                newBellman = new Bellman(staffList[i].name, staffList[i].position);
                bellmen.push(newBellman);
                staffList.splice(i, 1);
                message = '';
            }
        }
        if (message === '*Choose an Employee') {
            document.getElementById('clockInBtn').click();
            this.setState({ clockInError: message });
        }
        else {
            this.setState({ bellmen: bellmen, staffList: staffList, clockInError: message });

            axios.put('/active-staff.json', bellmen)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }
        
    }

    staffListClickHandler = (index) => {
        let staff = [...this.state.staffList];
        staff.forEach(empl => {
            empl.active = 'false';
        })
        staff[index].active = 'true';
        this.setState({ staffList: staff });
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

        let status;

        switch (action) {
            case "startBreak":
                status = "On Break";
                break;
            case "endBreak":
                status = "Available";
                break;
            case "exitQueue":
                status = "Away";
                break;
            case "enterQueue":
                status = "Available";
                break;
            case "busy":
                status = "Busy";
                break;
            case "clockOut":
                this.clockOutBellman();
                return;
            default: break;
        }
        let index = this.state.activeIndex;

        let bellmen = [...this.state.bellmen];

        bellmen[index].status = status;
        bellmen[index].statusUpdated = new Date().toLocaleString();
        let activeStatus = status;

        this.setState({ bellmen: bellmen, activeStatus: activeStatus, activeIndex: index });
        this.putBellmen();

    }

    clockOutBellman = () => {
        let index = this.state.activeIndex;
        
        let bellmen = [...this.state.bellmen];
        
        const empl = bellmen.splice(index, 1);

        axios.put('/active-staff.json', bellmen)
            .then(response => console.log(response))
            .catch(error => console.log(error));

        let staffList = [...this.state.staffList];
        staffList.push({
            name: empl[0].name,
            position: empl[0].position
        });
        const reset = '';
        this.setState({ bellmen: bellmen, staffList: staffList, activeStatus: reset, activeIndex: reset });
    }

    // TODO - state should only changes when complete edit clicked

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

    addFrontHandler = (front) => {
        this.setState({ fronts: [...this.state.fronts, front] });
        axios.post('/current-fronts.json', front)
            .then(response => console.log(response))
            .catch(error => console.log(error));
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
        let bellmen = [...this.state.bellmen];
        let bellman = bellmen[this.state.activeIndex];

        const frontIndex = fronts.indexOf(activeFront);
        
        let names = [];
        bellmen.forEach(bellman => {
            names.push(bellman.name);
        })
        const bellmanIndex = names.indexOf(activeFront.bellman);

        if (this.state.activeIndex !== '' && action==='assign') {
            fronts.splice(frontIndex, 1);
            activeFront.status = 'Assigned';
            activeFront.bellman = bellman.name;
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
            return;
        }
        //this.printTicket();
        this.putFronts();
        this.putBellmen();
    }

    completeFrontHandler = () => {
        const activeFront = this.state.activeFront;
        let fronts = this.state.fronts;
        let index = fronts.indexOf(activeFront);
        let completedFronts = this.state.completedFronts;
        fronts.splice(index, 1);

        if (activeFront.status === 'Assigned') {
            let bellmen = [...this.state.bellmen];

            let names = [];
            bellmen.forEach(bellman => {
                names.push(bellman.name);
            })
            const bellmanIndex = names.indexOf(activeFront.bellman);

            let bellman = bellmen[bellmanIndex];
            bellman.fronts--;

            if (bellman.status === 'Busy' && bellman.fronts === 0) {
                bellman.status = 'Available';
            }
            bellmen[bellmanIndex] = bellman;
            activeFront.timeCompleted = new Date();
            activeFront.timeElapsed = Math.floor((activeFront.timeCompleted.getTime() - new Date(activeFront.time).getTime()) / 1000 / 60);
            activeFront.timeCompleted = activeFront.timeCompleted.toLocaleString();
            activeFront.status = "Completed";
            completedFronts.push(activeFront);
            this.setState({ bellmen: bellmen, completedFronts: completedFronts });
            this.aveTimeHandler();
            axios.post('/completed-fronts.json', activeFront)
                .then(response => console.log(response))
                .catch(error => console.log(error));

        }
        
        this.setState({ fronts: fronts });
        this.putFronts();
        this.putBellmen();
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

    aveTimeHandler = () => {
        let aveTime;
        let totalTimes = 0;
        let totalFronts = 0;
        let fronts = this.state.completedFronts;
        const today = new Date().toLocaleDateString();
        fronts.forEach(front => {
            if (front.date === today) {
                totalTimes += front.timeElapsed;
                totalFronts++;
            }
        });
        aveTime = Math.floor(totalTimes / totalFronts);
        if (!aveTime && aveTime !== 0) {
            aveTime = 'N/A';
        }
        this.setState({ aveTime: aveTime });
    }

    setCompletedFilters = (field, value) => {
        switch (field) {
            case 'startDate':
                this.setState({
                    completedFilters: {
                        ...this.state.completedFilters,
                        startDate: value
                    }
                });
                break;
            case 'endDate':
                this.setState({
                    completedFilters: {
                        ...this.state.completedFilters,
                        endDate: value
                    }
                });
                break;
            case 'guestName':
                this.setState({
                    completedFilters: {
                        ...this.state.completedFilters,
                        guestName: value
                    }
                });
                break;
            case 'bellman':
                this.setState({
                    completedFilters: {
                        ...this.state.completedFilters,
                        bellman: value
                    }
                });
                break;
            default: return;
        }
    }

    parseDate = (date) => {
        var b = date.split(/\D/);
        return new Date(b[0], --b[1], b[2]);
    }

    searchCompleted = () => {
        let fronts = [];
        let allFronts = this.state.allCompletedFronts;
        
        const filters = this.state.completedFilters;
        let dateError = '';

        const startDate = this.parseDate(filters.startDate);
        const endDate = this.parseDate(filters.endDate);

        if (filters.startDate && !filters.endDate) {
            dateError = '*Start date and end date required';
            fronts = allFronts;
        }
        if (filters.endDate && !filters.startDate) {
            dateError = '*Start date and end date required';
            fronts = allFronts;
        }

        if (filters.startDate && filters.endDate) {
            let date;
            for (let i = 0; i < allFronts.length; i++) {
                date = new Date(allFronts[i].date);
                if (date >= startDate && date <= endDate) {
                    fronts.push(allFronts[i]);
                }
            }
            allFronts = fronts;
        }

        if (filters.guestName) {
            fronts = [];
            for (let i = 0; i < allFronts.length; i++) {
                if (allFronts[i].name.includes(filters.guestName.toLowerCase())) {
                    fronts.push(allFronts[i]);
                }
            }
            allFronts = fronts;
        }

        if (filters.bellman) {
            fronts = [];
            for (let i = 0; i < allFronts.length; i++) {
                if (allFronts[i].bellman.includes(filters.bellman.toLowerCase())) {
                    fronts.push(allFronts[i]);
                }
            }
            allFronts = fronts;
        }

        this.setState({
            completedFronts: fronts,
            completedFrontsFiltered: false,
            completedFilters: {
                startDate: '',
                endDate: '',
                guestName: '',
                bellman: ''
            },
            dateError: dateError
        });
    }

    resetCompletedFilter = () => {
        this.setState({
            completedFrontsFiltered: true,
            completedFronts: this.state.allCompletedFronts,
            dateError: ''
        });
    }

    /*
    printTicket = () => {
        var ticket = window.open('', 'PRINT', 'height=400,width=400');


        ticket.document.write('<html><head><title>' + document.title + '</title>');
        ticket.document.write('</head><body >');
        ticket.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById('printDiv').innerHTML);
        ticket.document.write('</body></html>');

        ticket.document.close(); // necessary for IE >= 10
        ticket.focus(); // necessary for IE >= 10

        ticket.print();
        ticket.close();

        return true;

    }*/





    render() {




        return (
            <div className="App">
                <div id="aveTime">
                    <h3>Ave. Time: <br />{this.state.aveTime}</h3>
                </div>
                <Nav click={this.navClickHandler} frontsClass={this.state.frontsClass} />
                <Fronts
                    class={this.state.frontsClass}
                    currentTime={this.state.currentTime}
                    activeFront={this.state.activeFront}
                    fronts={this.state.fronts}
                    bellmen={this.state.bellmen}
                    addFrontHandler={this.addFrontHandler}
                    frontClick={this.frontClickHandler}
                    typeSelect={this.typeSelectHandler}
                    bellmanClick={this.employeeClickHandler}
                    assignFront={this.assignHandler}
                    confirmCancel={this.completeFrontHandler}
                    editInputs={this.editInputsHandler}
                    editType={this.editTypeHandler}
                    putFronts={this.putFronts}
                />
                <TimeClock
                    class={this.state.timeClockClass}
                    className={this.showTable(this.state.bellmen)}
                    bellmen={this.state.bellmen}
                    status={this.state.activeStatus}
                    bellmanInputs={this.state.bellmanInputs}
                    bellmanInputsHandler={this.bellmanInputsHandler}
                    staffListClick={this.staffListClickHandler}
                    clockIn={this.clockInHandler}
                    staffButtonClick={this.statusHandler}
                    employeeClick={this.employeeClickHandler}
                    staff={this.state.staffList}
                    clockInError={this.state.clockInError}
                />
                <CompletedFronts
                    class={this.state.completedClass}
                    fronts={this.state.completedFronts}
                    sort={this.sortCompletedHandler}
                    completedFilters={this.state.completedFilters}
                    setCompletedFilters={this.setCompletedFilters}
                    searchCompleted={this.searchCompleted}
                    filtered={this.state.completedFrontsFiltered}
                    resetFilter={this.resetCompletedFilter}
                    startDateError={this.state.startDateError}
                    dateError={this.state.dateError}
                />
                <ManageStaff
                    staff={this.state.allStaff}
                    postNewEmployee={this.postNewEmployee}
                    deleteStaff={this.deleteStaffHandler}
                />
            </div>
        );
    }
}

export default App;
