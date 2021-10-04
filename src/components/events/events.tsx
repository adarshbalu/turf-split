import React, {
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddEvent from "./AddEvent";
// import EventCard from "./components/EventCard";
import EventList from "./EventList";
import Page from "./Page";
import api from "../../services/api_service";
import Event from "../../types/event";

const EventsPage: FunctionComponent<Event> = () => {
  const [events, setEvents] = useState<Array<Event>>([]);

  const retrieveEvents = async () => {
    const response = await api.get("/events");
    return response.data;
  };

  const addEventHandler = async (event: Event) => {
    const request = {
      ...event,
    };
    const response = await api.post("/events", request);
    setEvents([...events, response.data]);
  };

  const removeEventHandler = async (id: number) => {
    // await api.delete(`/events/${id}`);
    const newEventList = events.filter((event: Event) => {
      return event.id !== id;
    });
    setEvents(newEventList);
  };
  useEffect(() => {
    const getAllEvents = async () => {
      const allEvents = await retrieveEvents();
      if (allEvents) setEvents(allEvents);
    };
    getAllEvents();
  }, []);

  return (
    <div className="ui container">
      {/* <Router>
        <Page />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <EventList
                {...props}
                events={events}
                getEventId={removeEventHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddEvent {...props} addEventHandler={addEventHandler} />
            )}
          />
        </Switch>
      </Router> */}
    </div>
  );
};

export default EventsPage;
