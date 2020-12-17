import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";
import UserController from "../controllers/userControllers";
import GithubApi from "../services/http-client/githubService";
import { IRepo, repoSchema } from "./repoModel";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	description: string;
	username: string;
	password: string;
	email: string;
	githubToken: string;
	profilePicture: string;
	repoVisibility: IRepo[];
}

export const userSchema: Schema = new Schema({
	firstName: String,
	lastName: String,
	description: String,
	username: String,
	password: String,
	email: String,
	githubToken: String,
	profilePicture: String,
	repoVisibility: [repoSchema],
});

userSchema.pre<IUser>("save", function save(next) {
	const user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, (err: Error, hash) => {
			if (err) return next(err);
			console.log(hash);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (
	candidatePassword: string,
	callback: any
) {
	bcrypt.compare(
		candidatePassword,
		this.password,
		(err: Error, isMatch: boolean) => {
			callback(err, isMatch);
		}
	);
};

export const prepareUser = async function (obj: IUser) {
	let user = obj as any;
	const restricted = ['__v', '_id', 'githubToken', 'password'];
	const filtered = Object.keys(user._doc).filter( key => !restricted.includes(key)).reduce((obj:any,key) => {
		obj[key] = user[key];
		return obj;
	}, {});

	filtered.repos = `${process.env.APP_URL}/v1/users/${obj.username}/repos`;
	filtered.profilePicture = `${process.env.APP_URL}/v1/users/${obj.username}/img`;
	return filtered;
};

export const User: Model<IUser> = model<IUser>("user", userSchema);
