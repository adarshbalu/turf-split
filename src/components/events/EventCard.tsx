import React, { useContext } from "react";
import Event from "../../types/event";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { EventContext } from "../../contexts/event_context";

interface Props {
  key: number;
  event: Event;
}

const EventCard = (props: Props) => {
  const { name, dateTime, id } = props.event;
  const { deleteEvent } = useContext(EventContext);
  const clickHandler: any = async (): Promise<void> => {
    await deleteEvent(id!);
  };
  return (
    <div
      className="cell-row"
      style={{
        padding: "10px",
        border: "1.25px",
        borderStyle: "solid",
        marginTop: "10px",
        borderRadius: "7px",
        display: "inline-block",
        width: "100%",
      }}
    >
      <Link
        to={{ pathname: `/edit`, state: { event: props.event } }}
        style={{ textDecoration: "none" }}
      >
        <div className="content" style={{ marginTop: "15px", color: "black" }}>
          <div className="header">{name}</div>
          <div style={{ fontWeight: 600, color: "black" }}>
            {" "}
            on {dateTime.toDateString()}
          </div>
        </div>
        <i className="" />
      </Link>
      <i
        style={{
          float: "right",
          fontSize: "25px",
          cursor: "pointer",
          marginBottom: "25px",
          textDecoration: "none",
        }}
        onClick={clickHandler}
      >
        <MdDelete />
      </i>
    </div>
  );
};

export default EventCard;
