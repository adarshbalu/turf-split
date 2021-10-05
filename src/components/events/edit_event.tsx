import { FunctionComponent } from "react";
import Event from "../../types/event";
interface EditEventProps {
  event: Event;
}

const EditEvent: FunctionComponent<EditEventProps> = (
  props: EditEventProps
) => {
  return (
    <>
      {console.log(props.event)}
      <div>Edit Page</div>
    </>
  );
};

export default EditEvent;
