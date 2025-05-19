import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";
import Calculator from "../../components/calculator/Calculator";

const Layout = () => {
  // State variables for controlling dropdown menus and calculator.
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [rngOpen, setRngOpen] = useState(false);

  // State variable for the randomizer result.
  const [rng, setRng] = useState(0);

  // Event handlers for opening and closing the dropdown menus.
  const handleOpenOne = () => {
    setOpenOne(!openOne);
    setOpenTwo(false);
    setOpenThree(false);
  };

  const handleOpenTwo = () => {
    setOpenTwo(!openTwo);
    setOpenOne(false);
    setOpenThree(false);
  };

  const handleOpenThree = () => {
    setOpenThree(!openThree);
    setOpenOne(false);
    setOpenTwo(false);
  };

  // Event handlers for opening and closing the calculator and random number generator.
  const handleCalc = () => {
    setCalcOpen(!calcOpen);
    setOpenOne(false);
    setOpenTwo(false);
  };

  const handleRng = () => {
    setRngOpen(!rngOpen);
    setOpenTwo(false);
    setOpenThree(false);
  };

  // Event handler for closing all menus.
  const handleMenu = () => {
    setOpenOne(false);
    setOpenTwo(false);
    setOpenThree(false);
  };

  // Function for generating a random number within a specified range, including min and max.
  const randomizer = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    setRng(Math.floor(Math.random() * (max - min + 1) + min));
  };

  return (
    <>
      <nav>
        <table className="nav-table">
          <tbody>
            <tr>
              <td className="nav-td">
                {/* Dropdown for "Randomizer". */}
                <div className="dropdown" onBlur={handleMenu}>
                  <button className="nav-selector" onClick={handleOpenOne}>
                    Randomizer
                  </button>
                  {openOne ? (
                    <ul className="menu">
                      <li>
                        {/* Link to "/home". */}
                        <button
                          className="nav-selector"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleMenu}
                        >
                          <Link to="/home" className="nav-btn-1">
                            Home
                          </Link>
                        </button>
                      </li>
                      <li>
                        {/* Button for opening the random number generator. */}
                        <button
                          className="open-element"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleRng}
                        >
                          Random number generator
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </td>
              <td className="nav-td">
                {/* Dropdown for "Ranges". */}
                <div className="dropdown" onBlur={handleMenu}>
                  <button className="nav-selector" onClick={handleOpenTwo}>
                    Ranges
                  </button>
                  {openTwo ? (
                    <ul className="menu">
                      <li>
                        {/* Link to "/ranges-about". */}
                        <button
                          className="nav-selector"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleMenu}
                        >
                          <Link to="/ranges-about" className="nav-btn-1">
                            About ranges
                          </Link>
                        </button>
                      </li>
                      <li>
                        {/* Link to "/ranges". */}
                        <button
                          className="nav-selector"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleMenu}
                        >
                          <Link to="/ranges" className="nav-btn-1">
                            Range Matrix
                          </Link>
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </td>
              <td className="nav-td">
                {/* Dropdown for "Calculator". */}
                <div className="dropdown" onBlur={handleMenu}>
                  <button className="nav-selector" onClick={handleOpenThree}>
                    Calculator
                  </button>
                  {openThree ? (
                    <ul className="menu">
                      <li>
                        {/* Link to "calc-about". */}
                        <button
                          className="nav-selector"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleMenu}
                        >
                          <Link to="calc-about" className="nav-btn-1">
                            About calculations
                          </Link>
                        </button>
                      </li>
                      <li>
                        {/* Button for opening the calculator. */}
                        <button
                          className="open-element"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleCalc}
                        >
                          On-screen Calculator
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* The calculator and random number generator elements. */}
        <div className="nav-table-2">
          <div className="open-element-2">
            {/* Render the Calculator component if calcOpen is true. */}
            {calcOpen ? <Calculator /> : null}
          </div>
          <div className="open-element-3">
            {/* Render the random number generator elements if rngOpen is true. */}
            {rngOpen ? (
              <div className="rngbutton" onClick={() => randomizer(1, 100)}>
                Randomize
              </div>
            ) : null}
            {rngOpen ? <div className="value">{rng}</div> : null}
          </div>
        </div>
      </nav>

      {/* Outlet for rendering nested routes. */}
      <Outlet />
    </>
  );
};

export default Layout;
