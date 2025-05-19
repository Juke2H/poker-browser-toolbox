import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CalcAbout = () => {
  useEffect(() => {
    console.log("Calculator page update");
  });

  /*This page explains a few ways for how the calculator can be used
  in Poker play */
  return (
    <div>
      <h1>About the Calculator</h1>
      <p>
        The purpose of the calculator in this tool is to make calculating simple
        arithmetic quick.
      </p>
      <p>
        This page acts as a guide for the various calculations you might
        need the calculator for.
      </p>

      <h1>Calculations</h1>
      <h2>Pot Odds</h2>
      <p>
        An easy way to calculate the Pot Odds is to; <br />
        <b>Step 1: Calculate the final pot size if you were to call</b> <br />
        If the pot before the bet was $100 and the bet was $50, the final pot
        size after calling would be $200. <br />
        <b>
          Step 2: Divide the size of the call by the size of the final pot size.
        </b>{" "}
        <br />
        In this example, the answer is 0.25 ($50 call / $200 final pot). <br />
        <b>
          Step 3: Multiply by 100 to get the percentage <br />
        </b>
        In this example, that comes out as 25%.
        <br />
        <br />
        <b>
          This means that, in this example, you need to win more than 25% of the
          time to make a profit on the call.
        </b>{" "}
        <br />
        <br />
        This calculation is simple to use with draws where you often need to hit
        in order to win, but sometimes you need to catch a bluff and figuring
        out how often you are going to see a bluff is a lot more difficult.{" "}
        <br />
        This calculation also only takes into account the current bet, so using
        this with the 4-2 rule, for example, can lead to bad results when
        calculating Flop bets. However, the 4-2 and the 2-2 rules still have
        some use to them even if they can't be used by themselves very often.
      </p>
      <h2>The 4-2 rule</h2>
      <p>
        The 4-2 rule is a simple way to calculate your current chance of
        completing (hitting) a draw. <br />
        The rule states that on the Flop, you can multiply the number of outs
        your draw has by 4 to see your odds of hitting one of them over the
        course of the hand. <br />
        For example, if you have 9 outs on the Flop,{" "}
        <b>your chance of completing the draw is (9 * 4) 36%.</b> <br />
        <br />
        The "2" in the rule refers to the odds on the Turn street. Instead of
        multiplying by 4, you multiple by 2 if you are on the Turn. <br />
        <b>In this case, the odds on the Turn would be (9 * 2) 18%.</b>
      </p>
      <h2>The 2-2 rule</h2>
      <p>
        The 4-2 rule has its fair share of problems. Like with calculating pot
        odds, the 4-2 rule assumes that no further bets are made. On the Flop
        this is somewhat wishful thinking outside of tournament situations or
        other small stack-to-pot ratio situations, where you will face all-in
        bets on the Flop. <br />
        The 2-2 rule assumes that further bets are made and so will only take
        the next street into account when calculating odds of hitting draws.{" "}
        <br />
        Using the rule is similar to the 4-2 rule; You multiply your outs by 2
        (instead of 4) on the Flop and by 2 on the Turn.
        <br />
        <br />
        You will run into a problem with the 2-2 rule; Assuming that you have 9
        outs to complete a flush draw, your odds of hitting are 18%. This means
        that the Pot Odds you have must be 18% or below to profitably call.
        <br />
        In No-Limit Hold'em, bet sizes are often too big to give you these kinds
        of Pot Odds. This means that draws often need something more in order to
        make calling with them profitable. These can include:
      </p>
      <ul>
        <li>
          <b>Pairs:</b> If you have a pair, you can now improve to two pair or
          three of a kind. You can also bluff catch sometimes.
        </li>
        <li>
          <b>Overcards:</b> If you have cards above the top community card, you
          can often count drawing into a pair as additional outs.
        </li>
        <li>
          <b>Opponent tendencies:</b> If your opponent is unlikely to bet the
          Turn, you can both use the 4-2 rule on the Flop and also potentially
          bluff on the Turn or the River, increasing your odds of winning.
        </li>
        <li>
          <b>Combo draws</b>: Sometimes your flush draw will also have a
          straight draw with it, increasing the number of outs.
        </li>
        <li>
          <b>Implied Odds:</b> In short, factor in how much you are likely to
          get paid when you hit.
        </li>
        <li>
          <b>Betting:</b> If you don't have any of the above, you can consider
          betting or raising to introduce fold equity (how often your opponent
          folds) and increase your odds that way (fold equity + draw odds).
        </li>
      </ul>
      <p>
        Calculating these odds also shows how powerful betting with draws can
        be; Introducing the possibility of folding will often greatly increase
        you odds of winning the hand, even if your opponent folding gives you
        less chips. And even if they call, you can still complete the draw.
        <br />
        It is good to note that these examples barely scratch the surface of how
        Pot Odds are used to figure out good bet sizes and which hands to use
        when building handranges (
        <Link to="/ranges-about">Link to Ranges About-page</Link> to read more
        about those).
      </p>
      <h2>Bounty Calculation</h2>
      <p>
        Bounty calculations only happen in tournament that have bounties for
        knocking out other players.
        <br />
        In bounty tournaments (or knockout tournaments), part of your buy-in is
        put in front of you in the form of a bounty that is given to the player
        who knocks you out of the event.
        <br />
        In some tournament structures this bounty is always static and
        calculating bounty value in later stages of the tournament is largely
        not worth it. Some events, however, have a bounty system that increases
        as you eliminate other players: You get half of their bounty and the
        other half goes to your bounty. This makes the math interesting and
        often worth doing.
        <br />
        Let's assume that your bounty is half your buyin and that half of any
        won bounty goes to yours.
        <br />
        In this example, the bounty portion of a $100 buy-in would be $50 and a
        won bounty is immediately worth $25. Since the winner of the tournament
        wins their own bounty, your starting stack is worth your entire buy-in.
        <br />
        The essence of bounty math comes down to calculating how many chips a
        bounty is worth and including those chips into an all-in bet (if your
        stack is bigger than the bet) for the Pot Odds calculation.
        <br />
        <br />
        The buy-in is the earlier{" "}
        <b>
          $100 with $50 of it going into the bounty and the starting stack is
          3000 chips.
        </b>
        An opponent goes all-in for 1200 chips total and they have not won any
        bounties. Since the immediate value of winning the bounty is half of
        what it is, you only convert $25 into chips ($100 / $25 = 4, 3000 / 4 =
        750). The Pot Odds math would go like this:
        <br />
        <br />
        <b>
          Call size / (Bet size + Call size + Immediate bounty value ($25 or 750
          chips)) * 100
        </b>
        <br />
        1200 / (1200 + 1200 + 750) * 100 = ~38%
        <br />
        <br />
        <b>Without the bounty it would be:</b>
        <br />
        1200 / (1200 + 1200) * 100 = 50%
        <br />
        <br />
        With the bounty in play, you only need to win more than 38% of the time
        to profit. Without the bounty you'd need 50%.
        <br />
        <br />
        During play, the immediate bounty value is slightly higher since a
        bigger stack is more likely to win more bounties and the winner of the
        tournament wins their own bounty. Converting bounty value to chips is
        still a good approximation.
        <br />
        Even in bounty events, you still need to account for the actual price
        pool being in play when making decisions. There is a very important
        concept called the Independent Chip Model (ICM) that helps calculate how
        much your chips are worth when the price pool is in play. Calculating
        anything ICM related is outside the scope of this tool, however. At
        least for now.
      </p>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CalcAbout;
