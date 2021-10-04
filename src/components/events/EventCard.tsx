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
  const { name, dateTime, id } = props.event;
  return (
    <div
      className="item"
      style={{
        padding: "10px",
        border: "1.25px",
        borderStyle: "solid",
        marginTop: "10px",
        borderRadius: "7px",
      }}
    >
      <div className="content" style={{ fontSize: ".95rem" }}>
        <div className="header" style={{ fontSize: ".95rem", fontWeight: 600 }}>
          {name}
        </div>
        <div> on {dateTime}</div>
      </div>
      <i className="trash icon alternate outline red" />
    </div>
  );
};

export default EventCard;
