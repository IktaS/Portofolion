import connectMongo from "connect-mongodb-session"
import { dbAddress } from "../../secrets"
import session from "express-session"

const MongoDBStore = connectMongo(session);

const sessionStore = new MongoDBStore({
    uri: dbAddress,
    collection: "sessions"
});

export default sessionStore