"use client";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
export default function App() {
  // const [socket, setSocket] = useState(undefined);

  // const [roll, setRoll] = useState("starting...");

  const [selectedDice, setSelectedDice] = useState({});
  const [inputDice, setInputDice] = useState("");
  const [apiToken, setApiToken] = useState(null);
  const [rolledDiceResults, setRolledDiceResults] = useState({});
  const [rerollDice, setRerollDice] = useState(false);
  const handleDiceUpdate = (value) => {
    let currentSelected = Object.assign({}, selectedDice);
    if (currentSelected[value.toString()]) {
      currentSelected[value.toString()] += 1;
    } else {
      currentSelected[value.toString()] = 1;
    }
    setSelectedDice(currentSelected);
    // let roll = getRandomInt(value);
    // socket.emit("roll", roll);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let currentInput = parseInt(inputDice);
      if (Number.isInteger(currentInput) && currentInput > 0) {
        handleDiceUpdate(inputDice);
      }
    }
  };

  const clearDice = () => {
    setSelectedDice({});
    setRolledDiceResults({});
  };

  const handleDiceRoll = async (token) => {
    // Set up url for get call
    let queryString = "";
    for (let x = 0; x < Object.keys(selectedDice).length; x++) {
      let key = Object.keys(selectedDice)[x];
      let value = selectedDice[key];
      queryString += `${key}:${value}`;
      if (x !== Object.keys(selectedDice).length - 1) {
        queryString += ",";
      }
    }
    let rolls = await fetch(
      `http://localhost:3000/api/roll?dice=${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    let result = await rolls.json();
    if (result.error) {
      await getApiToken();
      setRerollDice(true);
    } else {
      setRolledDiceResults(result.diceRolls);
    }
  };

  async function getApiToken() {
    let token = await fetch("http://localhost:3000/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await token.json();
    setApiToken(response["access_token"]);
  }

  useEffect(() => {
    const setToken = async () => {
      await getApiToken();
    };
    if (!apiToken) {
      setToken();
    }
    if (rerollDice && apiToken) {
      setRerollDice(false);
      handleDiceRoll(apiToken);
    }
    // const socket = io("http://localhost:3000");
    // socket.on("roll", (roll) => {
    //   setRoll(roll);
    // });
    // setSocket(socket);
  }, [apiToken, rerollDice]);

  return (
    <div className="flex justify-center min-h-screen items-center flex-col bg-slate-100 py-4">
      <h1>Dice Roll</h1>
      <div className="w-3/4 h-screen rounded overflow-hidden shadow-lg bg-white mt-2 p-4">
        <p>Popular:</p>
        <div className="flex flex-row">
          <button
            onClick={() => handleDiceUpdate(4)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {4}
          </button>
          <button
            onClick={() => handleDiceUpdate(6)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {6}
          </button>
          <button
            onClick={() => handleDiceUpdate(8)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {8}
          </button>
          <button
            onClick={() => handleDiceUpdate(10)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {10}
          </button>
          <button
            onClick={() => handleDiceUpdate(12)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {12}
          </button>
          <button
            onClick={() => handleDiceUpdate(20)}
            className="mr-2 bg-blue-500 rounded min-w-8"
          >
            {20}
          </button>
        </div>
        <div className="flex flex-row mt-4">
          <p className="mr-2">Unique Dice: </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="diceValue"
            type="text"
            placeholder="Dice Value"
            onChange={(e) => setInputDice(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          ></input>
        </div>
        <p>Selected:</p>
        {Object.keys(selectedDice).map((selected) => {
          return (
            <p
              key={selected}
            >{`Dice: ${selected}, Amount: ${selectedDice[selected]}`}</p>
          );
        })}
        <div className="flex flex-row mt-5">
          <button
            className="mr-2 bg-red-500 rounded min-w-8 p-2"
            onClick={clearDice}
          >
            Clear
          </button>
          <button
            className={`ml-auto ${
              Object.keys(selectedDice).length > 0
                ? "bg-green-500"
                : "bg-slate-500"
            } rounded min-w-8 p-2`}
            onClick={() => handleDiceRoll(apiToken)}
            disabled={Object.keys(selectedDice).length > 0 ? false : true}
          >
            Roll
          </button>
        </div>
        {Object.keys(rolledDiceResults).length > 0
          ? Object.keys(rolledDiceResults).map((key) => {
              return (
                <p
                  className="mt-2"
                  key={key}
                >{`Dice rolls for: ${key}: ${rolledDiceResults[key]}`}</p>
              );
            })
          : null}
      </div>
    </div>
  );
}
