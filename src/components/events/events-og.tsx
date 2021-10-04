import React, { FunctionComponent, ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventContext, EventContextType } from "../../contexts/event_context";

interface EventsPageProps {

}

const EventsPage: FunctionComponent<EventsPageProps> = () => {

    const { allEvents, deleteEvent, } = useContext(EventContext) as EventContextType;
    const [eventList, setEventList] = useState<ReactElement>();
    useEffect(() => {
        displayAllEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const displayAllEvents = () => {

        let list: ReactElement[] = [];
        for (const event of allEvents) {

            const li: ReactElement = React.createElement("li", {
                key: "" + event.id, onClick: async () => {
                    await deleteEvent(event.id!);
                }
            }, event.name);


            // li.addEventListener("click", async (e) => {
            //     await deleteEvent(event.id!);
            //     li.remove();
            // });
            list.push(li);

        }
        const ul = React.createElement("ul", {}, list);
        setEventList(ul);


    }
    return (<>
        <Link to="/add">
            <h3>New event</h3></Link>
        <ul>
            {eventList}
        </ul>
    </>);
}

export default EventsPage;