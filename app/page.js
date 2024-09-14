"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
export default function App() {
  const [socket, setSocket] = useState(undefined);

  const [roll, setRoll] = useState("starting...");

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleButtonClick = () => {
    let roll = getRandomInt(100);
    socket.emit("roll", roll);
  };
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("roll", (roll) => {
      setRoll(roll);
    });
    setSocket(socket);
  }, []);
  return (
    <div>
      <button onClick={() => handleButtonClick()}>{roll}</button>
    </div>
  );
}
