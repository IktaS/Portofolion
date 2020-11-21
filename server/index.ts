import express from "express";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import morgan from "morgan";
import DatabaseDriver from "./services/db/db";
import { dbAddress, dbSecret } from "./secrets";
import MongoDriver from "./services/db/mongoDB";
import UserRoutes from "./routes/userRoutes";
import expressSession from "./services/session/session";
import Passport from "./services/auth/passportHandler";
import passport from "passport";

class Server {
	public app: express.Application;
	private db: DatabaseDriver;
	private passport: Passport;

	constructor() {
		this.app = express();
		this.db = new MongoDriver(dbAddress, dbSecret);
		this.passport = new Passport();
		this.config();
		this.db.connect();
		this.passport.initialize();
		this.routes();
	}

	public start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log(`API is running at PORT ${this.app.get("port")}`);
		});
	}

	private config(): void {
		this.app.set("port", PORT);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors({ credentials: true, origin: true }));
		this.app.use(morgan("dev"));
		this.app.use(expressSession);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	private routes(): void {
		this.app.use("/api/v1/users", new UserRoutes().router);
	}
}

const server = new Server();

server.start();
