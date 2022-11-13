import { Socket } from "net";

export class Tcp {
  private client = new Socket();
  private ip: string = "192.168.101.135";
  private port: number = 8844;
  isConnected: boolean;

  private static instance: Tcp;

  private constructor() {}

  public static getInstance(): Tcp {
    if (!Tcp.instance) {
      Tcp.instance = new Tcp();
    }

    return Tcp.instance;
  }

  connectApplication() {
    console.log(`Connecting to application... ${this.ip}:${this.port}`);
    this.client.connect(this.port, this.ip, () => {
      console.log("Successfully connected");
      this.isConnected = true;
      this.client.write("ExternalScript-ImageProvider\n");
      this.client.setKeepAlive(true);
    });

    this.client.on("error", (err) => {
      this.isConnected = false;
      console.error(err);
    });

    this.client.on("data", (data) => {
      console.log(data.toString());
    });
  }

  emitApplication(data: string) {
    this.isConnected && this.client.write(data);
  }
}
