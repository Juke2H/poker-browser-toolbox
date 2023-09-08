import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ranges.css";
import Matrix from "../../components/matrix/Matrix";
import ButtonArray from "../../components/buttonarray/ButtonArray";

const Ranges = () => {

  useEffect(() => {
    console.log("Ranges page update");
  });

  //Objects of the collections based on location.
  //Keys are the collection names
  //Values are connection strings to the collections

  //Cash database
  const cashCollections = {
    UTG: "cashutg",
    UTG1: "cashutg1",
    MP: "cashmp",
    LJ: "cashlj",
    HJ: "cashhj",
    CO: "cashco",
    BTN: "cashbtn",
    SB: "cashsb",
    BB: "cashbb",
  };
  
  //Tournament database
  const mttCollections = {
    UTG: "mttutg",
    UTG1: "mttutg1",
    MP: "mttmp",
    LJ: "mttlj",
    HJ: "mtthj",
    CO: "mttco",
    BTN: "mttbtn",
    SB: "mttsb",
    BB: "mttbb",
  };
  
  //The state for the form structure
  const [form, setForm] = useState({
    profilename: "",
    range: {
      call: [],
      raise: [],
    },
    description: "",
    type: "",
    stack: "",
  });

  /*The state that shows which database, connection string and 
  table position is currently open for debug */
  const [location, setLocation] = useState({
    database: "",
    collection: "",
    position: "",
  });

  //Stores the active state for each combo in the matrix.
  //It should only ever be 0, 1 or 2.

  const [active, setActive] = useState({
    "AA": 0, "AKs": 0, "AQs": 0, "AJs": 0, "ATs": 0, "A9s": 0, "A8s": 0, "A7s": 0, "A6s": 0, "A5s": 0, "A4s": 0, "A3s": 0, "A2s": 0,
    "AKo": 0, "KK": 0, "KQs": 0, "KJs": 0, "KTs": 0, "K9s": 0, "K8s": 0, "K7s": 0, "K6s": 0, "K5s": 0, "K4s": 0, "K3s": 0, "K2s": 0,
    "AQo": 0, "KQo": 0, "QQ": 0, "QJs": 0, "QTs": 0, "Q9s": 0, "Q8s": 0, "Q7s": 0, "Q6s": 0, "Q5s": 0, "Q4s": 0, "Q3s": 0, "Q2s": 0,
    "AJo": 0, "KJo": 0, "QJo": 0, "JJ": 0, "JTs": 0, "J9s": 0, "J8s": 0, "J7s": 0, "J6s": 0, "J5s": 0, "J4s": 0, "J3s": 0, "J2s": 0,
    "ATo": 0, "KTo": 0, "QTo": 0, "JTo": 0, "TT": 0, "T9s": 0, "T8s": 0, "T7s": 0, "T6s": 0, "T5s": 0, "T4s": 0, "T3s": 0, "T2s": 0,
    "A9o": 0, "K9o": 0, "Q9o": 0, "J9o": 0, "T9o": 0, "99": 0, "98s": 0, "97s": 0, "96s": 0, "95s": 0, "94s": 0, "93s": 0, "92s": 0,
    "A8o": 0, "K8o": 0, "Q8o": 0, "J8o": 0, "T8o": 0, "98o": 0, "88": 0, "87s": 0, "86s": 0, "85s": 0, "84s": 0, "83s": 0, "82s": 0,
    "A7o": 0, "K7o": 0, "Q7o": 0, "J7o": 0, "T7o": 0, "97o": 0, "87o": 0, "77": 0, "76s": 0, "75s": 0, "74s": 0, "73s": 0, "72s": 0,
    "A6o": 0, "K6o": 0, "Q6o": 0, "J6o": 0, "T6o": 0, "96o": 0, "86o": 0, "76o": 0, "66": 0, "65s": 0, "64s": 0, "63s": 0, "62s": 0,
    "A5o": 0, "K5o": 0, "Q5o": 0, "J5o": 0, "T5o": 0, "95o": 0, "85o": 0, "75o": 0, "65o": 0, "55": 0, "54s": 0, "53s": 0, "52s": 0,
    "A4o": 0, "K4o": 0, "Q4o": 0, "J4o": 0, "T4o": 0, "94o": 0, "84o": 0, "74o": 0, "64o": 0, "54o": 0, "44": 0, "43s": 0, "42s": 0,
    "A3o": 0, "K3o": 0, "Q3o": 0, "J3o": 0, "T3o": 0, "93o": 0, "83o": 0, "73o": 0, "63o": 0, "53o": 0, "43o": 0, "33": 0, "32s": 0,
    "A2o": 0, "K2o": 0, "Q2o": 0, "J2o": 0, "T2o": 0, "92o": 0, "82o": 0, "72o": 0, "62o": 0, "52o": 0, "42o": 0, "32o": 0, "22": 0,
  });

  /*The different play positions, stack sizes and range types. 
  Used with the ButtonArray component. */
  const positions = ["UTG", "UTG1", "MP", "LJ", "HJ", "CO", "BTN", "SB", "BB"];
  const stacksizes = ["150bb", "100bb", "60bb", "30bb", "20bb", "u20bb"];
  const rangetypes = ["RFI", "FRFI", "F3Bet", "F4bet"];

  /* States for the fetched profile list 
  and a singular profile ID that will be called for later. */
  const [profiles, setProfiles] = useState([]);
  const [profileId, setProfileId] = useState("");

  //The state for the currently open stack size.
  const [stack, setStack] = useState("");

  //The state that shows which range type is currently open (ie. which profiles can be opened).
  const [rangetype, setRangetype] = useState("");

  //The state that shows which range button was clicked last
  const [buttonId, setButtonId] = useState("");

  //State for the connection string (ie. a value in one of the collection objects) used for fetches.
  const [connString, setConnString] = useState("");

  /*Toggle states for ButtonArray button color changes to indicate which
  filters are active */

  const [dbToggle, setDbToggle] = useState("");
  const [collectionToggle, setCollectionToggle] = useState("");
  const [stackToggle, setStackToggle] = useState("");
  const [typeToggle, setTypeToggle] = useState("");

  //States for the ability to edit and delete profiles
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  /*States for when awaiting response from a collection and the error that shows if there is an error */
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  /*States to show/hide debug functions checkLocation and checkStatus.
  I could put in a button for this inside the page, but I don't think that's good. */
  const [d_bug, ] = useState(false);

  //A function to empty a matrix (set the active of all combos to 0)
  const clearMatrix = () => {
    setActive({
      "AA": 0, "AKs": 0, "AQs": 0, "AJs": 0, "ATs": 0, "A9s": 0, "A8s": 0, "A7s": 0, "A6s": 0, "A5s": 0, "A4s": 0, "A3s": 0, "A2s": 0,
      "AKo": 0, "KK": 0, "KQs": 0, "KJs": 0, "KTs": 0, "K9s": 0, "K8s": 0, "K7s": 0, "K6s": 0, "K5s": 0, "K4s": 0, "K3s": 0, "K2s": 0,
      "AQo": 0, "KQo": 0, "QQ": 0, "QJs": 0, "QTs": 0, "Q9s": 0, "Q8s": 0, "Q7s": 0, "Q6s": 0, "Q5s": 0, "Q4s": 0, "Q3s": 0, "Q2s": 0,
      "AJo": 0, "KJo": 0, "QJo": 0, "JJ": 0, "JTs": 0, "J9s": 0, "J8s": 0, "J7s": 0, "J6s": 0, "J5s": 0, "J4s": 0, "J3s": 0, "J2s": 0,
      "ATo": 0, "KTo": 0, "QTo": 0, "JTo": 0, "TT": 0, "T9s": 0, "T8s": 0, "T7s": 0, "T6s": 0, "T5s": 0, "T4s": 0, "T3s": 0, "T2s": 0,
      "A9o": 0, "K9o": 0, "Q9o": 0, "J9o": 0, "T9o": 0, "99": 0, "98s": 0, "97s": 0, "96s": 0, "95s": 0, "94s": 0, "93s": 0, "92s": 0,
      "A8o": 0, "K8o": 0, "Q8o": 0, "J8o": 0, "T8o": 0, "98o": 0, "88": 0, "87s": 0, "86s": 0, "85s": 0, "84s": 0, "83s": 0, "82s": 0,
      "A7o": 0, "K7o": 0, "Q7o": 0, "J7o": 0, "T7o": 0, "97o": 0, "87o": 0, "77": 0, "76s": 0, "75s": 0, "74s": 0, "73s": 0, "72s": 0,
      "A6o": 0, "K6o": 0, "Q6o": 0, "J6o": 0, "T6o": 0, "96o": 0, "86o": 0, "76o": 0, "66": 0, "65s": 0, "64s": 0, "63s": 0, "62s": 0,
      "A5o": 0, "K5o": 0, "Q5o": 0, "J5o": 0, "T5o": 0, "95o": 0, "85o": 0, "75o": 0, "65o": 0, "55": 0, "54s": 0, "53s": 0, "52s": 0,
      "A4o": 0, "K4o": 0, "Q4o": 0, "J4o": 0, "T4o": 0, "94o": 0, "84o": 0, "74o": 0, "64o": 0, "54o": 0, "44": 0, "43s": 0, "42s": 0,
      "A3o": 0, "K3o": 0, "Q3o": 0, "J3o": 0, "T3o": 0, "93o": 0, "83o": 0, "73o": 0, "63o": 0, "53o": 0, "43o": 0, "33": 0, "32s": 0,
      "A2o": 0, "K2o": 0, "Q2o": 0, "J2o": 0, "T2o": 0, "92o": 0, "82o": 0, "72o": 0, "62o": 0, "52o": 0, "42o": 0, "32o": 0, "22": 0,
    });
    
    setForm((
      (prev) => {
      return { ...prev, range: {raise: [], call: []} };
    }
    ));

  };
  
  //A function to empty out all form elements and profileId, rangetype and stack states. 
  const clearForm = () => {
    clearMatrix();

    setForm({
      profilename: "",
      range: {
        call: [],
        raise: [],
      },
      description: "",
      type: "",
      stack: "",
    });

    setProfileId("");

    setRangetype("");
    setStack("");

    setStackToggle("");
    setTypeToggle("");

    setEdit(false);
    setDel(false);

  };

  /*A function to empty (but not delete) the currently open 
  form, matrix, location and connection string */

  //This is only used when reopening or changing the database.
  const clearProfile = () => {
    clearForm();
    setCollectionToggle("");
    setDbToggle("");

    setEdit(false);
    setDel(false);

    setLocation({
      database: "",
      collection: "",
      position: "",
    });

    setConnString("");

    console.log("Profile cleared");
  };

  //Closes everything under the current database and opens a new one
  const handleDatabase = (db) => {
    clearProfile();
    setProfiles([]);
    setLocation(() => {
      return { database: `${db}`, collection: "", position: "" };
    });
    setDbToggle(db);
  };

  //Sets the stack size to the filter button id
  const handleStack = (event) => {
    clearForm();
    console.log(event.target.id);
    setStack(event.target.id);
    updateForm({ stack: event.target.id });
    setStackToggle(event.target.id);
  };

  /*Declares a variable to hold the initial connection string.
  State can't be used here since setting state is async. */
  let destination;

  //Function to open a collection inside  a database
  const handleCollection = async (event) => {
    clearForm(); //Clears existing form information

    console.log(event.target.id);

    if (location.database === "Cash") {
      //If the open database is "Cash"

      //Sets location state to show which collection (connection string) is open
      setLocation((prev) => {
        return { ...prev, collection: cashCollections[event.target.id] };
      });
      //Also updates destination variable for fetch
      destination = cashCollections[event.target.id];
      /*Even if the connection string state can't be used in this function,
      I still want to set it and use it later */
      setConnString(cashCollections[event.target.id]);

      console.log(location.database);

    } else if (location.database === "Tournament") {
      //Else if the open database is "Tournament"
      setLocation((prev) => {
        return { ...prev, collection: mttCollections[event.target.id] };
      });

      destination = mttCollections[event.target.id];

      setConnString(mttCollections[event.target.id]);

      console.log(location.database);
    } else {
      //And if neither database is open
      window.alert("No open database");
      console.log("Database not open");

      return;
    }
    //After finding the connection string, attemps to connect.
    try {
      //Sets loading state to show that connection is in progress.
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/${destination}/`);

      /*If the response is anything other than the data,
      responds with an alert window stating the error text. */
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      //Wait for and take the data as JavaScript objects.
      let profiles_json = await response.json();

      console.log(`Profile list: ${JSON.stringify(profiles_json, null, 4)}`);

      //Sets profiles to the found data.
      setProfiles(profiles_json);
    } catch (err) {
      //If an error is found, sets the error state and shows it on the page.
      setErr(err.message);
    } finally {
      //Finally sets the loading page back to false to signal a finished connection attempt.
      setIsLoading(false);
    }

    //Sets location.position to the clicked button.
    setLocation((prev) => {
      return { ...prev, position: event.target.id };
    });
    //And sets toggle to show the open collection.
    setCollectionToggle(event.target.id);
  };


  //Two functions to help debug.
  //Shows open database, open position, available profiles, active toggles and the current connection string.
  const checkLocation = () => {
    console.log(`Location: ${JSON.stringify(location)}`);
    console.log(`Database toggle: ${JSON.stringify(dbToggle)}`);
    console.log(`Collection toggle: ${JSON.stringify(collectionToggle)}`);
    console.log(`Stack toggle: ${JSON.stringify(stackToggle)}`);
    console.log(`Type toggle: ${JSON.stringify(typeToggle)}`);
    console.log(`Connection string: ${connString}`);
  };
  
  //Shows current profile id, if edit is toggled, the current form and current active states.
  const checkStatus = () => {
    console.log(`Profile ID: ${profileId}`);
    console.log(`Edit toggle: ${edit}`);
    console.log(`Form: ${JSON.stringify(form)}`);
    console.log(`Active: ${JSON.stringify(active)}`);
  };

  //Sets rangetype to selected option and empties previous form.
  const handleType = (event) => {
    clearMatrix();
    console.log(event.target.id);
    setForm((prev) => {
      return {
        ...prev,
        profilename: "",
        range: {
          call: [],
          raise: [],
        },
        description: "",
        type: "",
      };
    });
    setProfileId("");

    setRangetype(event.target.id);

    updateForm({ type: event.target.id });

    setTypeToggle(event.target.id);

    setEdit(false);
    setDel(false);
  };

  //Returns a list of profiles in a dropdown menu
  const profileList = () => {
    return (
      <div className="form-group">
        <select
          className="form-control"
          /*Same thing here, the shown value
            will always be "--Pick a Profile--"
            to keep all profiles selectable */
          value="***Profiles***"
          onChange={(e) => openProfile(e.target.value)}
        >
          <option disabled>***Profiles***</option>
          {/* Maps profiles to create a list that match
          rangetype and stack states */}
          {profiles.map((profile) => {
            if (rangetype === profile.type && stack === profile.stack) {
              return (
                <option value={JSON.stringify(profile)}>
                  {profile.profilename}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>
    );
  };

  //Opens a profile from the list.
  const openProfile = (profile) => {
    //Make the profile into a JavaScript object.
    let profile_object = JSON.parse(profile);

    console.log(profile);
    console.log(profile_object);
    console.log(Object.entries(profile_object.range));

    //Set profileId into the JavaScript object.
    setProfileId(profile_object._id);

    //Clear all previously open profile elements and states.
    clearMatrix();

    //Set active to show the range stored in the profile.
    for (const [key, value] of Object.entries(profile_object.range)) {
      //Keys are "call" and "raise".
      //Values are arrays that have combos inside them.
      for (let i in value) {
        console.log(value[i]);
        if (key === "call" && value[i] in active) {
          console.log(`Call found: ${value[i]}`);
          setActive((prev) => {
            return { ...prev, [value[i]]: 1 };
          });
        } else if (key === "raise" && value[i] in active) {
          console.log(`Raise found: ${value[i]}`);
          setActive((prev) => {
            return { ...prev, [value[i]]: 2 };
          });
        };
      };
    };
    //Sets the form to what it finds.
    setForm({
      profilename: profile_object.profilename,
      range: {
        call: profile_object.range.call,
        raise: profile_object.range.raise,
      },
      description: profile_object.description,
      type: profile_object.type,
      stack: profile_object.stack,
    });
  };

  //Update-function for text input fields.
  const updateForm = (value) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  //Handles RangeButton onClicks to change colors.
  const handleClick = (event) => {
    console.log("Button clicked");
    console.log(event.target.id);
    //Sets buttonId to later include hand combo to form.
    setButtonId(event.target.id);
    //Sets active from 0 to 1, 1 to 2 or 2 to 0 when clicked.
    setActive((prev) => {
      if (active[event.target.id] === 0) {
        return { ...prev, [event.target.id]: 1 };
      } else if (active[event.target.id] === 1) {
        return { ...prev, [event.target.id]: 2 };
      } else if (active[event.target.id] === 2) {
        return { ...prev, [event.target.id]: 0 };
      }
    });
    console.log(active);
  };

  //onBlur function to include the clicked combo (set buttonId) to form.
  const handleBlur = () => {
    setForm((prev) => {
      /*If buttonId is 1; 
        includes it in Call-range and removes it from Raise-range. */
      if (active[buttonId] === 1) {
        return {
          ...prev,
          range: {
            call: [...form.range.call, buttonId],
            raise: form.range.raise.filter((combo) => combo !== buttonId),
          },
        };
      } else if (active[buttonId] === 2) {
      /*If buttonId is 2; 
        includes it in Raise range and removes it from Call range */
        return {
          ...prev,
          range: {
            raise: [...form.range.raise, buttonId],
            call: form.range.call.filter((combo) => combo !== buttonId),
          },
        };
      } else if (active[buttonId] === 0) {
      /*If buttonId is 0; 
        removes it from both ranges */
        return {
          ...prev,
          range: {
            raise: form.range.raise.filter((combo) => combo !== buttonId),
            call: form.range.call.filter((combo) => combo !== buttonId),
          },
        };
      }
    });
  };

  
  //Toggles for the ability to edit and delete profiles.
  const toggleEdit = () => {
    setEdit(!edit);
    setDel(false);
  };
  const toggleDelete = () => {
    setDel(!del);
  };

  //Function to create a new profile and then reset form.
  const onSubmit = async () => {
    //Declare a new variable for the profile-to-be-sent.
    const newProfile = { ...form };

    //Attempt to find the collection, and send profile to collection.
    await fetch(`http://localhost:8080/${connString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    }).catch((error) => {
      //Window alert if an error occurs.
      window.alert(error);
      return;
    });

    //And reset everything.
    clearProfile();

    console.log("Profile created");
  };

  //Function to edit (patch) a profile.
  const onEdit = async () => {
    console.log(profileId);

    //Another way to write { ...form }.
    const editedProfile = {
      profilename: form.profilename,
      range: {
        call: form.range.call,
        raise: form.range.raise,
      },
      description: form.description,
      type: form.type,
      stack: form.stack,
    };

    //Try to find the profile that will be patched, and patch it.
    await fetch(`http://localhost:8080/${connString}/${profileId}`, {
      method: "PATCH",
      body: JSON.stringify(editedProfile),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log("Profile edited");
  };

  //Makes using the hook easier.
  const navigate = useNavigate();

  //Function to handle form submission.
  const handleSubmit = (e) => {
    //Stop any default action that would happen when submit is pressed.

    /*Because onBlur events happen before onClick,
    event.preventDefault does not stop handleBlur if 
    submit is pressed right after a range button */
    e.preventDefault();

    //Check if the form is filled up:
    //If yes, then submit or edit;
    //if no, window.alert an error.
    if (
      form.profilename !== "" &&
      form.description !== "" &&
      form.type !== "" &&
      form.stack !== ""
    ) {
      //If the call and raise arrays both have nothing in them, alert.
      if (form.range.call.length === 0 && form.range.raise.length === 0) {
        clearMatrix();
        window.alert("No range");
      } else {
        if (edit === true) {
          onEdit();
        } else {
          onSubmit();
        }
        //After submit or edit, navigate to force reload.
        navigate("/navigate");
      }
    } else {
      clearMatrix();
      window.alert("Form not complete");
    }
  };

  //Function for deleting a profile.
  const deleteProfile = async (id) => {
    //Try to find the profile, and delete it.
    await fetch(`http://localhost:8080/${connString}/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      //And alert if profile isn't found.
      window.alert(error);
      return;
    });

    console.log(`Profile ${form.profilename} deleted`);
    window.alert(`Profile ${form.profilename} deleted`);

    //Filter profiles locally after deletion.
    const newProfiles = profiles.filter((profile) => profile._id !== id);
    setProfiles(newProfiles);

    //And clean up the form.
    clearForm();
  };

  return (
    <div>
      <h1>Ranges</h1>

      {/* Buttons to check location and status when d_bug is true. */}
      <div>
        {d_bug ? (
          <div>
            <button onClick={() => checkLocation()}>
              Check current location
            </button>
            <br />
            <button onClick={() => checkStatus()}>Check current status</button>
          </div>
        ) : null}

        {/* Buttons to open the databases. */}
        <div className="form-group">
          <div
            className="db-btn"
            tabIndex="1"
            style={
              dbToggle === "Cash" ? { backgroundColor: "chartreuse", color: "black" } : null
            }
            onClick={() => handleDatabase("Cash")}
          >
            Cash game database
          </div>
          <div
            className="db-btn"
            tabIndex="1"
            style={
              dbToggle === "Tournament" ? { backgroundColor: "chartreuse", color: "black" } : null
            }
            onClick={() => handleDatabase("Tournament")}
          >
            Tournament database
          </div>
        </div>
      </div>

      {/* ButtonArrays for positions and stack sizes. */}
      <div className="form-group">
        <ButtonArray
          class="positions"
          array={positions}
          toggle={collectionToggle}
          onClick={handleCollection}
        />
      </div>
      <div className="form-group">
        <ButtonArray
          class="stacks"
          array={stacksizes}
          toggle={stackToggle}
          onClick={handleStack}
        />
      </div>
      <div className="form-group">
        <ButtonArray
          class="types"
          array={rangetypes}
          toggle={typeToggle}
          onClick={handleType}
        />
      </div>

      {/* Display selected location and stack. */}
      {location.database === "" ? (
        <h1>Select a database</h1>
      ) : (
        <h1>
          {location.database} database: {location.position} {stack}
        </h1>
      )}
      {location.position === "" && location.database !== "" ? (
        <h2>Select a position</h2>
      ) : null}

      {/* Display stack size selection. */}
      {location.position !== "" && location.database !== "" && stack === "" ? (
        <h2>Select Stack size</h2>
      ) : null}

      {/* Display error and loading messages. */}
      {err ? <h2>{err}</h2> : null}
      {isLoading ? <h2>Loading...</h2> : null}

      {/* Profile selection */}

      {/* If some position (collection) and stack size, but no range type. */}
      {location.position !== "" && stack !== "" && rangetype === "" ? (
        <h2>Select a range type</h2>
      ) : null}

      {/* If no profilename, but some position, stack size and range type. */}
      {form.profilename === "" &&
      location.position !== "" &&
      stack !== "" &&
      rangetype !== "" ? (
        <h2>Select or create a profile: {rangetype}</h2>
      ) : null}

      {/* If some profilename, position, stack size and range type. */}
      {form.profilename !== "" &&
      location.position !== "" &&
      stack !== "" &&
      rangetype !== "" ? (
        <h2>Change profiles: {rangetype}</h2>
      ) : null}

      {/* If all three of position, stack size and rangetype exist, show profile list. */}
      {location.position !== "" && stack !== ""  && rangetype !== "" ? (
        <div>{profileList()}</div>
      ) : null}

      {/* Display profile information, or "empty" if no value. */}
      <h2>
        Profile name:{" "}
        {form.profilename === "" ? "Profile not open" : form.profilename}
      </h2>
      <p>
        <b>Range description: </b>
        {form.description === "" ? "empty" : form.description}
        <br />
        <b>Range type: </b>
        {form.type === "" ? "empty" : form.type}
        <br />
        <b>Range stack size: </b>
        {form.stack === "" ? "empty" : form.stack}
        <br />
        <b>Saved range:</b>
        <br />
        Call: {form.range.call.length === 0 ? "empty" : form.range.call}
        <br />
        Raise: {form.range.raise.length === 0 ? "empty" : form.range.raise}
      </p>

      {/* The hand matrix. */}
      <h2>Matrix</h2>
      <div>
        <Matrix
          activeState={active}
          handleClick={handleClick}
          handleBlur={handleBlur}
        />
      </div>

      {/* Clear buttons. */}
      <div className="mat-btns">
        <div tabIndex="1" className="db-btn" onClick={clearForm}>
          Clear Form
        </div>
        <div tabIndex="1" className="db-btn" onClick={clearMatrix}>
          Clear Matrix
        </div>
      </div>
      <br />

      {/* Profile form. */}

      {/* Profile name. */}
      {/* If there is no profile ID or if edit is toggled on. */}
      {profileId === "" || edit === true ? (
        <div className="form-group">
          <label htmlFor="profilename">Profile name: </label>
          <input
            type="text"
            className="form-control"
            id="profilename"
            value={form.profilename}
            onChange={(e) => updateForm({ profilename: e.target.value })}
          />
        </div>
      ) : null}

      {/* Description. */}
      {/* If there is no profile ID or if edit is toggled on. */}
      {profileId === "" || edit === true ? (
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            rows="2"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
      ) : null}

      {/* Type. */}
      {/* If edit is toggled on. */}
      {edit === true ? (
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            defaultValue="--Pick a Range type--"
            onChange={(e) => updateForm({ type: e.target.value })}
          >
            <option disabled>--Pick a Range type--</option>
            <option value="RFI">RFI</option>
            <option value="FRFI">FRFI</option>
            <option value="F3Bet">F3-bet</option>
            <option value="F4Bet">F4-bet</option>
          </select>
        </div>
      ) : null}

      {/* Stack size. */}
      {/* If edit is toggled on. */}
      {edit === true ? (
        <div className="form-group">
          <label htmlFor="stack">Stack size</label>
          <select
            className="form-control"
            id="stack"
            defaultValue="--Pick a Stack size--"
            onChange={(e) => updateForm({ stack: e.target.value })}
          >
            <option disabled>--Pick a Stack size--</option>
            <option value="150bb">150bb</option>
            <option value="100bb">100bb</option>
            <option value="60bb">60bb</option>
            <option value="30bb">30bb</option>
            <option value="20bb">20bb</option>
            <option value="u20bb">u20bb</option>
          </select>
        </div>
      ) : null}
      <br />

      {/* Parent div for edit, submit and delete buttons. */}
      <div className="edit-submit-del">
        {/* Toggle edit button if profileId exists. */}
        {profileId !== "" ? (
          <div
            tabIndex="1"
            className="edit-btn"
            style={
              edit ? { backgroundColor: "chartreuse", color: "black" } : null
            }
            onClick={toggleEdit}
          >
            Toggle edit
          </div>
        ) : null}

        {/* Submit and delete buttons. */}
        {profileId === "" || edit === true ? (
          <div tabIndex="1" className="edit-btn" onClick={handleSubmit}>
            Submit
          </div>
        ) : null}
        {edit === true ? (
          <div tabIndex="1" className="edit-btn" onClick={toggleDelete}>
            Delete
          </div>
        ) : null}
        {del === true ? (
          <>
            <b>Are you sure?</b>
            <div
              tabIndex="1"
              className="del-btn"
              onClick={() => deleteProfile(profileId)}
            >
              Yes
            </div>
            <div tabIndex="1" className="del-btn" onClick={toggleDelete}>
              No
            </div>
          </>
        ) : null}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Ranges;