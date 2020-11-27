import { Mode } from "fs";
import { Document, Schema, Model, model, Error } from "mongoose";

export interface IImage extends Document  {
    img:
    {
        data: Buffer,
        contentType: string
    }
}

export const imageSchema: Schema = new Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});

