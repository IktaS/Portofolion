import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/userModel";
import passport from "passport";
import { nextTick } from "process";

export default class UserController {
	public async registerUser(req: Request, res: Response): Promise<void> {
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
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await User.find({ username: req.params.username });
		res.json(user);
	}

	public async saveGithubKey(req: Request, res: Response): Promise<void> {
		let user = await User.findOne({ username: req.body.username });

		if (!user) {
			res.status(400).send();
			return;
		}
		user.githubKey = req.body.githubKey;
		user.save();
	}
}
