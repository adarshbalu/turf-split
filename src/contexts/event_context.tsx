import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Event, { EventType } from "../types/event";
import User from "../types/user";
import URL from "../utils/urls";

export type EventContextType = {
    createEvent: (event: EventType) => Promise<void>,
    fetchAllEvents: () => void,
    editEvent: () => void,
    split: () => void,
    event: Event,
    allEvents: Array<Event>,
    createEventState: EventState,
    deleteEvent: (id: number) => Promise<void>,
    deleteEventState: EventState,
    fetchUsers: () => Promise<void>,
    allUsers: User[]
}

export enum EventState {
    LOADING, SUCCESS, ERROR, NONE
}



type Props = {
    children: React.ReactNode;
};

const initialState: EventContextType = {
    event: {} as Event,
    allEvents: [],
    allUsers: [],
    createEvent: async (event: EventType) => { },
    fetchAllEvents: async () => { },
    editEvent: async () => { },
    split: async () => { },
    createEventState: EventState.NONE,
    deleteEvent: async (id: number) => { },
    deleteEventState: EventState.NONE,
    fetchUsers: async () => { }

}

export const EventContext = createContext<EventContextType>(initialState);

const EventContextProvider = (props: Props) => {

    const [event, setEvent] = useState<Event>(initialState.event);
    const [allEvents, setAllEvents] = useState<Array<Event>>(initialState.allEvents);
    const [createEventState, setCreateEventState] = useState<EventState>(EventState.NONE);
    const [deleteEventState, setDeleteEventState] = useState<EventState>(EventState.NONE);
    const [allUsers, setAllUsers] = useState<Array<User>>([]);

    useEffect(() => {
        fetchAllEvents();
        fetchUsers();
        selectEvent(initialState.event);
    }, []);


    const deleteEvent = async (id: number) => {
        try {
            setDeleteEventState(EventState.LOADING);
            await APIService.delete(URL.eventsPath, id);
            await fetchAllEvents();
            setDeleteEventState(EventState.SUCCESS);
            setTimeout(() => {
                setDeleteEventState(EventState.NONE);
            }, 500);

        }
        catch (e) {
            console.log(`Error : ${e}`);
            setDeleteEventState(EventState.ERROR);
            setTimeout(() => {
                setDeleteEventState(EventState.NONE);
            }, 500);
        }
    }

    const fetchUsers = async () => {
        try {
            const data: User[] = await APIService.get(URL.usersPath);
            setAllUsers(data);

        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const createEvent = async (event: EventType) => {
        try {
            setCreateEventState(EventState.LOADING);
            await APIService.post(URL.eventsPath, event);
            setAllEvents([...allEvents, new Event(event)]);
            setCreateEventState(EventState.SUCCESS);


        } catch (e) {
            console.log(`Error : ${e}`);
            setCreateEventState(EventState.ERROR);
            setTimeout(() => {
                setCreateEventState(EventState.NONE);
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
        <EventContext.Provider value={{ allUsers, fetchUsers, deleteEvent, createEventState: createEventState, allEvents, event, createEvent, fetchAllEvents, editEvent, split, deleteEventState }}>
            {props.children}
        </EventContext.Provider>

    );
}

export default EventContextProvider;