import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import Event from "../../types/event";
import { EventContext } from "../../contexts/event_context";

const EventList = () => {
  const { allEvents } = useContext(EventContext);
  const renderEventList = allEvents.map((event: Event) => {
    return <EventCard event={event} key={event.id!} />;
  });
  return (
    <div className="event-body">
      <div className="event-header">
        <h2>Event List</h2>
        <Link to="/add">
          <button className="event-button">Add Event</button>
        </Link>
      </div>
      <div className="event-list-body"> {renderEventList} </div>
    </div>
  );
};

export default EventList;
