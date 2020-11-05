import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";

export default class UserController {
    public async registerUser(req: Request, res: Response): Promise<void> {
        await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(200).send();
    }
}