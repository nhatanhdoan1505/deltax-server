import { Server, Socket } from "socket.io";
import http from "http";
import { EVENT, Transporter } from ".";

export class Listener {
  private io: Server;
  private transporter = Transporter.getInstance();

  constructor(io: Server) {
    this.io = io;
  }

  listen(socket: Socket) {
    socket.on("disconnect", async () => console.log("Disconnect", socket.id));

    socket.on(EVENT.PRESS, ({ data }) => {
      this.transporter.emitApplication(data);
    });
  }
}
