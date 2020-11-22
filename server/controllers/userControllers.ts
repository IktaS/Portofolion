import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/userModel";

export default class UserController {
	public async registerUser(req: Request, res: Response): Promise<void> {
		const exist: Boolean = await User.exists({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		});
		if (exist) {
			res.status(400).json({ message: "username or email exist" });
			return;
		}

		let newUser = new User({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			githubToken: null,
		});
		newUser.save((err) => {
			if (err) throw err;
		});
		res.status(200).send();
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			res.status(204).send();
		}
		let filtered = (user as any).filterPassword();
		res.status(200).json(filtered);
	}

	public async saveGithubKey(req: Request, res: Response): Promise<void> {
		let user = await User.findOne({ username: req.body.username });
		if (!user) {
			res.status(204).send();
			return;
		}
		user.githubToken = req.body.githubToken;
		user.save();
		res.status(200).send();
	}

	public async getDashboard(req: Request, res: Response): Promise<void> {
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

	public async checkUser(req: Request, res: Response): Promise<void> {
		const exist: Boolean = await User.exists({
			$or: [{ username: req.params.value }, { email: req.params.value }],
		});
		if (exist) {
			res.status(200).json({ message: "username or email exist" });
		}else {
			res.status(204).send();
		}
	}
}
