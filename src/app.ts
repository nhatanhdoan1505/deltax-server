import * as bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import * as path from "path";
import { Server, Socket } from "socket.io";
import { Listener } from "./module/index";
import net from "net";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(express.static(path.join(__dirname)));
  app.use(express.json());
  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.urlencoded({ extended: false }));

  const server = http.createServer(app);
  server.listen(8080, () => console.log(`Server is listening at port ${8000}`));

  const io = new Server(server, {
    cookie: false,
    allowEIO3: true,
    serveClient: false,
    cors: {
      origin: "*",
    },
  });

  // var client = new net.Socket();
  // client.connect(8844, "198.168.101.4", function () {
  //   console.log("Connected");
  //   client.write("Hello, server! Love, Client.");
  // });

  const listen = new Listener(io);

  io.on("connection", (socket: Socket) => {
    console.log("connection", socket.id);
    listen.listen(socket);
  });
};

main();
