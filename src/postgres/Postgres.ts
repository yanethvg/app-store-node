import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

export default class Postgres {
  private static _instance: Postgres;

  cnn: Pool;
  conectado: boolean = false;

  port: any = process.env.PG_PORT;
  constructor() {
    console.log("Clase inicializada");

    this.cnn = new Pool({
      host: process.env.PG_HOST,
      port: parseInt(this.port),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    this.conectarDB();
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static ejecutarQuery(query: string, callback: Function) {
    this.instance.cnn.connect((err, client, release) => {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(query, (err, result) => {
        release();
        if (err) {
          console.error("Error executing query", err.stack);
          return callback(err);
        }
        if (result.rows.length === 0) {
          callback("El resgistro solicitado no existe");
        } else {
          callback(null, result.rows);
        }
      });
    });
  }
  private conectarDB() {
    this.cnn.connect((err) => {
      if (err) {
        return console.log(err.message);
      }
      this.conectado = true;
      console.log("Base de datos Online");
    });
  }
}
