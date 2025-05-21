import "./Rangebutton.css";

export type RangebuttonState = 0 | 1 | 2;

export interface RangebuttonProps {
  active: RangebuttonState; // Indicates the state of the button (0, 1, or 2).
  text: string; // The text to be displayed on the button.
  id?: string; // The ID of the button.
  flipState?: (event: React.MouseEvent<HTMLDivElement> | undefined) => void; // Function to change the active state of the button.
  onBlur?: (event: React.ChangeEvent) => void; // Function to handle blur events.
}

const Rangebutton = (props: RangebuttonProps) => {
  return (
    <div>
      <div
        tabIndex={0} // Adding a tab index to make the element focusable.
        style={{
          // Dynamically setting the background color based on props.active.
          backgroundColor:
            props.active === 1 ? "chartreuse" : props.active === 2 ? "red" : undefined,
        }}
        className="hand"
        id={props.id} //Uses given prop as ID.
        onClick={props.flipState} // Sends the flipState function to Matrix (and Ranges).
        onBlur={props.onBlur} // Sends the Blur event handler to Matrix (and Ranges).
      >
        {props.text} {/* Displaying the text provided as a prop. */}
      </div>
    </div>
  );
};

export default Rangebutton;
