export default interface Event {
    name: string;
    id: number;
    date: Date;
    amount: number;
    paidBy: string;
    players: number[];
    isPaid: boolean;
}