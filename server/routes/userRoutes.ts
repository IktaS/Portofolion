import { Router } from "express";
import UserController from "../controllers/userControllers";

export default class UserRoutes {
	public router: Router;
	private userController: UserController = new UserController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.post("/register", this.userController.registerUser);
	}
}
