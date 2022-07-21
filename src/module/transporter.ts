import { Socket } from "net";

export class Transporter {
  private static instance: Transporter;
  private client = new Socket();
  private isConnected: boolean = false;
  private ip: string = "192.168.101.135";
  private port: number = 8844;

  private constructor() {}

  connectApplication() {
    this.client.connect(this.port, this.ip, () => {
      console.log("Successfully connected");
      this.isConnected = true;
      this.client.write("ExternalScript-ImageProvider\n");
      this.client.setKeepAlive(true);
    });

    this.client.on("error", (err) => {
      this.isConnected = false;
      console.log("Connection error:", err.message);
    });
  }

  setApplicationAddress({ ip, port }: { ip: string; port: number }) {
    this.ip = ip;
    this.port = port;
  }

  public static getInstance(): Transporter {
    if (!Transporter.instance) {
      Transporter.instance = new Transporter();
    }

    return Transporter.instance;
  }

  emitApplication(message: string) {
    console.log("emit");
    this.client.write(message);
  }
}
