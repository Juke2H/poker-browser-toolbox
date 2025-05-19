import React from "react";
import "./Rangebutton.css";

const Rangebutton = (props) => {
  return (
    <div>
      <div
        tabIndex="1" // Adding a tab index to make the element focusable.
        style={{
          // Dynamically setting the background color based on props.active.
          backgroundColor:
            props.active === 1 ? "chartreuse" : props.active === 2 ? "red" : null,
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
