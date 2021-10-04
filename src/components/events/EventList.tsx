import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./EventCard";
import Event from "../../types/event";

interface Props {
  getEventId: (id: number) => void;
  events: Array<Event>;
}
const EventList = (props: Props) => {
  const deleteEventHandler = (id: number) => {
    props.getEventId(id);
  };

  const renderEventList = props.events.map((event: Event) => {
    return (
      <ContactCard
        event={event}

        key={10}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Event List
        <Link to="/add">
          <button className="button">Add Event</button>
        </Link>
      </h2>
      <div className="cell"> {renderEventList} </div>
    </div>
  );
};

export default EventList;
