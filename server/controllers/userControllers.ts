import { NextFunction, Request, Response } from "express";
import { IUser, prepareUser, User } from "../models/userModel";
import fs from "fs";
import path from "path";
import githubService from "../services/http-client/githubService";
import { IRepo, repoSchema } from "../models/repoModel";

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
			profilePicture: "",
			githubToken: "",
			repoVisibility: [],
		});
		newUser.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		let user = await User.findOne({ username: req.params.username });
		if (!user) {
			res.status(204).send();
			return;
		}
		user = await prepareUser(user);
		res.status(200).json(user);
	}

	public async testUser(req: Request, res: Response): Promise<void> {
		let user = await User.findOne({ username: req.params.username });
		if (!user) {
			res.status(204).send();
			return;
		}
		user = await prepareUser(user);
		res.status(200).json(user);
	}

	public async updateGithubToken(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(400).send();
			return;
		}
		if (!req.body.code) {
			res.status(400).send();
			return;
		}
		const token = await githubService.exchangeToken(req.body.code);
		user.githubToken = token;
		user.save();
		res.status(200).send();
	}

	public async updateProfile(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(400).send();
			return;
		}
		if (req.body.firstName != undefined) user.firstName = req.body.firstName;
		if (req.body.lastName != undefined) user.lastName = req.body.lastName;
		if (req.body.description != undefined)
			user.description = req.body.description;
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
		user.profilePicture = req.file.filename;
		user.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async updateRepoVisibility(
		req: Request,
		res: Response
	): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(401).send();
			return;
		}
		console.log(req.body);
		if(req.body.id == undefined || req.body.isPublic == undefined) {
			res.status(400).send();
			return;
		}
		let data = {
			id: req.body.id,
			isPublic: req.body.isPublic
		}
		let repo = user.repoVisibility.find((rep) => {return rep.id == data.id.toString()});
		console.log(repo);
		if(!repo){
			user.repoVisibility.push(data as IRepo);
		}else{
			repo.isPublic = data.isPublic;
		}
		user.save((err) => {
			if (err) res.status(400).send(err);
			res.status(200).send();
		});
	}

	public async getPicture(req: Request, res: Response): Promise<void> {
		let userData = await User.findOne({ username: req.params.username });
		if (!userData || userData.profilePicture === "") {
			res.status(204).send();
			return;
		}
		const img = {
			img: {
				data: fs.readFileSync(
					path.join(__dirname, "..", "uploads", userData.profilePicture),
					{ encoding: 'base64' }
				),
				contentType: "image/png",
			},
		};
		res.status(200).json(img);
	}

	public async getRepos(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(401).send();
			return;
		}
		if(!user.githubToken || user.githubToken == ""){
			res.status(204).send();
		}
		let repos = await githubService.getRepos(user.githubToken);
		user.repoVisibility.forEach((repo) => {
			let rep = repos!.find((r : any) => {
				return r.id.toString() == repo.id;
			});
			if(!rep) return;
			rep!.isPublic = repo.isPublic;
		});
		res.status(200).json(repos);
	}

	public async getRecentRepos(req: Request, res: Response): Promise<void> {
		let userData = await User.findOne({ username: req.params.username });
		if (userData == null) {
			res.status(204).send();
			return;
		}
		if (userData.githubToken === ""){
			res.status(204).send();
			return;
		}
		let repos = await githubService.getRecentRepos(userData.githubToken);
		if(!repos){
			res.status(204).send();
			return;
		}
		repos = repos.filter((repo) => {
			let repoVis = userData!.repoVisibility.find((rep) => {
				return rep.id == repo.id.toString();
			})
			if(!repoVis){
				return repo.isPublic;
			}
			return repoVis.isPublic;
		});
		res.status(200).json(repos);
	}

	public async getDashboard(req: Request, res: Response): Promise<void> {
		let user = req.user;
		if (!user) {
			res.status(401).send();
			return;
		}
		user = await prepareUser(user as IUser);
		res.status(200).send(user);
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
