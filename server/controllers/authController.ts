import { NextFunction, Request, Response } from "express";

export default class AuthController {
	public lockIfAuthenticated(req: Request, res: Response, next: NextFunction){
        if(req.isAuthenticated()){
            res.status(401).send();
            return;
        }
        next();
    }

    public lockIfNotAuthenticated(req: Request, res: Response, next: NextFunction){
        if(!req.isAuthenticated()){
            res.status(401).send();
            return;
        }
        next();
    }
}
