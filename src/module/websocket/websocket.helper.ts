import { Server, Socket } from "socket.io";
import { WebsocketEvent } from "../../types/event";
import { io, Socket as SocketClient } from "socket.io-client";

export class WebsocketHelper {
  private io: Server;
  private socket: Socket;
  private socketClient: SocketClient;
  private urlRobotApp = "http://localhost:5001";

  constructor({ io, socket }: { io: Server; socket: Socket }) {
    this.io = io;
    this.socket = socket;
    this.createSocketClient();
  }

  private handleEvent = { [WebsocketEvent.MOVE]: this.handleMove };

  createSocketClient() {
    try {
      this.socketClient = io(this.urlRobotApp);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

  handleMove(data) {
    console.log(data);
    this.io.emit(WebsocketEvent.MOVE, data);
    this.socketClient.emit(WebsocketEvent.MOVE, data);
  }

  helperEventFactory(event: WebsocketEvent) {
    return this.handleEvent[event].bind(this);
  }
}
