import React, { useEffect } from "react";
import Rangebutton from "../../components/rangebutton/Rangebutton";

const RangesAbout = () => {
  useEffect(() => {
    console.log("Ranges about page update");
  });

  /* Explains how the Range matrix can be used and some potential use cases */
  return (
    <div>
      <h1>About Ranges and profiles</h1>
      <p>
        The Range matrix is meant to be used while studying hands or as quick
        reference. <br />
        This tool is built to only include pre-flop situations in No Limit Texas Hold'em Poker. <br />
        All of the information below is also meant to be used in the context of No Limit Hold'em.
      </p>
      <h2>Hand ranges and how they are used</h2>
      <p>
        Pre-flop situations have the least amount of variables and because of
        that, a general pre-flop strategy can be built before the game. <br />
        Any deviations to the strategy will be minor and easy to execute and
        building ranges on the fly in post-flop situations will be easier with a
        known pre-flop strategy. <br />
        This tool aims to give the user an easy
        way to build and access ranges for multiple pre-flop situations, both in
        tournament play and in cash games.
        <br />
        <br />
        Hand ranges are a guideline to the chosen strategy in a given situation. <br />
        A well constructed range (ie hand matrix) will tell you what the normal strategy is for each possible hand in a chosen situation. <br />
        The Legend below tells you how to interpret the hand matrix found in this toolbox.
      </p>
      <br />
      <h2>Legend for button names and matrix colors</h2>
      <h3>Names</h3>
      <p>
        <b>Databases: </b> <br />
        <br />
        <b>Cash game database:</b> <br />
        The database for range profiles created for cash games. <br />
        Cash game ranges are typically smaller than their tournament counterparts due to organizer cut (percentage of each pot in hands that get to the flop) and no or lesser ante. <br />
        <br />
        <b>Tournament database:</b> <br />
        The database for range profiles created for tournaments. <br />
        Tournament ranges are often quite a bit wider than their cash game counterparts. <br />
      </p>
      <p>
        <b>Positions:</b> <br />
        Both databases are divided into collections that are named after table positions in clockwise order at a normal 9-player poker table: <br />
        <br />
        <b>UTG:</b> Under the gun <br />
        <b>UTG+1:</b> One after "under the gun" <br />
        <b>MP or UTG+2:</b> Middle Position or "Under the gun +2" <br />
        <b>LJ or MP:</b> Lojack. It's named after Hijack, the position after this, or Middle Position in some notations. <br />
        <b>HJ:</b> Hijack. It's supposedly named that way after players started to "hijack" the remaining players' action and attempted to steal the blinds by raising. <br />
        <b>CO:</b> Cutoff. This was the seat that often cut the deck after the dealer shuffled in home games. <br />
        <b>BTN:</b> Button. It's named after the plastic "Dealer" disc or button that gets passed around clockwise after each hand. <br />
        <b>SB:</b> Small Blind. It's the smaller of the two blinds, usually half of a big blind. <br />
        <b>BB:</b> Big Blind. It's the bigger blind and acts as the first bet in each hand.  
      </p>
      <p>
        <b>Stack sizes:</b> <br />
        The profiles are divided by stack size shown in Big Blinds. <br />
        This is because how much money players have left and how much money can go into a pot often dictates how hands should be played. <br />
        In this tool, ranges are constructed for the filtered stack size and below until the next threshold is reached.
      </p>
      <p>
        <b>Types:</b> <br />
        Range types filter the profiles by previous betting action. The Big Blind acts as the first bet, a raise as the second, a reraise as the third and so on. <br />
        In online games, bet sizes usually start from 2.2 to 2.5 Big Blinds for the initial raise, 3 to 4 times that for the reraise and 2.5 to 3 times that for the fourth bet. The ranges in these profiles are constructed with these sizes in mind. <br />
        In "live games" (at a casino or a home game) as well as if there are calls in the pot, these bet sizes should be increased. <br />
        <br />
        These ranges also assume that there are two players playing for the pot. They are okay to use for situations including more players, but they will often need to be tightened. <br />
        <br />
        <b>RFI:</b> Raise First In. These profiles are used when the only previous bet is the Big Blind. <br />
        <b>FRFI:</b> Facing RFI. These profiles assume that a previous raise has happened. <br />
        <b>F3Bet:</b> Facing a 3-bet. A player is facing a reraise. <br />
        <b>F4Bet:</b> Facing a 4-bet. A player has faced an RFI, chosen to reraise the bet and then faces another reraise. <br />
        <br />
        I decided to only count until the 4th bet since players will start to run low on chips at that point. Ranges for the 5th bet are fairly self-explanatory since bluffing gets very difficult at that point. <br />
        Including profiles for a 5th bet is easy to do if I feel like it's necessary.
      </p>

      <h3>Colors</h3>
      <p>
        A green colored box signals for the "call" action for that hand. <br />
        The "A2o" (Ace-deuce off-suit) tells you the hand the signal is for; In this case, an ace and a deuce (2) of different suits.{" "}
      </p>{" "}
      <Rangebutton active={1} text="A2o" />
      <p>
        A red colored box signals for the "raise" action for that hand. <br />
        This time, the signal is for "A2s" (Ace-deuce suited): An ace and a deuce of the same suit.
      </p>{" "}
      <Rangebutton active={2} text="A2s" />
      <p>
        No color signals for the "fold" action for that hand, or the "check"
        action if there are no bets. <br />
        The hand is a pair of nines. Pairs don't have suit indicators because they cannot be suited.
      </p>{" "}
      <Rangebutton active={0} text="99" />
      <br />
      <p>
      You can sometimes see ranges specify the suits of the cards in notation. For example: "A2h" or "A2hh" specifies ace-deuce of hearts. <br />
      This is mostly done in post-flop situations and as such, are out of scope for this tool.
      </p>
      <br />
      <h2>Some hand combinatorics</h2>
      <p>
        <b>Each off-suit hand is one of twelve different combinations.</b> <br /> 
        Each suit can see one of three others alongside it for 4 * 3 combinations. 
      </p>
      <p>
        <b>Each suited hand is one of four.</b> <br />
        There are four suits and the suit of the first card has to match the suit of the second. <br />
      </p>
      <p>
        <b>And each pair is one of six.</b> <br />
        The order of the cards does not matter, so one way to count it is to; <br />
      </p>
      <ul>
        <li>Pair the nine of spades with the three other suits: Nines of hearts, diamonds and clubs.</li>
        <li>Then pair the nine of hearts with the two remaining non-spade suits: Nines of diamonds and clubs.</li>
        <li>Finally pair the nine of diamonds with the one remaining non-spade, non-heart suit: Nine of clubs.</li>
      </ul>
      <p>
        This is important to know of because; <br /> 
        Playing all of <b>one off-suit hand</b> will happen as often as playing all of <b>three different suited hands</b>, or <b>two different pairs</b>.
      </p>
      <p>
        Generally speaking; suited hands are both easier to play and make better hands than their off-suit counterparts. <br />
        When you combine off-suited hands being often worse than suited hands to off-suited hands having more possible combinations, it's very easy to end up in a situation where you are playing poor quality hands far too often.
      </p>
      <br />
      <br />
    </div>
  );
};

export default RangesAbout;
