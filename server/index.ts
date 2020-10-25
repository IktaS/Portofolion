import express from "express";
const PORT = process.env.PORT || 4000;
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "./config/db";

const app = express();
//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
	.connect(config.database, { useNewUrlParser: true })
	.then(() => {
		console.log("Database is connected");
	})
	.catch((err) => {
		console.log({ database_error: err });
	});

// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
// define first route
app.get("/", (req, res) => {
	res.json("Hola MEVN devs...Assemble");
});
app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
