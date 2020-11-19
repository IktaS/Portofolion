import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/userModel";

export default class UserController {
	public async registerUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const exist: Boolean = await User.exists({ username: req.body.username });
		if (exist) {
			res.status(400).redirect("/register");
			return;
		}

		let newUser = new User({
			username: req.body.username,
			password: req.body.password,
			githubKey: null,
		});
		newUser.save((err) => {
			if (err) throw err;
		});
		res.status(200).send();
		next();
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			res.status(400).send();
		}
		let filtered = (user as any).filterPassword();
		res.json(filtered);
	}

	public async saveGithubKey(req: Request, res: Response): Promise<void> {
		let user = await User.findOne({ username: req.body.username });
		if (!user) {
			res.status(400).send();
			return;
		}
		user.githubKey = req.body.githubKey;
		user.save();
		res.status(200).send();
	}

	public async getDashboard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		if (req.isAuthenticated()) {
			if (!req.user) {
				res.status(401).send();
				return;
			}
			let user = (req.user as any).filterPassword();
			res.send(user);
		} else {
			res.status(401).send();
			return;
		}
	}
}
