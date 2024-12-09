import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { UsersEntity } from "../users.entity"; 

declare global {
    namespace Express {
        interface Request {
            currentUser?: UsersEntity;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private usersService: UsersService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId){
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }
}