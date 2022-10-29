import * as bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import * as path from "path";
dotenv.config();

export class App {
  private static instance: App;

  private app = express();
  private server: http.Server;

  private constructor() {
    this.config();
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.server = http.createServer(this.app);
  }

  listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  getHttpServer(): http.Server {
    return this.server;
  }
}
