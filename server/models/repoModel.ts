import { Document, Schema, Model, model, Error } from "mongoose";

export interface IRepo extends Document {
	id: string;
	isPublic: boolean;
}

export const repoSchema: Schema = new Schema({
	id: String,
	isPublic: Boolean,
});
