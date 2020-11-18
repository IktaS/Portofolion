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
		this.router.get("/:username", this.userController.getUser);
		this.router.post(
			"/login",
			passport.authenticate("local", {
				successRedirect: "/dashboard",
				failureRedirect: "/login",
			}),
			function (req, res, next) {
				console.log("sucess");
			}
		);
	}
}
