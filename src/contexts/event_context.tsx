import { createContext, useState } from "react";
import Event from "../types/event";

export type EventContextType = {
    // createEvent:()=>void,
    // editEvent:()=>void,
    // split:()=>void,
    event: Event,
}

type Props = {
    children: React.ReactNode;
};

const initialState: EventContextType = {
    event: {} as Event,
    // createEvent:async()=>{},
    // editEvent:async()=>{},
    // split:async()=>{},
}

export const EventContext = createContext<EventContextType>(initialState);

const EventContextProvider = (props: Props) => {

    const [event, setEvent] = useState<Event>(initialState.event);
    return (
        <EventContext.Provider value={{ event }}>
            {props.children}
        </EventContext.Provider>

    );
}

export default EventContextProvider;