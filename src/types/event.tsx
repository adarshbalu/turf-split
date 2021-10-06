export default class Event {
  name: string;
  id?: number;
  dateTime: Date;
  amount: number;
  paidBy: number;
  players: Array<Player>;
  isPaid: boolean;

  constructor(obj: EventType) {
    this.dateTime = new Date(obj["dateTime"]);
    this.id = obj["id"];
    this.amount = obj["amount"];
    this.paidBy = obj["paidBy"];
    this.isPaid = obj["isPaid"];
    this.players = obj["players"];
    this.name = obj["name"];
  }

  json(): EventType {
    const event: EventType = {
      name: this.name,
      dateTime: this.dateTime.toDateString(),
      amount: this.amount,
      paidBy: this.paidBy,
      isPaid: this.isPaid,
      players: this.players,
      id: this.id,
    } as EventType;
    return event;
  }
}

export interface Player {
  id: number;
  count: number;
  email: string;
}

export interface EventType {
  name: string;
  id?: number;
  dateTime: string;
  amount: number;
  paidBy: number;
  players: Array<Player>;
  isPaid: boolean;
}
