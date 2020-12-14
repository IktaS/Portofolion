const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

export const dbURI  = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`
