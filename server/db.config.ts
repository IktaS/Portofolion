const {
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env

export const dbURI  = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
