import session from "express-session";
import { sessSecret } from "../../secrets";
import sessionStore from "./sessionStore";

const expressSession = session({
	secret: sessSecret,
	store: sessionStore,
	resave: true,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24, // 1 day
	},
});

export default expressSession;
