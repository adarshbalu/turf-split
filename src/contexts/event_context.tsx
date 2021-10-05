import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Event, { EventType } from "../types/event";
import User from "../types/user";
import URL from "../utils/urls";

export type EventContextType = {
  createEvent: (event: EventType) => Promise<void>;
  fetchAllEvents: () => void;
  editEvent: (event: EventType) => Promise<void>;
  split: (event: EventType) => Promise<void>;
  event: Event;
  allEvents: Array<Event>;
  createEventState: EventState;
  deleteEvent: (id: number) => Promise<void>;
  deleteEventState: EventState;
  fetchUsers: () => Promise<void>;
  allUsers: User[];
  editEventState: EventState;
  splitState: EventState;
  nextToPay: () => Promise<void>;
  nextToPayList: User[];
  nextToPayState: NextToPayState;
};

export enum NextToPayState {
  LOADING,
  NONE,
  ERROR,
  EMPTY,
  SUCCESS,
}

export enum EventState {
  LOADING,
  SUCCESS,
  ERROR,
  NONE,
}

type Props = {
  children: React.ReactNode;
};

const initialState: EventContextType = {
  event: {} as Event,
  nextToPayState: NextToPayState.NONE,
  allEvents: [],
  allUsers: [],
  createEvent: async (event: EventType) => {},
  fetchAllEvents: async () => {},
  editEvent: async () => {},
  split: async (event: EventType) => {},
  createEventState: EventState.NONE,
  deleteEvent: async (id: number) => {},
  deleteEventState: EventState.NONE,
  fetchUsers: async () => {},
  splitState: EventState.NONE,
  editEventState: EventState.NONE,
  nextToPay: async () => {},
  nextToPayList: [],
};

export const EventContext = createContext<EventContextType>(initialState);

const EventContextProvider = (props: Props) => {
  const [event, setEvent] = useState<Event>(initialState.event);
  const [allEvents, setAllEvents] = useState<Array<Event>>(
    initialState.allEvents
  );
  const [createEventState, setCreateEventState] = useState<EventState>(
    EventState.NONE
  );
  const [deleteEventState, setDeleteEventState] = useState<EventState>(
    EventState.NONE
  );
  const [editEventState, setEditEventState] = useState<EventState>(
    EventState.NONE
  );
  const [splitState, setSplitState] = useState<EventState>(EventState.NONE);
  const [allUsers, setAllUsers] = useState<Array<User>>([]);
  const [nextToPayList, setNextToPayList] = useState<Array<User>>([]);
  const [nextToPayState, setNextToPayState] = useState<NextToPayState>(
    initialState.nextToPayState
  );

  useEffect(() => {
    fetchAllEvents();
    fetchUsers();
    selectEvent(initialState.event);
    nextToPay();
  }, []);

  const nextToPay = async () => {
    setNextToPayState(NextToPayState.LOADING);
    if (allUsers.length === 0) {
      await fetchUsers();
    }
    let sortedList: User[] = allUsers.sort(function (a, b) {
      if (a.balance > b.balance) {
        return 1;
      }
      if (a.balance < b.balance) {
        return -1;
      }
      return 0;
    });
    setNextToPayList(sortedList);
    if (sortedList.length === 0) {
      setNextToPayState(NextToPayState.EMPTY);
    } else {
      setNextToPayState(NextToPayState.SUCCESS);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      setDeleteEventState(EventState.LOADING);
      await APIService.delete(URL.eventsPath, id);
      await fetchAllEvents();
      setDeleteEventState(EventState.SUCCESS);
      setTimeout(() => {
        setDeleteEventState(EventState.NONE);
      }, 500);
    } catch (e) {
      console.log(`Error : ${e}`);
      setDeleteEventState(EventState.ERROR);
      setTimeout(() => {
        setDeleteEventState(EventState.NONE);
      }, 500);
    }
  };

  const fetchUsers = async () => {
    try {
      const data: User[] = await APIService.get(URL.usersPath);
      setAllUsers(data);
      console.log("Fetch user", data);
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
  };

  const selectEvent = (event: Event) => {
    setEvent(event);
  };

  const fetchAllEvents = async () => {
    try {
      const data = (await APIService.get(URL.eventsPath)) as [];
      let allEventsList: Event[] = data.map((e) => new Event(e as EventType));
      setAllEvents(allEventsList);
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };

  const editEvent = async (event: EventType) => {
    try {
      setEditEventState(EventState.LOADING);
      await APIService.put(URL.eventsPath + event.id, event);
      await fetchAllEvents();
      setEditEventState(EventState.SUCCESS);
    } catch (e) {
      console.log(`Error : ${e}`);
      setEditEventState(EventState.ERROR);
      setTimeout(() => {
        setEditEventState(EventState.NONE);
      }, 500);
    }
  };

  const split = async (event: EventType) => {
    try {
      await fetchUsers();
      setSplitState(EventState.LOADING);
      let totalPlayers: number = 0;
      event.players.forEach((p) => {
        totalPlayers += p.count;
      });
      const amountPerPlayer: number = event.amount / totalPlayers;
      event.players.forEach(async (p) => {
        const currentUser: User = allUsers.filter((u) => u.id === p.id)[0];
        await APIService.put(URL.usersPath + p.id, {
          ...currentUser,
          balance: currentUser.balance - amountPerPlayer * p.count,
        });
      });
      setSplitState(EventState.SUCCESS);
    } catch (e) {
      console.log(`Error : ${e}`);
      setSplitState(EventState.ERROR);
      setTimeout(() => {
        setSplitState(EventState.NONE);
      }, 500);
    }
  };

  return (
    <EventContext.Provider
      value={{
        nextToPayList,
        nextToPay,
        editEventState,
        splitState,
        allUsers,
        fetchUsers,
        deleteEvent,
        createEventState: createEventState,
        allEvents,
        event,
        createEvent,
        fetchAllEvents,
        editEvent,
        split,
        deleteEventState,
        nextToPayState,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
