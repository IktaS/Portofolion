import session from "express-session";
import { session_secret } from "../../session.config";
import sessionStore from "./sessionStore";

const expressSession = session({
	secret: session_secret,
	store: sessionStore,
	resave: true,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24, // 1 day
	},
});

export default expressSession;
