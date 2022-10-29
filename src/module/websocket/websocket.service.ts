import http from "http";
import { Server, Socket } from "socket.io";
import { WebsocketHelper } from "./websocket.helper";
import { WebsocketEvent } from "../../types/event";

export class Websocket {
  private static instance: Websocket;

  private io: Server;
  private constructor() {}

  public static getInstance(): Websocket {
    if (!Websocket.instance) {
      Websocket.instance = new Websocket();
    }

    return Websocket.instance;
  }

  createWebsocket(server: http.Server) {
    this.io = new Server(server, {
      cookie: false,
      allowEIO3: true,
      serveClient: false,
      cors: {
        origin: "*",
      },
    });
  }

  getIO(): Server {
    return this.io;
  }

  listen() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`Connection ${socket.id}`);
      const helper = new WebsocketHelper({
        io: this.io,
        socket,
      });
      socket.on(
        WebsocketEvent.MOVE,
        helper.helperEventFactory(WebsocketEvent.MOVE)
      );
      socket.on("disconnect", () => {
        console.warn(`Disconnected ${socket.id}`);
      });
    });
  }
}
