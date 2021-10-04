export default class Event {
  name: string;
  id?: number;
  date: Date;
  amount: number;
  paidBy: number;
  players: Array<Player>;
  isPaid: boolean;

  constructor(obj: EventType) {
    this.date = new Date(obj["datetime"]);
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

export interface EventType {
  name: string;
  id?: number;
  datetime: string;
  amount: number;
  paidBy: number;
  players: Array<Player>;
  isPaid: boolean;
}
