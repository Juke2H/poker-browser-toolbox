import React, { useState } from "react";
import Mexp from "math-expression-evaluator";
import "./Calculator.css";

const Calculator = () => {
  // State variables to manage calculator input and answer.
  const [calc, setCalc] = useState(""); // Stores the current calculation input.
  const [answer, setAnswer] = useState(0); // Stores the calculated answer.

  // Array of valid operator symbols.
  const operators = ["/", "*", "-", "+", "."];

  // Function to update the calculation input.
  const updateCalc = (value) => {
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return; // Avoid consecutive operators or starting with an operator.
    }

    setCalc(calc + value); // Append the value to the current calculation input.
  };

  // Function to perform the calculation.
  const calculate = () => {
    // Separate operators from the input string.
    let op_arr = [];
    for (let i = 0; i < calc.length; i++) {
      if (operators.includes(calc[i])) {
        op_arr += calc[i];
      }
    }

    // Separate numbers from the input string.
    let num_arr = calc.split(/[-+*/]+/);

    // Merge operators and numbers into a single array.
    let calc_arr = [];
    for (let i = 0; i < Math.max(op_arr.length, num_arr.length); i++) {
      if (num_arr[i]) calc_arr.push(num_arr[i]);
      if (op_arr[i]) calc_arr.push(op_arr[i]);
    }

    // Create a string from the merged array.
    let calc_string = calc_arr.join("");

    // Evaluate the calculation using the math-expression-evaluator library.
    const mexp = new Mexp();
    let expr = mexp.eval(calc_string);

    setAnswer(expr); // Update the answer state with the calculated result.
  };

  // Function to delete the last character in the calculation input.
  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value); // Update the calculation input by removing the last character.
  };

  // Function to clear the calculation input and answer.
  const clearDisplay = () => {
    setCalc(""); // Clear the input expression.
    setAnswer(0); // Reset the answer to 0.
  };

  return (
    <div className="frame">
      <div>
        {/* Display for the calculation input and answer. */}
        <div className="display">
          <span>{calc ? "(" + calc + ")" : ""}</span>
          {answer || 0}
        </div>
        
        {/* Calculator buttons. */}
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>x</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={clearDisplay}>Clear</button>
        </div>
        <div className="digits">
          <button onClick={() => updateCalc("7")}>7</button>
          <button onClick={() => updateCalc("8")}>8</button>
          <button onClick={() => updateCalc("9")}>9</button>
        </div>
        <div className="digits">
          <button onClick={() => updateCalc("4")}>4</button>
          <button onClick={() => updateCalc("5")}>5</button>
          <button onClick={() => updateCalc("6")}>6</button>
        </div>
        <div className="digits">
          <button onClick={() => updateCalc("1")}>1</button>
          <button onClick={() => updateCalc("2")}>2</button>
          <button onClick={() => updateCalc("3")}>3</button>
        </div>
        <div className="digits">
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;