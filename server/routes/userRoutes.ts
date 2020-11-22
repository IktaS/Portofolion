import { Router } from "express";
import UserController from "../controllers/userControllers";
import passport from "passport";
import AuthController from "../controllers/authController";

export default class UserRoutes {
	public router: Router;
	private userController: UserController = new UserController();
	private authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.get("/dashboard",this.authController.lockIfNotAuthenticated, this.userController.getDashboard);
		this.router.get("/check/:value", this.userController.checkUser);
		this.router.get("/:username", this.userController.getUser);
	}
}
