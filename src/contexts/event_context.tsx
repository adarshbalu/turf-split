import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Event, { EventType } from "../types/event";
import URL from "../utils/urls";

export type EventContextType = {
    createEvent: (event: EventType) => Promise<void>,
    fetchAllEvents: () => void,
    editEvent: () => void,
    split: () => void,
    event: Event,
    allEvents: Array<Event>,
    eventState: EventState,
}

export enum EventState {
    LOADING, LOADED, ERROR, NONE
}

export enum AllEventState {
    LOADING, LOADED, ERROR, NONE
}

type Props = {
    children: React.ReactNode;
};

const initialState: EventContextType = {
    event: {} as Event,
    allEvents: [],
    createEvent: async (event: EventType) => { },
    fetchAllEvents: async () => { },
    editEvent: async () => { },
    split: async () => { },
    eventState: EventState.NONE
}

export const EventContext = createContext<EventContextType>(initialState);

const EventContextProvider = (props: Props) => {

    const [event, setEvent] = useState<Event>(initialState.event);
    const [allEvents, setAllEvents] = useState<Array<Event>>(initialState.allEvents);
    const [eventState, setEventState] = useState<EventState>(EventState.NONE);

    useEffect(() => {
        fetchAllEvents();
        selectEvent(initialState.event);
    }, []);


    const createEvent = async (event: EventType) => {
        try {
            setEventState(EventState.LOADING);
            await APIService.post(URL.eventsPath, event);
            setAllEvents([...allEvents, new Event(event)]);
            setEventState(EventState.LOADED);


        } catch (e) {
            console.log(`Error : ${e}`);
            setEventState(EventState.ERROR);
            setTimeout(() => {
                setEventState(EventState.NONE);
            }, 500);
        }
    }

    const selectEvent = (event: Event) => {
        setEvent(event);
    }

    const fetchAllEvents = async () => {
        try {
            const data = await APIService.get(URL.eventsPath) as [];
            let allEventsList: Event[] = data.map((e) => new Event(e as EventType));
            setAllEvents(allEventsList);
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    }

    const editEvent = async () => { }

    const split = async () => { }

    return (
        <EventContext.Provider value={{ eventState, allEvents, event, createEvent, fetchAllEvents, editEvent, split }}>
            {props.children}
        </EventContext.Provider>

    );
}

export default EventContextProvider;