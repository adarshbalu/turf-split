import React from "react";
import Event from "../../types/event";

// interface Event {
//     name: string,
//     email: string,
//     id:number

// }
interface Props {

  event: Event;
  key: number;
}

const EventCard = (props: Props) => {
  const { name, date, id } = props.event;
  return (
    <div className="item" style={{ padding: "10px" }}>
      <div className="content">
        <div className="header">{name}</div>
        <div> on {date}</div>
      </div>
      <i
        className="trash icon alternate outline red"

      />
    </div>
  );
};

export default EventCard;
