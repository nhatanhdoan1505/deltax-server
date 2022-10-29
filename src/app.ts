import { App } from "./module";
import { Websocket } from "./module";

const bootstrap = async () => {
  const app = App.getInstance();
  app.listen(8000);
  const server = app.getHttpServer();

  const websocket = Websocket.getInstance();
  websocket.createWebsocket(server);
  websocket.listen();
};

bootstrap();
