class Front {
    constructor(type, room, name, ticket, bags, comment, eliteStatus) {
        this.type = type;
        this.room = room;
        this.name = name;
        this.ticket = ticket;
        this.bags = bags;
        this.comment = comment;
        this.eliteStatus = eliteStatus;
        this.time = new Date();
        this.bellman = null;
        this.status = 'Pending';
        this.timeCompleted = null;
        this.timeElapsed = null;
    }
}

export default Front;