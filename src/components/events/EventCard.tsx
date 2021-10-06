import React, { useContext } from "react";
import Event from "../../types/event";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { EventContext } from "../../contexts/event_context";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { AuthContext } from "../../contexts/auth_context";
import { FcCalendar, FcAlarmClock, FcInfo } from "react-icons/fc";

interface Props {
  key: number;
  event: Event;
}

const EventCard = (props: Props) => {
  const { name, dateTime, id, isPaid } = props.event;
  const { user } = useContext(AuthContext);
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
          <div
            className="header"
            style={{ color: "black", display: "flex", alignItems: "center" }}
          >
            <FcInfo />
            <div style={{ paddingLeft: "15px" }}>{name}</div>
          </div>
          <div
            style={{ color: "black", display: "flex", alignItems: "center" }}
          >
            <FcCalendar />
            <div style={{ paddingLeft: "15px" }}>
              {dateTime.toLocaleDateString()}
            </div>
          </div>
          <div
            style={{
              color: "black",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FcAlarmClock />
            <div style={{ paddingLeft: "15px" }}>
              {dateTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </Link>

      <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
          margin: "0 20px",
          color: "#2C2891",
        }}
        hidden={props.event.paidBy === user.id}
      >
        <HiOutlineCurrencyRupee />
      </i>

      {/* <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
        }}
        onClick={clickHandler}
        hidden={true}
      >
        <MdDelete />
      </i> */}

      <i
        style={{
          fontSize: "25px",
          cursor: "pointer",
          color: "#2AEF45",
        }}
        hidden={!isPaid}
      >
        <AiFillThunderbolt />
      </i>
    </div>
  );
};

export default EventCard;
