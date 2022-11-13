import { App, Websocket, Tcp } from "./module";

const bootstrap = async () => {
  const app = App.getInstance();
  app.listen(8000);
  const server = app.getHttpServer();

  const websocket = Websocket.getInstance();
  websocket.createWebsocket(server);
  websocket.listen();

  const tcp = Tcp.getInstance();
  tcp.connectApplication();
};

bootstrap();
