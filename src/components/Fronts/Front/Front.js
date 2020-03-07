class Front {
    constructor(type, room, name, ticket, bags, comment, eliteStatus) {
        this.type = type;
        this.room = room;
        this.name = name;
        this.ticket = ticket;
        this.bags = bags;
        this.comment = comment;
        this.eliteStatus = eliteStatus;
        this.date = new Date().toLocaleDateString();
        this.time = new Date().toLocaleString();
        this.bellman = null;
        this.status = 'Pending';
        this.timeCompleted = null;
        this.timeElapsed = null;
    }
}

export default Front;