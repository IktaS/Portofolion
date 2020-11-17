import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    password: string;
    githubKey: string | null;
};
  
export const userSchema: Schema = new Schema({
    username: String,
    password: String,
    githubKey: String,
});

export const User: Model<IUser> = model<IUser>("User", userSchema);

userSchema.pre<IUser>("save", function save(next) {
    const user = this;

    bcrypt.genSalt(10, (err,salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err:Error, hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function ( candidatePassword:string, callback:any ){
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
};