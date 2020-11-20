import { Router } from "express";
import UserController from "../controllers/userControllers";
import passport from "passport";

export default class UserRoutes {
	public router: Router;
	private userController: UserController = new UserController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.post("/register", this.userController.registerUser);
		this.router.post("/login", passport.authenticate("local"), function (
			req,
			res,
			next
		) {
			res.status(200).send();
		});
		this.router.get("/dashboard", this.userController.getDashboard);
		this.router.get("/check/:value", this.userController.checkUser)
		this.router.get("/user/:username", this.userController.getUser);
	}
}
