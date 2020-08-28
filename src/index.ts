import bodyParser from "body-parser";
import Server from "./server/server";
import router from "./router/router";
import * as dotenv from "dotenv";
dotenv.config();

const port: any = process.env.PORT || 4000;
const server = Server.init(port);

//middleware
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(router);

//const postgres = new Postgres();
//Postgres.instance;

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
