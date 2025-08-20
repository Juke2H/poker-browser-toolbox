import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ranges.css";
import Matrix, { ComboMatrix } from "../../components/matrix/Matrix";
import ButtonArray from "../../components/buttonarray/ButtonArray";

//Uses position-, stackSize- and rangeTypeToggle states to filter the profile list in real time
const filterMatch = (profileKey: string, matchValue: string): boolean => {
  //Filter the profile list by either nothing or the value of the selected object key
  //Returning true when a filter isn't active still allows the other filters to do their thing
  return matchValue === "" || profileKey === matchValue;
};

const Ranges = () => {
  //Ctrl+F -> ??? to find incomplete code blocks
  // When done, remove localhost from connection strings before running build

  //Objects of the collections based on location.
  //Keys are the collection names
  //Values are connection strings to the collections

  //[key: string]: string is an index signature
  //???
  type Positions = {
    UTG: string;
    UTG1: string;
    MP: string;
    LJ: string;
    HJ: string;
    CO: string;
    BTN: string;
    SB: string;
    BB: string;
  };

  //Cash positions
  //???
  const cashPositions: Positions = {
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

  //Tournament positions
  //???
  const tournamentPositions: Positions = {
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

  //Interface instead of type in case it will be extended
  interface Profile {
    _id?: string;
    profileName: string;
    description: string;
    rangeType: string;
    gameType: string;
    stackSize: string;
    position: string;
    range: {
      call: string[];
      raise: string[];
    };
  }

  //The state for the form structure
  const [form, setForm] = useState<Profile>({
    profileName: "",
    description: "",
    rangeType: "",
    gameType: "",
    stackSize: "",
    position: "",
    range: {
      call: [],
      raise: [],
    },
  });

  //User login state
  const [userLoggedIn, SetUserLoggedIn] = useState(false);

  /*The state that shows which database, connection string and 
  table position is currently open for debug */
  //???
  const [location, setLocation] = useState({
    database: "",
    collection: "",
    position: "",
  });

  //Stores the active state for each combo in the matrix.
  //It should only ever be 0, 1 or 2.

  const [active, setActive] = useState<ComboMatrix>({
    AA: 0,
    AKs: 0,
    AQs: 0,
    AJs: 0,
    ATs: 0,
    A9s: 0,
    A8s: 0,
    A7s: 0,
    A6s: 0,
    A5s: 0,
    A4s: 0,
    A3s: 0,
    A2s: 0,
    AKo: 0,
    KK: 0,
    KQs: 0,
    KJs: 0,
    KTs: 0,
    K9s: 0,
    K8s: 0,
    K7s: 0,
    K6s: 0,
    K5s: 0,
    K4s: 0,
    K3s: 0,
    K2s: 0,
    AQo: 0,
    KQo: 0,
    QQ: 0,
    QJs: 0,
    QTs: 0,
    Q9s: 0,
    Q8s: 0,
    Q7s: 0,
    Q6s: 0,
    Q5s: 0,
    Q4s: 0,
    Q3s: 0,
    Q2s: 0,
    AJo: 0,
    KJo: 0,
    QJo: 0,
    JJ: 0,
    JTs: 0,
    J9s: 0,
    J8s: 0,
    J7s: 0,
    J6s: 0,
    J5s: 0,
    J4s: 0,
    J3s: 0,
    J2s: 0,
    ATo: 0,
    KTo: 0,
    QTo: 0,
    JTo: 0,
    TT: 0,
    T9s: 0,
    T8s: 0,
    T7s: 0,
    T6s: 0,
    T5s: 0,
    T4s: 0,
    T3s: 0,
    T2s: 0,
    A9o: 0,
    K9o: 0,
    Q9o: 0,
    J9o: 0,
    T9o: 0,
    "99": 0,
    "98s": 0,
    "97s": 0,
    "96s": 0,
    "95s": 0,
    "94s": 0,
    "93s": 0,
    "92s": 0,
    A8o: 0,
    K8o: 0,
    Q8o: 0,
    J8o: 0,
    T8o: 0,
    "98o": 0,
    "88": 0,
    "87s": 0,
    "86s": 0,
    "85s": 0,
    "84s": 0,
    "83s": 0,
    "82s": 0,
    A7o: 0,
    K7o: 0,
    Q7o: 0,
    J7o: 0,
    T7o: 0,
    "97o": 0,
    "87o": 0,
    "77": 0,
    "76s": 0,
    "75s": 0,
    "74s": 0,
    "73s": 0,
    "72s": 0,
    A6o: 0,
    K6o: 0,
    Q6o: 0,
    J6o: 0,
    T6o: 0,
    "96o": 0,
    "86o": 0,
    "76o": 0,
    "66": 0,
    "65s": 0,
    "64s": 0,
    "63s": 0,
    "62s": 0,
    A5o: 0,
    K5o: 0,
    Q5o: 0,
    J5o: 0,
    T5o: 0,
    "95o": 0,
    "85o": 0,
    "75o": 0,
    "65o": 0,
    "55": 0,
    "54s": 0,
    "53s": 0,
    "52s": 0,
    A4o: 0,
    K4o: 0,
    Q4o: 0,
    J4o: 0,
    T4o: 0,
    "94o": 0,
    "84o": 0,
    "74o": 0,
    "64o": 0,
    "54o": 0,
    "44": 0,
    "43s": 0,
    "42s": 0,
    A3o: 0,
    K3o: 0,
    Q3o: 0,
    J3o: 0,
    T3o: 0,
    "93o": 0,
    "83o": 0,
    "73o": 0,
    "63o": 0,
    "53o": 0,
    "43o": 0,
    "33": 0,
    "32s": 0,
    A2o: 0,
    K2o: 0,
    Q2o: 0,
    J2o: 0,
    T2o: 0,
    "92o": 0,
    "82o": 0,
    "72o": 0,
    "62o": 0,
    "52o": 0,
    "42o": 0,
    "32o": 0,
    "22": 0,
  });

  /*The different play positions, stack sizes and range types. 
  Used with the ButtonArray component. */

  const positions = ["UTG", "UTG1", "MP", "LJ", "HJ", "CO", "BTN", "SB", "BB"];
  const stacksizes = ["150bb", "100bb", "60bb", "30bb", "20bb", "u20bb"];
  const rangetypes = ["RFI", "FRFI", "F3Bet", "F4bet"];

  /* States for the fetched profile list 
  and a singular profile ID that will be called for later. */
  const [allProfiles, setAllProfiles] = useState<Array<Profile>>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Array<Profile>>([]);
  const [profileId, setProfileId] = useState("");

  //The state for the currently open stack size.
  const [stackSize, setStackSize] = useState("");

  //The state that shows which range type is currently open (ie. which profiles can be opened).
  const [rangeType, setRangeType] = useState("");

  //The state that shows which range button was clicked last
  const [buttonId, setButtonId] = useState("");

  //State for the connection string (ie. a value in one of the collection objects) used for fetches.
  const [connString, setConnString] = useState("");

  /*Toggle states for ButtonArray button color changes to indicate which
  filters are active */

  const [dbToggle, setDbToggle] = useState("");
  const [positionToggle, setPositionToggle] = useState("");
  const [stackSizeToggle, setStackSizeToggle] = useState("");
  const [rangeTypeToggle, setRangeTypeToggle] = useState("");

  //States for the ability to edit and delete profiles
  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);

  /*States for when awaiting response from a collection and the error that shows if there is an error */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  /*States to show/hide debug functions checkLocation and checkStatus.
  I could put in a button for this inside the page, but I don't think that's good. */
  const [d_bug] = useState<boolean>(false);

  //A function to empty a matrix (set the active of all combos to 0)
  //??? Why are only some keys marked as strings?
  const clearMatrix = () => {
    setActive({
      AA: 0,
      AKs: 0,
      AQs: 0,
      AJs: 0,
      ATs: 0,
      A9s: 0,
      A8s: 0,
      A7s: 0,
      A6s: 0,
      A5s: 0,
      A4s: 0,
      A3s: 0,
      A2s: 0,
      AKo: 0,
      KK: 0,
      KQs: 0,
      KJs: 0,
      KTs: 0,
      K9s: 0,
      K8s: 0,
      K7s: 0,
      K6s: 0,
      K5s: 0,
      K4s: 0,
      K3s: 0,
      K2s: 0,
      AQo: 0,
      KQo: 0,
      QQ: 0,
      QJs: 0,
      QTs: 0,
      Q9s: 0,
      Q8s: 0,
      Q7s: 0,
      Q6s: 0,
      Q5s: 0,
      Q4s: 0,
      Q3s: 0,
      Q2s: 0,
      AJo: 0,
      KJo: 0,
      QJo: 0,
      JJ: 0,
      JTs: 0,
      J9s: 0,
      J8s: 0,
      J7s: 0,
      J6s: 0,
      J5s: 0,
      J4s: 0,
      J3s: 0,
      J2s: 0,
      ATo: 0,
      KTo: 0,
      QTo: 0,
      JTo: 0,
      TT: 0,
      T9s: 0,
      T8s: 0,
      T7s: 0,
      T6s: 0,
      T5s: 0,
      T4s: 0,
      T3s: 0,
      T2s: 0,
      A9o: 0,
      K9o: 0,
      Q9o: 0,
      J9o: 0,
      T9o: 0,
      "99": 0,
      "98s": 0,
      "97s": 0,
      "96s": 0,
      "95s": 0,
      "94s": 0,
      "93s": 0,
      "92s": 0,
      A8o: 0,
      K8o: 0,
      Q8o: 0,
      J8o: 0,
      T8o: 0,
      "98o": 0,
      "88": 0,
      "87s": 0,
      "86s": 0,
      "85s": 0,
      "84s": 0,
      "83s": 0,
      "82s": 0,
      A7o: 0,
      K7o: 0,
      Q7o: 0,
      J7o: 0,
      T7o: 0,
      "97o": 0,
      "87o": 0,
      "77": 0,
      "76s": 0,
      "75s": 0,
      "74s": 0,
      "73s": 0,
      "72s": 0,
      A6o: 0,
      K6o: 0,
      Q6o: 0,
      J6o: 0,
      T6o: 0,
      "96o": 0,
      "86o": 0,
      "76o": 0,
      "66": 0,
      "65s": 0,
      "64s": 0,
      "63s": 0,
      "62s": 0,
      A5o: 0,
      K5o: 0,
      Q5o: 0,
      J5o: 0,
      T5o: 0,
      "95o": 0,
      "85o": 0,
      "75o": 0,
      "65o": 0,
      "55": 0,
      "54s": 0,
      "53s": 0,
      "52s": 0,
      A4o: 0,
      K4o: 0,
      Q4o: 0,
      J4o: 0,
      T4o: 0,
      "94o": 0,
      "84o": 0,
      "74o": 0,
      "64o": 0,
      "54o": 0,
      "44": 0,
      "43s": 0,
      "42s": 0,
      A3o: 0,
      K3o: 0,
      Q3o: 0,
      J3o: 0,
      T3o: 0,
      "93o": 0,
      "83o": 0,
      "73o": 0,
      "63o": 0,
      "53o": 0,
      "43o": 0,
      "33": 0,
      "32s": 0,
      A2o: 0,
      K2o: 0,
      Q2o: 0,
      J2o: 0,
      T2o: 0,
      "92o": 0,
      "82o": 0,
      "72o": 0,
      "62o": 0,
      "52o": 0,
      "42o": 0,
      "32o": 0,
      "22": 0,
    });

    setForm((prev) => {
      return { ...prev, range: { raise: [], call: [] } };
    });
  };

  //An effect to filter the profile list on each re-render
  useEffect(() => {
    const newFilteredProfiles = allProfiles.filter((profile) => {
      //.filter adds the profile object into the new array if the filter is empty or matches
      return (
        filterMatch(profile.position, positionToggle) &&
        filterMatch(profile.stackSize, stackSizeToggle) &&
        filterMatch(profile.rangeType, rangeTypeToggle)
      );
    });
    setFilteredProfiles(newFilteredProfiles);
  }, [allProfiles, positionToggle, stackSizeToggle, rangeTypeToggle]);

  //A function to empty out all form elements and profileId, rangetype and stack states.
  const clearForm = () => {
    clearMatrix();

    setForm({
      profileName: "",
      description: "",
      rangeType: "",
      gameType: "",
      stackSize: "",
      position: "",
      range: {
        call: [],
        raise: [],
      },
    });

    setProfileId("");

    setRangeType("");
    setStackSize("");

    setStackSizeToggle("");
    setRangeTypeToggle("");

    setEdit(false);
    setDel(false);
  };

  /*A function to empty (but not delete) the currently open 
  form, matrix, location and connection string */

  //This is only used when reopening or changing the database.
  const clearProfile = () => {
    clearForm();
    setPositionToggle("");
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
  const handleDatabase = async (db: string) => {
    //Sets loading indicator and starts loading new profiles
    setIsLoading(true);
    clearProfile();
    setAllProfiles([]);
    setLocation(() => {
      return { database: `${db}`, collection: "", position: "" };
    });
    setDbToggle(db); //"cash" or "tournament"
    //Attempt to connect
    let destination: string;
    try {
      //If no user is logged in, fetch templates
      if (userLoggedIn) {
        destination = `profiles/${db}profiles`;
        setConnString(destination);
      } else {
        destination = `templates/${db}templates`;
        setConnString(destination);
        //??? need userid after dbprofiles
      }

      const response = await fetch(`http://localhost:3001/${destination}`);

      /*If the response is anything other than the data,
      responds with an alert window stating the error text. */
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      //Wait for and take the data as JavaScript objects.
      let profiles_json = await response.json();
      console.log(profiles_json);
      setAllProfiles(profiles_json);
    } catch (error) {
      // Make sure the error message is a string in case of unknown error
      let errorMessage: string = "Something broke";
      // And make it the actual error message if it's known
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      window.alert(errorMessage);
      console.log(errorMessage);
      setErr(errorMessage);
    } finally {
      //Finishes loading
      setIsLoading(false);
    }
  };

  //Function to open position data (BB, SB...) inside a database (MTT or Cash)
  //??? need profile filtering by the position key in the profile state JSON (that is an array of objects)
  const handlePosition = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event) {
      console.error("Event is null or undefined");
      return;
    }
    const eTarget = event.currentTarget;

    if (!eTarget.id) {
      console.error("Event target has no Id");
      return;
    }
    clearForm();

    console.log(eTarget.id);

    if (location.database === "cash") {
      //If the open game type is "Cash"

      //Sets location state to show which position is opened
      setLocation((prev) => {
        return {
          ...prev,
          collection: cashPositions[eTarget.id as keyof Positions],
        };
      });
    } else if (location.database === "tournament") {
      //Else if the open database is "Tournament"
      setLocation((prev) => {
        return {
          ...prev,
          collection: tournamentPositions[eTarget.id as keyof Positions],
        };
      });
    } else {
      //And if neither database is open
      window.alert("No open database");
      console.log("Database not open");

      return;
    }

    //Sets location.position to the clicked button.
    setLocation((prev) => {
      return { ...prev, position: eTarget.id };
    });
    //And sets toggle to show the open collection.
    setPositionToggle(eTarget.id);
  };

  //Sets the stack size to the filter button id
  //??? need profile filtering by the stackSize key in the profile state JSON (that is an array of objects)
  const handleStack = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event) {
      console.error("Event is null or undefined");
      return;
    }
    const eTarget = event.currentTarget;

    if (!eTarget.id) {
      console.error("Event target has no Id");
      return;
    }

    clearForm(); //Clears existing form information
    console.log(eTarget.id);
    setStackSize(eTarget.id);
    updateForm({ stack: eTarget.id });
    setStackSizeToggle(eTarget.id);
  };

  //Sets rangetype to selected option and empties previous form.
  //Using event.currentTarget to specify to TypeScript that the event happens where the listener is (the button) and not a potential child.
  //For example, attaching a listener to a div that has a button child makes event.target (button) and event.currentTarget(div with listener) different.
  //Using currentTarget isn't always possible so TypeScript also accepts specified typing for the HTMLElement(const asd = event.currentTarget as HTMLDivElement).
  //??? need profile filtering by the rangeType key in the profile state JSON (that is an array of objects)
  const handleType = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event) {
      console.error("Event is null or undefined");
      return;
    }
    const eTarget = event.currentTarget;

    if (!eTarget.id) {
      console.error("Event target has no Id");
      return;
    }
    console.log(eTarget.id);

    setProfileId("");

    setRangeType(eTarget.id);

    updateForm({ type: eTarget.id });

    setRangeTypeToggle(eTarget.id);

    setEdit(false);
    setDel(false);
  };

  //Two functions to help debug.
  //Shows open database, open position, available profiles, active toggles and the current connection string.
  const checkLocation = () => {
    console.log(`Location: ${JSON.stringify(location)}`);
    console.log(`Database toggle: ${JSON.stringify(dbToggle)}`);
    console.log(`Position toggle: ${JSON.stringify(positionToggle)}`);
    console.log(`Stack toggle: ${JSON.stringify(stackSizeToggle)}`);
    console.log(`Type toggle: ${JSON.stringify(rangeTypeToggle)}`);
    console.log(`Connection string: ${connString}`);
  };

  //Shows current profile id, if edit is toggled, the current form and current active states.
  //???
  const checkStatus = () => {
    console.log(`Profile ID: ${profileId}`);
    console.log(`Edit toggle: ${edit}`);
    console.log(`Form: ${JSON.stringify(form)}`);
    console.log(`Active: ${JSON.stringify(active)}`);
  };

  //Returns a list of profiles in a dropdown menu
  //???
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
          {filteredProfiles.map((profile) => {
            if (
              rangeType === profile.rangeType &&
              stackSize === profile.stackSize
            ) {
              return (
                <option value={JSON.stringify(profile)}>
                  {profile.profileName}
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
  //???
  const openProfile = (profile: string) => {
    //Make the profile into a JavaScript object.
    let profile_object: Profile = JSON.parse(profile);

    console.log(profile);
    console.log(profile_object);
    console.log(Object.entries(profile_object.range));

    //Set profileId into the JavaScript object.
    /*Asserting _id as non-null because every profile has an _id in the database, 
    but _id isn't used in every function that uses the interface */
    setProfileId(profile_object._id!);

    //Clear all previously open profile elements and states.
    clearMatrix();

    //Set active to show the range stored in the profile.
    for (const [key, value] of Object.entries(profile_object.range)) {
      //Keys are "call" and "raise".
      //Values are arrays that have combos inside them.
      for (let i in value) {
        if (key === "call" && value[i] in active) {
          setActive((prev) => {
            return { ...prev, [value[i]]: 1 };
          });
        } else if (key === "raise" && value[i] in active) {
          setActive((prev) => {
            return { ...prev, [value[i]]: 2 };
          });
        }
      }
    }
    console.log(`Calls in range: ${profile_object.range.call.length === 0 ? "none" : profile_object.range.call}`)
    console.log(`Raises in range: ${profile_object.range.raise.length === 0 ? "none" : profile_object.range.raise}`)
    
    //Sets the form to what it finds.
    setForm({
      profileName: profile_object.profileName,
      description: profile_object.description,
      rangeType: profile_object.rangeType,
      gameType: profile_object.gameType,
      stackSize: profile_object.stackSize,
      position: profile_object.position,
      range: {
        call: profile_object.range.call,
        raise: profile_object.range.raise,
      },
    });
  };

  //Update-function for text input fields.
  const updateForm = (value: object) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  //Handles RangeButton onClicks to change colors.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event) {
      console.error("Event is null or undefined");
      return;
    }
    const eTarget = event.currentTarget;

    if (!eTarget.id) {
      console.error("Event target has no Id");
      return;
    }
    console.log("Button clicked");
    console.log(eTarget.id);
    //Sets buttonId to later include hand combo to form.
    setButtonId(eTarget.id);
    //Sets active from 0 to 1, 1 to 2 or 2 to 0 when clicked.
    setActive((prev) => {
      const newActive = { ...prev };
      //Stores the current id of the clicked button.
      const currentEventValue = active[eTarget.id];

      //Sets the id of the clicked button to the next, in order 0, 1, 2, 0.
      if (currentEventValue === 0) {
        newActive[eTarget.id] = 1;
      } else if (currentEventValue === 1) {
        newActive[eTarget.id] = 2;
      } else {
        newActive[eTarget.id] = 0;
      }

      return newActive;
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
      } else {
        /*If buttonId is 0 (it can't be anything else at this point), 
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
    await fetch(`http://localhost:3001/${connString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    }).catch((error) => {
      //??? might need if error instanceof Error string type confirmation
      //Window alert if an error occurs.
      window.alert(error);
      return;
    });

    //And reset everything.
    clearProfile();

    console.log("Profile created");
  };

  //Function to edit (patch) a profile.
  //???
  const onEdit = async () => {
    console.log(profileId);

    //Another way to write { ...form }.
    const editedProfile = {
      profileName: form.profileName,
      description: form.description,
      rangeType: form.rangeType,
      gameType: form.gameType,
      stackSize: form.stackSize,
      position: form.position,
      range: {
        call: form.range.call,
        raise: form.range.raise,
      },
    };

    //Try to find the profile that will be patched, and patch it.
    await fetch(`http://localhost:3001/${connString}/${profileId}`, {
      method: "PATCH",
      body: JSON.stringify(editedProfile),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      //??? might need if error instanceof Error string type confirmation
      window.alert(error);
      return;
    });
    console.log("Profile edited");
  };

  //Makes using the hook easier.
  const navigate = useNavigate();

  //Function to handle form submission.
  //The "button" is actually a div, might want to fix
  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    //Stop any default action that would happen when submit is pressed.

    /*Because onBlur events happen before onClick,
    event.preventDefault does not stop handleBlur if 
    submit is pressed right after a range button */
    event.preventDefault();

    //Check if the form is filled up:
    //If yes, then submit or edit;
    //if no, window.alert an error.
    //??? incomplete form?
    if (
      form.profileName !== "" &&
      form.description !== "" &&
      form.rangeType !== "" &&
      form.stackSize !== ""
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
  const deleteProfile = async (id: string) => {
    //Try to find the profile, and delete it.
    await fetch(`http://localhost:3001/${connString}/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      //??? might need if error instanceof Error string type confirmation
      //And alert if profile isn't found.
      window.alert(error);
      return;
    });

    console.log(`Profile ${form.profileName} deleted`);
    window.alert(`Profile ${form.profileName} deleted`);

    //Filter profiles locally after deletion.
    const newProfiles = filteredProfiles.filter(
      (profile) => profile._id !== id
    );
    setAllProfiles(newProfiles);

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
        {/* Div TabIndex and rows in TypeScript is specified as a number, so {0} is used despite it ending up as a string later anyway. */}
        <div className="form-group">
          <div
            className="db-btn"
            tabIndex={0}
            style={
              dbToggle === "cash"
                ? { backgroundColor: "chartreuse", color: "black" }
                : undefined
            }
            onClick={() => handleDatabase("cash")}
          >
            Cash game database
          </div>
          <div
            className="db-btn"
            tabIndex={0}
            style={
              dbToggle === "Tournament"
                ? { backgroundColor: "chartreuse", color: "black" }
                : undefined
            }
            onClick={() => handleDatabase("tournament")}
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
          toggle={positionToggle}
          onClick={handlePosition}
        />
      </div>
      <div className="form-group">
        <ButtonArray
          class="stacks"
          array={stacksizes}
          toggle={stackSizeToggle}
          onClick={handleStack}
        />
      </div>
      <div className="form-group">
        <ButtonArray
          class="types"
          array={rangetypes}
          toggle={rangeTypeToggle}
          onClick={handleType}
        />
      </div>

      {/* Display selected location and stack. */}
      {location.database === "" ? (
        <h1>Select a database</h1>
      ) : (
        <h1>
          {location.database} database: {location.position} {stackSize}
        </h1>
      )}
      {location.position === "" && location.database !== "" ? (
        <h2>Select a position</h2>
      ) : null}

      {/* Display stack size selection. */}
      {location.position !== "" &&
      location.database !== "" &&
      stackSize === "" ? (
        <h2>Select Stack size</h2>
      ) : null}

      {/* Display error and loading messages. */}
      {err ? <h2>{err}</h2> : null}
      {isLoading ? <h2>Loading...</h2> : null}

      {/* Profile selection */}

      {/* If some position (collection) and stack size, but no range type. */}
      {location.position !== "" && stackSize !== "" && rangeType === "" ? (
        <h2>Select a range type</h2>
      ) : null}

      {/* If no profilename, but some position, stack size and range type. */}
      {form.profileName === "" &&
      location.position !== "" &&
      stackSize !== "" &&
      rangeType !== "" ? (
        <h2>Select or create a profile: {rangeType}</h2>
      ) : null}

      {/* If some profilename, position, stack size and range type. */}
      {form.profileName !== "" &&
      location.position !== "" &&
      stackSize !== "" &&
      rangeType !== "" ? (
        <h2>Change profiles: {rangeType}</h2>
      ) : null}

      {/* If all three of position, stack size and rangetype exist, show profile list. */}
      {location.position !== "" && stackSize !== "" && rangeType !== "" ? (
        <div>{profileList()}</div>
      ) : null}

      {/* Display profile information, or "empty" if no value. */}
      <h2>
        Profile name:{" "}
        {form.profileName === "" ? "Profile not open" : form.profileName}
      </h2>
      <p>
        <b>Range description: </b>
        {form.description === "" ? "empty" : form.description}
        <br />
        <b>Range type: </b>
        {form.rangeType === "" ? "empty" : form.rangeType}
        <br />
        <b>Range stack size: </b>
        {form.stackSize === "" ? "empty" : form.stackSize}
        <br />
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
        <div tabIndex={0} className="db-btn" onClick={clearForm}>
          Clear Form
        </div>
        <div tabIndex={0} className="db-btn" onClick={clearMatrix}>
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
            value={form.profileName}
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
            className="form-control"
            id="description"
            rows={2}
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
            tabIndex={0}
            className="edit-btn"
            style={
              edit
                ? { backgroundColor: "chartreuse", color: "black" }
                : undefined
            }
            onClick={toggleEdit}
          >
            Toggle edit
          </div>
        ) : null}

        {/* Submit and delete buttons. */}
        {profileId === "" || edit === true ? (
          <div tabIndex={0} className="edit-btn" onClick={handleSubmit}>
            Submit
          </div>
        ) : null}
        {edit === true ? (
          <div tabIndex={0} className="edit-btn" onClick={toggleDelete}>
            Delete
          </div>
        ) : null}
        {del === true ? (
          <>
            <b>Are you sure?</b>
            <div
              tabIndex={0}
              className="del-btn"
              onClick={() => deleteProfile(profileId)}
            >
              Yes
            </div>
            <div tabIndex={0} className="del-btn" onClick={toggleDelete}>
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
