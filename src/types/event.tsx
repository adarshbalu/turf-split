export default class Event {
    name: string;
    id: number;
    date: Date;
    amount: number;
    paidBy: number;
    players: Array<Player>;
    isPaid: boolean;

    constructor(obj: {
        name: string,
        id: number,
        date: string,
        amount: number,
        paidBy: number,
        players: Array<Player>,
        isPaid: boolean
    }) {
        this.date = new Date(obj["date"]);
        this.id = obj["id"];
        this.amount = obj["amount"];
        this.paidBy = obj["paidBy"];
        this.isPaid = obj["isPaid"];
        this.players = obj["players"];
        this.name = obj["name"];
    }
}

export interface Player {
    id: number;
    count: number;
}