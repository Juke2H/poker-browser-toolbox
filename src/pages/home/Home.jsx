import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("Home page update");
  });

  /* The home page shows up first, 
  and can be accessed later via the Randomizer menu button */
  return (
    <div>
      <h1>What this tool is about</h1>
      <p>
        This tool is meant to be a collection of resources I want to have easy
        access to while playing No Limit Texas Hold'em Poker (or just Poker).
      </p>
      <p>
        Currently this tool has a randomizer button, an on-screen calculator and
        a hand matrix for creating, reading, editing and deleting pre-flop range
        profiles. <br />
        Profiles can be stored in one of two (Cash or Tournament)MongoDB databases.
        As of right now, the tournament database is a copy of the cash database. It will be updated once I study up on tournament play and derust.
      </p>
      <p>Future updates for this tool may include:</p>
      <ul>
        <li>
          Out-of-order actions; <br />
          Right now all of the filter buttons clear all elements of the form (or profile, in case of database buttons) given by the buttons below them. <br />
          Also, the Matrix and input fields can be interacted with before all the necessary filters are in place, and clicking the remaining filters will clear the form (and you can't submit without the filters in place). <br />
          This can get quite annoying as time goes on.
        </li>
        <br />
        <li>
          Make the UI less confusing; <br />
          I know how things work because I wrote this, but someone who doesn't know the
          code might have a more difficult time going through the profile
          opening, creating, editing and deleting functions.
        </li>
        <br />
        <li>
          A way to fill range buttons with color by percentage to show that some
          hands are played a certain way only sometimes. This would both make
          the ranges more accurate and make the randomizer easier to use.
        </li>
        <br />
        <li>
          If I want to deploy this somewhere, I might need to rewrite the
          backend again to include a login system. Or make profiles unable to
          be edited or deleted in the deployment.
        </li>
        <br />
        <li>
          A default set of ranges if the databases are empty, or (way more
          difficult unless deployed) if there are no database connections.
        </li>
        <br />
        <li>
          A basic explanation of ICM and a way to approximate its effect on Pot
          Odds. This will be difficult to fit into the "quickly, easily and
          frequently accessible during play"-framework.
        </li>
        <br />
        <li>
          Other tools; I don't know yet what I want to add, but three isn't exactly very
          many for a "toolbox".
        </li>
      </ul>
    </div>
  );
};

export default Home;
