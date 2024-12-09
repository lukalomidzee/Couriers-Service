import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Response } from "express";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        if (!request.currentUser.isAdmin){
            response.redirect('/unauthorized');
            return false;
        }

        return request.currentUser.isAdmin;
    }
}