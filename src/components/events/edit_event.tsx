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

interface EditEventProps {}

interface stateType {
  // from: { pathname: string }
  event: Event;
}

const EditEvent: FunctionComponent<EditEventProps> = (props) => {
  const history = useHistory<stateType>();
  const {
    name: name1,
    dateTime: dateTime1,
    amount: amount1,
    paidBy: paidBy1,
    players: players1,
    isPaid,
    id: id1,
  } = history.location.state.event;

  const convertDate = (date: Date): string => {
    var isoStr = date.toISOString();
    return isoStr.substring(0, isoStr.length - 1);
  };

  const [event, setEvent] = useState<Event>(
    history.location.state.event as Event
  );
  const [name, setName] = useState<string>(name1);
  const [dateTime, setDateTime] = useState<string>(convertDate(dateTime1));
  const [amount, setAmount] = useState<number>(amount1);
  const [paidBy, setPaidBy] = useState<number>(paidBy1);
  const [players, setPlayers] = useState<Array<Player>>(players1);
  const [playerOptions, setPlayerOptions] = useState<Array<User>>([]);
  const [addedPlayers, setAddedPlayers] = useState<Array<User>>([]);

  // const history = useHistory();

  const {
    editEvent,
    createEventState: eventState,
    allUsers,
    fetchUsers,
    split,
  } = useContext(EventContext) as EventContextType;

  useEffect(() => {
    // fetchUsers();
    setPlayerOptions(allUsers);
  }, []);

  // useEffect(() => console.log(addedPlayers), [playerOptions]);
  console.log(history.location.state.event);

  const update = async () => {
    if (false) {
      // alert("All Fields are mandatory.");
      console.log("CLicked");
    } else {
      let e: EventType = {
        name: name1,
        dateTime: dateTime1.toDateString(),
        paidBy: paidBy1,
        amount: amount1,
        isPaid: true,
        players: players1,
        id: id1,
      };
      console.log("Event type", e);
      await editEvent(e);
      history.go(-1);
    }
  };
  const handleSplit = async () => {
    if (false) {
      // alert("All Fields are mandatory.");
      console.log("CLicked");
    } else {
      console.log("CLicked split");
      console.log(
        name1,
        dateTime1.toDateString(),
        paidBy1,
        amount1,
        players1,

        id1
      );
      let ev: EventType = {
        name: name1,
        dateTime: dateTime1.toDateString(),
        paidBy: paidBy1,
        amount: amount1,
        isPaid: true,
        players: players1,
        id: id1,
      };
      await split(ev);
      history.go(-1);
    }
  };

  return (
    <>
      <div className="main">
        <h2>Update Event</h2>
        <form className="form">
          <div className="field">
            <label>Event Name </label>
            <input
              type="text"
              name="name"
              placeholder="Name of Event"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>
          <div className="field">
            <label> Date and Time </label>
            <input
              type="datetime-local"
              name="date"
              //   placeholder="Enter Date and Time"
              value={convertDate(dateTime1)}
              onChange={(e) => setDateTime(e.target.value)}
              disabled
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
              disabled
            />
          </div>
          <div className="field">
            <label> Paid By </label>

            {React.createElement(
              "select",
              {
                placeholder: "Amount Paid By",
                name: "paidBy",
                disabled: true,
                onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                  console.log(e.target.value);
                  setPaidBy(parseInt(e.target.value));
                },
              },
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

          {/* <div className="multi-select">
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
                    setPlayers((prev) => [
                      ...prev,
                      {
                        id: selectedPlayer.id,
                        count: 1,
                      } as Player,
                    ]);
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
          </div> */}
          <h3>Added players</h3>
          {React.createElement(
            "ul",
            null,
            players1.map((player) => {
              return React.createElement(
                "li",
                { key: player.id },
                player.email
              );
            })
          )}

          <div className="button-row">
            {eventState !== EventState.LOADING ? (
              <button
                className="add-button"
                onClick={async (e) => {
                  e.preventDefault();
                  await update();
                }}
                hidden={isPaid}
              >
                Update
              </button>
            ) : (
              <p>Updating...</p>
            )}
            <button
              className="split-button"
              onClick={async (e) => {
                e.preventDefault();
                await handleSplit();
              }}
              style={{ backgroundColor: "#37474F" }}
              hidden={isPaid}
            >
              Split
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
