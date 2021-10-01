import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./EventCard";
import Event from "../types/Event";

// interface Event {
//     name: string,
//     email: string,
//     id:number

// }

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
        clickHandler={deleteEventHandler}
        key={event.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Event List
        <Link to="/add">
          <button className="ui button blue right">Add Event</button>
        </Link>
      </h2>
      <div className="ui celled list"> {renderEventList} </div>
    </div>
  );
};

export default EventList;
