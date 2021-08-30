import { Router } from "express";
import { UserController } from "../controllers/usersController";

export class UserRoutes {
  public router: Router;
  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/sign-up", this.userController.validate('createUser'), this.userController.addNewUser);
    this.router.post("/sign-in", this.userController.validate('login'), this.userController.signIn);
  }
}