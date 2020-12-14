import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";
import UserController from "../controllers/userControllers";
import GithubApi from "../services/http-client/githubService";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	description: string;
	username: string;
	password: string;
	email: string;
	githubToken: string | null;
	profilePicture: string;
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

export const filterPassword = function (obj: IUser) {
	let user = obj as any;
	let filtered = Object.keys(user)
		.filter((key) => key != "password")
		.reduce((obj: any, key) => {
			obj[key] = user[key];
			return obj;
		}, {});
	return filtered;
};

export const filterToken = function (obj: IUser) {
	let user = obj as any;
	let filtered = Object.keys(user)
		.filter((key) => key != "githubToken")
		.reduce((obj: any, key) => {
			obj[key] = user[key];
			return obj;
		}, {});
	return filtered;
};

export const filterId = function (obj: IUser) {
	let user = obj as any;
	let filtered = Object.keys(user)
		.filter((key) => key != "_id")
		.reduce((obj: any, key) => {
			obj[key] = user[key];
			return obj;
		}, {});
	return filtered;
};

export const filterVersion = function (obj: IUser) {
	let user = obj as any;
	let filtered = Object.keys(user)
		.filter((key) => key != "__v")
		.reduce((obj: any, key) => {
			obj[key] = user[key];
			return obj;
		}, {});
	return filtered;
};

export const prepareUser = async function (obj: IUser) {
	let user = obj as any;
	user.repos = `${process.env.APP_URL}/users/${obj.username}/repos`;
	user = filterId(user);
	user = filterVersion(user);
	user = filterPassword(user);
	user = filterToken(user);
	let ret = user as IUser;
	return ret;
};

export const User: Model<IUser> = model<IUser>("user", userSchema);
