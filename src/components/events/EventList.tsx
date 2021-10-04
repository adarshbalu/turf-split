import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import Event from "../../types/event";
import { EventContext } from "../../contexts/event_context";


const EventList = () => {

  const { allEvents } = useContext(EventContext);
  const renderEventList = allEvents.map((event: Event) => {
    return (
      <EventCard
        event={event}
        key={event.id!}
      />
    );
  });
  return (
    <div className="">
      <h2>
        Event List
        <Link to="/add">
          <button className="button">Add Event</button>
        </Link>
      </h2>
      <div className=""> {renderEventList} </div>
    </div>
  );
};

export default EventList;
