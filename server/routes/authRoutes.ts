import { Router } from "express";
import UserController from "../controllers/userControllers";
import passport from "passport";
import AuthController from "../controllers/authController";

export default class AuthRoutes {
	public router: Router;
	private userController: UserController = new UserController();
	private authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.post("/register", this.authController.lockIfAuthenticated, this.userController.registerUser);
		this.router.post("/login", this.authController.lockIfAuthenticated, passport.authenticate("local"), function (
			req,
			res
		) {
			res.status(200).json((req.user as any).filterPassword());
        });
        this.router.get("/logout", (req,res) => {
            req.logout();
            res.status(200).send();
        })
	}
}
