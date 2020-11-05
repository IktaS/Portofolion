import express from "express";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import morgan from "morgan";
import DatabaseDriver from "./services/db/db";
import { dbAddress, dbSecret } from "./secrets";
import MongoDriver from "./services/db/mongoDB";
import UserRoutes from "./routes/userRoutes";

class Server {
	public app: express.Application;
	private db: DatabaseDriver;

	constructor() {
		this.app = express();
		this.db = new MongoDriver(dbAddress, dbSecret);
		this.config();
		this.db.connect();
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
		this.app.use(cors());
		this.app.use(morgan("dev"));
	}

	private routes(): void {
		this.app.use("/api/v1/user", new UserRoutes().router);
	}
}

const server = new Server();

server.start();
