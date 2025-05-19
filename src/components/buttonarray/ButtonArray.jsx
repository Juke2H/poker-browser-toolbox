import React from "react";

const ButtonArray = (props) => {
  // Create an array of buttons using the 'map' function on the 'array' prop.
  // Each button will have an 'id' based on the value from the 'array' prop.
  // When a button is clicked, the 'onClick' function and toggle from props will be called.
  const myButtons = props.array.map((p) => {
    return (
      <div 
      key={p}
      style={
        props.toggle === `${p}` ? { backgroundColor: "chartreuse", color: "black" } : null
      }
      tabIndex="1" 
      className={props.class} 
      id={p} 
      onClick={props.onClick}>
        {p}
      </div>
    );
  });

  // Render the buttons.
  return <div className="arr-buttons">{myButtons}</div>;
};

export default ButtonArray;