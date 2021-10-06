import React, { useContext } from "react";
import Event from "../../types/event";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { EventContext } from "../../contexts/event_context";
import { FcCalendar, FcAlarmClock, FcInfo } from "react-icons/fc";

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
        <div className="content">
          <div className="header" style={{ color: "black" }}>
            <FcInfo />
            {name}
          </div>
          <div style={{ color: "black" }}>
            <FcCalendar />
            {dateTime.toLocaleDateString()}
          </div>
          <div style={{ color: "black", fontWeight: 500 }}>
            <FcAlarmClock />
            {dateTime.toLocaleTimeString()}
          </div>
        </div>
      </Link>
      <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
        }}
        onClick={clickHandler}
        hidden={true}
      >
        <MdDelete />
      </i>
      <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
          color: "#2AEF45",
          // textDecoration: "none",
        }}
        hidden={!isPaid}
      >
        <AiFillThunderbolt />
      </i>
    </div>
  );
};

export default EventCard;
