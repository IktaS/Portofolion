import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";

export default class UserController {
	public async registerUser(req: Request, res: Response): Promise<void> {

		let exist : Boolean = await User.exists({ username: req.params.username });
		if(exist){
			res.status(400).send();
			return;
		}

		await User.create({
			username: req.body.username,
			password: req.body.password,
		});
		res.status(200).send();
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await User.find({ username: req.params.username });
		res.json(user);
	}
}
