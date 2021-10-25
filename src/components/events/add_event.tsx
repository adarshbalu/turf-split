import { LinearProgress } from "@mui/material";
import React, {
  ChangeEvent,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import {
  EventContext,
  EventContextType,
  EventState,
} from "../../contexts/event_context";
import Event, { EventType, Player } from "../../types/event";
import User from "../../types/user";
import "./AddEvent.css";

interface CreateEventProps {}

const CreateEvent: FunctionComponent<CreateEventProps> = () => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [name, setName] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paidBy, setPaidBy] = useState<number | null>(0);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [playerOptions, setPlayerOptions] = useState<Array<User>>([]);
  const [addedPlayers, setAddedPlayers] = useState<Array<User>>([]);

  const history = useHistory();

  const {
    createEvent,
    createEventState: eventState,
    allUsers,
    fetchUsers,
  } = useContext(EventContext) as EventContextType;

  useEffect(() => {
    // fetchUsers();
    setPlayerOptions(allUsers);
  }, []);

  useEffect(() => console.log(addedPlayers), [playerOptions]);

  const add = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      alert("Name is required.");
      return;
    } else if (dateTime === "") {
      alert("Date is required.");
      return;
    } else if (amount <= 0) {
      alert("Amount is required.");
      return;
    } else if (paidBy === 0) {
      alert("Paid by is required");
      return;
    } else if (players.length === 0) {
      alert("Please Add atleast one Player");
      return;
    } else {
      let e: EventType = {
        name: name,
        dateTime: dateTime,
        paidBy: paidBy!,
        amount: amount,
        isPaid: false,
        players: players,
      };
      setEvent(new Event(e));
      await createEvent(e);
      history.go(-1);
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
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label> Date and Time </label>
            <input
              type="datetime-local"
              name="date"
              //   placeholder="Enter Date and Time"
              value={`${dateTime}`}
              required
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
              required
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="field">
            <label> Paid By </label>

            {React.createElement(
              "select",
              {
                required: true,
                placeholder: "Amount Paid By",
                name: "paidBy",

                // value:{allUsers[0].email},
                onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                  setPaidBy(parseInt(e.target.value));
                },
              },
              React.createElement(
                "option",
                { value: 0 },
                "------No user selected------"
              ),
              allUsers.map((user) => {
                return React.createElement(
                  "option",
                  {
                    value: user.id,
                  },
                  user.email
                );
              })
            )}
          </div>

          <div className="multi-select">
            <div className="player-select field">
              <label> Players </label>
              {React.createElement(
                "select",
                {
                  placeholder: "Players",
                  value: "",
                  multiple: true,
                  name: "players",
                  onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                    let selectedPlayer = JSON.parse(e.target.value) as User;
                    setPlayers((prev) => [
                      ...prev,
                      {
                        id: selectedPlayer.id,
                        count: 1,
                        email: selectedPlayer.email,
                      } as Player,
                    ]);
                    setPlayerOptions((prev) =>
                      prev.filter(
                        (player: User) => player.id != selectedPlayer.id
                      )
                    );
                    setAddedPlayers((prev) => [...prev, selectedPlayer]);
                  },
                },
                playerOptions.map((user) => {
                  return React.createElement(
                    "option",
                    {
                      value: JSON.stringify(user),
                    },
                    user.email
                  );
                })
              )}
            </div>

            <div className="selected-players">
              <label>Added Players</label>
              {React.createElement(
                "select",
                {
                  placeholder: "Players",
                  value: "",
                  multiple: true,
                  name: "players",
                  onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                    let selectedPlayer = JSON.parse(e.target.value) as User;
                    setPlayers(
                      players.filter((player) => player.id != selectedPlayer.id)
                    );

                    setAddedPlayers((prev) =>
                      prev.filter(
                        (player: User) => player.id != selectedPlayer.id
                      )
                    );
                    setPlayerOptions((prev) => [...prev, selectedPlayer]);
                  },
                },
                addedPlayers.map((user) => {
                  return React.createElement(
                    "option",
                    {
                      value: JSON.stringify(user),
                    },
                    user.email
                  );
                })
              )}
            </div>
          </div>

          <div className="button-row">
            {eventState !== EventState.LOADING ? (
              <button className="add-button">Add</button>
            ) : (
                <LinearProgress />
            )}
            <button
              className="split-button"
              onClick={() => console.log("Clicked")}
              style={{ backgroundColor: "#37474F" }}
              hidden
            >
              Split
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
