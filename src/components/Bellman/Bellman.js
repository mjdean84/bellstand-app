class Bellman {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.status = "Available";
        this.active = "false";
        this.fronts = 0;
        this.timeIn = new Date().toLocaleString();
        this.statusUpdated = new Date().toLocaleString();
    }
}

export default Bellman;