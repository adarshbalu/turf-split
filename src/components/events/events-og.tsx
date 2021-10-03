import { FunctionComponent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext, EventContextType } from "../../contexts/event_context";

interface EventsPageProps {

}

const EventsPage: FunctionComponent<EventsPageProps> = () => {

    const { allEvents, deleteEvent, } = useContext(EventContext) as EventContextType;
    useEffect(() => {
        displayAllEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const displayAllEvents = () => {
        const ul: HTMLUListElement = document.querySelector("#events-list")!;

        for (const event of allEvents) {
            const li: HTMLLIElement = document.createElement("li");
            li.innerText = event.name;
            li.addEventListener("click", async (e) => {
                await deleteEvent(event.id!);
                li.remove();
            });
            ul.appendChild(li);
        }
    }
    return (<>
        <Link to="/add">
            <h3>New event</h3></Link>
        <ul id="events-list"></ul>
    </>);
}

export default EventsPage;