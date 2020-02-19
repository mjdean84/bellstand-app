class Bellman {
    constructor(lastName, firstName, position) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.fullName = firstName + ' ' + lastName;
        this.position = position;
        this.status = "Available";
        this.active = "false";
        this.fronts = 0;
    }
}

export default Bellman;