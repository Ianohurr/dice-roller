import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let currentDice;
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    if (currentDice) {
      io.emit("updateSelectedDice", currentDice);
    }
    socket.on("updateSelectedDice", (dice) => {
      currentDice = dice;
      io.emit("updateSelectedDice", dice);
    });
    socket.on("clearDice", () => {
      io.emit("clearDice");
    });
    socket.on("handleDiceRoll", (diceRolls) => {
      io.emit("handleDiceRoll", diceRolls);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
