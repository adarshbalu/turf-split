import React from "react";
import Event from "../../types/event";


interface Props {
  key: number;
  event: Event;

}

const EventCard = (props: Props) => {
  const { name, dateTime, id } = props.event;
  return (
    <div
      className=""
      style={{
        padding: "10px",
        border: "1.25px",
        borderStyle: "solid",
        marginTop: "10px",
        borderRadius: "7px",
      }}
    >
      <div className="" >
        <div className="">
          {name}
        </div>
        <div> on {dateTime.toDateString()}</div>
      </div>
      <i
        className=""

      />
    </div>
  );
};

export default EventCard;
