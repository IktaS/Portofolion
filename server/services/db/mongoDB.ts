import DatabaseDriver from './db'
import mongoose from 'mongoose'

export default class MongoDriver implements DatabaseDriver {
    private URI : string;
    private Secret : string;

    constructor(URI:string, Secret:string){
        this.URI = URI;
        this.Secret = Secret;
    }

    connect(){
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to connect to Mongo ...");
            setTimeout(() => {
                mongoose.connect(this.URI, {
                    autoReconnect: true, keepAlive:true, useNewUrlParser:true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            }, 3000);
        });
        connection.on("closed", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error : Error) => {
            console.log("Mongo Connection Error: " + error);
        });

        const run = async () => {
            await mongoose.connect(this.URI, {
                autoReconnect: true, keepAlive: true, useNewUrlParser:true
            });
        };
        run().catch(error => console.error(error));
    }
}