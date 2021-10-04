import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Event from "../../types/event";
import "./AddEvent.css";

// interface Event {
//     name: string,
//     email: string,
//     date: Date,
//     amount: number,
//     paidBy: number,
//     players: number[],
//     id:number,
// }

interface Props extends RouteComponentProps<any> {
  // children:React.ReactNode;
  addEventHandler: (event: Event) => Promise<void>;
  //   contact:Array <Event>
}

class AddEvent extends React.Component<Props> {
  state = {} as Event;
  add = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      this.state.name === undefined ||
      this.state.date === undefined ||
      this.state.paidBy === undefined
    ) {
      alert("All Fields are mandatory.");
      console.log(this.state.paidBy);
      return;
    }
    this.props.addEventHandler(this.state);
    console.log(this.state);
    // this.setState({name:"",email:"",date:"",amount:"",paidBy:"",});
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Events</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Event Name </label>
            <input
              type="text"
              name="name"
              placeholder="Name of Event"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label> Date&Time </label>
            <input
              type="text"
              name="date"
              placeholder="Enter Date and Time"
              value={`${this.state.date}`}
              onChange={(e) => this.setState({ date: e.target.value })}
            />
          </div>
          <div className="field">
            <label> Amount </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount to be paid"
              value={this.state.amount}
              onChange={(e) => this.setState({ amount: e.target.value })}
            />
          </div>
          <div className="field">
            <label> Paid By </label>
            <select
              name="paidBy"
              className="ui selection dropdown"
              value={this.state.paidBy}
              onChange={(e) => this.setState({ paidBy: e.target.value })}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
            </select>
          </div>
          <div className="field">
            <label> Players </label>
            <select
              name="players"
              className="ui selection dropdown"
              //   placeholder="Amount Paid By"
              //   value={this.state.paidBy}
              //   onChange={(e) => this.setState({ paidBy: e.target.value })}
            >
              <option value="AL">Amal</option>
              <option value="AK">Hari</option>
              <option value="AZ">Amla</option>
              <option value="AR">Alan</option>
            </select>
          </div>

          <button className="ui button blue">Add</button>
        </form>
        <button
          className="ui button yellow"
          onClick={() => console.log("Clicked")}
          style={{ padding: "11px 20px", marginTop: "7px" }}
        >
          Split
        </button>
      </div>
    );
  }
}

export default AddEvent;
