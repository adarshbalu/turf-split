import { FunctionComponent, useContext, useEffect, useState } from "react";
import "../profile/profile.css";
import { AuthContext, AuthState } from "../../contexts/auth_context";
import { EventContext } from "../../contexts/event_context";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import Event from "../../types/event";

interface ProfileProps {}

interface UserEventType {
  name: string;
  dateTime: string;
  totalPlayers: number;
  amount: number;
}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { user } = useContext(AuthContext);
  const { allEvents, fetchAllEvents } = useContext(EventContext);
  const [userEvents, setuserEvents] = useState<Array<UserEventType>>([]);

  const eventMap = (event: Event) => {
    if (event.players.length === 0) {
      return 0;
    } else {
      for (let i = 0; i < event.players.length; i++) {
        if (event.players[i].id === user.id) {
          return event.name;
        } else return 0;
      }
    }
  };

  useEffect(() => {
    let count = 0;
    allEvents.map((event) => {
      if (eventMap(event) !== 0) {
        for (let i = 0; i < event.players.length; i++) {
          count += event.players[i].count;
        }
        setuserEvents((prev) => [
          ...prev,
          {
            name: event.name,
            dateTime: event.dateTime.toDateString(),
            totalPlayers: count,
            amount: event.amount,
          },
        ]);
      }
    });
  }, [allEvents]);

  return (
    <>
      <div className="profile-body">
        <section className="user-section">
          <div className="user-profile">
            <div className="user-avatar">
              <UserIcon />
            </div>
            <div className="user-name">
              <h1>{user.name}</h1>
            </div>
            <div className="user-email">
              <h2>{user.email}</h2>
            </div>
          </div>
          <div className="user-balance">
            <h1>{`Balance: ₹ ${Math.round(user.balance)}`}</h1>
          </div>
        </section>
        <div className="table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Total Players</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {userEvents.map((event) => (
                <tr key={event.name}>
                  <td>{event.name}</td>
                  <td>{event.dateTime}</td>
                  <td>{event.totalPlayers}</td>
                  <td>{event.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
