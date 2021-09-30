export default interface Event {
    name: string;
    id: number;
    date: Date;
    amount: number;
    paidBy: string;
    players: Array<Player>;
    isPaid: boolean;
}

export interface Player {
    id: number;
    count: number;
}