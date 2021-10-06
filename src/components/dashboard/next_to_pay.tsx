import React from "react";
import { FunctionComponent, useContext, useEffect } from "react";
import { EventContext } from "../../contexts/event_context";

interface NextToPayCardProps {}

const NextToPayCard: FunctionComponent<NextToPayCardProps> = () => {
  const { nextToPay, nextToPayList } = useContext(EventContext);
  useEffect(() => {
    nextToPay();
  }, []);
  return (
    <>
      <h4 className="next-table-head">Next to pay</h4>
      <div className="table">
        <table className="next-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {nextToPayList.map((e, index) => {
              if (index < 5) {
                return (
                  <tr>
                    <td>{e.email}</td>
                    <td>{Math.round(e.balance)}</td>
                  </tr>
                );
              } else {
                return <></>;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NextToPayCard;
