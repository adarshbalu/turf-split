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
  const { name, dateTime, id, isPaid } = props.event;
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100px",
      }}
    >
      <Link
        to={{ pathname: `/edit`, state: { event: props.event } }}
        style={{ textDecoration: "none", flex: "1" }}
      >
        <div className="content" style={{ color: "black" }}>
          <div className="header">{name}</div>
          <div style={{ fontWeight: 600, color: "black" }}>
            on {dateTime.toDateString()}
          </div>
        </div>
      </Link>
      <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
          // textDecoration: "none",
        }}
        onClick={clickHandler}
        hidden={isPaid}
      >
        <MdDelete />
      </i>
    </div>
  );
};

export default EventCard;
