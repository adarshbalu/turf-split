import { time } from "console";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  EventContext,
  EventContextType,
  EventState,
} from "../../contexts/event_context";
import Event, { EventType, Player } from "../../types/event";
import "./AddEvent.css";

interface CreateEventProps {}

const CreateEvent: FunctionComponent<CreateEventProps> = () => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [name, setName] = useState<string>("");
  const [datetime, setDateTime] = useState<string>("");
  const [amount, setAmount] = useState<number>(400);
  const [paidBy, setPaidBy] = useState<number>(0);
  const [players, setPlayers] = useState<Array<Player>>([]);

  const history = useHistory();

  const {
    createEvent,
    createEventState: eventState,
    allUsers,
  } = useContext(EventContext) as EventContextType;

  useEffect(() => {
    getAllUsers();
  }, []);

  const add = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || datetime === "") {
      alert("All Fields are mandatory.");
      return;
    } else {
      let e: EventType = {
        name: name,
        datetime: datetime,
        paidBy: paidBy,
        amount: amount,
        isPaid: false,
        players: players,
      };
      setEvent(new Event(e));
      await createEvent(e);
      history.go(-1);
    }
  };

  const getAllUsers = () => {
    const paidBy: HTMLSelectElement = document.querySelector("#paidBy")!;
    paidBy.innerHTML = "";
    for (const user of allUsers) {
      const option: HTMLOptionElement = document.createElement("option");
      option.setAttribute("value", "" + user.id);
      option.innerText = user.email;
      paidBy.appendChild(option);
    }
  };

  return (
    <>
      <div className="main">
        <h2>Add Events</h2>
        <form className="form" onSubmit={add}>
          <div className="field">
            <label>Event Name </label>
            <input
              type="text"
              name="name"
              placeholder="Name of Event"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label> Date and Time </label>
            <input
              type="datetime-local"
              name="date"
              //   placeholder="Enter Date and Time"
              value={`${datetime}`}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="field">
            <label> Amount </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount to be paid"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="select field">
            <label> Paid By </label>
            <select
              id="paidBy"
              name="paidBy"
              className="ui selection dropdown"
              placeholder="Amount Paid By"
              value={paidBy}
              onChange={(e) => {
                setPaidBy(parseInt(e.target.value));
              }}
            >
              {/* <option value="0">Alabama</option>
                            <option value="1">Alaska</option>
                            <option value="2">Arizona</option>
                            <option value="3">Arkansas</option> */}
            </select>
          </div>
          {
            // Players list section
            /* <div className="field">
                        <label> Players </label>
                        <select
                            name="players"
                            className="ui selection dropdown"
                            placeholder="Players"
                            value={players[0].id}
                            onChange={(e)=>setPlayers([...players,{} as Player])}
                        >
                            <option value="0">Amal</option>
                            <option value="1">Hari</option>
                            <option value="2">Amla</option>
                            <option value="3">Alan</option>
                        </select>
                    </div> */
          }

          {eventState !== EventState.LOADING ? (
            <button className="button">Add</button>
          ) : (
            <p>Creating event</p>
          )}
        </form>
        <button
          className="button"
          onClick={() => console.log("Clicked")}
          style={{ backgroundColor: "#37474F" }}
        >
          Split
        </button>
      </div>
    </>
  );
};

export default CreateEvent;
