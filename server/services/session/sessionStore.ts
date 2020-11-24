import connectMongo from "connect-mongodb-session"
import { dbURI } from "../../db.config"
import session from "express-session"

const MongoDBStore = connectMongo(session);

const sessionStore = new MongoDBStore({
    uri: dbURI,
    collection: "sessions"
});

export default sessionStore