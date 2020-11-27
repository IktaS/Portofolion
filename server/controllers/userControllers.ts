import { NextFunction, Request, Response } from "express";
import { fstat } from "fs";
import { IUser, User } from "../models/userModel";
import fs from "fs";
import path from "path";

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
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			description: "",
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			img: null,
			githubToken: null,
		});
		newUser.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			res.status(204).send();
		}
		let filtered = (user as any).filterPassword();
		res.status(200).json(filtered);
	}

	public async updateProfile(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(400).send();
			return;
		}
		if (req.body.firstName != undefined) user.firstName = req.body.firstName;
		if (req.body.lastName != undefined) user.lastName = req.body.lastName;
		if (req.body.description != undefined) user.description = req.body.description;
		if (req.body.username != undefined) user.username = req.body.username;
		if (req.body.email != undefined) user.email = req.body.email;
		if (req.body.password != undefined) user.password = req.body.password;
		user.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async updatePicture(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(400).send("No user");
			return;
		}
		const img = {
			img: {
				data: fs.readFileSync(
					path.join(__dirname, "..", "uploads", req.file.filename)
				),
				contentType: "image/png",
			},
		};
		user.profilePicture = img;
		user.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async getDashboard(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			res.status(401).send();
			return;
		}
		let user = (req.user as any).filterPassword();
		res.send(user);
	}

	public async checkUser(req: Request, res: Response): Promise<void> {
		const exist: Boolean = await User.exists({
			$or: [{ username: req.params.value }, { email: req.params.value }],
		});
		if (exist) {
			res.status(200).json({ message: "username or email exist" });
		} else {
			res.status(204).send();
		}
	}
}
