import React from "react";
import { FunctionComponent, useContext, useEffect } from "react";
import { EventContext } from "../../contexts/event_context";

interface NextToPayCardProps {

}

const NextToPayCard: FunctionComponent<NextToPayCardProps> = () => {
    const { nextToPay, nextToPayList } = useContext(EventContext);
    useEffect(() => {
        nextToPay();
    });
    return (<>

        <h4>Next to pay</h4>
        {
            React.createElement("ul", {
                style: {
                    listStyleType: 'none'
                }
            }, nextToPayList.map((e) => {
                return React.createElement("li", null, e.email + " : " + e.balance);

            }))
        }

    </>);
}

export default NextToPayCard;