require("dotenv").config();
import * as express from "express";
import * as bodyParser from "body-parser";
import modelsInit from "./models";
import { UserRoutes } from "./routes/users";
import cors from "cors";

class App {
  public app: express.Application;
  public userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this.app = express.default();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
    this.app.use(cors());
    modelsInit();
  }

  public routes(): void {
    this.app.use("/api/users", new UserRoutes().router);
  }
}

export default new App().app;
