import { Router } from "express";
import UserController from "../controllers/userControllers";
import passport from "passport";
import AuthController from "../controllers/authController";
import { upload } from "../config.multer";

export default class UserRoutes {
	public router: Router;
	private userController: UserController = new UserController();
	private authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.get(
			"/dashboard",
			this.authController.lockIfNotAuthenticated,
			this.userController.getDashboard
		);
		this.router.get("/check/:value", this.userController.checkUser);
		this.router.get("/:username", this.userController.getUser);
		this.router.get("/:username/img", this.userController.getPicture);
		this.router.get("/:username/repos", this.userController.getRepos);
		this.router.get("/test/:username", this.userController.testUser);
		this.router.patch(
			"/update/updateProfile",
			this.authController.lockIfNotAuthenticated,
			this.userController.updateProfile
		);
		this.router.patch(
			"/update/updateToken",
			this.authController.lockIfNotAuthenticated,
			this.userController.updateGithubToken
		);
		this.router.patch(
			"/update/updatePicture",
			this.authController.lockIfNotAuthenticated,
			upload.single("profilePicture"),
			this.userController.updatePicture
		);
	}
}
