import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUser, User } from "../../models/userModel";

class Passport {
	private instance: any;

	constructor() {
		this.instance = passport;
	}

	private localAuthentication(username: string, password: string, done: any) {
		User.findOne({ username: username }, (err, user: any) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: `username ${username} not found.`,
				});
			}
			user.comparePassword(password, (err: Error, isMatch: boolean) => {
				if (err) {
					return done(err);
				}
				if (isMatch) {
					return done(undefined, user);
				}
				return done(undefined, false, {
					message: "Invalid username or password",
				});
			});
		});
	}

	public initialize() {
		this.instance.use(new LocalStrategy(this.localAuthentication.bind(this)));
		this.instance.serializeUser(this.serializeUser);
		this.instance.deserializeUser(this.deserializeUser);
	}

	private serializeUser(user: IUser, done: any) {
		done(null, user.username);
	}

	private deserializeUser(username: string, done: any) {
		User.findOne({ username: username }, (err, user) => {
			done(err, user);
		});
	}
}

declare global {
	namespace Express {
		interface User extends IUser {}
	}
}

export default Passport;
