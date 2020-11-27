import { Document, Schema, Model, model, Error } from "mongoose";
import { imageSchema } from "./imageModel";
import bcrypt from "bcrypt";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	description: string;
	username: string;
	password: string;
	email: string;
	githubToken: string | null;
	profilePicture: any;
}

export const userSchema: Schema = new Schema({
	firstName: String,
	lastName: String,
	description: String,
	username: String,
	password: String,
	email: String,
	githubToken: String,
	profilePicture: imageSchema,
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

userSchema.methods.filterPassword = function () {
	let user = this.toObject();
	let filtered = Object.keys(user)
		.filter((key) => key != "password")
		.reduce((obj: any, key) => {
			obj[key] = user[key];
			return obj;
		}, {});
	return filtered;
};

export const User: Model<IUser> = model<IUser>("user", userSchema);
