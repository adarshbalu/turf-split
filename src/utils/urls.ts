export default class URL {
    static baseURL: string = "http://localhost:5000";
    static usersEndpoint: string = "/users/";
    static eventsEndpoint: string = "/events/";

    static eventsPath = URL.baseURL + URL.eventsEndpoint;
    static usersPath = URL.baseURL + URL.usersEndpoint;

}