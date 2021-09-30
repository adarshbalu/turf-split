import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Event from "../types/event";
import URL from "../utils/urls";

export type EventContextType = {
    createEvent: () => void,
    fetchAllEvents: () => void,
    editEvent: () => void,
    split: () => void,
    event: Event,
    allEvents: Array<Event>,
}

export enum EventState {
    LOADING, LOADED, ERROR, NONE
}

type Props = {
    children: React.ReactNode;
};

const initialState: EventContextType = {
    event: {} as Event,
    allEvents: [],
    createEvent: async () => { },
    fetchAllEvents: async () => { },
    editEvent: async () => { },
    split: async () => { },
}

export const EventContext = createContext<EventContextType>(initialState);

const EventContextProvider = (props: Props) => {

    const [event, setEvent] = useState<Event>(initialState.event);
    const [allEvents, setAllEvents] = useState<Array<Event>>(initialState.allEvents);

    useEffect(() => {
        fetchAllEvents();
        selectEvent(initialState.event);
    }, []);
    const createEvent = async () => { }

    const selectEvent = (event: Event) => {
        setEvent(event);
    }

    const fetchAllEvents = async () => {
        try {
            const data = await APIService.get(URL.eventsPath) as [];
            let allEventsList: Event[] = data.map((e) => new Event(e));
            setAllEvents(allEventsList);
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    }

    const editEvent = async () => { }

    const split = async () => { }

    return (
        <EventContext.Provider value={{ allEvents, event, createEvent, fetchAllEvents, editEvent, split }}>
            {props.children}
        </EventContext.Provider>

    );
}

export default EventContextProvider;