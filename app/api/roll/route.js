import { NextResponse } from "next/server";
import { headers } from "next/headers";
require("dotenv").config();
var jwt = require("jsonwebtoken");
// Allow any number of dice, with any value attached to them.

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

export async function GET(req) {
  const headersList = headers();
  const token = headersList.get("Authorization");
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_PUBLIC_KEY);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: "Token invalid to access this endpoint.",
      },
      { status: 400 }
    );
  }

  // Setting up a regex so the endpoint can't accept anything in the wrong format
  const regex = /^(([1-9]\d*:\d+),)*([1-9]\d*:\d+)$/;

  const url = new URL(req.url);
  let dice = url.searchParams.get("dice");
  const valid = regex.test(dice);
  if (!valid) {
    return NextResponse.json(
      {
        error:
          "Dice parameter must be in the format of <dice-number>:<dice-amount>. IE: 4:2. All dice values must be positive integers greater than 1.",
      },
      { status: 400 }
    );
  }
  const diceArr = dice.split(",");
  let diceRolls = {};
  for (let diceRoll of diceArr) {
    let number = diceRoll.split(":")[0];
    let amount = diceRoll.split(":")[1];
    let currentRolls = [];
    for (let x = 0; x < amount; x++) {
      let roll = getRandomInt(number);
      currentRolls.push(roll);
    }
    // check if somehow the query string had multiple of the same dice and just throw them in together
    if (diceRolls[number.toString()]) {
      diceRolls[number.toString()] =
        diceRolls[number.toString()].concat(currentRolls);
    } else {
      diceRolls[number.toString()] = currentRolls;
    }
  }
  return NextResponse.json({
    diceRolls,
  });
}
